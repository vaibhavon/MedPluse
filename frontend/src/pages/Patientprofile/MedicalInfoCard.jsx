import React from 'react';
import './MedicalInfoCard.css';

// Reusable Row Component
function InfoRow({ label, value }) {
  return (
    <div className="info-row">
      <span className="info-label">{label}</span>
      <span className="info-value">{value}</span>
    </div>
  );
}

// Main Card Component
export function MedicalInfoCard() {
  return (
    <div className="info-card">
      <h2 className="info-card-title">Medical Information</h2>

      <div className="info-rows">
        <InfoRow label="Blood Group" value="O+" />
        <InfoRow label="Allergies" value="Penicillin" />
        <InfoRow label="Chronic Disease" value="None" />
        <InfoRow label="Height" value="175 cm" />
        <InfoRow label="Weight" value="72 kg" />
      </div>
    </div>
  );
}

// FIX: This solves the "Uncaught SyntaxError"
export default MedicalInfoCard;