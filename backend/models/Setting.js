import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'global_config' },
    institutionName: { type: String, default: 'FIC Institute' },
    tagline: { type: String, default: 'Learning Today. Building Tomorrow.' },
    contactEmail: { type: String, default: 'admissions@fic-institute.edu.in' },
    contactPhone: { type: String, default: '+91 (0) 11 4567 8900' },
    address: { type: String, default: 'FIC Knowledge Park Campus, Institutional Area, Sector 62, New Delhi NCR, India' },
    currentTerm: { type: String, default: 'Fall 2026' },
    adminName: { type: String, default: 'Dr. Eleanor Ward' },
    adminRole: { type: String, default: 'Dean of Academic Affairs' },
    passingGrade: { type: String, default: '40%' },
    minAttendance: { type: String, default: '75%' }
  },
  { timestamps: true }
);

export const Setting = mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
