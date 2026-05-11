import "./Contact.css";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
  };

  return (
    <section className="contact">
      <div className="container contact-wrapper">

        {/* LEFT SIDE - CONTACT INFO + FORM */}
        <div className="contact-left">
          <h1>Contact Us</h1>

          <p>📍 Address: Mumbai, India</p>
          <p>📞 Phone: +91 98765 43210</p>
          <p>✉️ Email: Mediplus@hospital.com</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Message" rows="4" required />
            <button type="submit" className="primary-btn">
              Send Message
            </button>
          </form>
        </div>

        <div className="map-container">
          <iframe
            title="Medipulse Hospital Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24967.34707722902!2d72.97305421092524!3d26.235382016580314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418bf12cf13351%3A0x1e4b12fd63e3bacd!2sMedipulse%20Hospital!5e0!3m2!1sen!2sin!4v1770224388149!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </section>
  );
}
