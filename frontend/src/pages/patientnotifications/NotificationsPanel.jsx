// src/notifications/NotificationsPanel.jsx

import { useState } from "react";
import { notificationsData } from "./notificationsData";
import NotificationItem from "./NotificationItem";
import "./notifection.css";

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState(notificationsData);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="notifications-page">
      {/* Header */}
      <div className="notifications-header">
        <h1>Notifications</h1>
        {unreadCount > 0 && (
          <span className="unread-badge">
            {unreadCount} new
          </span>
        )}
      </div>

      {/* List */}
      <div className="notifications-list">
        {notifications.map((n) => (
          <NotificationItem
            key={n.id}
            notification={n}
            onRead={markAsRead}
          />
        ))}
      </div>
    </div>
  );
}