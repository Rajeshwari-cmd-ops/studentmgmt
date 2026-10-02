import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    photo: { type: String, default: '' },
    gender: { type: String, default: 'Other' },
    dob: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    course: { type: String, required: true },
    department: { type: String, required: true },
    semester: { type: String, default: 'Semester 1' },
    admissionDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    status: { type: String, enum: ['Active', 'Inactive', 'Suspended', 'Graduated'], default: 'Active' },
    cgpa: { type: Number, default: 3.5 },
    attendanceRate: { type: Number, default: 95 },
    feeStatus: { type: String, enum: ['Paid', 'Pending', 'Overdue', 'Partial'], default: 'Paid' },
    feeAmount: { type: Number, default: 65000 },
    feePaid: { type: Number, default: 65000 },
    feePending: { type: Number, default: 0 },
    address: { type: String, default: '' },
    guardianName: { type: String, default: '' },
    guardianPhone: { type: String, default: '' },
    guardianRelation: { type: String, default: 'Parent' },
    examResults: [
      {
        subject: { type: String },
        grade: { type: String },
        marks: { type: String },
        semester: { type: String }
      }
    ],
    recentAttendance: [
      {
        date: { type: String },
        status: { type: String, enum: ['Present', 'Late', 'Absent'] }
      }
    ]
  },
  { timestamps: true }
);

export const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
