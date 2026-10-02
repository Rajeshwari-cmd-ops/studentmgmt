import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    designation: { type: String, default: 'Assistant Professor' },
    department: { type: String, required: true },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    specialization: { type: String, default: '' },
    avatar: { type: String, default: '' },
    office: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);
