# 🔍 MedPulse - Routing Reference & Debugging Guide

## ✅ Quick Routing Verification

### **Frontend - Test These URLs in Browser**

| URL | Expected | Status |
|-----|----------|--------|
| `http://localhost:5173/` | Home page loads | ✓ or ✗ |
| `http://localhost:5173/about` | About page loads | ✓ or ✗ |
| `http://localhost:5173/services` | Services page loads | ✓ or ✗ |
| `http://localhost:5173/doctors` | Doctors page loads | ✓ or ✗ |
| `http://localhost:5173/machinery` | Machinery page loads | ✓ or ✗ |
| `http://localhost:5173/contact` | Contact page loads | ✓ or ✗ |
| `http://localhost:5173/login` | Login page loads | ✓ or ✗ |
| `http://localhost:5173/dashboard` | Redirects to /login (not authenticated) | ✓ or ✗ |

### **Backend - Test These URLs in Postman/Insomnia**

| Method | URL | Expected Response |
|--------|-----|-------------------|
| GET | `http://localhost:5000/api/doctors` | Array of doctors |
| GET | `http://localhost:5000/api/patients` | Array of patients |
| POST | `http://localhost:5000/api/doctors` | Created doctor object |
| POST | `http://localhost:5000/api/patients` | Created patient object |

---

## 🐛 Common Routing Issues & Solutions

### **Issue 1: Page Not Found (404)**

**Symptom:** Clicking on a link results in "Page Not Found"

**Debug Steps:**
1. Check if route exists in `frontend/src/App.jsx`:
   ```jsx
   // Look for this route:
   <Route path="/dashboard" element={<Dashboard />} />
   ```

2. Check if component file exists:
   ```bash
   ls frontend/src/pages/Dashboard/Dashboard.jsx
   ```

3. Check component import is correct:
   ```jsx
   import Dashboard from "./pages/Dashboard/Dashboard";
   ```

4. Check for typos in path:
   - Route: `/dashboard` (lowercase)
   - File: `Dashboard.jsx` (capital D)
   - These are case-sensitive on Linux/Mac!

**Solution:**
```jsx
// In App.jsx
<Route path="/dashboard" element={<Dashboard />} />

// Component file must exist at:
// frontend/src/pages/Dashboard/Dashboard.jsx
```

---

### **Issue 2: API Returns 404**

**Symptom:** `axios.get('/api/doctors')` returns 404

**Debug Steps:**

1. **Check if backend is running:**
   ```bash
   # Terminal should show:
   # npm run dev:backend
   # Server running on port 5000
   ```

2. **Check if route is registered:**
   ```javascript
   // backend/server.js should have:
   app.use("/api/doctors", require("./routes/doctorRoutes"));
   app.use("/api/patients", require("./routes/paitentRoutes"));
   ```

3. **Test backend directly:**
   ```bash
   curl http://localhost:5000/api/doctors
   # Should return JSON array, not 404
   ```

4. **Check Vite proxy configuration:**
   ```javascript
   // frontend/vite.config.js
   proxy: {
     '/api': {
       target: 'http://localhost:5000',
       changeOrigin: true,
     },
   }
   ```

**Solution:**
```javascript
// In backend/server.js - Register routes:
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/patients", require("./routes/paitentRoutes"));
```

---

### **Issue 3: CORS Error**

**Symptom:** Browser console shows: `Access to XMLHttpRequest blocked by CORS`

**Debug Steps:**

1. **Check CORS configuration:**
   ```javascript
   // backend/server.js
   const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
     .split(",")
     .map((origin) => origin.trim())
     .filter(Boolean);
   ```

2. **Check `.env` file:**
   ```env
   # backend/.env
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Check frontend URL:**
   - If frontend is on `http://localhost:5173`, CORS_ORIGIN must match
   - If frontend is on different port, update CORS_ORIGIN

