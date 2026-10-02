import mongoose from 'mongoose';

const AttendanceLogSchema = new mongoose.Schema(
  {
    date: { type: String, required: true, unique: true }, // Format: YYYY-MM-DD
    records: {
      type: Map,
      of: new mongoose.Schema({
        status: { type: String, enum: ['Present', 'Late', 'Absent'], required: true },
        time: { type: String }
      }, { _id: false })
    }
  },
  { timestamps: true }
);

export const AttendanceLog = mongoose.models.AttendanceLog || mongoose.model('AttendanceLog', AttendanceLogSchema);
