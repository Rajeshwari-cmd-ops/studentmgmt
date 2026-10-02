import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  PlusCircle,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const Header = ({
  activeTab,
  onToggleSidebar,
  onQuickAddStudent,
  settings,
  students = [],
  onSelectStudent
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'System Overview & Analytics';
      case 'students':
        return 'Student Directory & Records';
      case 'attendance':
        return 'Daily Attendance Register';
      case 'courses':
        return 'Curriculum & Course Management';
      case 'exams':
        return 'Exam Schedules & Assessments';
      case 'fees':
        return 'Student Fee Ledger & Invoicing';
      case 'teachers':
        return 'Faculty & Instructor Directory';
      case 'reports':
        return 'Academic & Financial Reports';
      case 'settings':
        return 'Institution & System Settings';
      default:
        return 'Student Information System';
    }
  };

  const filteredStudents = searchQuery.trim()
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.course.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="header-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className="header-breadcrumb">
          <span className="crumb-main">FIC Institute</span>
          <span className="crumb-sep">/</span>
          <h1 className="crumb-active">{getBreadcrumbTitle()}</h1>
        </div>
      </div>

      {/* Center Search */}
      <div className="header-center">
        <div className="global-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search students, roll numbers, courses..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
          />
          {showSearchResults && filteredStudents.length > 0 && (
            <div className="search-dropdown-menu">
              {filteredStudents.slice(0, 5).map((s) => (
                <div
                  key={s.id}
                  className="search-dropdown-item"
                  onClick={() => {
                    onSelectStudent(s);
                    setShowSearchResults(false);
                    setSearchQuery('');
                  }}
                >
                  <img src={s.photo} alt={s.name} className="search-stu-img" />
                  <div className="search-stu-details">
                    <span className="search-stu-name">{s.name}</span>
                    <span className="search-stu-sub">
                      {s.id} • {s.course}
                    </span>
                  </div>
                  <span className="badge badge-success badge-sm">{s.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="header-right">
        <div className="term-badge">
          <Calendar size={14} />
          <span>{settings.currentTerm || 'Fall 2026'}</span>
        </div>

        <button
          className="btn btn-primary btn-sm quick-add-btn"
          onClick={onQuickAddStudent}
        >
          <PlusCircle size={15} />
          <span>Add Student</span>
        </button>

        {/* Notifications */}
        <div className="notification-wrapper">
          <button
            className="header-icon-button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="unread-dot" />
          </button>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notif-header">
                <strong>Notifications</strong>
                <span className="notif-count">3 New</span>
              </div>
              <div className="notif-list">
                <div className="notif-item unread">
                  <CheckCircle2 size={16} className="text-success" />
                  <div>
                    <p className="notif-text">Attendance for CS-401 submitted</p>
                    <span className="notif-time">10 mins ago</span>
                  </div>
                </div>
                <div className="notif-item unread">
                  <AlertCircle size={16} className="text-warning" />
                  <div>
                    <p className="notif-text">2 student fees pending for Oct term</p>
                    <span className="notif-time">1 hour ago</span>
                  </div>
                </div>
                <div className="notif-item">
                  <Calendar size={16} className="text-primary" />
                  <div>
                    <p className="notif-text">Mid-term exam schedule published</p>
                    <span className="notif-time">Yesterday</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="user-profile-header">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
            alt="Admin"
            className="user-header-avatar"
          />
          <div className="user-header-text">
            <strong>{settings.adminName || 'Dr. Eleanor Ward'}</strong>
            <span>{settings.adminRole || 'Administrator'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
