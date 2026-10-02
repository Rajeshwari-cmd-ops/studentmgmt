# FIC Institute - Frontend Application

Modern Institutional Website & Student Management Portal built with React 18 and Vite.

## 🚀 Prerequisites
- Node.js (v18+)
- Backend API running at `http://localhost:5000` (optional, has offline fallback)

## 📁 Folder Structure
```
frontend/
├── index.html          # HTML entry point with fonts & metadata
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite build & API reverse proxy configuration
├── src/
│   ├── main.jsx        # React root entry
│   ├── App.jsx         # Main application controller
│   ├── index.css       # Complete academic design system & typography tokens
│   ├── components/     # UI components (views, layout, common, institutional)
│   └── data/           # API client & local caching
```

## 🛠️ Installation & Execution

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
Generates production-ready static assets in `frontend/dist/`.
