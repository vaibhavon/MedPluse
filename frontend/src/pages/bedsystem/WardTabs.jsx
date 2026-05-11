function WardTabs({ selectedWard, setSelectedWard }) {
  const wards = ["ICU", "General", "Emergency"];

  return (
    <div className="ward-tabs">
      {wards.map((ward) => (
        <button
          key={ward}
          className={selectedWard === ward ? "active" : ""}
          onClick={() => setSelectedWard(ward)}
        >
          {ward}
        </button>
      ))}
    </div>
  );
}

export default WardTabs;
