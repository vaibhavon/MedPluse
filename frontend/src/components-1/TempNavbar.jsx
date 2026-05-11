import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container-head nav-inner">
        <h2 className="logo">Med<span>Pulse</span></h2>

        <ul className="ul-name">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/machinery">Machinery</Link></li>
          <li><Link to="/doctors">Doctors</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <button
          className="primary-btn"
          onClick={() => {
            const section = document.getElementById("appointment");
            section?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Book Appointment
        </button>


        <button className="primary-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </nav>
  );
}
