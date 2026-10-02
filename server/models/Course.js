import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    department: { type: String, required: true },
    duration: { type: String, default: '3 Years' },
    credits: { type: Number, default: 120 },
    instructor: { type: String, default: '' },
    description: { type: String, default: '' },
    capacity: { type: Number, default: 60 },
    enrolledCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);
