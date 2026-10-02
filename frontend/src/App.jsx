import React, { useState, useEffect } from 'react';
import { Storage } from './data/storage';
import { API } from './data/api';
import { ToastProvider, useToast } from './components/common/Toast';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

// Institutional Landing Page Components
import { InstHeader } from './components/institutional/InstHeader';
import { InstHero } from './components/institutional/InstHero';
import { InstAbout } from './components/institutional/InstAbout';
import { InstAcademics } from './components/institutional/InstAcademics';
import { InstWhyFIC } from './components/institutional/InstWhyFIC';
import { InstStudentExperience } from './components/institutional/InstStudentExperience';
import { InstNotices } from './components/institutional/InstNotices';
import { InstPortalShowcase } from './components/institutional/InstPortalShowcase';
import { InstStatistics } from './components/institutional/InstStatistics';
import { InstTestimonials } from './components/institutional/InstTestimonials';
import { InstCTA } from './components/institutional/InstCTA';
import { InstFooter } from './components/institutional/InstFooter';
import { InstContactModal } from './components/institutional/InstContactModal';

// Student Management Portal Views
import { DashboardView } from './components/views/DashboardView';
import { StudentsView } from './components/views/StudentsView';
import { AttendanceView } from './components/views/AttendanceView';
import { CoursesView } from './components/views/CoursesView';
import { ExamsView } from './components/views/ExamsView';
import { FeesView } from './components/views/FeesView';
import { TeachersView } from './components/views/TeachersView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';

import { ArrowLeft, GraduationCap, ShieldCheck, ExternalLink } from 'lucide-react';

