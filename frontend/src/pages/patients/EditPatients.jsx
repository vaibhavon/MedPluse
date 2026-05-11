import { useParams, useNavigate } from "react-router-dom";
import { getPatientById, updatePatient } from "../../utils/patientStorage";
import { useState, useEffect, useMemo } from "react";
import "./patients.css";

export default function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = useMemo(() => getPatientById(id), [id]);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (patient) {
      setForm(patient);
    }
  }, [patient]);

  const handleUpdate = () => {
    if (!form.name || form.age === "" || form.age === null) {
      alert("Name and Age are required");
      return;
    }
    updatePatient(form);
    navigate(`/patients/${id}`);
  };

  if (!patient) {
    return (
      <div className="patients">
        <h2>Edit Patient</h2>
        <p className="error-msg">Patient not found</p>
        <button onClick={() => navigate(-1)} className="cancel">Go Back</button>
      </div>
    );
  }

  if (!form) {
    return <div className="patients"><h2>Loading...</h2></div>;
  }

  return (
    <div className="patients">
      <h2>Edit Patient</h2>

      <div className="patient-form">
        <input 
          placeholder="Full Name"
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})}
        />
        <input 
          placeholder="Age"
          type="number"
          value={form.age} 
          onChange={e => setForm({...form, age: Number(e.target.value)})}
        />
        <input 
          placeholder="Gender"
          value={form.gender} 
          onChange={e => setForm({...form, gender: e.target.value})}
        />
        <input 
          placeholder="Phone"
          value={form.phone} 
          onChange={e => setForm({...form, phone: e.target.value})}
        />
        <input 
          placeholder="Email"
          value={form.email} 
          onChange={e => setForm({...form, email: e.target.value})}
        />
        <textarea 
          placeholder="Diagnosis"
          value={form.diagnosis} 
          onChange={e => setForm({...form, diagnosis: e.target.value})}
        ></textarea>

        <div className="form-actions">
          <button onClick={() => navigate(-1)} className="cancel">Cancel</button>
          <button onClick={handleUpdate} className="save">Update</button>
        </div>
      </div>
    </div>
  );
}
