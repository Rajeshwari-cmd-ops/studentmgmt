# FIC Institute - Backend API Server

Node.js, Express, and MongoDB Atlas REST API backend for the FIC Institute Student Management Portal.

## 🚀 Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or MongoDB connection string)

## 📁 Folder Structure
```
backend/
├── .env                # Environment variables (PORT, MONGODB_URI)
├── package.json        # Dependencies & scripts
├── server.js           # Express app & server bootstrap
├── db.js               # MongoDB Atlas connection handler
├── models/             # Mongoose schemas & models
│   ├── Student.js
│   ├── Course.js
│   ├── Exam.js
│   ├── Teacher.js
│   ├── Fee.js
│   ├── Setting.js
│   ├── Attendance.js
│   └── Inquiry.js
└── routes/
    └── api.js          # REST API endpoints & seeding
```

## ⚙️ Environment Variables (`.env`)
```env
PORT=5000
MONGODB_URI=mongodb+srv://umarja08_db_user:FikAFofS9ahX403u@cluster0.muslhqy.mongodb.net/fic_institute?retryWrites=true&w=majority&appName=Cluster0
```

## 🛠️ Installation & Execution

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Run in Development Mode
```bash
npm run dev
```

### 3. Run in Production Mode
```bash
npm start
```
The server will start at `http://localhost:5000`.

## 📡 API Endpoints
- `GET /api/health` - Check database connection status
- `POST /api/seed` - Populate initial datasets
- `GET /api/students`, `POST /api/students`, `PUT /api/students/:id`, `DELETE /api/students/:id`
- `GET /api/courses`, `POST /api/courses`, `PUT /api/courses/:id`, `DELETE /api/courses/:id`
- `GET /api/exams`, `POST /api/exams`, `PUT /api/exams/:id`, `DELETE /api/exams/:id`
- `GET /api/teachers`, `POST /api/teachers`, `PUT /api/teachers/:id`, `DELETE /api/teachers/:id`
- `GET /api/fees`, `POST /api/fees`, `PUT /api/fees/:id`, `DELETE /api/fees/:id`
- `GET /api/attendance`, `POST /api/attendance`
- `GET /api/settings`, `POST /api/settings`
- `GET /api/inquiries`, `POST /api/inquiries`
