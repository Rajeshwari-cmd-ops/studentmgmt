import mongoose from 'mongoose';

const ExamSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: String, default: 'Semester 1' },
    date: { type: String, required: true },
    time: { type: String, default: '10:00 AM - 01:00 PM' },
    room: { type: String, default: 'Hall A' },
    type: { type: String, default: 'Mid-Term Exam' },
    totalMarks: { type: Number, default: 100 }
  },
  { timestamps: true }
);

export const Exam = mongoose.models.Exam || mongoose.model('Exam', ExamSchema);
