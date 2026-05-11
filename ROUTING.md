# 📍 MedPulse - Complete Routing & File Structure Map

## 🏗️ Project Structure Overview

```
medPulse/
├── frontend/                    (React - Port 5173)
│   ├── src/
│   │   ├── pages/              (Main application pages)
│   │   ├── pages-1/            (Public website pages)
│   │   ├── components-1/       (Reusable components)
│   │   ├── layout/             (Layout components)
│   │   ├── redux/              (State management)
│   │   ├── utils/              (Helper functions)
│   │   ├── config/             (Configuration)
│   │   ├── assets/             (Images, icons)
│   │   ├── App.jsx             (Main app file)
│   │   └── main.jsx            (Entry point)
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     (Express - Port 5000)
│   ├── models/                 (MongoDB schemas)
│   ├── routes/                 (API endpoints)
│   ├── seed/                   (Database seeding)
│   ├── server.js               (Main server file)
│   ├── .env                    (Environment variables)
│   └── package.json
│
├── package.json                (Root workspace)
├── docker-compose.yml
├── Dockerfile
└── nginx.conf
```

---

## 🌐 Frontend Routing Map

### 1. **Public Pages** (`pages-1/`)
These are accessible without authentication:

| Path | File | Component | Description |
|------|------|-----------|-------------|
| `/` | `Home.jsx` | Home | Landing page |
| `/about` | `About.jsx` | About | About the hospital |
| `/services` | `ServicesPage.jsx` | ServicesPage | Services offered |
| `/machinery` | `MachineryPage.jsx` | MachineryPage | Medical machinery list |
| `/doctors` | `DoctorsPage.jsx` | DoctorsPage | Doctors directory |
| `/contact` | `Contact.jsx` | Contact | Contact form |
| `/doctor/:id` | `DoctorProfile.jsx` | DoctorProfile | Individual doctor profile |
| `/machinery/:id` | `MachineryDetail.jsx` | MachineryDetail | Machinery details |
| `/service/:id` | `ServiceDetail.jsx` | ServiceDetail | Service details |

**Location:** `frontend/src/pages-1/`

---

### 2. **Authentication Pages** (`pages/auth/`)

| Path | File | Component | Authentication |
|------|------|-----------|-----------------|
| `/login` | `login.jsx` | Login | Public (not protected) |

**Location:** `frontend/src/pages/auth/`

---

### 3. **Protected Application Pages** (`pages/`)

#### **Dashboard** 
| Path | File | Component | Role |
|------|------|-----------|------|
| `/dashboard` | `Dashboard/Dashboard.jsx` | Dashboard | All authenticated users |

#### **Patient Pages**
| Path | File | Component | Role |
|------|------|-----------|------|
| `/appointments` | `appointments/Appointments.jsx` | Appointments | Patients |
| `/my-appointments` | `Paticentappoin/MyAppointments.jsx` | MyAppointments | Patients |
| `/profile` | `Patientprofile/Paticentprofile.jsx` | Paticentprofile | Patients |
| `/medical-records` | `patientmedicalrecord/MyMedicalRecords.jsx` | MyMedicalRecords | Patients |
| `/prescriptions` | `patientprecpetion/MyPrescriptions.jsx` | MyPrescriptions | Patients |
| `/notifications` | `patientnotifications/NotificationsPanel.jsx` | NotificationsPanel | Patients |
| `/health-summary` | `patienthealthSummary/HealthSummaryCard.jsx` | HealthSummaryCard | Patients |
| `/vitals` | `Vitals Tracker/vitals/VitalsTracker.jsx` | VitalsTracker | Patients |

#### **Doctor Pages**
| Path | File | Component | Role |
|------|------|-----------|------|
| `/lab-review` | `Docterlabreview/LabReviewQueue.jsx` | LabReviewQueue | Doctors |
| `/visit-timeline` | `DoctersTimeline/DoctorVisitTimeline.jsx` | DoctorVisitTimeline | Doctors |
| `/soap-notes` | `soapNotes/SOAPNotesPage.jsx` | SOAPNotesPage | Doctors |
| `/tasks` | `doctorTasks/DoctorTaskPanel.jsx` | DoctorTaskPanel | Doctors |
| `/treatment-effectiveness` | `treatmentTracker/TreatmentEffectiveness.jsx` | TreatmentEffectiveness | Doctors |

