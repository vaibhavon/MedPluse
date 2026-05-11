// src/healthSummary/HealthScoreMeter.jsx

import "./healthSummary.css";

export default function HealthScoreMeter({ score }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getStatus = () => {
    if (score >= 75) return { label: "Good", color: "#16a34a" };
    if (score >= 50) return { label: "Moderate", color: "#f59e0b" };
    return { label: "Poor", color: "#dc2626" };
  };

  const status = getStatus();

  return (
    <div className="score-wrapper">
      <svg width="140" height="140" className="score-svg">
        {/* Background circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="none"
        />

        {/* Progress circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke={status.color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="score-progress"
        />
      </svg>

      <div className="score-center">
        <div className="score-number">{score}</div>
        <div
          className="score-label"
          style={{ color: status.color }}
        >
          {status.label}
        </div>
      </div>
    </div>
  );
}