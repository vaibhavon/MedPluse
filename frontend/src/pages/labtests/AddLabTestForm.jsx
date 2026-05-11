import { useState } from "react";
import "./AddLabTestForm.css"

function AddLabTestForm({ onAdd }) {
  const [form, setForm] = useState({
    patientName: "",
    testName: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ patientName: "", testName: "", date: "" });
  };

  return (
    <form className="lab-form" onSubmit={handleSubmit}>
      <input
        placeholder="Patient Name"
        required
        value={form.patientName}
        onChange={(e) =>
          setForm({ ...form, patientName: e.target.value })
        }
      />

      <input
        placeholder="Test Name"
        required
        value={form.testName}
        onChange={(e) =>
          setForm({ ...form, testName: e.target.value })
        }
      />

      <input
        type="date"
        required
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      <button className="addtest" type="submit">Add Test</button>
    </form>
  );
}

export default AddLabTestForm;