#### **Admin/Staff Pages**
| Path | File | Component | Role |
|------|------|-----------|------|
| `/staff` | `staff/Staff.jsx` | Staff | Admin |
| `/staff/add` | `staff/addStaff.jsx` | AddStaff | Admin |
| `/billing` | `billing/Billing.jsx` | Billing | Admin/Finance |
| `/billing/invoice` | `billing/CreateInvoice.jsx` | CreateInvoice | Admin/Finance |
| `/blood-bank` | `blood/BloodBank.jsx` | BloodBank | Admin |
| `/donors` | `donors/Donors.jsx` | Donors | Admin |
| `/inquiry` | `inquiry/Inquiry.jsx` | Inquiry | Admin |
| `/patients` | `patients/PatientsLayout.jsx` | PatientsLayout | Admin |
| `/bed-system` | `bedsystem/BedSystem.jsx` | BedSystem | Admin |
| `/medicine-stock` | `Medicainestock/MedicineStock.jsx` | MedicineStock | Admin |
| `/machines` | `Machine/MachineList.jsx` | MachineList | Admin |
| `/lab-tests` | `labtests/LabTestPage.jsx` | LabTestPage | Admin |

#### **Other Pages**
| Path | File | Component | Role |
|------|------|-----------|------|
| `/chatbot` | `chatbot/ChatBot.jsx` | ChatBot | All users |

**Location:** `frontend/src/pages/[feature-name]/`

---

## 🔌 Backend API Routes

### **Base URL:** `http://localhost:5000`
### **API Prefix:** `/api`

### 1. **Doctor Routes**
| Method | Endpoint | File | Description |
|--------|----------|------|-------------|
| GET | `/api/doctors` | `routes/doctorRoutes.js` | Get all doctors |
| GET | `/api/doctors/:id` | `routes/doctorRoutes.js` | Get specific doctor |
| POST | `/api/doctors` | `routes/doctorRoutes.js` | Create new doctor |
| PUT | `/api/doctors/:id` | `routes/doctorRoutes.js` | Update doctor |
| DELETE | `/api/doctors/:id` | `routes/doctorRoutes.js` | Delete doctor |

**Model:** `backend/models/Doctors.js`

### 2. **Patient Routes**
| Method | Endpoint | File | Description |
|--------|----------|------|-------------|
| GET | `/api/patients` | `routes/paitentRoutes.js` | Get all patients |
| GET | `/api/patients/:id` | `routes/paitentRoutes.js` | Get specific patient |
| POST | `/api/patients` | `routes/paitentRoutes.js` | Create new patient |
| PUT | `/api/patients/:id` | `routes/paitentRoutes.js` | Update patient |
| DELETE | `/api/patients/:id` | `routes/paitentRoutes.js` | Delete patient |

**Model:** `backend/models/Paitents.js`

---

## 🔗 Connection Flow

### **Frontend → Backend Communication**

