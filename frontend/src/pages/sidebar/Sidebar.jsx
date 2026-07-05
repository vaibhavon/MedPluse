import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { logout } from "../../redux/authSlice";
import medlogo from "../../assets/medLogo.jpg";
import "./Sidebar.css";

export default function Sidebar({ open = false, onClose = () => {} }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ get auth data
  const role = useSelector((state) => state.auth.role);
  const user = useSelector((state) => state.auth.user);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    onClose();
    dispatch(logout());
    navigate("/login");
  };

  /* ================= ROLE MENUS ================= */
  const menuByRole = {
    admin: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/dashboard/staff", label: "Staff" },
      { to: "/dashboard/patients", label: "Patients" },
      { to: "/dashboard/billing", label: "Billing" },
      { to: "/dashboard/blood-bank", label: "Blood Bank" },
      { to: "/dashboard/medicineStock", label: "Medicines" },
      { to: "/dashboard/machineList", label: "Equipments" },
      { to: "/dashboard/donors", label: "Donors" },
      { to: "/dashboard/inquiry", label: "Inquiry" },
    ],

    doctor: [
      { to: "/dashboard/doctorTaskPanel", label: "Doctor Tasks" },
      { to: "/dashboard/MyAppointments", label: "My Appointments" },
      { to: "/dashboard/MyPrescriptions", label: "Prescriptions" },
      { to: "/dashboard/sOAPNotesPage", label: "SOAP Notes" },
      { to: "/dashboard/labReviewQueue", label: "Lab Review" },
      { to: "/dashboard/DoctorVisitTimeline", label: "Visit Timeline" },
      { to: "/dashboard/treatmentEffectiveness", label: "Treatment Tracker" },
    ],

    patient: [
      { to: "/dashboard/Paticentprofile", label: "Patient Profile" },
      { to: "/dashboard/MyAppointments", label: "My Appointments" },
      { to: "/dashboard/MyMedicalRecords", label: "Medical Records" },
      { to: "/dashboard/MyPrescriptions", label: "Prescriptions" },
      { to: "/dashboard/HealthSummaryCard", label: "Health Summary" },
      { to: "/dashboard/vitalsTracker", label: "Vitals Tracker" },
      { to: "/dashboard/notificationsPanel", label: "Notifications" },
    ],

    receptionist: [
      { to: "/dashboard/appointments", label: "Appointments" },
      { to: "/dashboard/patients", label: "Patients" },
      { to: "/dashboard/bedsystem", label: "Room Allotment" },
      { to: "/dashboard/labTestPage", label: "Lab Result" },
     { to: "/dashboard/medicineStock", label: "Medicines" },
      { to: "/dashboard/inquiry", label: "Inquiry" },
    ],
  };

  const menuItems = menuByRole[role] || [];

  /* ================= UI ================= */
  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div>
        {/* ===== Logo ===== */}
        <div className="logo-sidebar">
          <img src={medlogo} alt="MedPulse" />
          <div>
            <h2>MedPulse</h2>
            <span>Hospital ERP</span>
          </div>

          {/* Close button (mobile drawer only) */}
          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* ===== Dynamic Menu ===== */}
        <ul className="menu">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} onClick={onClose}>{item.label}</NavLink>
              </li>
            ))
          ) : (
            <li style={{ padding: "10px", opacity: 0.6 }}>
              No menu available
            </li>
          )}

          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </ul>
      </div>

      {/* ===== Profile ===== */}
      <div className="profile">
        <div className="admin-user">
          {user ? user.slice(0, 2).toUpperCase() : "NA"}
        </div>
        <div>
          <p style={{ textTransform: "capitalize" }}>
            {role || "User"}
          </p>
          <small>{user || "no-email"}</small>
        </div>
      </div>
    </aside>
  );
}