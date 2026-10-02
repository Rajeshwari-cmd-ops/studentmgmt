import React from 'react';
import {
  GraduationCap,
  UserCheck,
  Receipt,
  FileSpreadsheet,
  TrendingUp,
  ArrowRight,
  UserPlus,
  CalendarCheck,
  CalendarPlus,
  CreditCard,
  Calendar,
  Clock,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const DashboardView = ({
  students = [],
  fees = [],
  exams = [],
  courses = [],
  onNavigate,
  onViewStudent,
  onOpenAddStudent
}) => {
  // Calculations
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  
  // Calculate average attendance
  const avgAttendance = totalStudents
    ? (students.reduce((acc, s) => acc + (s.attendanceRate || 0), 0) / totalStudents).toFixed(1)
    : 0;

  // Calculate fees summary
  const totalFeeReceivable = fees.reduce((acc, f) => acc + (Number(f.totalAmount) || 0), 0);
  const totalFeePaid = fees.reduce((acc, f) => acc + (Number(f.paidAmount) || 0), 0);
  const totalFeePending = fees.reduce((acc, f) => acc + (Number(f.pendingAmount) || 0), 0);
  const feeCollectionRate = totalFeeReceivable ? Math.round((totalFeePaid / totalFeeReceivable) * 100) : 0;

  // Upcoming Exams
  const upcomingExams = exams.slice(0, 3);
  const recentStudents = students.slice(0, 5);

  return (
    <div className="view-container">
      {/* Welcome Banner */}
      <div className="dashboard-hero-banner">
        <div className="hero-text-side">
          <div className="hero-pill">
            <ShieldCheck size={14} />
            <span>Academic Overview & Management</span>
          </div>
          <h2 className="hero-heading">Welcome to FIC Institute Portal</h2>
          <p className="hero-subtext">
            Centralized academic administration: manage enrollments, track real-time attendance, audit financial ledgers, and schedule assessments.
          </p>
        </div>
        <div className="hero-actions-side">
          <button className="btn btn-primary" onClick={onOpenAddStudent}>
            <UserPlus size={16} />
            <span>Enroll New Student</span>
          </button>
          <button className="btn btn-secondary" onClick={() => onNavigate('attendance')}>
            <CalendarCheck size={16} />
            <span>Mark Attendance</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="kpi-grid">
        {/* KPI 1: Total Students */}
        <div className="kpi-card" onClick={() => onNavigate('students')}>
          <div className="kpi-header">
            <span className="kpi-label">Total Enrolled Students</span>
            <div className="kpi-icon-box bg-blue-subtle text-accent-blue">
              <GraduationCap size={20} strokeWidth={2} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">{totalStudents}</span>
            <span className="kpi-tag positive">
              <TrendingUp size={13} /> {activeStudents} Active
            </span>
          </div>
          <div className="kpi-footer-link">
            <span>View directory</span>
            <ChevronRight size={14} />
          </div>
        </div>

        {/* KPI 2: Present Today */}
        <div className="kpi-card" onClick={() => onNavigate('attendance')}>
          <div className="kpi-header">
            <span className="kpi-label">Average Attendance</span>
            <div className="kpi-icon-box bg-green-subtle text-success">
              <UserCheck size={20} strokeWidth={2} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">{avgAttendance}%</span>
            <span className="kpi-tag neutral">Campus Average</span>
          </div>
          <div className="kpi-footer-link">
            <span>Open attendance register</span>
            <ChevronRight size={14} />
          </div>
        </div>

        {/* KPI 3: Pending Fees */}
        <div className="kpi-card" onClick={() => onNavigate('fees')}>
          <div className="kpi-header">
            <span className="kpi-label">Pending Tuition Dues</span>
            <div className="kpi-icon-box bg-amber-subtle text-warning">
              <Receipt size={20} strokeWidth={2} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">${totalFeePending.toLocaleString()}</span>
            <span className="kpi-tag highlight">
              {feeCollectionRate}% Collected
            </span>
          </div>
          <div className="kpi-footer-link">
            <span>Manage billing & invoices</span>
            <ChevronRight size={14} />
          </div>
        </div>

        {/* KPI 4: Upcoming Exams */}
        <div className="kpi-card" onClick={() => onNavigate('exams')}>
          <div className="kpi-header">
            <span className="kpi-label">Scheduled Exams</span>
            <div className="kpi-icon-box bg-primary-subtle text-primary">
              <FileSpreadsheet size={20} strokeWidth={2} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">{exams.length}</span>
            <span className="kpi-tag neutral">Active Term</span>
          </div>
          <div className="kpi-footer-link">
            <span>View exam calendar</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="dashboard-grid-2-1">
        {/* Left Column: Recent Students & Attendance Visualization */}
        <div className="dashboard-main-col">
          {/* Quick Actions Row */}
          <div className="dashboard-card">
            <div className="card-header-clean">
              <div>
                <h3 className="card-heading">Quick Actions</h3>
                <p className="card-sub">Frequently used administrative shortcuts</p>
              </div>
            </div>
            <div className="quick-actions-grid">
              <button className="quick-action-btn" onClick={onOpenAddStudent}>
                <div className="qa-icon bg-blue-subtle text-accent-blue">
                  <UserPlus size={18} />
                </div>
                <div className="qa-text">
                  <strong>Add Student</strong>
                  <span>Enroll new candidate</span>
                </div>
              </button>

              <button className="quick-action-btn" onClick={() => onNavigate('attendance')}>
                <div className="qa-icon bg-green-subtle text-success">
                  <CalendarCheck size={18} />
                </div>
                <div className="qa-text">
                  <strong>Mark Attendance</strong>
                  <span>Daily roll register</span>
                </div>
              </button>

              <button className="quick-action-btn" onClick={() => onNavigate('fees')}>
                <div className="qa-icon bg-amber-subtle text-warning">
                  <CreditCard size={18} />
                </div>
                <div className="qa-text">
                  <strong>Record Payment</strong>
                  <span>Issue fee receipt</span>
                </div>
              </button>

              <button className="quick-action-btn" onClick={() => onNavigate('exams')}>
                <div className="qa-icon bg-primary-subtle text-primary">
                  <CalendarPlus size={18} />
                </div>
                <div className="qa-text">
                  <strong>Schedule Exam</strong>
                  <span>Add assessment session</span>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Students Table Card */}
          <div className="dashboard-card">
            <div className="card-header-clean">
              <div>
                <h3 className="card-heading">Recent Student Admissions</h3>
                <p className="card-sub">Latest registered students with current academic standing</p>
              </div>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => onNavigate('students')}
              >
                <span>View All ({students.length})</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="table-responsive">
              <table className="clean-table">
                <thead>
                  <tr>
                    <th>Student Name & ID</th>
                    <th>Course & Department</th>
                    <th>Semester</th>
                    <th>CGPA</th>
                    <th>Status</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div className="table-user-cell">
                          <img src={s.photo} alt={s.name} className="table-avatar" />
                          <div>
                            <strong className="user-name">{s.name}</strong>
                            <span className="user-sub">{s.id}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="cell-multiline">
                          <strong>{s.course}</strong>
                          <span className="text-muted text-xs">{s.department}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-neutral">{s.semester}</span>
                      </td>
                      <td>
                        <strong className="text-primary font-bold">{s.cgpa ? s.cgpa.toFixed(2) : '-'}</strong>
                      </td>
                      <td>
                        <Badge
                          variant={
                            s.status === 'Active'
                              ? 'success'
                              : s.status === 'Inactive'
                              ? 'warning'
                              : 'neutral'
                          }
                        >
                          {s.status}
                        </Badge>
                      </td>
                      <td className="text-right">
                        <button
                          className="btn btn-xs btn-outline"
                          onClick={() => onViewStudent(s)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Fee Summary & Upcoming Exams */}
        <div className="dashboard-side-col">
          {/* Fee Collection Summary Card */}
          <div className="dashboard-card">
            <div className="card-header-clean">
              <div>
                <h3 className="card-heading">Fee Collection Summary</h3>
                <p className="card-sub">Current term revenue vs pending</p>
              </div>
              <Receipt size={18} className="text-secondary" />
            </div>
            <div className="fee-progress-block">
              <div className="fee-progress-header">
                <span className="text-sm font-semibold text-secondary">Collection Rate</span>
                <span className="text-sm font-bold text-primary">{feeCollectionRate}%</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${feeCollectionRate}%` }}
                />
              </div>

              <div className="fee-stat-rows">
                <div className="fee-stat-item">
                  <span className="fee-dot bg-indigo" />
                  <div className="fee-stat-text">
                    <span className="label">Total Invoiced</span>
                    <strong className="text-primary font-bold">${totalFeeReceivable.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="fee-stat-item">
                  <span className="fee-dot bg-emerald" />
                  <div className="fee-stat-text">
                    <span className="label">Amount Paid</span>
                    <strong className="text-success font-bold">${totalFeePaid.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="fee-stat-item">
                  <span className="fee-dot bg-amber" />
                  <div className="fee-stat-text">
                    <span className="label">Outstanding Dues</span>
                    <strong className="text-warning font-bold">${totalFeePending.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-outline btn-sm btn-block mt-4"
                onClick={() => onNavigate('fees')}
              >
                <span>Open Financial Ledger</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Upcoming Exams Card */}
          <div className="dashboard-card">
            <div className="card-header-clean">
              <div>
                <h3 className="card-heading">Upcoming Exams</h3>
                <p className="card-sub">Next scheduled assessments</p>
              </div>
              <button
                className="btn btn-outline btn-xs"
                onClick={() => onNavigate('exams')}
              >
                All Exams
              </button>
            </div>

            <div className="upcoming-exams-list">
              {upcomingExams.map((ex) => (
                <div key={ex.id} className="exam-card-item">
                  <div className="exam-date-badge">
                    <Calendar size={14} />
                    <span>{ex.date}</span>
                  </div>
                  <div className="exam-info">
                    <strong className="exam-subject">{ex.subject}</strong>
                    <div className="exam-meta">
                      <span><Clock size={12} /> {ex.time}</span>
                      <span>• Room: <strong>{ex.room}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
