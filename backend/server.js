const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const seedDoctors = require("./seed/defaultsDoctors");
const seedPatients = require("./seed/defaultPaitents");

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUri =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/medpulse";

const allowedOrigins = (process.env.CORS_ORIGIN || "https://medpluse-2.onrender.com")
  .split(",")
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

const users = [
  { email: "admin@med.com", password: "123", role: "admin" },
  { email: "doctor@med.com", password: "123", role: "doctor" },
  { email: "patient@med.com", password: "123", role: "patient" },
  { email: "reception@med.com", password: "123", role: "receptionist" }
];

const otpStore = {};
const emailPassword = process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD;
const transporter =
  process.env.EMAIL_USER && emailPassword
    ? nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: emailPassword
        }
      })
    : null;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err.message);
  });

mongoose.connection.once("open", async () => {
  try {
    await seedPatients();
    await seedDoctors();
  } catch (error) {
    console.log("Seeding error:", error.message);
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

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
    const { email, password } = req.body;
    const user = users.find(
      (candidate) => candidate.email === email && candidate.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const otp = generateOTP();
    const isProduction = process.env.NODE_ENV === "production";

    otpStore[email] = {
      otp,
      role: user.role,
      expires: Date.now() + 5 * 60 * 1000
    };

    if (transporter) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "MedPulse Login OTP",
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`
      });
    } else if (isProduction) {
      return res.status(500).json({
        success: false,
        message: "Email service is not configured"
      });
    }

    console.log("OTP sent:", otp);

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

app.post("/login", loginHandler);
app.post("/api/login", loginHandler);

const verifyOtpHandler = (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) {
    return res.json({ success: false, message: "No OTP found" });
  }

  if (Date.now() > record.expires) {
    delete otpStore[email];
    return res.json({ success: false, message: "OTP expired" });
  }

  if (record.otp !== otp) {
    return res.json({ success: false, message: "Invalid OTP" });
  }

  const { role } = record;
  delete otpStore[email];

  return res.json({
    success: true,
    role
  });
};

app.post("/verify-otp", verifyOtpHandler);
app.post("/api/verify-otp", verifyOtpHandler);

app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/patients", require("./routes/paitentRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
