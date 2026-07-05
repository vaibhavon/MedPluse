const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "dev-insecure-jwt-secret-change-me";

// Verifies the Bearer token and attaches the decoded payload to req.user.
function authenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    req.user = jwt.verify(token, jwtSecret);
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Guards mutating requests (POST/PUT/PATCH/DELETE) behind a role allow-list.
// Read requests (GET/HEAD) pass through for any authenticated user.
function requireWriteRole(allowedRoles) {
  const writeMethods = ["POST", "PUT", "PATCH", "DELETE"];

  return (req, res, next) => {
    if (!writeMethods.includes(req.method)) {
      return next();
    }

    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    return next();
  };
}

module.exports = { authenticate, requireWriteRole };
