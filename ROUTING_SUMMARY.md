# 📖 MedPulse Project - Complete Routing Summary

## 🎯 Project Overview

**MedPulse** is a professional **MERN Stack** (MongoDB, Express, React, Node.js) Hospital Management System with:

- ✅ **Separate Frontend & Backend** (`frontend/` and `backend/`)
- ✅ **40+ Pages** across multiple modules
- ✅ **RESTful API** with CRUD operations
- ✅ **Role-based Access Control** (Patient, Doctor, Admin)
- ✅ **Production-Ready** with Docker, Nginx, CI/CD

---

## 🗂️ Current File Structure

```
medPulse/
├── frontend/                    # React + Vite (Port 5173)
│   └── src/
│       ├── pages/              # 30+ protected pages
│       ├── pages-1/            # 9 public pages
│       ├── components-1/       # 10+ reusable components
│       ├── redux/              # State management
│       ├── utils/              # Helper functions
│       ├── App.jsx             # Main routes file
│       └── ProtectedRoute.jsx  # Authentication wrapper
│
├── backend/                     # Express + MongoDB (Port 5000)
│   ├── models/                 # Doctors, Patients
│   ├── routes/                 # API endpoints
│   ├── seed/                   # Database seeding
│   ├── server.js               # Main server file
│   └── .env                    # Configuration
│
├── package.json                # Root workspace setup
├── docker-compose.yml          # Docker orchestration
├── Dockerfile                  # Container build
└── nginx.conf                  # Production reverse proxy
```

---

## 🌐 Port Configuration

```
┌──────────────────────────────┐
│  Frontend (Vite)   : 5173    │
│  Backend (Express) : 5000    │
│  MongoDB           : 27017   │
│  Nginx (Docker)    : 80/443  │
└──────────────────────────────┘
```

---

## 📱 Frontend Pages Summary

### **Public Pages** (No login required)
- Home
- About
- Services (+ details)
- Machinery (+ details)  
- Doctors (+ profiles)
- Contact

### **Authentication**
- Login page

### **Patient Dashboard** (30+ pages)
- My Appointments
- My Medical Records
- My Prescriptions
- Notifications
- Health Summary
- Vitals Tracker
- Profile Management

### **Doctor Dashboard**
- Lab Review Queue
- Visit Timeline
- SOAP Notes
- Task Panel
- Treatment Effectiveness

### **Admin Dashboard**
- Staff Management
- Billing & Invoices
- Blood Bank
- Donors
- Inquiries
- Patient Management
- Bed System
- Medicine Stock
- Machines
- Lab Tests

### **General**
- Chatbot

---

## 🔌 Backend API Endpoints

### **Doctors API**
```
GET    /api/doctors           # Get all doctors
GET    /api/doctors/:id       # Get single doctor
POST   /api/doctors           # Create doctor
PUT    /api/doctors/:id       # Update doctor
DELETE /api/doctors/:id       # Delete doctor
```

### **Patients API**
```
GET    /api/patients          # Get all patients
GET    /api/patients/:id      # Get single patient
POST   /api/patients          # Create patient
PUT    /api/patients/:id      # Update patient
DELETE /api/patients/:id      # Delete patient
```

---

## 🔄 Request Flow

```
Browser (http://localhost:5173)
    ↓
Axios: axios.get('/api/doctors')
    ↓
Vite Dev Proxy (/api → localhost:5000)
    ↓
Express Server (http://localhost:5000)
    ↓
Route Handler (routes/doctorRoutes.js)
    ↓
MongoDB Query (Doctor.find())
    ↓
Response: JSON array of doctors
    ↓
React Component receives & renders
```

---

## 📝 Key Configuration Files

| File | Purpose | Location |
|------|---------|----------|
| `App.jsx` | Frontend routes | `frontend/src/` |
| `server.js` | Backend setup | `backend/` |
| `.env` | Environment variables | `backend/` & `frontend/` |
| `vite.config.js` | Vite + API proxy | `frontend/` |
| `package.json` | Workspace scripts | Root |

---

## 🚀 Running the Project

### **Start Both Services**
```bash
npm run dev
```

### **Start Individual Services**
```bash
npm run dev:frontend    # Frontend on 5173
npm run dev:backend     # Backend on 5000
```

### **Docker Deployment**
```bash
docker-compose up -d    # Start all services
docker-compose down     # Stop services
```

---

## 🧭 Route Navigation Map

### **Public Routes** (Direct URL access)
```
/              → Home page
/about         → About
/services      → Services list
/machinery     → Machinery list
/doctors       → Doctors list
/contact       → Contact form
/login         → Login page
```

