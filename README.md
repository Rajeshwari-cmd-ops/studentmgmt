# FIC Institute - Full-Stack Student Management System

A decoupled Full-Stack Web Application with an **Express.js + MongoDB Atlas Backend** and a **React + Vite Frontend**.

---

## 📁 Repository Organization

```
stumgmt/
├── backend/            # Standalone Node.js + Express + MongoDB Atlas Backend
│   ├── .env            # MongoDB connection string & PORT
│   ├── package.json    # Backend dependencies
│   ├── server.js       # Express server entry point (Port 5000)
│   ├── db.js           # Mongoose Atlas connection handler
│   ├── models/         # Database models (Student, Course, Exam, Fee, etc.)
│   └── routes/         # REST API routes (/api/...)
│
├── frontend/           # Standalone React 18 + Vite Frontend Application
│   ├── package.json    # Frontend dependencies
│   ├── vite.config.js  # Vite config with /api proxy to Port 5000
│   ├── index.html      # HTML entry point with academic branding
│   └── src/            # React UI components, views, and data layer
│
├── package.json        # Root workspace script runner
└── README.md
```

---

## 🚀 Quick Start (Running Both Together)

From the project root:

```bash
# 1. Install all dependencies across root, backend, and frontend
npm run install:all

# 2. Run both backend (port 5000) and frontend (port 5173) simultaneously
npm run dev
```

---

## 💻 Running Separately

### Running Only Backend:
```bash
cd backend
npm install
npm run dev
```
*Backend API runs at: `http://localhost:5000`*

### Running Only Frontend:
```bash
cd frontend
npm install
npm run dev
```
*Frontend Application runs at: `http://localhost:5173`*
