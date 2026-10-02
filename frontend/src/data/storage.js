import {
  INITIAL_STUDENTS,
  INITIAL_COURSES,
  INITIAL_EXAMS,
  INITIAL_TEACHERS,
  INITIAL_FEES,
  INITIAL_SETTINGS
} from './mockData';

const KEYS = {
  STUDENTS: 'edupulse_students_v1',
  COURSES: 'edupulse_courses_v1',
  EXAMS: 'edupulse_exams_v1',
  TEACHERS: 'edupulse_teachers_v1',
  FEES: 'edupulse_fees_v1',
  SETTINGS: 'edupulse_settings_v1',
  ATTENDANCE_LOGS: 'edupulse_attendance_logs_v1'
};

function getStored(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item);
  } catch (err) {
    console.error('LocalStorage read error:', err);
    return fallback;
  }
}

function setStored(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
}

export const Storage = {
  getStudents: () => getStored(KEYS.STUDENTS, INITIAL_STUDENTS),
  saveStudents: (data) => setStored(KEYS.STUDENTS, data),

  getCourses: () => getStored(KEYS.COURSES, INITIAL_COURSES),
  saveCourses: (data) => setStored(KEYS.COURSES, data),

  getExams: () => getStored(KEYS.EXAMS, INITIAL_EXAMS),
  saveExams: (data) => setStored(KEYS.EXAMS, data),

  getTeachers: () => getStored(KEYS.TEACHERS, INITIAL_TEACHERS),
  saveTeachers: (data) => setStored(KEYS.TEACHERS, data),

  getFees: () => getStored(KEYS.FEES, INITIAL_FEES),
  saveFees: (data) => setStored(KEYS.FEES, data),

  getSettings: () => getStored(KEYS.SETTINGS, INITIAL_SETTINGS),
  saveSettings: (data) => setStored(KEYS.SETTINGS, data),

  getAttendanceLogs: () => getStored(KEYS.ATTENDANCE_LOGS, {}),
  saveAttendanceLogs: (data) => setStored(KEYS.ATTENDANCE_LOGS, data),

  resetToDefault: () => {
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
    localStorage.setItem(KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
    localStorage.setItem(KEYS.EXAMS, JSON.stringify(INITIAL_EXAMS));
    localStorage.setItem(KEYS.TEACHERS, JSON.stringify(INITIAL_TEACHERS));
    localStorage.setItem(KEYS.FEES, JSON.stringify(INITIAL_FEES));
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    localStorage.setItem(KEYS.ATTENDANCE_LOGS, JSON.stringify({}));
  }
};
