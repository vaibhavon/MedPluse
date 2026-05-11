// src/doctorTasks/useDoctorTasks.js
import { useEffect, useState } from "react";

/*
  🔥 In real app these would come from:
  - lab reports module
  - appointments module
  - SOAP notes module
*/

const mockModuleData = {
  pendingReviews: 3,
  followUpsDue: 5,
  notesPending: 2,
  criticalAlerts: 1
};

const mockRecentTasks = [
  {
    id: "1",
    text: "Review CBC report — Rahul Sharma",
    time: "10 min ago"
  },
  {
    id: "2",
    text: "Follow-up visit due — Priya Verma",
    time: "30 min ago"
  },
  {
    id: "3",
    text: "Complete SOAP note — Amit Patel",
    time: "1 hour ago"
  }
];

export function useDoctorTasks() {
  const [summary, setSummary] = useState(mockModuleData);
  const [tasks, setTasks] = useState(mockRecentTasks);

  // ⚡ simulated realtime updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSummary((prev) => ({
        ...prev,
        pendingReviews: Math.max(0, prev.pendingReviews),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✅ mark complete
  const completeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    summary,
    tasks,
    completeTask
  };
}