import "./Doctors.css";
import { Link } from "react-router-dom";
import doc1 from '../assets/docter1.jpg'
import doc2 from '../assets/cocter2.jpg'
import doc3 from '../assets/docter3.jpg'

export default function Doctors() {
  const doctors = [
    {
      id: "abhas-pal",
      name: "Dr. Abhas Pal",
      spec: "Cardiologist",
      exp: "15+ Years Experience",
      degree: "MD, DM (Cardiology)",
      availability: "Mon – Sat | 10 AM – 6 PM",
        img :doc1
    },
    {
      id: "vaibhav-girdakar",
      name: "Dr. Vaibhav Giradkar",
      spec: "Neurologist",
      exp: "12+ Years Experience",
      degree: "MD, DM (Neurology)",
      availability: "Mon – Fri | 11 AM – 5 PM",
      img :doc2
    },
    {
      id: "vedant-ankar",
      name: "Dr. Vedant Ankar",
      spec: "Dental Surgeon",
      exp: "10+ Years Experience",
      degree: "BDS, MDS",
      availability: "Mon – Sat | 9 AM – 4 PM",
        img :doc3
    }
  ];

  return (
    <section className="doctors-section">
      <div className="container">
        <div className="doctors-header">
          <h2>Meet Our Specialists</h2>
          <p>
            Our team of experienced and compassionate doctors is dedicated to
            providing the highest quality healthcare.
          </p>
        </div>

        <div className="doctor-grid">
          {doctors.map((d) => (
            <div className="doctor-card" key={d.id}>
              <div className="avatar-wrapper">
                <div className="avatar"><img src={d.img} alt="" className="avtimg" /></div>
                <span className="badge">⭐ 5.0</span>
              </div>

              <h3>{d.name}</h3>
              <p className="spec">{d.spec}</p>

              <div className="doctor-info">
                <p>{d.degree}</p>
                <p>{d.exp}</p>
                <p className="availability">{d.availability}</p>
              </div>

              <div className="doctor-actions">
                <Link to={`/doctors/${d.id}`} className="profile-btn">
                  View Profile
                </Link>
                <button className="doctor-btn">Book Appointment</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
