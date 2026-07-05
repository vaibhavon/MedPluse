const path = require("path");
const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const seedDoctors = require("./seed/defaultsDoctors");
const seedPatients = require("./seed/defaultPaitents");
const { authenticate, requireWriteRole } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

const jwtSecret = process.env.JWT_SECRET || "dev-insecure-jwt-secret-change-me";
if (isProduction && jwtSecret === "dev-insecure-jwt-secret-change-me") {
  console.warn(
    "WARNING: JWT_SECRET is not set in production; using an insecure default."
  );
}
const mongoUri =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/medpulse";

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://medpluse-2.onrender.com",
  "https://med-pluse-frontend.vercel.app"
];

const allowedOrigins = [
  ...(process.env.CORS_ORIGIN || "").split(","),
  ...defaultAllowedOrigins
]
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
  })
);
app.use(express.json());

// Render (and most PaaS) sit behind one proxy; trust it so req.ip reflects the
// real client for rate limiting.
app.set("trust proxy", 1);

const otpStore = {};
const MAX_OTP_ATTEMPTS = 5;
const emailPassword = process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD;
const emailUser = process.env.EMAIL_USER;

// SMTP connection details are configurable so the same nodemailer setup can
// use Gmail locally and a Render-friendly SMTP provider (Brevo, Mailgun,
// Resend SMTP, ...) in production, where Gmail's SMTP ports are blocked.
const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com";
const emailPort = Number(process.env.EMAIL_PORT || 587);
const emailFrom = process.env.EMAIL_FROM || emailUser;

// Demo login: any email + this shared password + a self-selected role. The OTP
// is delivered to whatever email the user enters (sent from EMAIL_USER).
const DEMO_PASSWORD = process.env.DEMO_USER_PASSWORD || "1234";
const ALLOWED_ROLES = ["admin", "doctor", "patient", "receptionist"];

// Timeouts guarantee a blocked/unreachable SMTP server fails fast instead of
// hanging the login request (Render blocks Gmail's SMTP ports).
const transporter =
  emailUser && emailPassword
    ? nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: emailPort === 465,
        auth: {
          user: emailUser,
          pass: emailPassword
        },
        connectionTimeout: 7000,
        greetingTimeout: 7000,
        socketTimeout: 10000
      })
    : null;

const emailConfigured = Boolean(transporter);

async function sendOtpEmail(to, otp, account) {
  if (!transporter) {
    throw new Error("No email transport configured");
  }

  const subject = "MedPulse Login OTP";
  const text = `Your MedPulse login OTP${
    account ? ` for ${account}` : ""
  } is ${otp}. It will expire in 5 minutes.`;

  await transporter.sendMail({ from: emailFrom, to, subject, text });
}

async function connectAndSeed() {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
    await seedPatients();
    await seedDoctors();
  } catch (err) {
    console.log("MongoDB connection/seeding error:", err.message);
  }
}

function generateOTP() {
  // Cryptographically secure 6-digit code (100000-999999).
  return crypto.randomInt(100000, 1000000).toString();
}

// Rate limiters to blunt credential/OTP brute-forcing. Limits are env-tunable
// (tests raise them so parallel requests are not throttled).
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.LOGIN_RATE_MAX || 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many attempts. Try again later." }
});

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.OTP_RATE_MAX || 20),
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many attempts. Try again later." }
});

app.get("/", (req, res) => {
  res.send("MedPulse backend is running");
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "medpulse-backend",
    timestamp: new Date().toISOString()
  });
});

const loginHandler = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const normalizedEmail = (email || "").toLowerCase().trim();

    if (!normalizedEmail) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({ message: "Please select a role" });
    }

    if (password !== DEMO_PASSWORD) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const otp = generateOTP();

    otpStore[normalizedEmail] = {
      otp,
      role,
      expires: Date.now() + 5 * 60 * 1000,
      attempts: 0
    };

    if (emailConfigured) {
      try {
        // Deliver the OTP to the email the user entered.
        await sendOtpEmail(normalizedEmail, otp, role);
      } catch (mailErr) {
        console.error("OTP email failed:", mailErr.message);

        if (isProduction) {
          return res.status(502).json({
            success: false,
            message: "Could not send OTP email. Please try again later."
          });
        }
      }
    } else if (isProduction) {
      return res.status(500).json({
        success: false,
        message: "Email service is not configured"
      });
    }

    // Never log the OTP in production (Render logs are retained).
    if (!isProduction) {
      console.log("OTP generated:", otp);
    }

    return res.json({
      success: true,
      otpRequired: true,
      devOtp: isProduction ? undefined : otp
    });
  } catch (err) {
    console.error("Email error:", err);

    return res.status(500).json({
      success: false,
      message: "OTP send failed"
    });
  }
};

app.post("/login", loginLimiter, loginHandler);
app.post("/api/login", loginLimiter, loginHandler);

const verifyOtpHandler = (req, res) => {
  const { email, otp } = req.body;
  const normalizedEmail = (email || "").toLowerCase().trim();
  const record = otpStore[normalizedEmail];

  if (!record) {
    return res.json({ success: false, message: "No OTP found" });
  }

  if (Date.now() > record.expires) {
    delete otpStore[normalizedEmail];
    return res.json({ success: false, message: "OTP expired" });
  }

  if (record.otp !== otp) {
    record.attempts += 1;

    if (record.attempts >= MAX_OTP_ATTEMPTS) {
      delete otpStore[normalizedEmail];
      return res.json({
        success: false,
        message: "Too many incorrect attempts. Please log in again."
      });
    }

    return res.json({ success: false, message: "Invalid OTP" });
  }

  const { role } = record;
  delete otpStore[normalizedEmail];

  // Issue a short-lived JWT the frontend attaches to API requests.
  const token = jwt.sign({ email: normalizedEmail, role }, jwtSecret, {
    expiresIn: "8h"
  });

  return res.json({
    success: true,
    role,
    token
  });
};

app.post("/verify-otp", otpLimiter, verifyOtpHandler);
app.post("/api/verify-otp", otpLimiter, verifyOtpHandler);

// Protected resource APIs: any authenticated user can read; writes are limited
// by role. Doctors are managed by admins; patients by admins and reception.
app.use(
  "/api/doctors",
  authenticate,
  requireWriteRole(["admin"]),
  require("./routes/doctorRoutes")
);
app.use(
  "/api/patients",
  authenticate,
  requireWriteRole(["admin", "receptionist"]),
  require("./routes/paitentRoutes")
);

// Only connect to Mongo and start listening when run directly (`node server.js`).
// When imported (e.g. by tests) the app is exported without side effects so the
// test can wire up its own database and drive routes via supertest.
if (require.main === module) {
  connectAndSeed();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
