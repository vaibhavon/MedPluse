import { useState, useMemo } from "react";
import { medicineData } from "./medicineData";
import AddMedicineForm from "./AddMedicineForm";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Medistock.css";

function MedicineStock() {
  const [medicines, setMedicines] = useState(medicineData);
  const [search, setSearch] = useState("");
  const [showBillForm, setShowBillForm] = useState(false);
  const [selectedMed, setSelectedMed] = useState(null);

  const [billInfo, setBillInfo] = useState({
    patientName: "",
    doctorName: "",
    quantity: 1,
    date: "",
    time: ""
  });

  // 🔍 search filter
  const filtered = useMemo(() => {
    return medicines.filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [medicines, search]);

  // ➕ add medicine
  const addMedicine = (newMed) => {
    setMedicines((prev) => [...prev, { ...newMed, id: Date.now() }]);
  };

  // ❌ delete
  const deleteMedicine = (id) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  // ✏️ reduce stock safely
  const reduceStock = (id) => {
    setMedicines((prev) =>
      prev.map((m) =>
        m.id === id && m.quantity > 0
          ? { ...m, quantity: m.quantity - 1 }
          : m
      )
    );
  };

  // 📅 Check Expiry Status
  const checkExpiryStatus = (date) => {
    const today = new Date();
    const exp = new Date(date);

    // Reset time to midnight so we compare strictly by Day
    today.setHours(0, 0, 0, 0);
    exp.setHours(0, 0, 0, 0);

    // Calculate difference in milliseconds
    const diffTime = exp - today;
    // Convert to days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "EXPIRED";      // Date is in the past
    if (diffDays === 0) return "TODAY";      // Expires exactly today
    if (diffDays <= 30) return "WARNING";    // Less than 30 days left
    return "SAFE";                           // More than 30 days
  };

  // 🧾 form change
  const handleBillChange = (e) => {
    setBillInfo({ ...billInfo, [e.target.name]: e.target.value });
  };

  // 📄 generate PDF
  const generatePDF = () => {
    if (!selectedMed) {
      alert("No medicine selected");
      return;
    }

    const doc = new jsPDF();
    const qty = Number(billInfo.quantity || 0);
    const price = Number(selectedMed.price || 0);
    const total = qty * price;

    // Header
    doc.setFontSize(18);
    doc.text("MedPluse Pharmacy", 14, 15);

    doc.setFontSize(11);
    doc.text(`Patient: ${billInfo.patientName}`, 14, 30);
    doc.text(`Doctor: ${billInfo.doctorName}`, 14, 38);
    doc.text(`Date: ${billInfo.date}`, 140, 30);
    doc.text(`Time: ${billInfo.time}`, 140, 38);

    // Table
    autoTable(doc, {
      startY: 50,
      head: [["Medicine", "Qty", "Price", "Total"]],
      body: [[selectedMed.name, qty, `₹${price}`, `₹${total}`]]
    });

    doc.setFontSize(14);
    doc.text(`Final Amount: ₹${total}`, 14, 90);

    doc.save(`bill_${billInfo.patientName || "patient"}.pdf`);

    setShowBillForm(false);

    // reset form
    setBillInfo({
      patientName: "",
      doctorName: "",
      quantity: 1,
      date: "",
      time: ""
    });
  };

  return (
    <div className="medicine-container">
      <h2>💊 Medicine Stock</h2>

      <AddMedicineForm onAdd={addMedicine} />

      {/* 🔍 Search */}
      <input
        className="search-box"
        placeholder="🔍 Search medicine..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📊 Table */}
      <table className="medicine-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Expiry</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.category}</td>
              <td>{m.quantity}</td>
              <td>₹{m.price}</td>
              <td>{m.expiry}</td>

              {/* STATUS COLUMN */}
              <td>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {/* 1. Low Stock Check */}
                  {m.quantity < 20 && (
                    <span className="tag warning" style={{ backgroundColor: '#ffcc00', color: '#000' }}>
                      Low Stock
                    </span>
                  )}

                  {/* 2. Expiry Check */}
                  {(() => {
                    const status = checkExpiryStatus(m.expiry);
                    if (status === "EXPIRED") return <span className="tag expired">⛔ Expired</span>;
                    if (status === "TODAY") return <span className="tag expired">⛔ Expires Today</span>;
                    if (status === "WARNING") return <span className="tag warning">⚠️ Expiring Soon</span>;
                    return <span className="tag safe">✅ Safe</span>;
                  })()}
                </div>
              </td>

              {/* ACTION BUTTONS */}
              <td>
                <button className="btn use-btn" onClick={() => reduceStock(m.id)}>Use</button>
                <button className="btn delete-btn" onClick={() => deleteMedicine(m.id)}>Delete</button>
                <button 
                  className="btn bill-btn" 
                  onClick={() => {
                    setSelectedMed(m);
                    setShowBillForm(true);
                  }}
                >
                  Bill
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🧾 BILL MODAL */}
      {showBillForm && selectedMed && (
        <div className="bill-modal">
          <h3>🧾 Generate Bill</h3>
          <input name="patientName" placeholder="Patient Name" value={billInfo.patientName} onChange={handleBillChange} />
          <input name="doctorName" placeholder="Doctor Name" value={billInfo.doctorName} onChange={handleBillChange} />
          <input name="quantity" type="number" placeholder="Quantity" value={billInfo.quantity} onChange={handleBillChange} />
          <input name="date" type="date" value={billInfo.date} onChange={handleBillChange} />
          <input name="time" type="time" value={billInfo.time} onChange={handleBillChange} />
          <br />
          <button className="btn bill-btn" onClick={generatePDF}>📄 Download Bill</button>
          <button className="btn delete-btn" onClick={() => setShowBillForm(false)}>❌ Cancel</button>
        </div>
      )}
    </div>
  );
}

export default MedicineStock;