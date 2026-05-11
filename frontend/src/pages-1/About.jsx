import "./About.css";
import { FaCheckCircle } from "react-icons/fa";

export default function About() {
  return (
    <section className="about">
      <div className="container about-wrapper">
        {/* Top Section: Text & Image */}
        <div className="about-content">
          <span className="subtitle">Welcome to MedPlus</span>
          <h1>We Are Providing Best Medical Care For You</h1>
          <p className="main-desc">
            MedPlus Hospital is committed to providing world-class healthcare
            with compassion, innovation, and trust. Our facility is equipped with 
            the latest medical technology to ensure you receive the best possible treatment.
          </p>

          <div className="about-features">
            <div className="feature"><FaCheckCircle className="icon"/> 24/7 Professional Nursing</div>
            <div className="feature"><FaCheckCircle className="icon"/> Emergency Response Team</div>
            <div className="feature"><FaCheckCircle className="icon"/> Advanced Diagnostic Labs</div>
          </div>

          <div className="mission-vision">
            <div className="mv-item">
              <h3>Our Mission</h3>
              <p>Deliver high-quality, patient-focused medical care.</p>
            </div>
            <div className="mv-item">
              <h3>Our Vision</h3>
              <p>To be a trusted healthcare leader improving lives.</p>
            </div>
          </div>
        </div>

        <div className="about-image-side">
          <div className="image-border"></div>
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600" 
            alt="Doctors in surgery" 
            className="main-about-img"
            loading="lazy"
          />
          <div className="floating-badge">
            <span className="years">15+</span>
            <p>Years Experience</p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Stats */}
      <div className="container">
        <div className="about-stats">
          <div className="stat-card">
            <h3>50,000+</h3>
            <p>Patients Served</p>
          </div>
          <div className="stat-card">
            <h3>100+</h3>
            <p>Expert Doctors</p>
          </div>
          <div className="stat-card">
            <h3>25+</h3>
            <p>Specialized Clinics</p>
          </div>
        </div>
      </div>
    </section>
  );
}