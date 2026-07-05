import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "../pages/sidebar/Sidebar";
import "./MainLayout.css";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="layout">
      {/* Mobile-only bar with the menu trigger (hidden on desktop) */}
      <header className="mobile-topbar">
        <button
          className="hamburger"
          onClick={openSidebar}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <span className="mobile-topbar-title">MedPulse</span>
      </header>

      {/* Dimmed backdrop shown while the drawer is open on mobile */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={closeSidebar}
      />

      <Sidebar open={sidebarOpen} onClose={closeSidebar} />

      <main className="layout-content">
        <Outlet />   {/* All pages render here */}
      </main>
    </div>
  );
}
