// src/labReview/LabReviewQueue.jsx

import { useState } from "react";
import { labReportsData } from "./labReportsData";
import LabReportRow from "./LabReportRow";
import ReviewModal from "./ReviewModal";
import "./labReview.css";

const TABS = ["Pending", "Reviewed"];

export default function LabReviewQueue() {
  const [reports, setReports] = useState(labReportsData);
  const [activeTab, setActiveTab] = useState("Pending");
  const [selected, setSelected] = useState(null);

  const updateReport = (updated) => {
    setReports((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
    setSelected(null);
  };

  const filtered = reports.filter((r) => r.status === activeTab);

  return (
    <div className="lab-page">
      <h1>Lab Report Review Queue</h1>

      {/* Tabs */}
      <div className="tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`tab-btn ${activeTab === t ? "active" : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="lab-table">
        {filtered.map((report) => (
          <LabReportRow
            key={report.id}
            report={report}
            onReview={() => setSelected(report)}
          />
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <ReviewModal
          report={selected}
          onClose={() => setSelected(null)}
          onSave={updateReport}
        />
      )}
    </div>
  );
}