### **Protected Routes** (Require authentication)
```
/dashboard              → User dashboard
/appointments          → Appointments
/profile               → User profile
/staff                 → Staff management
/billing               → Billing system
/patients              → Patient list
/bed-system            → Bed management
... (30+ more pages)
```

---

## 🔐 Authentication Flow

```
1. User visits /login
2. Submits credentials
3. Backend validates & returns JWT token
4. Frontend stores token (Redux/localStorage)
5. ProtectedRoute checks token on each protected page
6. If valid → Show page
7. If invalid → Redirect to /login
```

---

## 📊 Data Models

### **Doctor Model**
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
  status: String,
  timestamps: true
}
```

### **Patient Model**
```javascript
{
  patientId: String (unique),
  name: String,
  age: Number,
  gender: String,
  phone: String,
  email: String,
  diagnosis: String,
  status: String,
  lastVisit: String,
  nextAppointment: String,
  history: Array,
  timestamps: true
}
```

---

## ✅ Verification Checklist

- [ ] `npm run dev` starts both services
- [ ] Frontend loads at `http://localhost:5173`
- [ ] Backend responds at `http://localhost:5000`
- [ ] API test: `GET /api/doctors` returns data
- [ ] No CORS errors
- [ ] Public pages accessible
- [ ] Login page works
- [ ] Protected pages redirect to login
- [ ] MongoDB connected
- [ ] Components render correctly

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Page 404 | Check route exists in App.jsx |
| API 404 | Check route registered in server.js |
| CORS error | Check CORS_ORIGIN in .env |
| Port in use | Kill process or use different port |
| MongoDB error | Ensure MongoDB is running |
| Protected route not working | Check ProtectedRoute wrapper |

See **ROUTING_DEBUG.md** for detailed troubleshooting.

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **ROUTING.md** | Complete routing reference |
| **ROUTING_VISUAL.md** | Visual diagrams & architecture |
| **ROUTING_DEBUG.md** | Debugging & troubleshooting |
| **README.md** | Project overview |
| **DEPLOYMENT.md** | Production deployment guide |
| **DEVELOPMENT.md** | Development setup guide |

---

## 🎓 Architecture Highlights

### **Frontend (React + Vite)**
- Fast development with hot module replacement
- Optimized production builds
- Axios for API calls
- Redux for state management
- React Router for client-side routing
- Protected routes with role-based access

### **Backend (Express + Node.js)**
- RESTful API design
- MongoDB integration
- CORS-enabled for cross-origin requests
- Environment-based configuration
- Modular route structure
- Error handling middleware

### **Database (MongoDB)**
- Document-based NoSQL
- Flexible schema design
- Collections for Doctors & Patients
- Timestamps on all documents
- Indexed unique fields

### **DevOps**
- Docker containerization
- Docker Compose orchestration
- Nginx reverse proxy
- GitHub Actions CI/CD
- Multi-stage Docker builds

---

## 🔍 Quick Reference

### **Adding a New Route**

**Frontend:**
```jsx
// In App.jsx
import NewPage from "./pages/NewPage";

<Route path="/new-page" element={<NewPage />} />
```

**Backend:**
```javascript
// In backend/routes/newRoutes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "New route" });
});

module.exports = router;

// In backend/server.js
app.use("/api/new", require("./routes/newRoutes"));
```

---

## 📞 Support Resources

- **Official Docs:**
  - [React Documentation](https://react.dev)
  - [Express Documentation](https://expressjs.com)
  - [MongoDB Documentation](https://docs.mongodb.com)
  - [Vite Documentation](https://vitejs.dev)

- **Local Documentation:**
  - See ROUTING.md for complete reference
  - See ROUTING_DEBUG.md for troubleshooting
  - See DEVELOPMENT.md for dev guidelines

---

## 🎯 Next Steps

1. **Verify routing:**
   - Run `npm run dev`
   - Test public pages
   - Test API endpoints

2. **Test authentication:**
   - Try login page
   - Verify protected routes
   - Check token storage

3. **Test API calls:**
   - Use Postman/Insomnia
   - Make API requests
   - Verify responses

4. **Deployment:**
   - Follow DEPLOYMENT.md
   - Choose hosting platform
   - Configure environment variables

---

## 📋 File Statistics

- **Frontend Pages:** 40+
- **Backend Routes:** 2 main (Doctors, Patients)
- **Components:** 10+
- **API Endpoints:** 10+ (CRUD operations)
- **Total Lines of Routing:** 1000+
- **Configuration Files:** 15+

---

**Created:** May 11, 2026  
**Status:** Production Ready  
**Version:** 1.0.0

---

For detailed information, please refer to:
- 📖 **ROUTING.md** - Detailed routing guide
- 🎨 **ROUTING_VISUAL.md** - Visual diagrams
- 🔧 **ROUTING_DEBUG.md** - Debugging guide
