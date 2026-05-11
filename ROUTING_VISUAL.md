# 🗺️ MedPulse - Visual Architecture & Routing Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       CLIENT BROWSER                             │
│                  (http://localhost:5173)                         │
└─────────────────────────────────────────────────────────────────┘
                              ↕ (React Router)
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Vite + React)                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Pages:                                                    │  │
│  │  ├─ Public: Home, About, Services, Doctors, Contact      │  │
│  │  ├─ Auth: Login                                           │  │
│  │  └─ Protected: Dashboard, Appointments, Staff, etc.      │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Components & State:                                      │  │
│  │  ├─ Components: Navbar, Footer, Sidebar                  │  │
│  │  └─ Redux: State Management                              │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕ (Axios + Proxy)
                         /api/* requests
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                VITE PROXY (Dev Server)                           │
│            (Forwards /api → http://localhost:5000)              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND (Express.js)                           │
│                  (http://localhost:5000)                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  API Routes:                                              │  │
│  │  ├─ /api/doctors → doctorRoutes.js                        │  │
│  │  └─ /api/patients → paitentRoutes.js                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Middleware:                                              │  │
│  │  ├─ CORS Configuration                                    │  │
│  │  ├─ JSON Parser                                           │  │
│  │  └─ Error Handling                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│               DATABASE (MongoDB)                                 │
│          (mongodb://localhost:27017/medpulse)                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Collections:                                             │  │
│  │  ├─ doctors (Schema: Doctors.js)                         │  │
│  │  └─ patients (Schema: Paitents.js)                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Frontend Routing Tree

```
/ (Home - pages-1/Home.jsx)
│
├─ Public Routes (No auth required)
│  ├─ /about → pages-1/About.jsx
│  ├─ /services → pages-1/ServicesPage.jsx
│  │  └─ /service/:id → pages-1/ServiceDetail.jsx
│  ├─ /machinery → pages-1/MachineryPage.jsx
│  │  └─ /machinery/:id → pages-1/MachineryDetail.jsx
│  ├─ /doctors → pages-1/DoctorsPage.jsx
│  │  └─ /doctor/:id → pages-1/DoctorProfile.jsx
│  └─ /contact → pages-1/Contact.jsx
│
├─ Auth Routes (No auth required)
│  └─ /login → pages/auth/login.jsx
│
└─ Protected Routes (Authentication Required)
   │
   ├─ /dashboard → pages/Dashboard/Dashboard.jsx
   │
   ├─ Patient Routes (role: patient)
   │  ├─ /appointments → pages/appointments/Appointments.jsx
   │  ├─ /my-appointments → pages/Paticentappoin/MyAppointments.jsx
   │  ├─ /profile → pages/Patientprofile/Paticentprofile.jsx
   │  ├─ /medical-records → pages/patientmedicalrecord/MyMedicalRecords.jsx
   │  ├─ /prescriptions → pages/patientprecpetion/MyPrescriptions.jsx
   │  ├─ /notifications → pages/patientnotifications/NotificationsPanel.jsx
   │  ├─ /health-summary → pages/patienthealthSummary/HealthSummaryCard.jsx
   │  └─ /vitals → pages/Vitals Tracker/vitals/VitalsTracker.jsx
   │
   ├─ Doctor Routes (role: doctor)
   │  ├─ /lab-review → pages/Docterlabreview/LabReviewQueue.jsx
   │  ├─ /visit-timeline → pages/DoctersTimeline/DoctorVisitTimeline.jsx
   │  ├─ /soap-notes → pages/soapNotes/SOAPNotesPage.jsx
   │  ├─ /tasks → pages/doctorTasks/DoctorTaskPanel.jsx
   │  └─ /treatment-effectiveness → pages/treatmentTracker/TreatmentEffectiveness.jsx
   │
   ├─ Admin Routes (role: admin)
   │  ├─ /staff → pages/staff/Staff.jsx
   │  ├─ /staff/add → pages/staff/addStaff.jsx
   │  ├─ /billing → pages/billing/Billing.jsx
   │  ├─ /billing/invoice → pages/billing/CreateInvoice.jsx
   │  ├─ /blood-bank → pages/blood/BloodBank.jsx
   │  ├─ /donors → pages/donors/Donors.jsx
   │  ├─ /inquiry → pages/inquiry/Inquiry.jsx
   │  ├─ /patients → pages/patients/PatientsLayout.jsx
   │  ├─ /bed-system → pages/bedsystem/BedSystem.jsx
   │  ├─ /medicine-stock → pages/Medicainestock/MedicineStock.jsx
   │  ├─ /machines → pages/Machine/MachineList.jsx
   │  └─ /lab-tests → pages/labtests/LabTestPage.jsx
   │
   └─ General Routes
      └─ /chatbot → pages/chatbot/ChatBot.jsx
```

## Backend API Routing Tree

```
http://localhost:5000
│
├─ Health Check
│  └─ GET / → Server Running Message
│
├─ Doctors API (/api/doctors)
│  ├─ GET /api/doctors → Get all doctors
│  ├─ GET /api/doctors/:id → Get one doctor
│  ├─ POST /api/doctors → Create doctor
│  ├─ PUT /api/doctors/:id → Update doctor
│  └─ DELETE /api/doctors/:id → Delete doctor
│
├─ Patients API (/api/patients)
│  ├─ GET /api/patients → Get all patients
│  ├─ GET /api/patients/:id → Get one patient
│  ├─ POST /api/patients → Create patient
│  ├─ PUT /api/patients/:id → Update patient
│  └─ DELETE /api/patients/:id → Delete patient
│
└─ [Additional routes can be added here]
```

## Data Flow Example: Get All Doctors

```
User clicks "View Doctors" in React Component
              ↓
Component calls: axios.get('/api/doctors')
              ↓
Vite Dev Server intercepts '/api' request
              ↓
Proxied to: http://localhost:5000/api/doctors
              ↓
Express receives GET /api/doctors
              ↓
Routes to: routes/doctorRoutes.js
              ↓
Route handler: router.get("/", async (req, res) => {...})
              ↓
Query MongoDB using: Doctor.find()
              ↓
MongoDB returns all doctor documents
              ↓
Express sends JSON response: res.json(doctors)
              ↓
Vite Dev Server returns to browser
              ↓
React receives data
              ↓
Component updates state (Redux or useState)
              ↓
UI re-renders with doctor data
```

## File Organization Flow

```
Frontend Directory Structure
────────────────────────────
frontend/src/
│
├─ pages/                        (Protected application pages)
│  ├─ appointments/
│  ├─ auth/
│  ├─ bedsystem/
│  ├─ billing/
│  ├─ blood/
│  ├─ chatbot/
│  ├─ Dashboard/
│  ├─ Docterlabreview/
│  ├─ DoctersTimeline/
│  ├─ doctorTasks/
│  ├─ donors/
│  ├─ inquiry/
│  ├─ labtests/
│  ├─ Machine/
│  ├─ Medicainestock/
│  ├─ Paticentappoin/
│  ├─ patienthealthSummary/
│  ├─ patientmedicalrecord/
│  ├─ patientnotifications/
│  ├─ patientprecpetion/
│  ├─ Patientprofile/
│  ├─ patients/
│  ├─ sidebar/
│  ├─ soapNotes/
│  ├─ staff/
│  ├─ treatmentTracker/
│  └─ Vitals Tracker/
│
├─ pages-1/                      (Public website pages)
│  ├─ Home.jsx
│  ├─ About.jsx
│  ├─ ServicesPage.jsx
│  ├─ MachineryPage.jsx
│  ├─ DoctorsPage.jsx
│  ├─ Contact.jsx
│  ├─ DoctorProfile.jsx
│  ├─ MachineryDetail.jsx
│  └─ ServiceDetail.jsx
│
├─ components-1/                 (Reusable components)
│  ├─ Navbar.jsx
│  ├─ Footer.jsx
│  ├─ Appointment.jsx
│  ├─ Doctors.jsx
│  ├─ Services.jsx
│  ├─ Machinery.jsx
│  ├─ Hero.jsx
│  ├─ InfoStrip.jsx
│  ├─ Testimonials.jsx
│  └─ [CSS files for each]
│
├─ layout/                       (Layout components)
│  └─ MainLayout.jsx
│
├─ redux/                        (State management)
│  ├─ store.jsx
│  ├─ authSlice.jsx
│  └─ ErpCrmSlice.jsx
│
├─ utils/                        (Helper functions)
│  ├─ appoinmentStorage.js
│  ├─ billingStorage.js
│  ├─ bloodStorage.js
│  ├─ inquiryStorage.js
│  ├─ patientStorage.js
│  └─ staffStorage.js
│
├─ config/                       (Configuration)
│
├─ assets/                       (Images, icons)
│
├─ App.jsx                       (Main app)
├─ main.jsx                      (Entry point)
├─ ProtectedRoute.jsx            (Route protection)
│
└─ [CSS files]

Backend Directory Structure
────────────────────────────
backend/
│
├─ models/                       (MongoDB Schemas)
│  ├─ Doctors.js
│  ├─ Paitents.js
│  └─ [Add more as needed]
│
├─ routes/                       (API Endpoints)
│  ├─ doctorRoutes.js
│  ├─ paitentRoutes.js
│  └─ [Add more as needed]
│
├─ seed/                         (Database seeding)
│  ├─ defaultsDoctors.js
│  ├─ defaultPaitents.js
│  └─ seedDatabase.js
│
├─ server.js                     (Main server file)
├─ .env                          (Environment variables)
├─ .env.example                  (Template)
│
└─ package.json
```

## Request Flow Diagram

```
Browser Request
     ↓
[http://localhost:5173/api/doctors]
     ↓
Vite Dev Server (Port 5173)
     ├─ Checks if path starts with /api
     ├─ Matches proxy config: /api → http://localhost:5000
     └─ Forwards to backend
     ↓
Express Server (Port 5000)
     ├─ Parses request with middleware
     ├─ Checks CORS origin
     ├─ Routes to appropriate handler
     └─ (GET /api/doctors → doctorRoutes.js)
     ↓
Route Handler (doctorRoutes.js)
     ├─ Receives request
     ├─ Calls Doctor.find()
     └─ Executes database query
     ↓
MongoDB
     ├─ Queries doctors collection
     └─ Returns document array
     ↓
Route Handler
     ├─ Formats response
     └─ Sends JSON: res.json(doctors)
     ↓
Express Server
     └─ Returns HTTP 200 with JSON
     ↓
Vite Dev Server
     └─ Proxies response back
     ↓
Browser receives JSON
     ├─ Axios resolves promise
     └─ React component receives data
     ↓
React State Updated
     ├─ Component re-renders
     └─ UI displays doctors
```

## Environment Variable Flow

```
Frontend Environment (.env)
    ↓
VITE_API_URL → Frontend knows where backend is
    ↓
Used in axios calls: axios.get(${VITE_API_URL}/doctors)
    ↓
Or via Vite proxy config
    ↓
Backend Environment (.env)
    ↓
MONGO_URI → Database connection
CORS_ORIGIN → Allowed frontend URLs
PORT → Server port
```

## Port Configuration Reference

```
┌─────────────────────────────────────────┐
│           PORT REFERENCE                │
├─────────────────────────────────────────┤
│ Frontend (Vite Dev)  : 5173             │
│ Backend (Express)    : 5000             │
│ MongoDB              : 27017            │
│ Nginx Proxy (Docker) : 80 & 443         │
│ Docker Client        : 3000             │
│ Docker Backend       : 5000             │
└─────────────────────────────────────────┘
```

## Authentication Flow (Protected Routes)

```
User not logged in
        ↓
Clicks protected route (e.g., /dashboard)
        ↓
React Router checks ProtectedRoute
        ↓
ProtectedRoute.jsx checks:
├─ Is user authenticated? (check Redux state / localStorage token)
└─ Does user have required role?
        ↓
If YES:
    └─ Render Dashboard component
        ↓
If NO:
    └─ Redirect to /login
        ↓
User submits login form
        ↓
Frontend sends POST to /api/login
        ↓
Backend authenticates
        ↓
Backend returns JWT token
        ↓
Frontend stores token (localStorage / Redux)
        ↓
Redux state updates
        ↓
ProtectedRoute now allows access
        ↓
Route redirects to requested page
```

---

This visual guide helps understand:
✅ How components connect
✅ How data flows through the system
✅ Where each file is located
✅ How frontend communicates with backend
✅ How authentication works
