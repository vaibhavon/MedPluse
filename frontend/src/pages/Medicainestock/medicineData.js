// medicineData.js

// Expiry dates are generated relative to today so the demo always shows a mix of
// "Safe", "Expiring Soon" and "Expired" tags.
const inDays = (days) =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

export const medicineData = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Tablet",
    quantity: 120,
    price: 5,
    expiry: inDays(420),
    supplier: "ABC Pharma"
  },
  {
    id: 2,
    name: "Amoxicillin 500mg",
    category: "Capsule",
    quantity: 50,
    price: 12,
    expiry: inDays(300),
    supplier: "MediLife"
  },
  {
    id: 3,
    name: "Cetirizine 10mg",
    category: "Tablet",
    quantity: 12,
    price: 4,
    expiry: inDays(180),
    supplier: "Cipla Health"
  },
  {
    id: 4,
    name: "Metformin 500mg",
    category: "Tablet",
    quantity: 200,
    price: 6,
    expiry: inDays(20),
    supplier: "Sun Pharma"
  },
  {
    id: 5,
    name: "Cough Syrup 100ml",
    category: "Syrup",
    quantity: 60,
    price: 85,
    expiry: inDays(600),
    supplier: "MediLife"
  },
  {
    id: 6,
    name: "Ciprofloxacin Eye Drops",
    category: "Eye Drop",
    quantity: 35,
    price: 135,
    expiry: inDays(-15),
    supplier: "ABC Pharma"
  }
];