```
Frontend (Port 5173)
    ↓
Axios Request to `/api/*`
    ↓
Vite Proxy (vite.config.js)
    ↓
Backend (Port 5000)
    ↓
Express Route Handler
    ↓
MongoDB Model
    ↓
Response back to Frontend
```

### **Vite Proxy Configuration**
**File:** `frontend/vite.config.js`
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
}
```

---

## 📦 Component Structure

### **Reusable Components** (`components-1/`)
- `Navbar.jsx` - Navigation bar
- `Footer.jsx` - Footer component
- `Appointment.jsx` - Appointment display
- `Doctors.jsx` - Doctors list
- `Services.jsx` - Services section
- `Machinery.jsx` - Machinery section
- `Hero.jsx` - Hero section
- `Testimonials.jsx` - Testimonials
- `InfoStrip.jsx` - Info banner
- Plus CSS files for each

### **Layout** (`layout/`)
- `MainLayout.jsx` - Main application layout
- `MainLayout.css` - Layout styles

---

## 📁 Configuration Files

### **Frontend Configuration**
| File | Purpose |
|------|---------|
| `frontend/package.json` | Dependencies & scripts |
| `frontend/vite.config.js` | Vite build config & API proxy |
| `frontend/.env.example` | Environment variables template |
| `frontend/eslint.config.js` | Code linting rules |
| `frontend/index.html` | HTML entry point |

### **Backend Configuration**
| File | Purpose |
|------|---------|
| `backend/package.json` | Dependencies & scripts |
| `backend/server.js` | Express server setup |
| `backend/.env` | Environment variables (MONGO_URI, CORS_ORIGIN, etc.) |
| `backend/.env.example` | Environment template |

### **Root Configuration**
| File | Purpose |
|------|---------|
| `package.json` | Workspace setup & scripts |
| `docker-compose.yml` | Docker services |
| `Dockerfile` | Docker image build |
| `nginx.conf` | Nginx reverse proxy |

---

## 🚀 Important Development Commands

### **Start Both Services**
```bash
npm run dev
```
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### **Start Individual Services**
```bash
npm run dev:frontend    # Frontend only on 5173
npm run dev:backend     # Backend only on 5000
```

### **Build Frontend**
```bash
npm run build
```
Output: `frontend/dist/`

### **Start Backend (Production)**
```bash
npm run start
```

---

## 🗄️ Database Models

### **Doctor Model**
**File:** `backend/models/Doctors.js`
```javascript
{
  doctorId: String (unique),
  name: String,
  specialization: String,
  phone: String,
  email: String,
  department: String,
  availability: String,
  experience: Number,
  status: String (default: "Active"),
  timestamps: true
}
```

### **Patient Model**
**File:** `backend/models/Paitents.js`
```javascript
{
  patientId: String (unique),
  name: String,
  age: Number,
  gender: String,
  phone: String,
  email: String,
  diagnosis: String,
  status: String (default: "Active"),
  lastVisit: String,
  nextAppointment: String,
  history: Array,
  timestamps: true
}
```

---

## 🔐 Protected Routes

**File:** `frontend/src/ProtectedRoute.jsx`

Routes requiring authentication are wrapped with `<ProtectedRoute>`:
```jsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

---

## 🌍 Environment Variables

### **Backend** (`.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medpulse
CORS_ORIGIN=http://localhost:5173
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_password
```

### **Frontend** (`.env`)
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=MedPulse
VITE_ENVIRONMENT=development
```

---

## ✅ Quick Routing Checklist

- [ ] Frontend: `http://localhost:5173` - Home page loads
- [ ] Backend: `http://localhost:5000` - Server running
- [ ] API Test: `http://localhost:5000/api/doctors` - Returns doctor list
- [ ] Login: `/login` - Login page accessible
- [ ] Dashboard: `/dashboard` - Protected route (requires login)
- [ ] Proxy: `/api/*` requests route to backend
- [ ] Redux: State management connected
- [ ] MongoDB: Connected and working

---

## 📞 Common API Calls from Frontend

### **Get All Doctors**
```javascript
axios.get('/api/doctors')
```

### **Get Single Doctor**
```javascript
axios.get('/api/doctors/:id')
```

### **Create Doctor**
```javascript
axios.post('/api/doctors', doctorData)
```

### **Update Doctor**
```javascript
axios.put('/api/doctors/:id', updatedData)
```

### **Delete Doctor**
```javascript
axios.delete('/api/doctors/:id')
```

---

## 🔧 Troubleshooting Routing Issues

### **Issue: CORS Error**
- Check `CORS_ORIGIN` in `backend/.env`
- Should match frontend URL (default: `http://localhost:5173`)

### **Issue: API calls failing**
- Verify backend running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Check Vite proxy in `frontend/vite.config.js`

### **Issue: Page not found**
- Verify route exists in `App.jsx`
- Check component file path is correct
- Ensure component is imported

### **Issue: Protected route not working**
- Verify `ProtectedRoute.jsx` is wrapped around page
- Check authentication logic
- Verify user role/token validation

---

## 📊 File Statistics

| Category | Count |
|----------|-------|
| Frontend Page Components | ~30+ |
| Backend Routes | 2 (Doctors, Patients) |
| Reusable Components | 10+ |
| Models | 2 (Doctor, Patient) |
| Total Pages (UI) | 40+ |

---

## 🎯 Next Steps

1. **Verify all routes work:**
   - Test homepage
   - Test login page
   - Test API endpoints
   - Test protected pages

2. **Add missing routes:**
   - If backend needs more models/routes
   - If frontend pages need new routes

3. **Environment setup:**
   - Configure `.env` files
   - Set up MongoDB connection
   - Set up email credentials

4. **Testing:**
   - Use Postman/Insomnia for API testing
   - Use React DevTools for frontend debugging
   - Use MongoDB Compass for database inspection
