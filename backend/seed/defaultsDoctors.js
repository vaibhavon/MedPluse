const Doctor = require("../models/Doctors");

const defaultDoctors = [
  {
    doctorId: "D001",
    name: "Dr. John Smith",
    specialization: "Cardiologist",
    phone: "+1 (555) 111-2222",
    email: "john.smith@hospital.com",
    department: "Cardiology",
    availability: "Mon-Fri 10AM-4PM",
    experience: 10,
    status: "Active"
  },
  {
    doctorId: "D002",
    name: "Dr. Emma Watson",
    specialization: "Neurologist",
    phone: "+1 (555) 222-3333",
    email: "emma.watson@hospital.com",
    department: "Neurology",
    availability: "Mon-Sat 11AM-5PM",
    experience: 8,
    status: "Active"
  },
  {
    doctorId: "D003",
    name: "Dr. Chris Hemsworth",
    specialization: "Orthopedic",
    phone: "+1 (555) 444-5555",
    email: "chris.h@hospital.com",
    department: "Orthopedics",
    availability: "Tue-Sat 9AM-3PM",
    experience: 12,
    status: "Active"
  }
];

async function seedDoctors() {
  const count = await Doctor.countDocuments();
  if (count === 0) {
    await Doctor.insertMany(defaultDoctors);
    console.log("Default doctors inserted");
  } else {
    console.log("Doctors already exist");
  }
}

module.exports = seedDoctors;