**Solution:**
```env
# backend/.env
CORS_ORIGIN=http://localhost:5173

# For multiple origins (comma-separated):
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

---

### **Issue 4: Protected Route Not Working**

**Symptom:** Can access `/dashboard` without logging in

**Debug Steps:**

1. **Check if route is protected:**
   ```jsx
   // In App.jsx - should be wrapped with ProtectedRoute
   <Route path="/dashboard" element={
     <ProtectedRoute>
       <Dashboard />
     </ProtectedRoute>
   } />
   ```

2. **Check ProtectedRoute component:**
   ```jsx
   // frontend/src/ProtectedRoute.jsx
   // Should check for auth token or Redux state
   ```

3. **Check authentication logic:**
   ```javascript
   // Should verify:
   // - Token exists (localStorage)
   // - Redux state has user data
   // - User has required role
   ```

**Solution:**
```jsx
// Wrap protected pages:
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

### **Issue 5: MongoDB Connection Failed**

**Symptom:** Backend error: `MongoDB connection error`

**Debug Steps:**

1. **Check MongoDB is running:**
   ```bash
   # If using Docker:
   docker ps | grep mongo
   
   # If using local MongoDB:
   mongosh
   ```

2. **Check connection string:**
   ```env
   # backend/.env
   MONGODB_URI=mongodb://localhost:27017/medpulse
   ```

3. **Check port 27017 is accessible:**
   ```bash
   netstat -an | grep 27017
   ```

4. **Test connection:**
   ```bash
   mongosh mongodb://localhost:27017/medpulse
   ```

**Solution:**
```env
# backend/.env
# Make sure URI matches MongoDB setup
MONGODB_URI=mongodb://localhost:27017/medpulse

# Or use MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medpulse
```

---

### **Issue 6: Proxy Not Working (Dev Server)**

**Symptom:** `/api/*` requests not being forwarded to backend

**Debug Steps:**

1. **Check Vite proxy config:**
   ```javascript
   // frontend/vite.config.js
   proxy: {
     '/api': {
       target: 'http://localhost:5000',
       changeOrigin: true,
     },
   }
   ```

2. **Check dev server is running:**
   ```bash
   npm run dev:frontend
   # Should show: VITE v7.x.x  ready in xxx ms
   ```

3. **Check in browser console:**
   - Open DevTools → Network tab
   - Make API call
   - Check request URL and headers

4. **Test without proxy:**
   ```javascript
   // Temporarily use full URL to test:
   axios.get('http://localhost:5000/api/doctors')
   ```

**Solution:**
```javascript
// frontend/vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
```

---

### **Issue 7: Port Already in Use**

**Symptom:** Error: `Port 5173 is already in use`

**Debug & Solution:**

**Windows:**
```bash
# Find process using port
netstat -ano | findstr :5173

# Kill process
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
# Find process using port
lsof -i :5173

# Kill process
kill -9 <PID_NUMBER>
```

**Or use different port:**
```bash
# Frontend on different port
VITE_PORT=3000 npm run dev:frontend
```

---

### **Issue 8: Components Not Re-rendering**

**Symptom:** Data loaded but UI doesn't update

**Debug Steps:**

1. **Check Redux state:**
   ```javascript
   // Install Redux DevTools
   // Check if state is updating
   ```

2. **Check component props:**
   ```jsx
   // Add console.log to debug
   const Dashboard = ({ data }) => {
     console.log('Props:', data);
     return ...
   }
   ```

3. **Check useEffect dependencies:**
   ```jsx
   // Wrong - runs on every render:
   useEffect(() => {
     fetchData();
   });
   
   // Correct - runs once:
   useEffect(() => {
     fetchData();
   }, []);
   ```

**Solution:**
```jsx
// Proper effect hook:
useEffect(() => {
  fetchData();
}, []); // Empty array = run once on mount
```

---

## 📋 Routing Configuration Files

### **Frontend: App.jsx Route Structure**

```jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Public pages
import Home from "./pages-1/Home";
import Login from "./pages/auth/login";

// Protected pages
import Dashboard from "./pages/Dashboard/Dashboard";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      {/* 404 - must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

### **Backend: server.js Route Registration**

```javascript
const express = require("express");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/patients", require("./routes/paitentRoutes"));

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 🧪 Testing Routing

