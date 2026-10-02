import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Printer,
  PieChart,
  TrendingUp,
  Users,
  DollarSign,
  CalendarCheck,
  Award
} from 'lucide-react';
import { useToast } from '../common/Toast';

export const ReportsView = ({
  students = [],
  fees = [],
  courses = []
}) => {
  const { addToast } = useToast();
  const [reportType, setReportType] = useState('overview'); // overview, attendance, fees, performance

  // Department enrollment breakdown
  const deptCounts = students.reduce((acc, s) => {
    acc[s.department] = (acc[s.department] || 0) + 1;
    return acc;
  }, {});

  // Fees calculations
  const totalBilled = fees.reduce((acc, f) => acc + Number(f.totalAmount || 0), 0);
  const totalCollected = fees.reduce((acc, f) => acc + Number(f.paidAmount || 0), 0);
  const totalDue = fees.reduce((acc, f) => acc + Number(f.pendingAmount || 0), 0);

  // Performance breakdown
  const gpaBuckets = {
    'Above 3.8 (Honors)': students.filter((s) => s.cgpa >= 3.8).length,
    '3.5 - 3.79 (Distinction)': students.filter((s) => s.cgpa >= 3.5 && s.cgpa < 3.8).length,
    '3.0 - 3.49 (Good)': students.filter((s) => s.cgpa >= 3.0 && s.cgpa < 3.5).length,
    'Below 3.0 (Needs Support)': students.filter((s) => s.cgpa < 3.0).length
  };

  const handleExportReportCSV = () => {
    let rows = [];
    let filename = 'FIC_Institute_Academic_Report.csv';

    if (reportType === 'fees') {
      rows = [
        ['Student ID', 'Name', 'Course', 'Total Fee', 'Paid Amount', 'Pending Amount', 'Status'],
        ...fees.map((f) => [
          f.studentId,
          `"${f.studentName}"`,
          `"${f.course}"`,
          f.totalAmount,
          f.paidAmount,
          f.pendingAmount,
          f.status
        ])
      ];
      filename = 'FIC_Institute_Fees_Summary.csv';
    } else {
      rows = [
        ['Student ID', 'Name', 'Course', 'Department', 'Semester', 'CGPA', 'Attendance Rate', 'Status'],
        ...students.map((s) => [
          s.id,
          `"${s.name}"`,
          `"${s.course}"`,
          `"${s.department}"`,
          s.semester,
          s.cgpa,
          `${s.attendanceRate}%`,
          s.status
        ])
      ];
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast(`Report downloaded: ${filename}`, 'success');
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-heading">Academic & Financial Reports</h2>
          <p className="view-subheading">
            Audit institutional metrics, attendance compliance, financial revenues, and student GPA distributions.
          </p>
        </div>
        <div className="view-header-actions">
          <button className="btn btn-outline" onClick={() => window.print()}>
            <Printer size={15} />
            <span>Print Report</span>
          </button>
          <button className="btn btn-primary" onClick={handleExportReportCSV}>
            <Download size={15} />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="report-tab-selector">
        <button
          className={`report-tab-btn ${reportType === 'overview' ? 'active' : ''}`}
          onClick={() => setReportType('overview')}
        >
          <BarChart3 size={15} />
          <span>Institutional Overview</span>
        </button>
        <button
          className={`report-tab-btn ${reportType === 'attendance' ? 'active' : ''}`}
          onClick={() => setReportType('attendance')}
        >
          <CalendarCheck size={15} />
          <span>Attendance Compliance</span>
        </button>
        <button
          className={`report-tab-btn ${reportType === 'fees' ? 'active' : ''}`}
          onClick={() => setReportType('fees')}
        >
          <DollarSign size={15} />
          <span>Fee Ledger Audit</span>
        </button>
        <button
          className={`report-tab-btn ${reportType === 'performance' ? 'active' : ''}`}
          onClick={() => setReportType('performance')}
        >
          <Award size={15} />
          <span>GPA & Grade Distribution</span>
        </button>
      </div>

      {/* Content based on selected report */}
      <div className="cards-grid-2">
        {/* Department Enrollment Breakdown Card */}
        <div className="dashboard-card">
          <div className="card-header-clean">
            <div>
              <h3 className="card-heading">Departmental Enrollment Share</h3>
              <p className="card-sub">Student count distributed across academic faculties</p>
            </div>
            <Users size={18} className="text-indigo" />
          </div>
          <div className="report-list-breakdown">
            {Object.entries(deptCounts).map(([dept, count]) => {
              const pct = Math.round((count / students.length) * 100);
              return (
                <div key={dept} className="report-bar-item">
                  <div className="r-item-head">
                    <span className="font-semibold text-sm">{dept}</span>
                    <strong className="text-sm">{count} Students ({pct}%)</strong>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* GPA Performance Distribution Card */}
        <div className="dashboard-card">
          <div className="card-header-clean">
            <div>
              <h3 className="card-heading">CGPA Tier Distribution</h3>
              <p className="card-sub">Student academic standing across grade brackets</p>
            </div>
            <Award size={18} className="text-emerald" />
          </div>
          <div className="report-list-breakdown">
            {Object.entries(gpaBuckets).map(([tier, count]) => {
              const pct = students.length ? Math.round((count / students.length) * 100) : 0;
              return (
                <div key={tier} className="report-bar-item">
                  <div className="r-item-head">
                    <span className="font-semibold text-sm">{tier}</span>
                    <strong className="text-sm">{count} ({pct}%)</strong>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill bg-emerald"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Financial Collection Snapshot */}
        <div className="dashboard-card">
          <div className="card-header-clean">
            <div>
              <h3 className="card-heading">Revenue Audit Snapshot</h3>
              <p className="card-sub">Total receivables vs actual realizations</p>
            </div>
            <DollarSign size={18} className="text-amber" />
          </div>
          <div className="report-stat-summary">
            <div className="rss-item">
              <span className="label">Total Billed</span>
              <strong className="val">${totalBilled.toLocaleString()}</strong>
            </div>
            <div className="rss-item">
              <span className="label">Realized Inflow</span>
              <strong className="val text-success">${totalCollected.toLocaleString()}</strong>
            </div>
            <div className="rss-item">
              <span className="label">Receivables Outstanding</span>
              <strong className="val text-amber">${totalDue.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Attendance Regularity Breakdown */}
        <div className="dashboard-card">
          <div className="card-header-clean">
            <div>
              <h3 className="card-heading">Attendance Threshold Audit</h3>
              <p className="card-sub">Students meeting mandatory 75% minimum attendance</p>
            </div>
            <CalendarCheck size={18} className="text-sky" />
          </div>
          <div className="attendance-audit-box">
            <div className="audit-stat-circle">
              <span className="audit-big-number">
                {Math.round(
                  (students.filter((s) => s.attendanceRate >= 75).length / (students.length || 1)) * 100
                )}%
              </span>
              <span className="audit-caption">Above 75% Threshold</span>
            </div>
            <div className="audit-legend-details">
              <div className="audit-leg-row">
                <span className="leg-dot bg-emerald" />
                <span>Good Regularity (≥ 90%): <strong>{students.filter((s) => s.attendanceRate >= 90).length}</strong></span>
              </div>
              <div className="audit-leg-row">
                <span className="leg-dot bg-amber" />
                <span>Satisfactory (75 - 89%): <strong>{students.filter((s) => s.attendanceRate >= 75 && s.attendanceRate < 90).length}</strong></span>
              </div>
              <div className="audit-leg-row">
                <span className="leg-dot bg-rose" />
                <span>Critical / Low (&lt; 75%): <strong>{students.filter((s) => s.attendanceRate < 75).length}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
