import "./MachineCard.css"

function MachineCard({ machine, onDelete, onEdit }) {
  return (
    <div className="machine-card">
      <h3>{machine.name}</h3>

      <p><b>Ward:</b> {machine.ward}</p>

      <p>
        <b>Status:</b>
        <span
          className={
            machine.status === "Working"
              ? "status working"
              : "status due"
          }
        >
          {machine.status}
        </span>
      </p>

      <p><b>Last Service:</b> {machine.lastService}</p>

      <div className="card-action">
        <button onClick={() => onEdit(machine)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(machine.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default MachineCard;
