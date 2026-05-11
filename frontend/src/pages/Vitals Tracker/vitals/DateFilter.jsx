// src/vitals/DateFilter.jsx

import "./vitals.css";

export default function DateFilter({ value, onChange }) {
  return (
    <div className="date-filter">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="all">All Time</option>
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
      </select>
    </div>
  );
}