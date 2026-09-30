// Demo data for the localStorage-backed modules (appointments, billing, blood
// donors, inquiries) so every role sees a populated dashboard on first login.
//
// seedDemoData() runs once per browser (per DEMO_VERSION). It MERGES by id: demo
// records that are missing get added, anything the user already created or edited
// is left alone. Bump DEMO_VERSION to push new demo records to existing browsers.

import { getAppointments, saveAppointments } from "./appoinmentStorage";
import { getInvoices, saveInvoices } from "./billingStorage";
import { getDonors, saveDonors } from "./bloodStorage";
import { getInquiries, saveInquiries } from "./inquiryStorage";

const SEED_KEY = "medpulse_demo_seed";
const DEMO_VERSION = "2";

const isoDate = (offsetDays) =>
  new Date(Date.now() + offsetDays * 86400000).toISOString().split("T")[0];

/* ---------- Appointments (receptionist / admin) ---------- */

export const demoAppointments = [
  {
    id: "APT001",
    patientName: "Sarah Johnson",
    patientId: "P001",
    doctor: "Dr. Abhas Pal",
    department: "Cardiology",
    date: isoDate(0),
    time: "09:30 AM",
    type: "Consultation",
    status: "Pending"
  },
  {
    id: "APT002",
    patientName: "Emilly Wathson",
    patientId: "P002",
    doctor: "Dr. Vaibhav Giradkar",
    department: "Neurology",
    date: isoDate(0),
    time: "10:30 AM",
    type: "Follow-up",
    status: "In Progress"
  },
  {
    id: "APT003",
    patientName: "Chris Evan",
    patientId: "P003",
    doctor: "Dr. Vikram Patel",
    department: "General Medicine",
    date: isoDate(0),
    time: "11:30 AM",
    type: "Routine Checkup",
    status: "Scheduled"
  },
  {
    id: "APT004",
    patientName: "Robert Downey Jr",
    patientId: "P004",
    doctor: "Dr. Pranay Bhanarkar",
    department: "Cardiology",
    date: isoDate(1),
    time: "02:00 PM",
    type: "Consultation",
    status: "Scheduled"
  },
  {
    id: "APT005",
    patientName: "Steve Romanoff",
    patientId: "P005",
    doctor: "Dr. Vikram Patel",
    department: "General Medicine",
    date: isoDate(2),
    time: "10:00 AM",
    type: "Asthma Review",
    status: "Scheduled"
  },
  {
    id: "APT006",
    patientName: "Nick Jossef",
    patientId: "P006",
    doctor: "Dr. Anjali Sharma",
    department: "Orthopedics",
    date: isoDate(3),
    time: "12:30 PM",
    type: "Physiotherapy Review",
    status: "Scheduled"
  }
];

/* ---------- Invoices (admin) ---------- */

export const demoInvoices = [
  {
    id: "INV-2026-001",
    patientName: "Sarah Johnson",
    patientId: "P001",
    date: "2026-01-05",
    dueDate: "2026-01-20",
    amount: 1250,
    status: "Paid",
    services: ["Cardiac Consultation", "ECG Test"]
  },
  {
    id: "INV-2026-002",
    patientName: "Emilly Wathson",
    patientId: "P002",
    date: "2026-01-06",
    dueDate: "2026-01-21",
    amount: 3450,
    status: "Pending",
    services: ["Hospital Stay", "Medications"]
  },
  {
    id: "INV-2026-003",
    patientName: "Chris Evan",
    patientId: "P003",
    date: "2026-01-08",
    dueDate: "2026-01-23",
    amount: 5200,
    status: "Overdue",
    services: ["HbA1c Test", "Diabetic Consultation", "Insulin Supplies"]
  },
  {
    id: "INV-2026-004",
    patientName: "Robert Downey Jr",
    patientId: "P004",
    date: "2026-01-10",
    dueDate: "2026-01-25",
    amount: 2800,
    status: "Paid",
    services: ["MRI Lumbar Spine", "Physiotherapy Session"]
  },
  {
    id: "INV-2026-005",
    patientName: "Steve Romanoff",
    patientId: "P005",
    date: "2026-01-12",
    dueDate: "2026-01-27",
    amount: 1750,
    status: "Pending",
    services: ["Spirometry Test", "Pulmonologist Consultation"]
  },
  {
    id: "INV-2026-006",
    patientName: "Nick Jossef",
    patientId: "P006",
    date: "2026-01-14",
    dueDate: "2026-01-29",
    amount: 4300,
    status: "Paid",
    services: ["Joint X-Ray", "Orthopedic Consultation", "Pain Medication"]
  }
];

