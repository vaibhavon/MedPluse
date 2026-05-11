function BedCard({ bed, onRelease }) {
  return (
    <div className="bed-card">
      <div className="bed-header">
        <div>
          <span className="bed-id">{bed.id}</span>
          <p className="bed-floor">Floor: {bed.floor}</p>
        </div>

        <span className={`status-badge ${bed.status.toLowerCase()}`}>
          <select
  value={bed.status}
  onChange={(e) => onStatusChange(bed.id, e.target.value)}
  className="status-dropdown"
>
  <option value="Available">Available</option>
  <option value="Occupied">Occupied</option>
  <option value="Cleaning">Cleaning</option>
</select>

        </span>
      </div>

      {bed.patientName ? (
        <div className="patient-info">
          <span className="patient-name">{bed.patientName}</span>
          <span className="patient-gender">{bed.gender}</span>

          {bed.severity && (
            <span className={`severity-badge ${bed.severity.toLowerCase()}`}>
              {bed.severity}
            </span>
          )}

          {bed.doctorAssigned && (
            <p className="doctor-info">
              Doctor: {bed.doctorAssigned}
            </p>
          )}
        </div>
      ) : (
        <div className="patient-info">
          <span className="empty-text">No Patient Assigned</span>
        </div>
      )}
      {bed.doctorAssigned && (
  <p className="doctor-info">
    Doctor: {bed.doctorAssigned}
  </p>
)}
      <div className="bed-actions">
        {bed.status === "Occupied" && (
          <button onClick={() => onRelease(bed.id)}>
            Release Bed
          </button>
        )}
      </div>
    </div>
  );
}

export default BedCard;
