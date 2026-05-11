// src/vitals/VitalsHistoryList.jsx

import "./vitals.css";

export default function VitalsHistoryList({ vitals }) {
  if (!vitals.length) {
    return <div className="empty">No vitals recorded</div>;
  }

  return (
    <div className="vitals-list">
      {vitals.map((v, index) => (
        <div
          key={v.id}
          className={`vital-card ${index === 0 ? "latest" : ""}`}
        >
          <div className="vital-date">{v.date}</div>

          <div className="vital-grid">
            <span>⚖️ {v.weight} kg</span>
            <span>🩺 {v.bp || "-"}</span>
            <span>🧪 {v.sugar || "-"}</span>
            <span>❤️ {v.heartRate || "-"}</span>
          </div>

          {index === 0 && (
            <span className="latest-badge">Latest</span>
          )}
        </div>
      ))}
    </div>
  );
}