import React, { useState } from 'react';
import {
  UserCheck,
  Plus,
  Mail,
  Phone,
  Building,
  Edit2,
  Trash2,
  Search,
  BookOpen
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { Badge } from '../common/Badge';

export const TeachersView = ({
  teachers = [],
  onSaveTeacher,
  onDeleteTeacher
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  const initialForm = {
    id: '',
    name: '',
    photo: '',
    department: 'Computer Science',
    designation: 'Professor',
    subject: 'Artificial Intelligence',
    email: '',
    phone: '',
    status: 'Active',
    office: 'Academic Tower'
  };
  const [formData, setFormData] = useState(initialForm);

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    const nextId = `TCH-${100 + teachers.length + 1}`;
    setFormData({
      ...initialForm,
      id: nextId,
      photo: `https://images.unsplash.com/photo-${1500648767791 + teachers.length}?w=200&auto=format&fit=crop&q=80`
    });
    setEditingTeacher(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({ ...teacher });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    onSaveTeacher({ ...formData });
    setIsModalOpen(false);
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-heading">Faculty & Teacher Directory</h2>
          <p className="view-subheading">
            Manage academic instructors, departmental chairs, and faculty contact records.
          </p>
        </div>
        <div className="view-header-actions">
          <button className="btn btn-primary" onClick={handleOpenAdd}>
            <Plus size={16} />
            <span>Add Faculty Member</span>
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="filters-card">
        <div className="filter-search-box full-width">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by teacher name, department, subject specialization or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Teachers Cards Grid */}
      <div className="cards-grid-2">
        {filteredTeachers.map((t) => (
          <div key={t.id} className="teacher-card">
            <div className="teacher-card-hero">
              <img src={t.photo} alt={t.name} className="teacher-avatar" />
              <div className="teacher-hero-text">
                <div className="teacher-name-row">
                  <h3 className="teacher-name">{t.name}</h3>
                  <Badge variant="success">{t.status || 'Active'}</Badge>
                </div>
                <p className="teacher-designation">{t.designation}</p>
                <span className="teacher-id-tag">{t.id}</span>
              </div>
            </div>

            <div className="teacher-meta-list">
              <div className="t-meta-item">
                <Building size={15} />
                <span>Department: <strong>{t.department}</strong></span>
              </div>
              <div className="t-meta-item">
                <BookOpen size={15} />
                <span>Primary Subject: <strong>{t.subject}</strong></span>
              </div>
              <div className="t-meta-item">
                <Mail size={15} />
                <span>{t.email}</span>
              </div>
              <div className="t-meta-item">
                <Phone size={15} />
                <span>{t.phone}</span>
              </div>
            </div>

            <div className="teacher-card-footer">
              <span className="teacher-office-text">{t.office || 'Academic Building'}</span>
              <div className="action-buttons-group">
                <button
                  className="icon-action-btn edit"
                  onClick={() => handleOpenEdit(t)}
                  title="Edit Teacher"
                  aria-label="Edit Teacher"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  className="icon-action-btn delete"
                  onClick={() => setTeacherToDelete(t)}
                  title="Delete Teacher"
                  aria-label="Delete Teacher"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Teacher Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTeacher ? 'Edit Faculty Record' : 'Register New Faculty Member'}
        subtitle="Complete the instructor contact and departmental profile."
        size="md"
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              {editingTeacher ? 'Save Changes' : 'Register Faculty'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row-2">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Dr. Eleanor Ward"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Faculty ID *</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>University Email *</label>
              <input
                type="email"
                placeholder="faculty@edupulse.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Contact *</label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input
                type="text"
                placeholder="Associate Professor"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Subject Specialization</label>
            <input
              type="text"
              placeholder="e.g. Deep Neural Networks & ML"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Office Location</label>
            <input
              type="text"
              placeholder="e.g. Office 210, Academic Tower"
              value={formData.office || ''}
              onChange={(e) => setFormData({ ...formData, office: e.target.value })}
            />
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(teacherToDelete)}
        onClose={() => setTeacherToDelete(null)}
        onConfirm={() => {
          if (teacherToDelete) {
            onDeleteTeacher(teacherToDelete.id);
            setTeacherToDelete(null);
          }
        }}
        title="Remove Faculty Member"
        message={`Are you sure you want to remove "${teacherToDelete?.name}" (${teacherToDelete?.id}) from the directory?`}
      />
    </div>
  );
};
