import { useParams } from "react-router-dom";
import "./ServiceDetail.css";

const serviceDetails = {
  cardiology: {
    title: "Cardiology",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200",
    description:
      "Cardiology focuses on diagnosing and treating diseases of the heart and blood vessels.",
    why: [
      "Heart diseases are a leading cause of health complications",
      "Early diagnosis prevents severe conditions",
      "Regular heart checkups improve life expectancy"
    ],
    how: [
      "Advanced cardiac imaging & diagnostics",
      "Experienced cardiologists & surgeons",
      "24/7 emergency cardiac care"
    ]
  },

  neurology: {
    title: "Neurology",
    img: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1200",
    description:
      "Neurology deals with disorders of the brain, spinal cord, and nervous system.",
    why: [
      "Neurological issues affect daily functioning",
      "Early treatment reduces long-term damage"
    ],
    how: [
      "Modern neuro-imaging",
      "Personalized treatment plans",
      "Rehabilitation support"
    ]
  },

  dental: {
    title: "Dental Care",
    img: "https://images.unsplash.com/photo-1606813902919-1e05d4f4e4e5?auto=format&fit=crop&w=1200",
    description:
      "Dental care ensures healthy teeth, gums, and a confident smile.",
    why: [
      "Prevents tooth decay and gum disease",
      "Improves overall oral hygiene"
    ],
    how: [
      "Pain-free procedures",
      "Cosmetic and restorative dentistry",
      "Advanced sterilization protocols"
    ]
  }
};

export default function ServiceDetail() {
  const { id } = useParams();

  // ✅ DEFINE service FIRST
  const service = serviceDetails[id];

  // ✅ GUARD: service may be undefined
  if (!service) {
    return (
      <section className="container">
        <h2>Service not found</h2>
      </section>
    );
  }

  // ✅ SAFE TO USE service BELOW
  return (
    <section className="service-detail">
      <div className="container detail-grid">
        <div className="detail-image">
          <img src={service.img} alt={service.title} loading="lazy"/>
        </div>

        <div className="detail-content">
          <h1>{service.title}</h1>
          <p className="description">{service.description}</p>

          <h3>Why You Need This Service</h3>
          <ul>
            {service.why.map((item) => (
              <li key={item}>✔ {item}</li>
            ))}
          </ul>

          <h3>How We Provide Care</h3>
          <ul>
            {service.how.map((item) => (
              <li key={item}>✔ {item}</li>
            ))}
          </ul>

          <button className="primary-btn">Book Appointment</button>
        </div>
      </div>
    </section>
  );
}
