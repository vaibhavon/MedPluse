const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Demo login accounts. The password is bcrypt-hashed before storage and can be
// overridden per-deployment via DEMO_USER_PASSWORD (defaults to the demo value).
const demoPassword = process.env.DEMO_USER_PASSWORD || "123";

const defaultUsers = [
  { email: "admin@med.com", role: "admin" },
  { email: "doctor@med.com", role: "doctor" },
  { email: "patient@med.com", role: "patient" },
  { email: "reception@med.com", role: "receptionist" }
];

async function seedUsers() {
  const count = await User.countDocuments();
  if (count > 0) {
    console.log("Users already exist");
    return;
  }

  const passwordHash = await bcrypt.hash(demoPassword, 10);
  await User.insertMany(
    defaultUsers.map((user) => ({ ...user, passwordHash }))
  );
  console.log("Default users inserted");
}

module.exports = seedUsers;
