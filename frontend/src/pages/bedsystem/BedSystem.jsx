import { useState, useMemo } from "react";
import { bedsData } from "./bedData";
import WardTabs from "./WardTabs";
import "./bedsystem.css";

function BedSystem() {
  const [beds, setBeds] = useState(bedsData);
  const [selectedWard, setSelectedWard] = useState("ICU");
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState([]);

  const [patientName, setPatientName] = useState("");
  const [patientGender, setPatientGender] = useState("Male");
  const [doctorName, setDoctorName] = useState("");

  // -------------------------
  // FILTER BEDS
  // -------------------------
  const filteredBeds = useMemo(() => {
    return beds
      .filter(bed => bed.wardType === selectedWard)
      .filter(bed =>
        bed.id.toLowerCase().includes(search.toLowerCase())
      );
  }, [beds, selectedWard, search]);

  // -------------------------
  // CHANGE STATUS MANUALLY
  // -------------------------
  const changeStatus = (id, newStatus) => {
    const updatedBeds = beds.map((bed) =>
      bed.id === id ? { ...bed, status: newStatus } : bed
    );

    setBeds(updatedBeds);

    setLogs(prev => [
      {
        type: "status",
        bedId: id,
        status: newStatus,
        time: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  // -------------------------
  // ASSIGN BED
  // -------------------------
  const assignBed = (id) => {
    if (!patientName || !doctorName) {
      alert("Enter patient and doctor name");
      return;
    }

    const now = new Date().toLocaleString();

    const updatedBeds = beds.map((bed) =>
      bed.id === id
        ? {
            ...bed,
            status: "Occupied",
            patientName,
            gender: patientGender,
            doctorAssigned: doctorName,
            admissionTime: new Date().toISOString(),
          }
        : bed
    );

    setBeds(updatedBeds);

    setLogs(prev => [
      {
        type: "assign",
        bedId: id,
        patient: patientName,
        doctor: doctorName,
        time: now,
      },
      ...prev,
    ]);

    setPatientName("");
    setDoctorName("");
  };

  // -------------------------
  // RELEASE BED
  // -------------------------
  const releaseBed = (id) => {
    const now = new Date().toLocaleString();
    const releasedBed = beds.find(b => b.id === id);

    const updatedBeds = beds.map((bed) =>
      bed.id === id
        ? {
            ...bed,
            status: "Available",
            patientName: null,
            doctorAssigned: null,
            releaseTime: new Date().toISOString(),
          }
        : bed
    );

    setBeds(updatedBeds);

    setLogs(prev => [
      {
        type: "release",
        bedId: id,
        patient: releasedBed?.patientName,
        time: now,
      },
      ...prev,
    ]);
  };

  return (
    <div className="bedsystem-container">
      <h2>Bed & Ward Management</h2>

      <WardTabs
        selectedWard={selectedWard}
        setSelectedWard={setSelectedWard}
      />

      {/* PATIENT FORM */}
      <div className="panel">
        <h4>Add Patient</h4>

        <div className="form-row">
          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />

          <select
            value={patientGender}
            onChange={(e) => setPatientGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            type="text"
            placeholder="Doctor Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </div>
      </div>

      {/* SEARCH */}
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Search Bed ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* BEDS GRID */}
      <div className="beds-grid">
        {filteredBeds.map((bed) => (
          <div key={bed.id} className="bed-card">
            <div className="bed-header">
              <span className="bed-id">{bed.id}</span>

              {/* Manual Status Dropdown */}
              <select
                value={bed.status}
                onChange={(e) =>
                  changeStatus(bed.id, e.target.value)
                }
                className="status-dropdown"
              >
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Cleaning">Cleaning</option>
              </select>
            </div>

            {bed.patientName ? (
              <div className="patient-info">
                <span className="patient-name">{bed.patientName}</span>
                <span className="patient-gender">{bed.gender}</span>

                {bed.doctorAssigned && (
                  <p className="doctor-info">
                    Doctor: {bed.doctorAssigned}
                  </p>
                )}
              </div>
            ) : (
              <span className="empty-text">No Patient</span>
            )}

            <div className="bed-actions">
              {bed.status === "Available" && (
                <button onClick={() => assignBed(bed.id)}>
                  Assign
                </button>
              )}

              {bed.status === "Occupied" && (
                <button onClick={() => releaseBed(bed.id)}>
                  Release
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* LOGS SECTION */}
      <div className="panel">
        <h4>Assignment Log</h4>

        <div className="log-list">
          {logs.map((log, index) => (
            <div key={index} className="log-item">
              {log.type === "assign" && (
                <>🟢 {log.patient} assigned to {log.bedId} (Dr. {log.doctor})</>
              )}
              {log.type === "release" && (
                <>🔴 {log.patient} released from {log.bedId}</>
              )}
              {log.type === "status" && (
                <>⚙ Status of {log.bedId} changed to {log.status}</>
              )}
              <div className="log-time">{log.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BedSystem;
