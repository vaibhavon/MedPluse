const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    diagnosis: {
      type: String
    },
    status: {
      type: String,
      default: "Active"
    },
    lastVisit: {
      type: String
    },
    nextAppointment: {
      type: String
    },
    history: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);