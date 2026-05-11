import "./Machinery.css";
import { Link } from "react-router-dom";

export default function Machinery() {
  const machines = [
    { 
      id: "mri", 
      name: "MRI Scanner", 
      tech: "3.0 Tesla Imaging", 
      img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800",
      tag: "Advanced"
    },
    { 
      id: "ct-scan", 
      name: "CT Scan", 
      tech: "128-Slice Precision", 
      img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800",
      tag: "Available"
    },
    { 
      id: "ventilator", 
      name: "ICU Ventilator", 
      tech: "Advanced Life Support", 
      img: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800",
      tag: "Critical Care"
    }
  ];

  return (
    <section className="machinery-section">
      <div className="container">
        <h2 className="section-title">Advanced Machinery</h2>

        <div className="machine-grid">
          {machines.map((m) => (
            <Link
              to={`/machinery/${m.id}`}
              className="machine-link"
              key={m.id}
            >
              <div className="machine-card">
                <div className="machine-img-container">
                  <img src={m.img} alt={m.name} className="machine-img" />
                  <span className="machine-tag">{m.tag}</span>
                </div>
                <div className="machine-info">
                  <h3>{m.name}</h3>
                  <p>{m.tech}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
