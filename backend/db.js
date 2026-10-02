import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://umarja08_db_user:FikAFofS9ahX403u@cluster0.muslhqy.mongodb.net/fic_institute?retryWrites=true&w=majority&appName=Cluster0';

export async function connectDB() {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`[MongoDB Atlas] Connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`[MongoDB Atlas] Connection Error:`, err.message);
    return null;
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB Atlas] Disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('[MongoDB Atlas] Reconnected');
});
