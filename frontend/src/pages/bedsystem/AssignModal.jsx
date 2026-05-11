import { useState, useEffect } from "react";

function AssignModal({ wardType, suggestBed, onClose, onConfirm }) {
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("Male");
  const [suggested, setSuggested] = useState(null);

  useEffect(() => {
    const bed = suggestBed(gender, wardType);
    setSuggested(bed);
  }, [gender]);

  const handleSubmit = () => {
    if (!patientName) return alert("Enter patient name");
    if (!suggested) return alert("No suitable bed available");

    onConfirm(suggested.id, patientName, gender);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Auto Assign Bed</h3>

        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <p>
          Suggested Bed:{" "}
          {suggested ? suggested.id : "No Bed Available"}
        </p>

        <div className="modal-buttons">
          <button onClick={handleSubmit}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AssignModal;
