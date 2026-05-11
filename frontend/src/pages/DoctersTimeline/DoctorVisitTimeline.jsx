// src/doctorTimeline/DoctorVisitTimeline.jsx

import { timelineData } from "./timelineData";
import TimelineItem from "./TimelineItem";
import "./doctorstimline.css";

export default function DoctorVisitTimeline() {
  const sorted = [...timelineData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="timeline-page">
      <div className="timeline-header">
        <h1>Patient Medical Timeline</h1>
        <p>Complete clinical history overview</p>
      </div>

      <div className="timeline-container">
        {sorted.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}