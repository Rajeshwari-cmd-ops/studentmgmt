import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import { apiRouter } from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request Logging
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api', apiRouter);

// Root route
app.get('/', (req, res) => {
  res.json({
    app: 'FIC Institute Backend API',
    version: '1.0.0',
    database: 'MongoDB Atlas',
    status: 'online'
  });
});

// Start Server & Connect to MongoDB
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[Server] FIC Institute API Server running on http://localhost:${PORT}`);
  });
}

startServer();
