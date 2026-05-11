import "./Testimonials.css";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Pranay Bhanarkar",
      role: "Heart Patient",
      text: "The cardiology department saved my life. The doctors are highly professional and the facilities are world-class.",
      rating: 5,
      img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Neha Singh",
      role: "Maternity",
      text: "Felt safe and well cared for throughout my stay. The nursing staff is incredibly compassionate and attentive.",
      rating: 5,
      img: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <span className="subtitle">Testimonials</span>
          <h2>What Our Patients Say</h2>
        </div>
        
        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.id}>
              <div className="quote-icon"><FaQuoteLeft /></div>
              
              <div className="stars">
                {[...Array(t.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <p>“{t.text}”</p>
              
              <div className="patient-info">
                <img src={t.img} alt={t.name} className="patient-img" />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}