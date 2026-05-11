// src/medicalRecords/MyMedicalRecords.jsx

import { useState } from "react";
import { recordsData } from "./recordsData";
import RecordCard from "./RecordCard";
import "./medicalRecords.css";

export default function MyMedicalRecords() {
  const [sortOrder, setSortOrder] = useState("latest");

  const sortedRecords = [...recordsData].sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    return sortOrder === "latest" ? db - da : da - db;
  });

  return (
    <div className="records-page">
      {/* Header */}
      <div className="records-header">
        <h1>My Medical Records</h1>

        <select
          className="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* List */}
      <div className="records-list">
        {sortedRecords.map((record) => (
          <RecordCard key={record.id} record={record} />
        ))}
      </div>
    </div>
  );
}