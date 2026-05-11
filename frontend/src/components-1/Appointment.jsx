import { useState } from "react";
import { FaUser, FaPhoneAlt, FaStethoscope, FaCalendarAlt } from "react-icons/fa";
import { addAppointment } from "../utils/appoinmentStorage";
import "./Appointment.css";

export default function Appointment() {

  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    department: "",
    date: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      id: "APT" + Date.now(),
      patientName: form.patientName,
      patientId: "WEB-" + Date.now().toString().slice(-4),
      doctor: "Not Assigned",
      department: form.department,
      date: form.date,
      time: "10:00 AM",
      type: "Website Booking",
      status: "Pending"
    };

    addAppointment(newAppointment);

    alert("Appointment Booked!");

    setForm({
      patientName: "",
      phone: "",
      department: "",
      date: ""
    });
  };

  return (
    <section id="appointment" className="appointment-section">
      <div className="container-appoinment">
        <div className="appointment-book">

          <div className="appointment-header">
            <h2>Book an Appointment</h2>
          </div>

          <form className="appointment-form" onSubmit={handleSubmit}>

            <input
              placeholder="Full Name"
              value={form.patientName}
              onChange={e => setForm({...form, patientName:e.target.value})}
              required
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={e => setForm({...form, phone:e.target.value})}
              required
            />

            <select
              value={form.department}
              onChange={e => setForm({...form, department:e.target.value})}
              required
            >
              <option value="">Department</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Dental</option>
              <option>Pediatrics</option>
            </select>

            <input
              type="date"
              value={form.date}
              onChange={e => setForm({...form, date:e.target.value})}
              required
            />

            <button className="submit-btn" type="submit">Confirm Appointment</button>

          </form>

        </div>
      </div>
    </section>
  );
}
