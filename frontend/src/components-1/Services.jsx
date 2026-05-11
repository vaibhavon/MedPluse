import "./Services.css";
import { Link } from "react-router-dom";
import {
  FaHeartbeat,
  FaBrain,
  FaTooth,
  FaBone,
  FaBaby,
  FaStethoscope
} from "react-icons/fa";

export default function Services() {
  const serviceData = [
    {
      id: "cardiology",
      title: "Cardiology",
      desc: "Heart health diagnostics and advanced surgical treatments.",
      logo: <FaHeartbeat />,
      color: "#e91e63",
      bg: "#fce4ec"
    },
    {
      id: "neurology",
      title: "Neurology",
      desc: "Expert care for the brain, spine, and nervous system.",
      logo: <FaBrain />,
      color: "#9c27b0",
      bg: "#f3e5f5"
    },
    {
      id: "dental",
      title: "Dental Care",
      desc: "Comprehensive oral health and cosmetic dentistry services.",
      logo: <FaTooth />,
      color: "#00bcd4",
      bg: "#e0f7fa"
    },
    {
      id: "orthopedics",
      title: "Orthopedics",
      desc: "Treatment for bone fractures, joints, and sports injuries.",
      logo: <FaBone />,
      color: "#ff9800",
      bg: "#fff3e0"
    },
    {
      id: "pediatrics",
      title: "Pediatrics",
      desc: "Specialized medical care for children and adolescents.",
      logo: <FaBaby />,
      color: "#4caf50",
      bg: "#e8f5e9"
    },
    {
      id: "general-medicine",
      title: "General Medicine",
      desc: "Primary healthcare for check-ups and daily wellness.",
      logo: <FaStethoscope />,
      color: "#2196f3",
      bg: "#e3f2fd"
    }
  ];

  return (
    <section className="services-section">
      <div className="container">
        <h2>Our Services</h2>

        <div className="services-grid">
          {serviceData.map((service) => (
            <div key={service.id} className="service-card">
              <div
                className="service-icon"
                style={{
                  color: service.color,
                  backgroundColor: service.bg
                }}
              >
                {service.logo}
              </div>

              <h3>{service.title}</h3>
              <p>{service.desc}</p>

              {/* ✅ ONLY navigation point */}
              <Link
                to={`/services/${service.id}`}
                className="read-more"
                style={{ color: service.color }}
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
