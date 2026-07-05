import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  MoreVertical,
  Phone,
  Mail,
  Calendar,
  User
} from "lucide-react";

import { apiUrl, authHeaders } from "../../config/api";
import "./Patients.css";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    diagnosis: ""
  });

  // FETCH ALL PATIENTS FROM MONGODB
  const fetchPatients = async () => {
    try {
      const res = await fetch(apiUrl("/api/patients"), {
        headers: { ...authHeaders() }
      });
      const data = await res.json();
      setPatients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // ADD PATIENT TO MONGODB
  const handleSave = async () => {
    if (!form.name || !form.age) {
      alert("Name and age required");
      return;
    }

    try {
      await fetch(apiUrl("/api/patients"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders()
        },
        body: JSON.stringify({
          patientId: "P" + Date.now(),
          ...form,
          age: Number(form.age),
          status: "Active",
          lastVisit: new Date().toISOString().split("T")[0],
          history: []
        })
      });

      fetchPatients();
      setShowModal(false);
      setForm({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        diagnosis: ""
      });
    } catch (error) {
      console.log("Error adding patient:", error);
    }
  };

  // DELETE PATIENT FROM MONGODB
  const handleDelete = async (id) => {
    if (window.confirm("Delete this patient?")) {
      try {
        await fetch(apiUrl(`/api/patients/${id}`), {
          method: "DELETE",
          headers: { ...authHeaders() }
        });
        fetchPatients();
      } catch (error) {
        console.log("Error deleting patient:", error);
      }
    }
  };

  // SEARCH FILTER
  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.patientId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="patients">
      <div className="patients-header">
        <div>
          <h2>Patient Management</h2>
          <p>Manage and track all patient records</p>
        </div>

        <button className="add-btn" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Add Patient
        </button>
      </div>

      <div className="patients-search">
        <Search size={18} />
        <input
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="patients-list">
        {filtered.map((p) => (
          <div className="patient-card" key={p._id}>
            <div className="avatar">
              {p.name.split(" ").map((n) => n[0]).join("")}
            </div>

            <div
              className="patient-info"
              onClick={() => navigate(`/patients/${p._id}`)}
            >
              <div className="top-row">
                <h3>{p.name}</h3>
                <span className="pid">{p.patientId}</span>
                <span className={`status ${p.status.toLowerCase()}`}>
                  {p.status}
                </span>
              </div>

              <div className="details">
                <div><User size={14} /> {p.age} yrs • {p.gender}</div>
                <div><Phone size={14} /> {p.phone}</div>
                <div><Mail size={14} /> {p.email}</div>
                <div><Calendar size={14} /> Last: {p.lastVisit}</div>
              </div>

              <p className="diagnosis">
                <b>Diagnosis:</b> {p.diagnosis}
              </p>

              {p.nextAppointment && (
                <p className="next">Next Appointment: {p.nextAppointment}</p>
              )}
            </div>

            <div className="card-actions">
              <button
                className="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/patients/edit/${p._id}`);
                }}
              >
                Edit
              </button>

              <button
                className="danger"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(p._id);
                }}
              >
                Delete
              </button>

              <MoreVertical />
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Add New Patient</h3>

            <div className="form-grid">
              <input
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                placeholder="Age"
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
              <input
                placeholder="Gender"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              />
              <input
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <textarea
                placeholder="Diagnosis"
                value={form.diagnosis}
                onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
              ></textarea>
            </div>

            <div className="modal-actions">
              <button
                className="cancel"
                onClick={() => {
                  setShowModal(false);
                  setForm({
                    name: "",
                    age: "",
                    gender: "",
                    phone: "",
                    email: "",
                    diagnosis: ""
                  });
                }}
              >
                Cancel
              </button>

              <button className="save" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
