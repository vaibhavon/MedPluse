import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const bookAppointment = () => {
    close();
    const section = document.getElementById("appointment");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const goToLogin = () => {
    close();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container-head nav-inner">
        <h2 className="logo">Med<span>Pulse</span></h2>

        <button
          className="nav-toggle"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <ul className={`ul-name ${open ? "open" : ""}`}>
          <li><Link to="/" onClick={close}>Home</Link></li>
          <li><Link to="/about" onClick={close}>About</Link></li>
          <li><Link to="/services" onClick={close}>Services</Link></li>
          <li><Link to="/machinery" onClick={close}>Machinery</Link></li>
          <li><Link to="/doctors" onClick={close}>Doctors</Link></li>
          <li><Link to="/contact" onClick={close}>Contact</Link></li>

          {/* Actions shown inside the dropdown on mobile */}
          <li className="nav-menu-actions">
            <button className="primary-btn" onClick={bookAppointment}>
              Book Appointment
            </button>
            <button className="primary-btn" onClick={goToLogin}>
              Login
            </button>
          </li>
        </ul>

        {/* Actions shown inline on desktop */}
        <div className="nav-actions">
          <button className="primary-btn" onClick={bookAppointment}>
            Book Appointment
          </button>
          <button className="primary-btn" onClick={goToLogin}>
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
