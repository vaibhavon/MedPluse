import Doctors from "../components-1/Doctors";
import "./DoctorsPage.css";
export default function DoctorsPage() {
  return (
    <section className="doctors-page">
      <div className="container">
        <h1>Meet Our Doctors</h1>
        <Doctors />
      </div>
    </section>
  );
}
