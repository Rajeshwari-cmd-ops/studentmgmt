import mongoose from 'mongoose';

const FeeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    course: { type: String, required: true },
    department: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    pendingAmount: { type: Number, default: 0 },
    dueDate: { type: String, default: '' },
    status: { type: String, enum: ['Paid', 'Pending', 'Overdue', 'Partial'], default: 'Pending' },
    lastPaymentDate: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Fee = mongoose.models.Fee || mongoose.model('Fee', FeeSchema);
