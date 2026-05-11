// src/labReview/ReviewModal.jsx

import { useState } from "react";
import "./labReview.css";

export default function ReviewModal({ report, onClose, onSave }) {
  const [remarks, setRemarks] = useState(report.remarks || "");
  const [abnormal, setAbnormal] = useState(report.abnormal);

  const handleSubmit = () => {
    onSave({
      ...report,
      status: "Reviewed",
      abnormal,
      remarks
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Review Lab Report</h2>

        <p><strong>Patient:</strong> {report.patient}</p>
        <p><strong>Test:</strong> {report.testName}</p>

        <textarea
          placeholder="Add doctor remarks..."
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />

        <label className="checkbox">
          <input
            type="checkbox"
            checked={abnormal}
            onChange={(e) => setAbnormal(e.target.checked)}
          />
          Flag as abnormal
        </label>

        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn save" onClick={handleSubmit}>
            Mark Reviewed
          </button>
        </div>
      </div>
    </div>
  );
}