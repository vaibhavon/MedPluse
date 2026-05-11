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
    diagnosis: "Hypertension",
    status: "Active",
    lastVisit: "2026-01-05",
    nextAppointment: "2026-01-15",
    history: []
  },
  {
    patientId: "P003",
    name: "Chris Evan",
    age: 45,
    gender: "Male",
    phone: "+1 (555) 123-4567",
    email: "chris@email.com",
    diagnosis: "Hypertension",
    status: "Active",
    lastVisit: "2026-01-05",
    nextAppointment: "2026-01-15",
    history: []
  },
  {
    patientId: "P004",
    name: "Robert Downey Jr",
    age: 45,
    gender: "Male",
    phone: "+1 (555) 123-4567",
    email: "robert@email.com",
    diagnosis: "Hypertension",
    status: "Active",
    lastVisit: "2026-01-05",
    nextAppointment: "2026-01-15",
    history: []
  },
  {
    patientId: "P005",
    name: "Steve Romanoff",
    age: 45,
    gender: "Female",
    phone: "+1 (555) 123-4567",
    email: "steve@email.com",
    diagnosis: "Hypertension",
    status: "Active",
    lastVisit: "2026-01-05",
    nextAppointment: "2026-01-15",
    history: []
  },
  {
    patientId: "P006",
    name: "Nick Jossef",
    age: 45,
    gender: "Male",
    phone: "+1 (555) 123-4567",
    email: "nick@email.com",
    diagnosis: "Hypertension",
    status: "Active",
    lastVisit: "2026-01-05",
    nextAppointment: "2026-01-15",
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
