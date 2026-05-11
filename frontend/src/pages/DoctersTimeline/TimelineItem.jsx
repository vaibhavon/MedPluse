// src/doctorTimeline/TimelineItem.jsx

import "./doctorstimline.css";

const typeConfig = {
  visit: { icon: "🩺", color: "blue" },
  prescription: { icon: "💊", color: "green" },
  report: { icon: "🧪", color: "purple" },
  admission: { icon: "🏥", color: "orange" },
  note: { icon: "📝", color: "gray" }
};

export default function TimelineItem({ item }) {
  const config = typeConfig[item.type] || typeConfig.note;

  return (
    <div className="timeline-item">
      {/* Timeline line */}
      <div className="timeline-left">
        <div className={`timeline-icon ${config.color}`}>
          {config.icon}
        </div>
        <div className="timeline-line" />
      </div>

      {/* Content */}
      <div className="timeline-content">
        <div className="timeline-top">
          <h3>{item.title}</h3>
          <span className="date">{item.date}</span>
        </div>

        {item.doctor && (
          <p className="doctor">{item.doctor}</p>
        )}

        {item.note && (
          <p className="note">{item.note}</p>
        )}

        {item.abnormal && (
          <span className="abnormal-badge">
            Abnormal
          </span>
        )}
      </div>
    </div>
  );
}