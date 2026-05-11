// src/notifications/NotificationItem.jsx

import "./notifection.css";

const icons = {
  appointment: "📅",
  report: "🧪",
  followup: "🔁",
  medicine: "💊"
};

export default function NotificationItem({ notification, onRead }) {
  return (
    <div
      className={`notification-card ${
        notification.read ? "read" : "unread"
      }`}
      onClick={() => onRead(notification.id)}
    >
      {/* Icon */}
      <div className="notif-icon">
        {icons[notification.type] || "🔔"}
      </div>

      {/* Content */}
      <div className="notif-content">
        <div className="notif-top">
          <h3>{notification.title}</h3>
          <span className="time">{notification.time}</span>
        </div>

        <p className="message">{notification.message}</p>
      </div>

      {/* Unread dot */}
      {!notification.read && (
        <div className="unread-dot" />
      )}
    </div>
  );
}