import Machinery from "../components-1/Machinery";
import "./MachineryPage.css";
export default function MachineryPage() {
  return (
    <section className="machinery-page">
      <div className="container">
        <h1>Medical Equipment & Machinery</h1>
        <p>
          We use advanced medical equipment to ensure accurate diagnosis
          and effective treatment.
        </p>
        <Machinery />
      </div>
    </section>
  );
}
