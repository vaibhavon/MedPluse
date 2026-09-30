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

// Demo patients already being tracked (before / after their treatment)
const demoPatients = [
  {
    id: "t1",
    name: "Sarah Johnson",
    treatment: "Hypertension management",
    before: { date: "2026-01-05", weight: "78", bp: "150/95", sugar: "104", heartRate: "88" },
    after: { date: "2026-02-05", weight: "75", bp: "132/84", sugar: "98", heartRate: "76" }
  },
  {
    id: "t2",
    name: "Chris Evan",
    treatment: "Type 2 diabetes plan",
    before: { date: "2026-01-10", weight: "92", bp: "138/88", sugar: "210", heartRate: "84" },
    after: { date: "2026-02-10", weight: "89", bp: "130/84", sugar: "132", heartRate: "78" }
  },
  {
    id: "t3",
    name: "Robert Downey Jr",
    treatment: "Physiotherapy for back pain",
    before: { date: "2026-01-12", weight: "84", bp: "128/82", sugar: "96", heartRate: "80" },
    after: { date: "2026-02-12", weight: "83", bp: "124/80", sugar: "94", heartRate: "74" }
  },
  {
    id: "t4",
    name: "Steve Romanoff",
    treatment: "Inhaled steroid course",
    before: { date: "2026-01-14", weight: "61", bp: "118/76", sugar: "92", heartRate: "96" },
    after: { date: "2026-02-14", weight: "62", bp: "116/74", sugar: "90", heartRate: "82" }
  },
  {
    id: "t5",
    name: "Nick Jossef",
    treatment: "Arthritis medication",
    before: { date: "2026-01-08", weight: "76", bp: "140/90", sugar: "110", heartRate: "82" },
    after: { date: "2026-02-08", weight: "77", bp: "142/92", sugar: "112", heartRate: "84" }
  },
  {
    id: "t6",
    name: "Emilly Wathson",
    treatment: "Migraine prophylaxis",
    before: { date: "2026-01-08", weight: "58", bp: "112/72", sugar: "90", heartRate: "78" },
    after: { date: "2026-02-08", weight: "58", bp: "110/70", sugar: "88", heartRate: "72" }
  }
];

export default function TreatmentEffectiveness() {
  const [patients, setPatients] = useState(demoPatients);
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