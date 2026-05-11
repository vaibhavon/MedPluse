import { useParams } from "react-router-dom";
import "./MachineryDetail.css";

const machineryData = {
  mri: {
    name: "MRI Scanner",
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200",
    description:
      "Magnetic Resonance Imaging (MRI) provides detailed images of organs and tissues using strong magnetic fields.",
    uses: [
      "Brain and spinal cord imaging",
      "Joint and muscle evaluation",
      "Tumor detection",
      "Heart and vascular studies"
    ],
    advantages: [
      "No radiation exposure",
      "High-resolution images",
      "Early disease detection"
    ],
    technology: "3.0 Tesla Advanced Imaging System"
  },

  "ct-scan": {
    name: "CT Scan",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200",
    description:
      "Computed Tomography (CT) scans combine X-ray images from different angles to create cross-sectional views.",
    uses: [
      "Internal injury diagnosis",
      "Cancer detection",
      "Bone fracture analysis"
    ],
    advantages: [
      "Fast scanning",
      "High accuracy",
      "Detailed internal views"
    ],
    technology: "128-Slice Precision Scanner"
  },

  ventilator: {
    name: "ICU Ventilator",
    img: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1200",
    description:
      "Ventilators support breathing for critically ill patients by delivering oxygen directly to the lungs.",
    uses: [
      "Respiratory failure",
      "Post-surgery support",
      "Critical care management"
    ],
    advantages: [
      "Life-saving support",
      "Advanced monitoring",
      "Precise oxygen control"
    ],
    technology: "Advanced Life Support System"
  },

  xray: {
    name: "Digital X-Ray",
    img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200",
    description:
      "Digital X-Ray provides quick imaging using minimal radiation for diagnostic purposes.",
    uses: [
      "Bone fracture detection",
      "Chest examination",
      "Dental imaging"
    ],
    advantages: [
      "Low radiation",
      "Fast results",
      "High clarity"
    ],
    technology: "Low Radiation Digital Imaging"
  }
};

export default function MachineryDetail() {
  const { id } = useParams();
  const machine = machineryData[id];

  if (!machine) {
    return (
      <section className="container">
        <h2>Machinery not found</h2>
      </section>
    );
  }

  return (
    <section className="machinery-detail">
      <div className="container detail-grid">
        <div className="detail-image">
          <img src={machine.img} alt={machine.name} loading="lazy" />
        </div>

        <div className="detail-content">
          <h1>{machine.name}</h1>
          <p className="tech">{machine.technology}</p>

          <h3>Description</h3>
          <p>{machine.description}</p>

          <h3>Uses</h3>
          <ul>
            {machine.uses.map((u) => (
              <li key={u}>✔ {u}</li>
            ))}
          </ul>

          <h3>Advantages</h3>
          <ul>
            {machine.advantages.map((a) => (
              <li key={a}>✔ {a}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
