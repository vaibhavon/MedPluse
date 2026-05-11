// src/vitals/VitalsForm.jsx

import { useState } from "react";
import "./vitals.css";

export default function VitalsForm({ onAdd }) {
  const [form, setForm] = useState({
    date: "",
    weight: "",
    bp: "",
    sugar: "",
    heartRate: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.date || !form.weight) {
      alert("Please fill required fields");
      return;
    }

    onAdd(form);

    setForm({
      date: "",
      weight: "",
      bp: "",
      sugar: "",
      heartRate: ""
    });
  };

  return (
    <form className="vitals-form" onSubmit={handleSubmit}>
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <input type="number" name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} required />
      <input type="text" name="bp" placeholder="BP (120/80)" value={form.bp} onChange={handleChange} />
      <input type="number" name="sugar" placeholder="Sugar (mg/dL)" value={form.sugar} onChange={handleChange} />
      <input type="number" name="heartRate" placeholder="Heart Rate (bpm)" value={form.heartRate} onChange={handleChange} />
      <button type="submit">Add Vital</button>
    </form>
  );
}