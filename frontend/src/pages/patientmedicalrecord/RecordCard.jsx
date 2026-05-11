// src/medicalRecords/RecordCard.jsx

import "./medicalRecords.css";

export default function RecordCard({ record }) {
  return (
    <div className="record-card">
      {/* Left */}
      <div className="record-left">
        <div className={`file-badge ${record.fileType}`}>
          {record.fileType.toUpperCase()}
        </div>

        <div className="record-info">
          <h3>{record.title}</h3>
          <p className="meta">
            {record.type} • {record.doctor}
          </p>
          <p className="date">📅 {record.date}</p>
        </div>
      </div>

      {/* Right */}
      <div className="record-actions">
        <button className="btn preview">Preview</button>
        <a href={record.fileUrl} className="btn download">
          Download
        </a>
      </div>
    </div>
  );
}