const MainApp = () => {
  const { addToast } = useToast();

  // Primary View Mode: 'institutional' (Public Website) or 'portal' (Student Management System)
  const [viewMode, setViewMode] = useState('institutional');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Portal Navigation Tab
  const [portalTab, setPortalTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Persistent State
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [fees, setFees] = useState([]);
  const [settings, setSettings] = useState({});
  const [attendanceLogs, setAttendanceLogs] = useState({});
  const [dbStatus, setDbStatus] = useState('connecting');

  // Active Student for Dossier Modal
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState(null);

  // Initial Load from MongoDB Atlas with fallback to LocalStorage
  useEffect(() => {
    // 1. Instant local load
    setStudents(Storage.getStudents());
    setCourses(Storage.getCourses());
    setExams(Storage.getExams());
    setTeachers(Storage.getTeachers());
    setFees(Storage.getFees());
    setSettings(Storage.getSettings());
    setAttendanceLogs(Storage.getAttendanceLogs());

    // 2. Asynchronously sync with MongoDB Atlas
    const fetchFromMongoDB = async () => {
      try {
        const health = await API.checkHealth();
        if (health.status === 'connected') {
          setDbStatus('connected');
          await API.syncDatabase();
          const [stu, crs, exm, tch, fe, stg, att] = await Promise.all([
            API.getStudents(),
            API.getCourses(),
            API.getExams(),
            API.getTeachers(),
            API.getFees(),
            API.getSettings(),
            API.getAttendanceLogs()
          ]);
          if (stu && stu.length > 0) setStudents(stu);
          if (crs && crs.length > 0) setCourses(crs);
          if (exm && exm.length > 0) setExams(exm);
          if (tch && tch.length > 0) setTeachers(tch);
          if (fe && fe.length > 0) setFees(fe);
          if (stg && Object.keys(stg).length > 0) setSettings(stg);
          if (att && Object.keys(att).length > 0) setAttendanceLogs(att);
        } else {
          setDbStatus('disconnected');
        }
      } catch (err) {
        console.warn('MongoDB Atlas async load notice:', err.message);
        setDbStatus('disconnected');
      }
    };

    fetchFromMongoDB();
  }, []);

  // Handlers for Student CRUD
  const handleSaveStudent = async (studentData) => {
    const exists = students.some((s) => s.id === studentData.id);
    let updated;

    if (exists) {
      updated = students.map((s) => (s.id === studentData.id ? { ...s, ...studentData } : s));
      addToast(`Updated student record: ${studentData.name}.`, 'success');
    } else {
      updated = [studentData, ...students];
      addToast(`Enrolled new student: ${studentData.name}.`, 'success');

      // Add fee entry
      const newFeeRecord = {
        id: `FEE-${Date.now().toString().slice(-4)}`,
        studentId: studentData.id,
        studentName: studentData.name,
        course: studentData.course,
        department: studentData.department,
        totalAmount: 65000,
        paidAmount: 65000,
        pendingAmount: 0,
        dueDate: '2026-10-15',
        status: 'Paid',
        lastPaymentDate: new Date().toISOString().split('T')[0]
      };
      const updatedFees = [newFeeRecord, ...fees];
      setFees(updatedFees);
      Storage.saveFees(updatedFees);
      API.saveFee(newFeeRecord).catch(() => {});
    }

    setStudents(updated);
    Storage.saveStudents(updated);
    API.saveStudent(studentData).catch(() => {});
  };

  const handleDeleteStudent = async (studentId) => {
    const student = students.find((s) => s.id === studentId);
    const updated = students.filter((s) => s.id !== studentId);
    setStudents(updated);
    Storage.saveStudents(updated);
    API.deleteStudent(studentId).catch(() => {});
    addToast(`Removed student record: ${student?.name || studentId}`, 'info');
  };

  // Handlers for Course CRUD
  const handleSaveCourse = async (courseData) => {
    const exists = courses.some((c) => c.id === courseData.id);
    let updated;
    if (exists) {
      updated = courses.map((c) => (c.id === courseData.id ? courseData : c));
      addToast(`Curriculum updated: ${courseData.title}`, 'success');
    } else {
      updated = [courseData, ...courses];
      addToast(`New program added: ${courseData.title}`, 'success');
    }
    setCourses(updated);
    Storage.saveCourses(updated);
    API.saveCourse(courseData).catch(() => {});
  };

  const handleDeleteCourse = async (courseId) => {
    const updated = courses.filter((c) => c.id !== courseId);
    setCourses(updated);
    Storage.saveCourses(updated);
    API.deleteCourse(courseId).catch(() => {});
    addToast('Course removed from curriculum.', 'info');
  };

  // Handlers for Exam CRUD
  const handleSaveExam = async (examData) => {
    const exists = exams.some((e) => e.id === examData.id);
    let updated;
    if (exists) {
      updated = exams.map((e) => (e.id === examData.id ? examData : e));
      addToast(`Assessment updated: ${examData.subject}`, 'success');
    } else {
      updated = [examData, ...exams];
      addToast(`Assessment scheduled: ${examData.subject}`, 'success');
    }
    setExams(updated);
    Storage.saveExams(updated);
    API.saveExam(examData).catch(() => {});
  };

  const handleDeleteExam = async (examId) => {
    const updated = exams.filter((e) => e.id !== examId);
    setExams(updated);
    Storage.saveExams(updated);
    API.deleteExam(examId).catch(() => {});
    addToast('Exam assessment cancelled.', 'info');
  };

  // Handlers for Teachers CRUD
  const handleSaveTeacher = async (teacherData) => {
    const exists = teachers.some((t) => t.id === teacherData.id);
    let updated;
    if (exists) {
      updated = teachers.map((t) => (t.id === teacherData.id ? teacherData : t));
      addToast(`Faculty profile updated: ${teacherData.name}`, 'success');
    } else {
      updated = [teacherData, ...teachers];
      addToast(`Faculty member registered: ${teacherData.name}`, 'success');
    }
    setTeachers(updated);
    Storage.saveTeachers(updated);
    API.saveTeacher(teacherData).catch(() => {});
  };

  const handleDeleteTeacher = async (teacherId) => {
    const updated = teachers.filter((t) => t.id !== teacherId);
    setTeachers(updated);
    Storage.saveTeachers(updated);
    API.deleteTeacher(teacherId).catch(() => {});
    addToast('Faculty member removed from directory.', 'info');
  };

  const handleUpdateFees = async (updatedFees) => {
    setFees(updatedFees);
    Storage.saveFees(updatedFees);
    for (const f of updatedFees) {
      API.saveFee(f).catch(() => {});
    }
  };

  const handleSaveAttendanceLogs = async (updatedLogs) => {
    setAttendanceLogs(updatedLogs);
    Storage.saveAttendanceLogs(updatedLogs);
    for (const [date, records] of Object.entries(updatedLogs)) {
      API.saveAttendanceLog(date, records).catch(() => {});
    }
  };

  const handleSaveSettings = async (updatedSettings) => {
    setSettings(updatedSettings);
    Storage.saveSettings(updatedSettings);
    API.saveSettings(updatedSettings).catch(() => {});
  };

  const handleResetAllData = async () => {
    Storage.resetToDefault();
    setStudents(Storage.getStudents());
    setCourses(Storage.getCourses());
    setExams(Storage.getExams());
    setTeachers(Storage.getTeachers());
    setFees(Storage.getFees());
    setSettings(Storage.getSettings());
    setAttendanceLogs(Storage.getAttendanceLogs());
    await API.syncDatabase();
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fic-root-app">
      {viewMode === 'institutional' ? (
        /* ================= INSTITUTIONAL LANDING PAGE ================= */
        <div className="institutional-site-wrapper">
          <InstHeader
            onOpenPortal={() => {
              setViewMode('portal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenContact={() => setIsContactModalOpen(true)}
            onNavigateSection={scrollToSection}
          />

          <main>
            <InstHero
              onOpenPortal={() => {
                setViewMode('portal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExplore={() => scrollToSection('about')}
            />

            <InstAbout
              onExploreAcademics={() => scrollToSection('academics')}
            />

            <InstAcademics />

            <InstWhyFIC />

            <InstStudentExperience />

            <InstNotices />

            <InstPortalShowcase
              onOpenPortal={() => {
                setViewMode('portal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <InstStatistics />

            <InstTestimonials />

            <InstCTA
              onOpenPortal={() => {
                setViewMode('portal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenContact={() => setIsContactModalOpen(true)}
            />
          </main>

          <InstFooter
            onOpenPortal={() => {
              setViewMode('portal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenContact={() => setIsContactModalOpen(true)}
            onNavigateSection={scrollToSection}
          />

          <InstContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
          />
        </div>
      ) : (
        /* ================= STUDENT MANAGEMENT PORTAL ================= */
        <div className="portal-experience-wrapper">
          {/* Top Return Bar */}
          <div className="portal-top-banner">
            <div className="portal-top-inner">
              <button
                className="btn-return-home"
                onClick={() => {
                  setViewMode('institutional');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <ArrowLeft size={16} />
                <span>Return to FIC Institute Website</span>
              </button>
              <div className="portal-banner-badge">
                <ShieldCheck size={14} />
                <span>FIC Institute Academic Portal • Session 2026–27</span>
              </div>
            </div>
          </div>

          <div className="app-container">
            {/* Sidebar Navigation */}
            <Sidebar
              activeTab={portalTab}
              onSelectTab={setPortalTab}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              counts={{
                students: students.length,
                courses: courses.length,
                exams: exams.length,
                teachers: teachers.length
              }}
            />

            {/* Main Content Area */}
            <div className="app-main-wrapper">
              <Header
                activeTab={portalTab}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                onQuickAddStudent={() => setPortalTab('students')}
                settings={settings}
                students={students}
                onSelectStudent={(stu) => {
                  setSelectedStudentForDetail(stu);
                  setPortalTab('students');
                }}
              />

              <main className="app-main-content">
                {portalTab === 'dashboard' && (
                  <DashboardView
                    students={students}
                    fees={fees}
                    exams={exams}
                    courses={courses}
                    onNavigate={setPortalTab}
                    onViewStudent={(stu) => {
                      setSelectedStudentForDetail(stu);
                      setPortalTab('students');
                    }}
                    onOpenAddStudent={() => setPortalTab('students')}
                  />
                )}

                {portalTab === 'students' && (
                  <StudentsView
                    students={students}
                    onSaveStudent={handleSaveStudent}
                    onDeleteStudent={handleDeleteStudent}
                    courses={courses}
                    selectedStudentForDetail={selectedStudentForDetail}
                    onCloseDetailModal={() => setSelectedStudentForDetail(null)}
                    onOpenDetailModal={setSelectedStudentForDetail}
                  />
                )}

                {portalTab === 'attendance' && (
                  <AttendanceView
                    students={students}
                    courses={courses}
                    attendanceLogs={attendanceLogs}
                    onSaveAttendanceLogs={handleSaveAttendanceLogs}
                  />
                )}

                {portalTab === 'courses' && (
                  <CoursesView
                    courses={courses}
                    onSaveCourse={handleSaveCourse}
                    onDeleteCourse={handleDeleteCourse}
                  />
                )}

                {portalTab === 'exams' && (
                  <ExamsView
                    exams={exams}
                    onSaveExam={handleSaveExam}
                    onDeleteExam={handleDeleteExam}
                  />
                )}

                {portalTab === 'fees' && (
                  <FeesView
                    fees={fees}
                    onUpdateFees={handleUpdateFees}
                  />
                )}

                {portalTab === 'teachers' && (
                  <TeachersView
                    teachers={teachers}
                    onSaveTeacher={handleSaveTeacher}
                    onDeleteTeacher={handleDeleteTeacher}
                  />
                )}

                {portalTab === 'reports' && (
                  <ReportsView
                    students={students}
                    fees={fees}
                    courses={courses}
                  />
                )}

                {portalTab === 'settings' && (
                  <SettingsView
                    settings={settings}
                    onSaveSettings={handleSaveSettings}
                    onResetAllData={handleResetAllData}
                  />
                )}
              </main>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const App = () => {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
};

export default App;
