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
  },
  {
    patientId: "P007",
    name: "Priya Nair",
    age: 29,
    gender: "Female",
    phone: "+1 (555) 318-2204",
    email: "priya.nair@email.com",
    diagnosis: "Anemia",
    status: "Active",
    lastVisit: "2026-01-16",
    nextAppointment: "2026-01-30",
    history: []
  },
  {
    patientId: "P008",
    name: "Arjun Mehta",
    age: 41,
    gender: "Male",
    phone: "+1 (555) 427-9915",
    email: "arjun.mehta@email.com",
    diagnosis: "Wrist Fracture",
    status: "Active",
    lastVisit: "2026-01-17",
    nextAppointment: "2026-01-31",
    history: []
  },
  {
    patientId: "P009",
    name: "Kavita Joshi",
    age: 47,
    gender: "Female",
    phone: "+1 (555) 536-1180",
    email: "kavita.joshi@email.com",
    diagnosis: "Hypothyroidism",
    status: "Active",
    lastVisit: "2026-01-18",
    nextAppointment: "2026-02-01",
    history: []
  },
  {
    patientId: "P010",
    name: "Suresh Nair",
    age: 55,
    gender: "Male",
    phone: "+1 (555) 645-7723",
    email: "suresh.nair@email.com",
    diagnosis: "Coronary Artery Disease",
    status: "Active",
    lastVisit: "2026-01-19",
    nextAppointment: "2026-02-02",
    history: []
  },
  {
    patientId: "P011",
    name: "Neha Kapoor",
    age: 33,
    gender: "Female",
    phone: "+1 (555) 754-3369",
    email: "neha.kapoor@email.com",
    diagnosis: "PCOS",
    status: "Active",
    lastVisit: "2026-01-20",
    nextAppointment: "2026-02-03",
    history: []
  },
  {
    patientId: "P012",
    name: "Amit Patel",
    age: 39,
    gender: "Male",
    phone: "+1 (555) 863-5502",
    email: "amit.patel@email.com",
    diagnosis: "High Cholesterol",
    status: "Active",
    lastVisit: "2026-01-21",
    nextAppointment: "2026-02-04",
    history: []
  },
  {
    patientId: "P013",
    name: "Rahul Sharma",
    age: 31,
    gender: "Male",
    phone: "+1 (555) 972-6648",
    email: "rahul.sharma@email.com",
    diagnosis: "Gastritis",
    status: "Active",
    lastVisit: "2026-01-22",
    nextAppointment: "2026-02-05",
    history: []
  },
  {
    patientId: "P014",
    name: "Priya Verma",
    age: 26,
    gender: "Female",
    phone: "+1 (555) 281-4471",
    email: "priya.verma@email.com",
    diagnosis: "Iron Deficiency",
    status: "Active",
    lastVisit: "2026-01-23",
    nextAppointment: "2026-02-06",
    history: []
  },
  {
    patientId: "P015",
    name: "Vijay Rao",
    age: 62,
    gender: "Male",
    phone: "+1 (555) 390-8836",
    email: "vijay.rao@email.com",
    diagnosis: "Chronic Kidney Disease",
    status: "Active",
    lastVisit: "2026-01-24",
    nextAppointment: "2026-02-07",
    history: []
  },
  {
    patientId: "P016",
    name: "Simran Kaur",
    age: 34,
    gender: "Female",
    phone: "+1 (555) 409-2257",
    email: "simran.kaur@email.com",
    diagnosis: "Antenatal Care",
    status: "Inactive",
    lastVisit: "2025-12-22",
    history: []
  }
];

// Inserts any demo patient that is not there yet (matched by patientId) and leaves
// existing records untouched, so databases seeded earlier also get new demo data.
async function seedPatients() {
  const result = await Patient.bulkWrite(
    defaultPatients.map((patient) => ({
      updateOne: {
        filter: { patientId: patient.patientId },
        update: { $setOnInsert: patient },
        upsert: true
      }
    }))
  );

  console.log(
    `Demo patients: ${result.upsertedCount} added, ${
      defaultPatients.length - result.upsertedCount
    } already present`
  );
}

module.exports = seedPatients;
