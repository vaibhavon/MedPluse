// src/treatmentTracker/TreatmentEffectiveness.jsx

import { useState } from "react";
import "./treatmentTracker.css";

const emptyVitals = {
  weight: "",
  bp: "",
  sugar: "",
  heartRate: "",
  date: ""
};

export default function TreatmentEffectiveness() {
  const [patients, setPatients] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    treatment: "",
    before: { ...emptyVitals },
    after: { ...emptyVitals }
  });

  // ========================
  // helpers
  // ========================

  const parseBP = (bp) => {
    if (!bp.includes("/")) return { s: 0, d: 0 };
    const [s, d] = bp.split("/").map(Number);
    return { s, d };
  };

  const getChange = (beforeVal, afterVal) => {
    if (!beforeVal || !afterVal) return null;
    return afterVal - beforeVal < 0;
  };

  // ========================
  // handlers
  // ========================

  const handlePatientChange = (id) => {
    setSelectedId(id);
    const p = patients.find((x) => x.id === id);
    if (p) setForm(p);
  };

  const handleField = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]:
        typeof prev[section] === "object"
          ? { ...prev[section], [field]: value }
          : value
    }));
  };

  const handleAddOrUpdate = () => {
    if (!form.name) {
      alert("Patient name required");
      return;
    }

    if (selectedId) {
      setPatients((prev) =>
        prev.map((p) =>
          p.id === selectedId ? { ...form, id: selectedId } : p
        )
      );
    } else {
      setPatients((prev) => [
        { ...form, id: Date.now().toString() },
        ...prev
      ]);
    }

    resetForm();
  };

  const resetForm = () => {
    setSelectedId(null);
    setForm({
      name: "",
      treatment: "",
      before: { ...emptyVitals },
      after: { ...emptyVitals }
    });
  };

  // ========================
  // metrics
  // ========================

  const bpBefore = parseBP(form.before.bp);
  const bpAfter = parseBP(form.after.bp);

  const metrics = [
    {
      label: "Weight",
      before: form.before.weight,
      after: form.after.weight
    },
    {
      label: "Sugar",
      before: form.before.sugar,
      after: form.after.sugar
    },
    {
      label: "Heart Rate",
      before: form.before.heartRate,
      after: form.after.heartRate
    },
    {
      label: "BP (Sys)",
      before: bpBefore.s,
      after: bpAfter.s
    }
  ];

  // ========================
  // UI
  // ========================

  return (
    <div className="treat-page">
      <h2>Treatment Effectiveness Tracker</h2>

      {/* ===== Patient Selector ===== */}
      <div className="patient-select">
        <select
          value={selectedId || ""}
          onChange={(e) => handlePatientChange(e.target.value)}
        >
          <option value="">New Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* ===== Patient Info ===== */}
      <div className="form-grid">
        <input
          placeholder="Patient Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          placeholder="Treatment"
          value={form.treatment}
          onChange={(e) =>
            setForm({ ...form, treatment: e.target.value })
          }
        />
      </div>

      {/* ===== BEFORE ===== */}
      <Section
        title="Before Treatment"
        data={form.before}
        onChange={(f, v) => handleField("before", f, v)}
      />

      {/* ===== AFTER ===== */}
      <Section
        title="After Treatment"
        data={form.after}
        onChange={(f, v) => handleField("after", f, v)}
      />

      <div className="actions">
        <button className="btn-save" onClick={handleAddOrUpdate}>
          {selectedId ? "Update Patient" : "Add Patient"}
        </button>

        <button className="btn-reset" onClick={resetForm}>
          Reset
        </button>
      </div>

      {/* ===== RESULT TABLE ===== */}
      <div className="treat-table">
        <div className="treat-row header">
          <div>Metric</div>
          <div>Before</div>
          <div>After</div>
          <div>Status</div>
        </div>

        {metrics.map((m) => {
          const improved = getChange(m.before, m.after);

          return (
            <div key={m.label} className="treat-row">
              <div>{m.label}</div>
              <div>{m.before || "-"}</div>
              <div>{m.after || "-"}</div>

              <div
                className={
                  improved === null
                    ? ""
                    : improved
                    ? "improved"
                    : "worsened"
                }
              >
                {improved === null
                  ? "-"
                  : improved
                  ? "Improved"
                  : "Worsened"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ========================
// Reusable Section
// ========================

function Section({ title, data, onChange }) {
  return (
    <div className="vitals-section">
      <h3>{title}</h3>

      <div className="form-grid">
        <input
          placeholder="Date"
          type="date"
          value={data.date}
          onChange={(e) => onChange("date", e.target.value)}
        />
        <input
          placeholder="Weight"
          value={data.weight}
          onChange={(e) => onChange("weight", e.target.value)}
        />
        <input
          placeholder="BP (120/80)"
          value={data.bp}
          onChange={(e) => onChange("bp", e.target.value)}
        />
        <input
          placeholder="Sugar"
          value={data.sugar}
          onChange={(e) => onChange("sugar", e.target.value)}
        />
        <input
          placeholder="Heart Rate"
          value={data.heartRate}
          onChange={(e) => onChange("heartRate", e.target.value)}
        />
      </div>
    </div>
  );
}