/* ---------- Blood donors (admin) ---------- */

export const demoDonors = [
  {
    id: "DON001",
    name: "Amit Deshmukh",
    age: 29,
    blood: "O+",
    phone: "+91 98220 11223",
    lastDonation: "2026-01-15"
  },
  {
    id: "DON002",
    name: "Sneha Kulkarni",
    age: 34,
    blood: "A+",
    phone: "+91 98230 44556",
    lastDonation: "2025-12-20"
  },
  {
    id: "DON003",
    name: "Rohit Verma",
    age: 41,
    blood: "B+",
    phone: "+91 97650 33221",
    lastDonation: "2026-01-02"
  },
  {
    id: "DON004",
    name: "Pooja Iyer",
    age: 27,
    blood: "AB-",
    phone: "+91 99210 87654",
    lastDonation: "2025-11-30"
  },
  {
    id: "DON005",
    name: "Imran Sheikh",
    age: 38,
    blood: "O-",
    phone: "+91 98900 12345",
    lastDonation: "2026-02-01"
  },
  {
    id: "DON006",
    name: "Nandini Rao",
    age: 31,
    blood: "A-",
    phone: "+91 98110 76543",
    lastDonation: "2025-12-05"
  }
];

/* ---------- Inquiries (admin / receptionist) ---------- */

export const demoInquiries = [
  {
    id: "INQ001",
    name: "Ramesh Patil",
    complaint: "Need details about cardiology appointment timings.",
    status: "New",
    date: "2/18/2026, 10:15:00 AM"
  },
  {
    id: "INQ002",
    name: "Anita Deshpande",
    complaint: "The billing amount looks higher than the estimate I was given.",
    status: "In Progress",
    date: "2/17/2026, 2:40:00 PM"
  },
  {
    id: "INQ003",
    name: "Suresh Kale",
    complaint: "Unable to download my lab report from the portal.",
    status: "Resolved",
    date: "2/16/2026, 9:05:00 AM"
  },
  {
    id: "INQ004",
    name: "Meera Nair",
    complaint: "Do you provide home sample collection for blood tests?",
    status: "New",
    date: "2/18/2026, 11:30:00 AM"
  },
  {
    id: "INQ005",
    name: "Farhan Ali",
    complaint: "Requesting a second opinion for persistent knee pain.",
    status: "In Progress",
    date: "2/15/2026, 4:20:00 PM"
  },
  {
    id: "INQ006",
    name: "Kavita Joshi",
    complaint: "Thank you - my MRI report was delivered on time.",
    status: "Resolved",
    date: "2/14/2026, 1:10:00 PM"
  }
];

/* ---------- Seeding ---------- */

function mergeById(existing, demo) {
  const have = new Set(existing.map((item) => item.id));
  return [...existing, ...demo.filter((item) => !have.has(item.id))];
}

export function seedDemoData() {
  try {
    if (localStorage.getItem(SEED_KEY) === DEMO_VERSION) return;

    saveAppointments(mergeById(getAppointments(), demoAppointments));
    saveInvoices(mergeById(getInvoices(), demoInvoices));
    saveDonors(mergeById(getDonors(), demoDonors));
    saveInquiries(mergeById(getInquiries(), demoInquiries));

    localStorage.setItem(SEED_KEY, DEMO_VERSION);
  } catch {
    // Storage unavailable/corrupt (e.g. private mode): the pages still fall back
    // to the demo arrays exported above when their own storage is empty.
  }
}
