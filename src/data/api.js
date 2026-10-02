import { Storage } from './storage';
import {
  INITIAL_STUDENTS,
  INITIAL_COURSES,
  INITIAL_EXAMS,
  INITIAL_TEACHERS,
  INITIAL_FEES,
  INITIAL_SETTINGS
} from './mockData';

const BASE_URL = '/api';

// Helper for fetch requests
async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.warn(`[API] Fetch failed for ${endpoint}:`, err.message);
    throw err;
  }
}

export const API = {
  // Check backend & DB status
  checkHealth: async () => {
    try {
      return await request('/health');
    } catch {
      return { status: 'disconnected' };
    }
  },

  // Initial Sync / Seed into MongoDB
  syncDatabase: async () => {
    try {
      const existingStudents = await request('/students');
      if (!existingStudents || existingStudents.length === 0) {
        console.log('[API] Seeding initial data to MongoDB Atlas...');
        await request('/seed', {
          method: 'POST',
          body: JSON.stringify({
            students: Storage.getStudents() || INITIAL_STUDENTS,
            courses: Storage.getCourses() || INITIAL_COURSES,
            exams: Storage.getExams() || INITIAL_EXAMS,
            teachers: Storage.getTeachers() || INITIAL_TEACHERS,
            fees: Storage.getFees() || INITIAL_FEES,
            settings: Storage.getSettings() || INITIAL_SETTINGS
          })
        });
      }
    } catch (err) {
      console.warn('[API] Sync/Seed skipped (offline mode):', err.message);
    }
  },

  // Students
  getStudents: async () => {
    try {
      const data = await request('/students');
      Storage.saveStudents(data);
      return data;
    } catch {
      return Storage.getStudents();
    }
  },

  saveStudent: async (studentData) => {
    try {
      const saved = await request('/students', {
        method: 'POST',
        body: JSON.stringify(studentData)
      });
      return saved;
    } catch {
      // Local fallback
      const current = Storage.getStudents();
      const updated = current.some((s) => s.id === studentData.id)
        ? current.map((s) => (s.id === studentData.id ? { ...s, ...studentData } : s))
        : [studentData, ...current];
      Storage.saveStudents(updated);
      return studentData;
    }
  },

  deleteStudent: async (id) => {
    try {
      await request(`/students/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('[API] Delete student fallback to local:', err.message);
    }
    const updated = Storage.getStudents().filter((s) => s.id !== id);
    Storage.saveStudents(updated);
    return updated;
  },

  // Courses
  getCourses: async () => {
    try {
      const data = await request('/courses');
      Storage.saveCourses(data);
      return data;
    } catch {
      return Storage.getCourses();
    }
  },

  saveCourse: async (courseData) => {
    try {
      return await request('/courses', {
        method: 'POST',
        body: JSON.stringify(courseData)
      });
    } catch {
      const current = Storage.getCourses();
      const updated = current.some((c) => c.id === courseData.id)
        ? current.map((c) => (c.id === courseData.id ? { ...c, ...courseData } : c))
        : [courseData, ...current];
      Storage.saveCourses(updated);
      return courseData;
    }
  },

  deleteCourse: async (id) => {
    try {
      await request(`/courses/${id}`, { method: 'DELETE' });
    } catch {}
    const updated = Storage.getCourses().filter((c) => c.id !== id);
    Storage.saveCourses(updated);
    return updated;
  },

  // Exams
  getExams: async () => {
    try {
      const data = await request('/exams');
      Storage.saveExams(data);
      return data;
    } catch {
      return Storage.getExams();
    }
  },

  saveExam: async (examData) => {
    try {
      return await request('/exams', {
        method: 'POST',
        body: JSON.stringify(examData)
      });
    } catch {
      const current = Storage.getExams();
      const updated = current.some((e) => e.id === examData.id)
        ? current.map((e) => (e.id === examData.id ? { ...e, ...examData } : e))
        : [examData, ...current];
      Storage.saveExams(updated);
      return examData;
    }
  },

  deleteExam: async (id) => {
    try {
      await request(`/exams/${id}`, { method: 'DELETE' });
    } catch {}
    const updated = Storage.getExams().filter((e) => e.id !== id);
    Storage.saveExams(updated);
    return updated;
  },

  // Teachers
  getTeachers: async () => {
    try {
      const data = await request('/teachers');
      Storage.saveTeachers(data);
      return data;
    } catch {
      return Storage.getTeachers();
    }
  },

  saveTeacher: async (teacherData) => {
    try {
      return await request('/teachers', {
        method: 'POST',
        body: JSON.stringify(teacherData)
      });
    } catch {
      const current = Storage.getTeachers();
      const updated = current.some((t) => t.id === teacherData.id)
        ? current.map((t) => (t.id === teacherData.id ? { ...t, ...teacherData } : t))
        : [teacherData, ...current];
      Storage.saveTeachers(updated);
      return teacherData;
    }
  },

  deleteTeacher: async (id) => {
    try {
      await request(`/teachers/${id}`, { method: 'DELETE' });
    } catch {}
    const updated = Storage.getTeachers().filter((t) => t.id !== id);
    Storage.saveTeachers(updated);
    return updated;
  },

  // Fees
  getFees: async () => {
    try {
      const data = await request('/fees');
      Storage.saveFees(data);
      return data;
    } catch {
      return Storage.getFees();
    }
  },

  saveFee: async (feeData) => {
    try {
      return await request('/fees', {
        method: 'POST',
        body: JSON.stringify(feeData)
      });
    } catch {
      const current = Storage.getFees();
      const updated = current.some((f) => f.id === feeData.id)
        ? current.map((f) => (f.id === feeData.id ? { ...f, ...feeData } : f))
        : [feeData, ...current];
      Storage.saveFees(updated);
      return feeData;
    }
  },

  // Settings
  getSettings: async () => {
    try {
      const data = await request('/settings');
      Storage.saveSettings(data);
      return data;
    } catch {
      return Storage.getSettings();
    }
  },

  saveSettings: async (settingsData) => {
    try {
      return await request('/settings', {
        method: 'POST',
        body: JSON.stringify(settingsData)
      });
    } catch {
      Storage.saveSettings(settingsData);
      return settingsData;
    }
  },

  // Attendance
  getAttendanceLogs: async () => {
    try {
      const data = await request('/attendance');
      Storage.saveAttendanceLogs(data);
      return data;
    } catch {
      return Storage.getAttendanceLogs();
    }
  },

  saveAttendanceLog: async (date, records) => {
    try {
      return await request('/attendance', {
        method: 'POST',
        body: JSON.stringify({ date, records })
      });
    } catch {
      const current = Storage.getAttendanceLogs();
      const updated = { ...current, [date]: records };
      Storage.saveAttendanceLogs(updated);
      return { date, records };
    }
  },

  // Inquiries / Contact Messages
  submitInquiry: async (inquiryData) => {
    try {
      return await request('/inquiries', {
        method: 'POST',
        body: JSON.stringify(inquiryData)
      });
    } catch (err) {
      console.warn('[API] Inquiry stored locally due to network:', err);
      return inquiryData;
    }
  }
};
