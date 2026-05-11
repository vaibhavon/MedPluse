import "./Hero.css";
import heroimg from '../assets/Gemini_Generated_Image_un5pc6un5pc6un5p.png';
import { FaPhoneAlt, FaCalendarCheck } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="hero-tag">Best Medical Service</span>
          <h1>Your Health, <br /><span>Our Priority</span></h1>
          <p>Trusted doctors, modern healthcare technology, and compassionate service available 24/7 for your family.</p>

          <div className="hero-btns">
            <button
              className="primary-btn"
              onClick={() => {
                const section = document.getElementById("appointment");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <FaCalendarCheck /> Book Appointment
            </button>
            <button className="outline-btn">
              <FaPhoneAlt /> Emergency Call
            </button>
          </div>
        </div>

        <div className="hero-imgbox">
          <img src={heroimg} alt="Medical Professional" className="hero-img" />
          {/* Floating decorative elements */}
          <div className="floating-card top-right">
            <span>4.9 ⭐</span>
            <p>Patient Satisfaction</p>
          </div>
          <div className="floating-card bottom-left">
            <span>24/7</span>
            <p>Active Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}