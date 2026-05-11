const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    doctorId: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    specialization: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    department: {
      type: String
    },
    availability: {
      type: String
    },
    experience: {
      type: Number
    },
    status: {
      type: String,
      default: "Active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);