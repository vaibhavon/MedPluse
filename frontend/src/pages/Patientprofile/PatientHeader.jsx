import './PatientHeader.css';

export default function PatientHeader() {
  return (
    <div className="patient-header">
      {/* Avatar */}
      <img 
        src="https://images.unsplash.com/photo-1758691463626-0ab959babe00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwYXRpZW50JTIwcG9ydHJhaXQlMjBkb2N0b3J8ZW58MXx8fHwxNzcyMTczNTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Patient Avatar"
        className="patient-avatar"
      />
      
      {/* Patient Info */}
      <div className="patient-info">
        <h1 className="patient-name">Rajesh Kumar</h1>
        <p className="patient-id">Patient ID: #MED2024567</p>
      </div>

      {/* Status Badge */}
      <div className="status-badge">
        <span className="status-badge-text">Active</span>
      </div>
    </div>
  );
}
