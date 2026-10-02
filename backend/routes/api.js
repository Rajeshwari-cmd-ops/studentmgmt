import express from 'express';
import mongoose from 'mongoose';
import { Student } from '../models/Student.js';
import { Course } from '../models/Course.js';
import { Exam } from '../models/Exam.js';
import { Teacher } from '../models/Teacher.js';
import { Fee } from '../models/Fee.js';
import { Setting } from '../models/Setting.js';
import { AttendanceLog } from '../models/Attendance.js';
import { Inquiry } from '../models/Inquiry.js';

export const apiRouter = express.Router();

// Health & Database Connection Status
apiRouter.get('/health', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    status: isConnected ? 'connected' : 'disconnected',
    database: isConnected ? mongoose.connection.name : null,
    host: isConnected ? mongoose.connection.host : null,
    timestamp: new Date().toISOString()
  });
});

// Seed Initial Data Endpoint
apiRouter.post('/seed', async (req, res) => {
  try {
    const { students, courses, exams, teachers, fees, settings } = req.body;

    if (students && Array.isArray(students)) {
      for (const item of students) {
        await Student.findOneAndUpdate({ id: item.id }, item, { upsert: true, new: true });
      }
    }
    if (courses && Array.isArray(courses)) {
      for (const item of courses) {
        await Course.findOneAndUpdate({ id: item.id }, item, { upsert: true, new: true });
      }
    }
    if (exams && Array.isArray(exams)) {
      for (const item of exams) {
        await Exam.findOneAndUpdate({ id: item.id }, item, { upsert: true, new: true });
      }
    }
    if (teachers && Array.isArray(teachers)) {
      for (const item of teachers) {
        await Teacher.findOneAndUpdate({ id: item.id }, item, { upsert: true, new: true });
      }
    }
    if (fees && Array.isArray(fees)) {
      for (const item of fees) {
        await Fee.findOneAndUpdate({ id: item.id }, item, { upsert: true, new: true });
      }
    }
    if (settings && typeof settings === 'object') {
      await Setting.findOneAndUpdate({ key: 'global_config' }, settings, { upsert: true, new: true });
    }

    res.json({ success: true, message: 'Database seeded successfully' });
  } catch (err) {
    console.error('[Seed Error]', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// Students CRUD
// ==========================================
apiRouter.get('/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/students', async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { id: req.body.id },
      req.body,
      { upsert: true, new: true, runValidators: true }
    );
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

apiRouter.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

apiRouter.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ id: req.params.id });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// Courses CRUD
// ==========================================
apiRouter.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/courses', async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { id: req.body.id },
      req.body,
      { upsert: true, new: true }
    );
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

apiRouter.put('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

apiRouter.delete('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ id: req.params.id });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json({ success: true, message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// Exams CRUD
// ==========================================
apiRouter.get('/exams', async (req, res) => {
  try {
    const exams = await Exam.find().sort({ date: 1 });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/exams', async (req, res) => {
  try {
    const exam = await Exam.findOneAndUpdate(
      { id: req.body.id },
      req.body,
      { upsert: true, new: true }
    );
    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

apiRouter.put('/exams/:id', async (req, res) => {
  try {
    const exam = await Exam.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    res.json(exam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

apiRouter.delete('/exams/:id', async (req, res) => {
  try {
    const exam = await Exam.findOneAndDelete({ id: req.params.id });
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    res.json({ success: true, message: 'Exam deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// Teachers CRUD
// ==========================================
apiRouter.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/teachers', async (req, res) => {
  try {
    const teacher = await Teacher.findOneAndUpdate(
      { id: req.body.id },
      req.body,
      { upsert: true, new: true }
    );
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

apiRouter.put('/teachers/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

apiRouter.delete('/teachers/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findOneAndDelete({ id: req.params.id });
    if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
    res.json({ success: true, message: 'Teacher deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// Fees CRUD
// ==========================================
apiRouter.get('/fees', async (req, res) => {
  try {
    const fees = await Fee.find().sort({ createdAt: -1 });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/fees', async (req, res) => {
  try {
    const fee = await Fee.findOneAndUpdate(
      { id: req.body.id },
      req.body,
      { upsert: true, new: true }
    );
    res.status(201).json(fee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

apiRouter.put('/fees/:id', async (req, res) => {
  try {
    const fee = await Fee.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!fee) return res.status(404).json({ error: 'Fee record not found' });
    res.json(fee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

apiRouter.delete('/fees/:id', async (req, res) => {
  try {
    const fee = await Fee.findOneAndDelete({ id: req.params.id });
    if (!fee) return res.status(404).json({ error: 'Fee record not found' });
    res.json({ success: true, message: 'Fee record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// Settings
// ==========================================
apiRouter.get('/settings', async (req, res) => {
  try {
    let settings = await Setting.findOne({ key: 'global_config' });
    if (!settings) {
      settings = await Setting.create({ key: 'global_config' });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/settings', async (req, res) => {
  try {
    const settings = await Setting.findOneAndUpdate(
      { key: 'global_config' },
      req.body,
      { upsert: true, new: true }
    );
    res.json(settings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================
// Attendance Logs
// ==========================================
apiRouter.get('/attendance', async (req, res) => {
  try {
    const logs = await AttendanceLog.find();
    const formatted = {};
    logs.forEach((log) => {
      formatted[log.date] = Object.fromEntries(log.records);
    });
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/attendance', async (req, res) => {
  try {
    const { date, records } = req.body;
    if (!date || !records) {
      return res.status(400).json({ error: 'Date and records required' });
    }
    const log = await AttendanceLog.findOneAndUpdate(
      { date },
      { date, records },
      { upsert: true, new: true }
    );
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================
// Admissions / Contact Inquiries
// ==========================================
apiRouter.get('/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/inquiries', async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json(inquiry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
