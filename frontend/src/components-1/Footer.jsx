import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* About */}
          <div className="footer-section">
            <h2 className="logo1">
              <span className="logo-white">Med</span>
              <span className="logo-blue">Pulse</span>
            </h2>
            <p className="footer-text">
              Providing exceptional healthcare services with compassion and excellence since 2010.
            </p>

            <div className="social-icons">
              <a href="#"><Facebook size={18} /></a>
              <a href="#"><Twitter size={18} /></a>
              <a href="#"><Instagram size={18} /></a>
              <a href="#"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Services</a></li>
              <li><a href="#">Find a Doctor</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Patient Portal</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3>Our Services</h3>
            <ul>
              <li><a href="#">Emergency Care</a></li>
              <li><a href="#">Cardiology</a></li>
              <li><a href="#">Orthopedics</a></li>
              <li><a href="#">Pediatrics</a></li>
              <li><a href="#">Neurology</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul className="contact-info">
              <li>
                <MapPin size={18} />
                <span>123 Medical Center Dr.<br />New York, NY 10001</span>
              </li>
              <li>
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <Mail size={18} />
                <span>info@medpulse.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          © 2026 MedPulse Hospital. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;