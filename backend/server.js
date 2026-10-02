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

// Logging
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

// Mount Routes
app.use('/api', apiRouter);

// Health Root
app.get('/', (req, res) => {
  res.json({
    app: 'FIC Institute Backend API',
    database: 'MongoDB Atlas',
    status: 'online',
    port: PORT
  });
});

// Start Server
async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[Backend] FIC Institute API Server listening at http://localhost:${PORT}`);
  });
}

start();
