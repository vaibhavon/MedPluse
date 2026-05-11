// src/vitals/VitalsTracker.jsx

import { useState } from "react";
import { initialVitals } from "./vitalsData";
import VitalsForm from "./VitalsForm";
import VitalsHistoryList from "./VitalsHistoryList";
import DateFilter from "./DateFilter";
import "./vitals.css";

export default function VitalsTracker() {
  const [vitals, setVitals] = useState(initialVitals);
  const [range, setRange] = useState("all");

  const addVital = (newVital) => {
    setVitals((prev) => [
      { id: Date.now().toString(), ...newVital },
      ...prev
    ]);
  };

  // 🔥 advanced filtering
  const filteredVitals = vitals.filter((v) => {
    if (range === "7") {
      const days = (Date.now() - new Date(v.date)) / (1000 * 60 * 60 * 24);
      return days <= 7;
    }
    if (range === "30") {
      const days = (Date.now() - new Date(v.date)) / (1000 * 60 * 60 * 24);
      return days <= 30;
    }
    return true;
  });

  return (
    <div className="vitals-page">
      <div className="vitals-header">
        <h1>Vitals Tracker</h1>
      </div>

      <VitalsForm onAdd={addVital} />

      <div className="vitals-toolbar">
        <DateFilter value={range} onChange={setRange} />
      </div>

      <VitalsHistoryList vitals={filteredVitals} />
    </div>
  );
}