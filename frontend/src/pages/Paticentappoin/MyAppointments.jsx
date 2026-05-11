// src/appointments/MyAppointments.jsx

import { useState } from "react";
import { appointmentsData } from "./appointmentsData";
import AppointmentCard from "./AppointmentCard";
import "./appointments.css";

const TABS = ["Upcoming", "Completed", "Cancelled"];

export default function MyAppointments() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const filteredAppointments = appointmentsData.filter((appt) => {
    if (activeTab === "Upcoming") return appt.status === "Scheduled";
    if (activeTab === "Completed") return appt.status === "Completed";
    if (activeTab === "Cancelled") return appt.status === "Cancelled";
    return true;
  });

  return (
    <div className="appointments-page">
      {/* Header */}
      <div className="appointments-header">
        <h1>My Appointments</h1>
        <p>Manage your hospital visits</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="appointments-list">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appt) => (
            <AppointmentCard key={appt.id} appointment={appt} />
          ))
        ) : (
          <div className="empty-state">
            <h3>No appointments found</h3>
            <p>You have no appointments in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}