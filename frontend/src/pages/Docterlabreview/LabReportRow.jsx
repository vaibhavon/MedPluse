// src/labReview/LabReportRow.jsx

import "./labReview.css";

export default function LabReportRow({ report, onReview }) {
  return (
    <div className="lab-row">
      <div>
        <strong>{report.patient}</strong>
        <p className="sub">{report.testName}</p>
      </div>

      <div>{report.date}</div>

      <div>
        <span className={`status ${report.status.toLowerCase()}`}>
          {report.status}
        </span>
      </div>

      <button className="btn review" onClick={onReview}>
        Review
      </button>
    </div>
  );
}