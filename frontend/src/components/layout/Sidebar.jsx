import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  CalendarCheck,
  BookOpen,
  FileCheck2,
  Receipt,
  UserCheck,
  BarChart3,
  Settings as SettingsIcon,
  X,
  Sparkles
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Students', icon: GraduationCap },
  { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'exams', label: 'Exams', icon: FileCheck2 },
  { id: 'fees', label: 'Fees & Billing', icon: Receipt },
  { id: 'teachers', label: 'Teachers', icon: UserCheck },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: SettingsIcon }
];

export const Sidebar = ({ activeTab, onSelectTab, isOpen, onClose, counts = {} }) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-logo-icon">
            <GraduationCap size={22} />
          </div>
          <div className="brand-info">
            <span className="brand-title">FIC INSTITUTE</span>
            <span className="brand-tagline">Academic Portal</span>
          </div>
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-nav-container">
          <div className="nav-group-label">MAIN MENU</div>
          <nav className="sidebar-nav">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const count = counts[item.id];

              return (
                <button
                  key={item.id}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                >
                  <Icon size={18} className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                  {count !== undefined && count > 0 && (
                    <span className="nav-badge">{count}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-footer-card">
          <div className="support-card">
            <div className="support-icon">
              <Sparkles size={16} />
            </div>
            <div className="support-text">
              <strong>Fall 2026 Term</strong>
              <span>Academic Week 8 • Active</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
