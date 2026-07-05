import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components-1/TempNavbar.jsx";
import Footer from "./components-1/Footer.jsx";
import ProtectedRoute from "./ProtectedRoute";

import Login from "./pages/auth/login";
import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Appointments from "./pages/appointments/Appointments";
import Billing from "./pages/billing/Billing";
import CreateInvoice from "./pages/billing/CreateInvoice";
import Staff from "./pages/staff/Staff";
import AddStaff from "./pages/staff/addStaff";
import BloodBank from "./pages/blood/BloodBank";
import Donors from "./pages/donors/Donors";
import Inquiry from "./pages/inquiry/Inquiry";
import PatientsLayout from "./pages/patients/PatientsLayout";

import Home from "./pages-1/Home";
import About from "./pages-1/About";
import ServicesPage from "./pages-1/ServicesPage";
import MachineryPage from "./pages-1/MachineryPage";
import DoctorsPage from "./pages-1/DoctorsPage";
import Contact from "./pages-1/Contact";
import DoctorProfile from "./pages-1/DoctorProfile";
import MachineryDetail from "./pages-1/MachineryDetail";
import ServiceDetail from "./pages-1/ServiceDetail";
import BedSystem from "./pages/bedsystem/BedSystem";
import MedicineStock from "./pages/Medicainestock/MedicineStock";
import MachineList from "./pages/Machine/MachineList"
import LabTestPage from "./pages/labtests/LabTestPage"
import ChatBot from "./pages/chatbot/ChatBot";
import Paticentprofile from "./pages/Patientprofile/Paticentprofile";
import MyAppointments from "./pages/Paticentappoin/MyAppointments";
import MyMedicalRecords from "./pages/patientmedicalrecord/MyMedicalRecords";
import MyPrescriptions from "./pages/patientprecpetion/MyPrescriptions";
import NotificationsPanel from "./pages/patientnotifications/NotificationsPanel";
import HealthSummaryCard from "./pages/patienthealthSummary/HealthSummaryCard";
import VitalsTracker from "./pages/Vitals Tracker/vitals/VitalsTracker";

import LabReviewQueue from "./pages/Docterlabreview/LabReviewQueue";
import DoctorVisitTimeline from "./pages/DoctersTimeline/DoctorVisitTimeline";
import SOAPNotesPage from "./pages/soapNotes/SOAPNotesPage";
import DoctorTaskPanel from "./pages/doctorTasks/DoctorTaskPanel";
import TreatmentEffectiveness from "./pages/treatmentTracker/TreatmentEffectiveness";
import "./responsive.css";






function App() {
  const { pathname } = useLocation();
  // The dashboard/ERP shell has its own header + sidebar, so the public
  // marketing navbar and footer are hidden there.
  const hideChrome = pathname.startsWith("/dashboard");

  return (
    <>
      {!hideChrome && <Navbar />}

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetail />} />

        <Route path="/machinery" element={<MachineryPage />} />
        <Route path="/machinery/:id" element={<MachineryDetail />} />

        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="billing" element={<Billing />} />
          <Route path="billing/create" element={<CreateInvoice />} />
          <Route path="patients/*" element={<PatientsLayout />} />
          <Route path="staff" element={<Staff />} />
          <Route path="staff/add" element={<AddStaff />} />
          <Route path="blood-bank" element={<BloodBank />} />
          <Route path="donors" element={<Donors />} />
          <Route path="bedSystem" element={<BedSystem />} />
          <Route path="MedicineStock" element={<MedicineStock />} />
          <Route path="machineList" element={<MachineList />} />
          <Route path="labTestPage" element={<LabTestPage />} />
          <Route path="chatBot" element={<ChatBot />} />
          <Route path="inquiry" element={<Inquiry />} />
          <Route path="Paticentprofile" element={<Paticentprofile />} />
          <Route path="MyAppointments" element={<MyAppointments />} />
          <Route path="MyMedicalRecords" element={<MyMedicalRecords />} />
          <Route path="MyPrescriptions" element={<MyPrescriptions />} />
          <Route path="notificationsPanel" element={<NotificationsPanel />} />
           <Route path="HealthSummaryCard" element={<HealthSummaryCard />} />
           <Route path="vitalsTracker" element={<VitalsTracker />} />

           <Route path="labReviewQueue" element={<LabReviewQueue />} />
           <Route path="doctorVisitTimeline" element={<DoctorVisitTimeline />} />
           <Route path="sOAPNotesPage" element={<SOAPNotesPage />} />
           <Route path="doctorTaskPanel" element={<DoctorTaskPanel />} />
           <Route path="TreatmentEffectiveness" element={< TreatmentEffectiveness/>} />


        </Route>

        <Route path="*" element={<Home />} />

      </Routes>

      {!hideChrome && <Footer />}
    </>
  );
}

export default App;
