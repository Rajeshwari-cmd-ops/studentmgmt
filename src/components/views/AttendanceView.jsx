import React, { useState, useMemo } from 'react';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Save,
  Users,
  Percent,
  Check,
  RotateCcw
} from 'lucide-react';
import { useToast } from '../common/Toast';

export const AttendanceView = ({
  students = [],
  courses = [],
  attendanceLogs = {},
  onSaveAttendanceLogs
}) => {
  const { addToast } = useToast();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedCourse, setSelectedCourse] = useState(
    courses[0]?.title || 'B.Tech in Artificial Intelligence'
  );
  const [selectedSemester, setSelectedSemester] = useState('Semester 6');

  // Filter students based on selected course/semester or all active students
  const filteredStudents = useMemo(() => {
    const list = students.filter(
      (s) => s.status === 'Active' && (selectedCourse === 'All' || s.course === selectedCourse)
    );
    return list.length > 0 ? list : students.filter((s) => s.status === 'Active');
  }, [students, selectedCourse]);

  // Attendance state map: studentId -> 'Present' | 'Absent' | 'Late'
  const logKey = `${selectedDate}_${selectedCourse}_${selectedSemester}`;

  const [attendanceState, setAttendanceState] = useState(() => {
    if (attendanceLogs[logKey]) {
      return attendanceLogs[logKey];
    }
    // Default everyone to 'Present'
    const initial = {};
    students.forEach((s) => {
      initial[s.id] = 'Present';
    });
    return initial;
  });

  // Calculate metrics
  const totalCount = filteredStudents.length;
  const presentCount = filteredStudents.filter((s) => attendanceState[s.id] === 'Present').length;
  const absentCount = filteredStudents.filter((s) => attendanceState[s.id] === 'Absent').length;
  const lateCount = filteredStudents.filter((s) => attendanceState[s.id] === 'Late').length;

  const presentPercentage = totalCount
    ? Math.round(((presentCount + lateCount * 0.5) / totalCount) * 100)
    : 100;

  const handleStatusChange = (studentId, status) => {
    setAttendanceState((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status) => {
    const updated = { ...attendanceState };
    filteredStudents.forEach((s) => {
      updated[s.id] = status;
    });
    setAttendanceState(updated);
    addToast(`Marked all ${filteredStudents.length} students as ${status}.`, 'info');
  };

  const handleSaveAttendance = () => {
    const updatedLogs = {
      ...attendanceLogs,
      [logKey]: attendanceState
    };
    onSaveAttendanceLogs(updatedLogs);
    addToast(
      `Attendance for ${selectedCourse} (${selectedDate}) saved successfully!`,
      'success'
    );
  };

  return (
    <div className="view-container">
      {/* View Header */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-heading">Daily Attendance Register</h2>
          <p className="view-subheading">
            Track student classroom presence, log excused/unexcused absences, and monitor attendance percentages.
          </p>
        </div>
        <div className="view-header-actions">
          <button className="btn btn-primary" onClick={handleSaveAttendance}>
            <Save size={16} />
            <span>Save Attendance Register</span>
          </button>
        </div>
      </div>

      {/* Control Card: Date & Course Selectors */}
      <div className="filters-card">
        <div className="filter-dropdowns-row full-width">
          <div className="filter-select-group">
            <label>Attendance Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
          </div>

          <div className="filter-select-group">
            <label>Course / Program:</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="All">All Enrolled Courses</option>
              {courses.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-select-group">
            <label>Semester Term:</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
              <option value="Semester 3">Semester 3</option>
              <option value="Semester 4">Semester 4</option>
              <option value="Semester 5">Semester 5</option>
              <option value="Semester 6">Semester 6</option>
              <option value="Semester 7">Semester 7</option>
              <option value="Semester 8">Semester 8</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Total Roster Count</span>
            <div className="kpi-icon-box bg-indigo-subtle text-indigo">
              <Users size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">{totalCount}</span>
            <span className="kpi-tag neutral">Students</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Present Count</span>
            <div className="kpi-icon-box bg-emerald-subtle text-emerald">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-emerald">{presentCount}</span>
            <span className="kpi-tag positive">In Class</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Absent Count</span>
            <div className="kpi-icon-box bg-rose-subtle text-rose">
              <XCircle size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-rose">{absentCount}</span>
            <span className="kpi-tag highlight">Absences</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Day Regularity Rate</span>
            <div className="kpi-icon-box bg-sky-subtle text-sky">
              <Percent size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">{presentPercentage}%</span>
            <span className="kpi-tag positive">Compliance</span>
          </div>
        </div>
      </div>

      {/* Attendance Sheet Card */}
      <div className="dashboard-card">
        <div className="card-header-clean">
          <div>
            <h3 className="card-heading">
              Roll Call Roster ({selectedDate})
            </h3>
            <p className="card-sub">
              Click status toggles below to mark student attendance.
            </p>
          </div>

          <div className="attendance-bulk-buttons">
            <button
              className="btn btn-xs btn-outline"
              onClick={() => handleMarkAll('Present')}
            >
              <Check size={14} />
              <span>Mark All Present</span>
            </button>
            <button
              className="btn btn-xs btn-outline"
              onClick={() => handleMarkAll('Absent')}
            >
              <XCircle size={14} />
              <span>Mark All Absent</span>
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="clean-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Roll ID</th>
                <th>Course & Sem</th>
                <th>Overall Rate</th>
                <th className="text-center">Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s, index) => {
                const currentStatus = attendanceState[s.id] || 'Present';

                return (
                  <tr key={s.id}>
                    <td>
                      <span className="text-muted text-xs">{index + 1}</span>
                    </td>
                    <td>
                      <div className="table-user-cell">
                        <img src={s.photo} alt={s.name} className="table-avatar" />
                        <div>
                          <strong className="user-name">{s.name}</strong>
                          <span className="user-sub">{s.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="font-mono text-xs font-bold text-navy">{s.id}</span>
                    </td>
                    <td>
                      <div className="cell-multiline">
                        <strong>{s.course}</strong>
                        <span className="text-muted text-xs">{s.semester}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{s.attendanceRate || 95}%</span>
                    </td>
                    <td className="text-center">
                      <div className="attendance-toggle-group">
                        <button
                          className={`att-toggle-btn present ${
                            currentStatus === 'Present' ? 'active' : ''
                          }`}
                          onClick={() => handleStatusChange(s.id, 'Present')}
                        >
                          <CheckCircle2 size={15} />
                          <span>Present</span>
                        </button>

                        <button
                          className={`att-toggle-btn late ${
                            currentStatus === 'Late' ? 'active' : ''
                          }`}
                          onClick={() => handleStatusChange(s.id, 'Late')}
                        >
                          <Clock size={15} />
                          <span>Late</span>
                        </button>

                        <button
                          className={`att-toggle-btn absent ${
                            currentStatus === 'Absent' ? 'active' : ''
                          }`}
                          onClick={() => handleStatusChange(s.id, 'Absent')}
                        >
                          <XCircle size={15} />
                          <span>Absent</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="card-footer-action">
          <button className="btn btn-primary btn-md" onClick={handleSaveAttendance}>
            <Save size={16} />
            <span>Save & Finalize Today's Attendance</span>
          </button>
        </div>
      </div>
    </div>
  );
};
