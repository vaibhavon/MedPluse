// src/doctorTasks/DoctorTaskPanel.jsx

import { useDoctorTasks } from "./useDoctorTasks";
import "./doctorstask.css";

export default function DoctorTaskPanel() {
  const { summary, tasks, completeTask } = useDoctorTasks();

  return (
    <div className="task-panel">
      <div className="task-header">
        <h2>Doctor Tasks</h2>
      </div>

      {/* ===== Dynamic Summary ===== */}
      <div className="task-summary">
        <TaskCard label="Pending Reviews" value={summary.pendingReviews} />
        <TaskCard label="Follow-ups Due" value={summary.followUpsDue} />
        <TaskCard label="Notes Pending" value={summary.notesPending} />
        <TaskCard label="Critical Alerts" value={summary.criticalAlerts} />
      </div>

      {/* ===== Task List ===== */}
      <div className="task-list">
        <h3>Recent Tasks</h3>

        {tasks.length === 0 && (
          <div className="empty">All tasks completed 🎉</div>
        )}

        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-text">{task.text}</div>

            <div className="task-right">
              <span className="task-time">{task.time}</span>

              <button
                className="btn-complete"
                onClick={() => completeTask(task.id)}
              >
                ✓
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskCard({ label, value }) {
  return (
    <div className="task-card">
      <div className="task-value">{value}</div>
      <div className="task-label">{label}</div>
    </div>
  );
}