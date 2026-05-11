import './PersonalInfoCard.css';

function InfoRow({ label, value }) {
  return (
    <div className="info-row">
      <span className="info-label">{label}</span>
      <span className="info-value">{value}</span>
    </div>
  );
}

export function PersonalInfoCard() {
  return (
    <div className="info-card">
      {/* Title */}
      <h2 className="info-card-title">Personal Information</h2>

      {/* Info Rows */}
      <div className="info-rows">
        <InfoRow label="Age" value="22" />
        <InfoRow label="Gender" value="Male" />
        <InfoRow label="Phone" value="+91 98765 43210" />
        <InfoRow label="Email" value="rajesh.kumar@mail.com" />
        <InfoRow label="Address" value="Nagpur, Maharashtra" />
      </div>
    </div>
  );
}
export default PersonalInfoCard;