import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Bell,
  Palette,
  RotateCcw,
  Save,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Lock
} from 'lucide-react';
import { useToast } from '../common/Toast';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const SettingsView = ({
  settings,
  onSaveSettings,
  onResetAllData
}) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ ...settings });
  const [activeTab, setActiveTab] = useState('institution'); // institution, academic, notifications, security
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    addToast('System settings updated successfully!', 'success');
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-heading">System & Institution Settings</h2>
          <p className="view-subheading">
            Configure institutional profile, academic term parameters, administrator account, and notification preferences.
          </p>
        </div>
        <div className="view-header-actions">
          <button className="btn btn-primary" onClick={handleSubmit}>
            <Save size={16} />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="report-tab-selector">
        <button
          className={`report-tab-btn ${activeTab === 'institution' ? 'active' : ''}`}
          onClick={() => setActiveTab('institution')}
        >
          <Building2 size={15} />
          <span>Institution Profile</span>
        </button>
        <button
          className={`report-tab-btn ${activeTab === 'academic' ? 'active' : ''}`}
          onClick={() => setActiveTab('academic')}
        >
          <ShieldCheck size={15} />
          <span>Academic Terms</span>
        </button>
        <button
          className={`report-tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <Bell size={15} />
          <span>Notifications</span>
        </button>
        <button
          className={`report-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <Lock size={15} />
          <span>Account & Reset</span>
        </button>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit}>
        {activeTab === 'institution' && (
          <div className="dashboard-card">
            <div className="card-header-clean">
              <div>
                <h3 className="card-heading">Institution Identity & Address</h3>
                <p className="card-sub">Official name and university contact details used on student reports and transcripts</p>
              </div>
            </div>
            <div className="card-body">
              <div className="form-grid">
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Institution Full Name</label>
                    <input
                      type="text"
                      value={formData.institutionName || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, institutionName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Institution Code / SIS ID</label>
                    <input
                      type="text"
                      value={formData.institutionCode || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, institutionCode: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Administrative Email</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Helpline / Contact Phone</label>
                    <input
                      type="text"
                      value={formData.phone || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Campus Physical Address</label>
                  <input
                    type="text"
                    value={formData.address || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="dashboard-card">
            <div className="card-header-clean">
              <div>
                <h3 className="card-heading">Academic Year & Session Rules</h3>
                <p className="card-sub">Active terms and mandatory attendance compliance thresholds</p>
              </div>
            </div>
            <div className="card-body">
              <div className="form-grid">
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Active Academic Year</label>
                    <input
                      type="text"
                      value={formData.academicYear || '2026 - 2027'}
                      onChange={(e) =>
                        setFormData({ ...formData, academicYear: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Current Term / Semester</label>
                    <input
                      type="text"
                      value={formData.currentTerm || 'Fall Semester'}
                      onChange={(e) =>
                        setFormData({ ...formData, currentTerm: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Minimum Attendance Regularity Threshold (%)</label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={formData.attendanceThreshold || 75}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attendanceThreshold: Number(e.target.value)
                      })
                    }
                  />
                  <span className="text-muted text-xs">
                    Students with attendance below this percentage will be flagged in danger on transcripts.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="dashboard-card">
            <div className="card-header-clean">
              <div>
                <h3 className="card-heading">Automated Alerts & Email Notifications</h3>
                <p className="card-sub">Toggle automated notification triggers</p>
              </div>
            </div>
            <div className="card-body">
              <div className="settings-toggle-list">
                <label className="toggle-item">
                  <input
                    type="checkbox"
                    checked={formData.emailNotifications !== false}
                    onChange={(e) =>
                      setFormData({ ...formData, emailNotifications: e.target.checked })
                    }
                  />
                  <div className="toggle-label-group">
                    <strong>Daily Attendance Submission Notifications</strong>
                    <span>Send confirmation emails when instructors submit class registers</span>
                  </div>
                </label>

                <label className="toggle-item">
                  <input
                    type="checkbox"
                    checked={formData.feeAlerts !== false}
                    onChange={(e) =>
                      setFormData({ ...formData, feeAlerts: e.target.checked })
                    }
                  />
                  <div className="toggle-label-group">
                    <strong>Tuition Fee Due Date Reminders</strong>
                    <span>Automated alerts sent to guardians for outstanding balances</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="dashboard-card">
            <div className="card-header-clean">
              <div>
                <h3 className="card-heading">Administrator Profile & Data Management</h3>
                <p className="card-sub">Manage credentials or reset local demo database</p>
              </div>
            </div>
            <div className="card-body">
              <div className="form-grid">
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Administrator Name</label>
                    <input
                      type="text"
                      value={formData.adminName || 'Dr. Eleanor Ward'}
                      onChange={(e) =>
                        setFormData({ ...formData, adminName: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Role / Title</label>
                    <input
                      type="text"
                      value={formData.adminRole || 'Super Administrator'}
                      onChange={(e) =>
                        setFormData({ ...formData, adminRole: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="danger-zone-box mt-4">
                  <div className="dz-text">
                    <strong className="text-danger">Reset Sample Data</strong>
                    <p>
                      Reset all student records, attendance, courses, and fees to the initial default state.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => setShowResetConfirm(true)}
                  >
                    <RotateCcw size={14} />
                    <span>Reset All Data</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Reset Confirmation */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={() => {
          onResetAllData();
          setShowResetConfirm(false);
          addToast('All student database records reset to factory default.', 'info');
        }}
        title="Reset Local Database"
        message="Are you sure you want to reset all students, courses, exams, fees, and attendance logs? This will restore the initial sample dataset."
        confirmText="Yes, Reset Data"
        danger={true}
      />
    </div>
  );
};
