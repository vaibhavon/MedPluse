// src/appointments/AppointmentCard.jsx

import "./appointments.css";

export default function AppointmentCard({ appointment }) {
  const isUpcoming = appointment.status === "Scheduled";

  return (
    <div className="appointment-card">
      {/* Left */}
      <div className="card-left">
        <div className="avatar">
          {appointment.doctor.split(" ")[1]?.[0] || "D"}
        </div>

        <div className="card-info">
          <h3>{appointment.doctor}</h3>
          <p className="reason">{appointment.reason}</p>
          <p className="date">📅 {appointment.date}</p>
        </div>
      </div>

      {/* Right */}
      <div className="card-right">
        <span className={`status ${appointment.status.toLowerCase()}`}>
          {appointment.status}
        </span>

        <button className="btn view">View</button>

        {isUpcoming && (
          <>
            <button className="btn reschedule">Reschedule</button>
            <button className="btn cancel">Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}