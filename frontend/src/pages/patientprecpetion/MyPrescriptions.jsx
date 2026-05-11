// src/prescriptions/MyPrescriptions.jsx

import { useState } from "react";
import { prescriptionsData } from "./prescriptionsData";
import PrescriptionCard from "./PrescriptionCard";
import "./prescriptions.css";

const TABS = ["Active", "Completed"];

export default function MyPrescriptions() {
  const [activeTab, setActiveTab] = useState("Active");

  const filtered = prescriptionsData.filter(
    (p) => p.status === activeTab
  );

  return (
    <div className="prescriptions-page">
      {/* Header */}
      <div className="prescriptions-header">
        <h1>My Prescriptions</h1>
        <p>Track your medicines and refills</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="prescriptions-list">
        {filtered.length ? (
          filtered.map((p) => (
            <PrescriptionCard key={p.id} prescription={p} />
          ))
        ) : (
          <div className="empty-state">
            <h3>No prescriptions found</h3>
          </div>
        )}
      </div>
    </div>
  );
}