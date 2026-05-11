import { Outlet } from "react-router-dom";
import Services from "../components-1/Services";
import "./ServicesPage.css";

export default function ServicesPage() {
  return (
    <section className="services-page">
      <div className="container">
        <h1>Our Medical Services</h1>
        <Services />
        <Outlet />
      </div>
    </section>
  );
}
