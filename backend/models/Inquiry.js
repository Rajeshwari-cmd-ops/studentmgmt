import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    program: { type: String, default: 'General Inquiry' },
    message: { type: String, required: true },
    status: { type: String, enum: ['New', 'In Review', 'Resolved'], default: 'New' }
  },
  { timestamps: true }
);

export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
