// src/healthSummary/HealthSummaryCard.jsx

import "./healthSummary.css";
import { healthSummary } from "./healthSummaryData";
import HealthScoreMeter from "./HealthScoreMeter";

export default function HealthSummaryCard() {
  return (
    <div className="health-card">
      <div className="health-header">
        <h2>Health Summary</h2>
        <span className="condition-badge">
          {healthSummary.condition}
        </span>
      </div>

      <div className="health-grid">
        
        {/* ⭐ NEW Health Score */}
        <div className="health-item score-card">
          <p className="label">Health Score</p>
          <HealthScoreMeter score={healthSummary.healthScore} />
        </div>

        {/* Last Visit */}
        <div className="health-item">
          <p className="label">Last Visit</p>
          <p className="value">
            {healthSummary.lastVisit.date}
          </p>
          <p className="sub">
            {healthSummary.lastVisit.doctor}
          </p>
          <p className="note">
            {healthSummary.lastVisit.note}
          </p>
        </div>

        {/* Active Medicines */}
        <div className="health-item">
          <p className="label">Active Medicines</p>
          <p className="big-number">
            {healthSummary.activeMedicines}
          </p>
          <p className="sub">Currently prescribed</p>
        </div>

      </div>
    </div>
  );
}