### **Frontend Testing (Browser DevTools)**

```javascript
// In browser console:

// Test 1: Check route
window.location.pathname // Should show current route

// Test 2: Navigate programmatically
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/dashboard'); // Navigate to dashboard
```

### **Backend Testing (Postman)**

```
1. Open Postman
2. Create GET request
3. URL: http://localhost:5000/api/doctors
4. Click Send
5. Check response status (200 = success, 404 = not found)
```

### **Database Testing**

```bash
# Connect to MongoDB
mongosh

# Select database
use medpulse

# List collections
show collections

# Query doctors
db.doctors.find()

# Query patients
db.patients.find()
```

---

## 📊 Routing Status Dashboard

Create this in a text file and update as you go:

```
FRONTEND ROUTING
================
✓ Home page          - /
✓ About page         - /about
✓ Services page      - /services
✓ Doctors page       - /doctors
✓ Login page         - /login
✗ Dashboard          - /dashboard (not working - CORS error)
✗ Staff page         - /staff (404 component not found)

BACKEND ROUTING
===============
✓ Doctors GET        - GET /api/doctors
✓ Doctors POST       - POST /api/doctors
✗ Patients GET       - GET /api/patients (404 route not registered)
✗ Patients POST      - POST /api/patients (404 route not registered)

INFRASTRUCTURE
===============
✓ Frontend runs on 5173
✓ Backend runs on 5000
✗ MongoDB not connecting
✓ Vite proxy configured
✗ CORS errors occurring
```

---

## 🔧 File Location Reference

### **Need to add a new route?**

1. **Frontend Route:**
   ```
   File: frontend/src/App.jsx
   Add: <Route path="/new-page" element={<NewPage />} />
   Component: frontend/src/pages/NewPage.jsx
   ```

2. **Backend API Route:**
   ```
   File: backend/routes/newRoutes.js
   Register in: backend/server.js
   app.use("/api/new", require("./routes/newRoutes"));
   ```

3. **New Database Model:**
   ```
   File: backend/models/NewModel.js
   Export: mongoose.model("NewModel", schema)
   Use in routes: const NewModel = require("../models/NewModel")
   ```

---

## 📚 Documentation Files Available

- **ROUTING.md** - Complete routing reference (this file)
- **ROUTING_VISUAL.md** - Visual diagrams and architecture
- **README.md** - Project overview
- **DEPLOYMENT.md** - Deployment guide
- **DEVELOPMENT.md** - Development guidelines

---

## ✅ Final Checklist

- [ ] Frontend loads on `http://localhost:5173`
- [ ] Backend responds on `http://localhost:5000/api/doctors`
- [ ] No CORS errors in browser console
- [ ] Public routes work without login
- [ ] Protected routes redirect to login when not authenticated
- [ ] MongoDB is connected and working
- [ ] All component imports are correct
- [ ] No 404 errors for pages
- [ ] No broken links
- [ ] API calls return expected data

---

## 🆘 Still Having Issues?

1. **Check browser console** for errors
2. **Check terminal** for backend errors
3. **Check MongoDB** is running
4. **Review** the relevant configuration file
5. **Verify** all imports and file paths
6. **Restart** both frontend and backend
7. **Clear** browser cache (Ctrl+Shift+Delete)
8. **Check** CORS_ORIGIN environment variable
9. **Verify** backend routes are registered
10. **Test** API directly in Postman

---

## 📞 Quick Reference Commands

```bash
# Start both services
npm run dev

# Start individual services
npm run dev:frontend    # Port 5173
npm run dev:backend     # Port 5000

# Build frontend
npm run build

# Test API endpoint
curl http://localhost:5000/api/doctors

# Check port usage
netstat -ano | findstr :5173  # Windows
lsof -i :5173                  # Mac/Linux

# Check MongoDB status
mongosh
```
