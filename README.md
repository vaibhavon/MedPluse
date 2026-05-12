# MedPulse

MedPulse is a MERN hospital management system with a separated React frontend and Express/MongoDB backend.

## Folder Structure

```text
medPulse/
├── frontend/                 # React + Vite app
│   ├── public/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Express API
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── render.yaml               # Render blueprint for frontend + backend
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── package.json              # Root workspace scripts
```

## Local Setup

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run dev
```

Frontend: `https://medpluse-2.onrender.com`
Backend: `http://localhost:5000`
Health check: `http://localhost:5000/health`

## Environment Variables

Backend (`backend/.env`):

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medpulse
CORS_ORIGIN=https://medpluse-2.onrender.com
EMAIL_USER=
EMAIL_PASS=
```

Frontend (`frontend/.env`):

```env
VITE_API_URL=http://localhost:5000
```

## Scripts

```bash
npm run dev              # Start frontend and backend
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend
npm run build            # Build frontend
npm run start            # Start backend
npm run lint             # Lint frontend
npm run test             # Syntax-check backend server
```

## Render Deployment

This repo includes `render.yaml` for a Render Blueprint:

1. Push the repo to GitHub.
2. In Render, create a new Blueprint and select this repo.
3. Set backend secrets when prompted:
   - `MONGODB_URI`
   - `CORS_ORIGIN` as your frontend URL, for example `https://medpulse-frontend.onrender.com`
   - `EMAIL_USER`
   - `EMAIL_PASS`
4. Set frontend `VITE_API_URL` as your backend URL, for example `https://medpulse-backend.onrender.com`.

## Vercel Frontend + Render Backend

If the frontend is deployed on Vercel and the API is deployed on Render:

1. In Vercel, set `VITE_API_URL` to the Render backend URL, not the Vercel frontend URL.
2. Also set `API_URL` to the same backend URL so the Vercel `/api/*` proxy can forward requests at runtime.
3. In Render, set backend `CORS_ORIGIN` to the Vercel frontend URL.

Example:

```env
VITE_API_URL=https://medpulse-backend.onrender.com
API_URL=https://medpulse-backend.onrender.com
CORS_ORIGIN=https://your-frontend.vercel.app
```

The login request should go to `/api/login`. A 405 from `/api/login` usually means the browser is hitting the frontend host instead of the Express backend.

The frontend has SPA rewrites for Render, Vercel, and Netlify-style static hosting.

## Docker

```bash
docker compose up --build
```

Frontend: `http://localhost:3000`
Backend: `http://localhost:5000`
