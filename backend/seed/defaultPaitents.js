const Patient = require("../models/Paitents");

const defaultPatients = [
  {
    patientId: "P001",
    name: "Sarah Johnson",
    age: 45,
    gender: "Female",
    phone: "+1 (555) 123-4567",
    email: "sarah.j@email.com",
    diagnosis: "Hypertension",
    status: "Active",
    lastVisit: "2026-01-05",
    nextAppointment: "2026-01-15",
    history: []
  },
  {
    patientId: "P002",
    name: "Emilly Wathson",
    age: 24,
    gender: "Female",
    phone: "+1 (555) 333-4567",
    email: "emilly.w@email.com",
    diagnosis: "Migraine",
    status: "Active",
    lastVisit: "2026-01-08",
    nextAppointment: "2026-01-22",
    history: []
  },
  {
    patientId: "P003",
    name: "Chris Evan",
    age: 52,
    gender: "Male",
    phone: "+1 (555) 245-8891",
    email: "chris@email.com",
    diagnosis: "Type 2 Diabetes",
    status: "Active",
    lastVisit: "2026-01-10",
    nextAppointment: "2026-01-24",
    history: []
  },
  {
    patientId: "P004",
    name: "Robert Downey Jr",
    age: 58,
    gender: "Male",
    phone: "+1 (555) 610-3342",
    email: "robert@email.com",
    diagnosis: "Lower Back Pain",
    status: "Active",
    lastVisit: "2026-01-12",
    nextAppointment: "2026-01-26",
    history: []
  },
  {
    patientId: "P005",
    name: "Steve Romanoff",
    age: 36,
    gender: "Female",
    phone: "+1 (555) 774-2019",
    email: "steve@email.com",
    diagnosis: "Asthma",
    status: "Active",
    lastVisit: "2026-01-14",
    nextAppointment: "2026-01-28",
    history: []
  },
  {
    patientId: "P006",
    name: "Nick Jossef",
    age: 67,
    gender: "Male",
    phone: "+1 (555) 902-5567",
    email: "nick@email.com",
    diagnosis: "Arthritis",
    status: "Inactive",
    lastVisit: "2025-12-18",
    history: []
  }
];

async function seedPatients() {
  const count = await Patient.countDocuments();
  if (count === 0) {
    await Patient.insertMany(defaultPatients);
    console.log("Default patients inserted");
  } else {
    console.log("Patients already exist");
  }
}

module.exports = seedPatients;
