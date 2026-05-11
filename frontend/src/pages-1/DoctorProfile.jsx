import { useParams } from "react-router-dom";
import "./DoctorProfile.css";
import abhas from "../assets/docter1.jpg"
import vaibhav from "../assets/cocter2.jpg"
import vedant from "../assets/docter3.jpg"

const doctorData = {
  "abhas-pal": {
    name: "Dr. Abhas Pal",
    img: abhas,
    spec: "Cardiologist",
    degree: "MD, DM (Cardiology)",
    experience: "15+ Years",
    about:
      "Dr. Abhas Pal is a senior cardiologist with extensive experience in treating complex heart conditions.",
    services: [
      "Heart Checkups",
      "Angiography",
      "Cardiac Surgery Consultation"
    ],
    timing: "Mon – Sat | 10 AM – 6 PM",

    info: `Dr. Abhas Pal provides advanced cardiac consultation with a strong focus on patient safety and heart health.
He specializes in diagnosing and treating complex cardiovascular and heart rhythm disorders.
His expertise includes preventive cardiology and long-term heart disease management.
Patients receive personalized treatment plans based on modern cardiac diagnostic technology.
He is experienced in performing and guiding procedures like angiography and cardiac evaluation.
Dr. Abhas Pal follows evidence-based medical practices for accurate treatment outcomes.
He believes in educating patients about lifestyle changes for better heart health.
Regular monitoring and follow-up help ensure long-term cardiovascular stability.
Emergency cardiac care consultation is provided when medically required.
Appointments are recommended in advance for smooth and timely consultation.`
  },

  "vaibhav-girdakar": {
    name: "Dr. Vaibhav Giradkar",
    img: vaibhav,
    spec: "Neurologist",
    degree: "MD, DM (Neurology)",
    experience: "12+ Years",
    about:
      "Dr. Vaibhav Giradkar specializes in neurological disorders with a patient-first approach.",
    services: ["Brain Disorders", "Stroke Treatment", "Neuro Diagnostics"],
    timing: "Mon – Fri | 11 AM – 5 PM",
    info: `Dr. Vaibhav Giradkar provides specialized neurological consultation with a patient-first approach.
He focuses on diagnosing and treating complex brain, spine, and nerve disorders.
His expertise includes stroke management and neuro diagnostic evaluation.
Patients receive personalized treatment plans based on advanced neurological testing.
He is experienced in handling both acute and chronic neurological conditions.
Dr. Vaibhav emphasizes early diagnosis for better recovery outcomes.
He guides patients and families through complete neurological care planning.
Regular follow-ups help monitor neurological recovery and stability.
Emergency neurological consultation is provided when medically required.
Appointments are recommended in advance for smooth and timely consultation.`
  },

  "vedant-ankar": {
    name: "Dr. Vedant Ankar",
    img: vedant,
    spec: "Dental Surgeon",
    degree: "BDS, MDS",
    experience: "10+ Years",
    about:
      "Dr. Vedant Ankar is known for advanced dental procedures and patient comfort.",
    services: ["Dental Implants", "Root Canal", "Cosmetic Dentistry"],
    timing: "Mon – Sat | 9 AM – 4 PM",
    info: `Dr. Vedant Ankar provides advanced dental care focused on patient comfort and precision treatment.
He specializes in cosmetic dentistry, dental implants, and root canal procedures.
He uses modern dental technology for accurate and painless treatments.
Patients receive personalized dental treatment plans based on oral health condition.
He is experienced in both preventive and restorative dental procedures.
Dr. Vedant focuses on maintaining long-term oral hygiene and dental health.
He educates patients about proper dental care and hygiene practices.
Regular dental checkups help prevent major dental complications.
Emergency dental consultation is available for urgent dental issues.
Appointments are recommended in advance for proper treatment scheduling.`
  }
};


export default function DoctorProfile() {
  const { id } = useParams();
  const doctor = doctorData[id];

  if (!doctor) {
    return (
      <section className="container">
        <h2>Doctor not found</h2>
      </section>
    );
  }

  return (
    <section className="doctor-profile">
      <div className="container profile-grid">
        <div className="profile-left">
          <div className="profile-avatar">
            <img src={doctor.img} alt={doctor.name} />
          </div>

          <h2>{doctor.name}</h2>
          <p className="spec">{doctor.spec}</p>
          <p>{doctor.degree}</p>
          <p>{doctor.experience}</p>
        </div>

        <div className="profile-right">
          <h3>About Doctor</h3>
          <p>{doctor.about}</p>

          <h3>Services Offered</h3>
          <ul>
            {doctor.services.map((s) => (
              <li key={s}>✔ {s}</li>
            ))}
          </ul>

          <h3>Availability</h3>
          <p>{doctor.timing}</p>

          <h3>Info</h3>
          <p style={{ letterSpacing: "1px" , lineHeight:"20px"}}>
            {doctor.info}
          </p>


        </div>
      </div>
    </section>
  );
}
