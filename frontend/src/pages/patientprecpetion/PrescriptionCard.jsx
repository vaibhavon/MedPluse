// src/prescriptions/PrescriptionCard.jsx

import "./prescriptions.css";

export default function PrescriptionCard({ prescription }) {
  const isActive = prescription.status === "Active";

  return (
    <div className="prescription-card">
      {/* Left */}
      <div className="prescription-left">
        <div className="pill-icon">💊</div>

        <div className="prescription-info">
          <h3>{prescription.medicine}</h3>

          <p className="meta">
            {prescription.dosage} • {prescription.duration}
          </p>

          <p className="doctor">{prescription.doctor}</p>

          <p className="instructions">
            📝 {prescription.instructions}
          </p>

          {/* Refill reminder */}
          {isActive && prescription.refillDate && (
            <p className="refill">
              🔔 Refill before {prescription.refillDate}
            </p>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="prescription-right">
        <span className={`status ${prescription.status.toLowerCase()}`}>
          {prescription.status}
        </span>

        <a href={prescription.fileUrl} className="btn download">
          Download
        </a>
      </div>
    </div>
  );
}