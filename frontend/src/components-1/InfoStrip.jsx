import "./InfoStrip.css";
import { FaClock } from "react-icons/fa6";
import { MdEmergency } from "react-icons/md";
import { PiStethoscope } from "react-icons/pi";
import { IoIosStar } from "react-icons/io";

export default function InfoStrip() {
  const items = [
    { title: "24/7 Care", desc: "Always available", logo: <FaClock />, color: "blue", backgroundColor: "#e3f2fd" },
    { title: "Emergency", desc: "Immediate response", logo: <MdEmergency />, color: "red", backgroundColor: "#ffebee" },
    { title: "100+ Doctors", desc: "Expert professionals", logo: <PiStethoscope />, color: "green", backgroundColor: "#e8f5e9" },
    { title: "4.8 Rating", desc: "Trusted by patients", logo: <IoIosStar />, color: "orange", backgroundColor: "#fffde7" }
  ];

  return (
    <section className="info-strip">
      <div className="container info-grid">
        {items.map((item) => (
          <div className="info-card" key={item.title}>
            {/* Using the logic you started, but with strings for colors */}
            <div 
              className="logo-wrapper"
              style={{ color: item.color, backgroundColor: item.backgroundColor }}
            >
              {item.logo}
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}