import Hero from "../components-1/Hero";
import InfoStrip from "../components-1/InfoStrip";
import Services from "../components-1/Services";
import Machinery from "../components-1/Machinery";
import Doctors from "../components-1/Doctors";
import Testimonials from "../components-1/Testimonials";
import Appointment from "../components-1/Appointment";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Hero />
      <InfoStrip />
      <Services />
      <Machinery />
      <Doctors />
      <Testimonials />
      <Appointment />
    </>
  );
}
