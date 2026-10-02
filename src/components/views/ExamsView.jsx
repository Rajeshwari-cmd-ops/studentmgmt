import React, { useState } from 'react';
import {
  FileCheck2,
  Plus,
  Calendar,
  Clock,
  MapPin,
  Edit2,
  Trash2,
  Search
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { Badge } from '../common/Badge';

export const ExamsView = ({
  exams = [],
  onSaveExam,
  onDeleteExam
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [examToDelete, setExamToDelete] = useState(null);

  const initialForm = {
    id: '',
    subject: '',
    code: 'CS-401',
    title: 'Mid-Term Examination',
    department: 'Computer Science',
    semester: 'Semester 6',
    date: new Date().toISOString().split('T')[0],
    time: '09:30 AM - 12:30 PM',
    room: 'Auditorium Hall A',
    maxMarks: 100,
    status: 'Scheduled'
  };
  const [formData, setFormData] = useState(initialForm);

  const filteredExams = exams.filter(
    (ex) =>
      ex.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    const nextId = `EXM-${String(exams.length + 1).padStart(3, '0')}`;
    setFormData({
      ...initialForm,
      id: nextId
    });
    setEditingExam(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exam) => {
    setEditingExam(exam);
    setFormData({ ...exam });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject.trim()) return;

    onSaveExam({
      ...formData,
      maxMarks: Number(formData.maxMarks) || 100
    });
    setIsModalOpen(false);
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-heading">Exam Schedules & Assessments</h2>
          <p className="view-subheading">
            Organize examination sessions, assign exam halls, and manage assessment timetables.
          </p>
        </div>
        <div className="view-header-actions">
          <button className="btn btn-primary" onClick={handleOpenAdd}>
            <Plus size={16} />
            <span>Schedule Exam</span>
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="filters-card">
        <div className="filter-search-box full-width">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by exam subject, code, or hall/room location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="dashboard-card">
        <div className="table-responsive">
          <table className="clean-table">
            <thead>
              <tr>
                <th>Subject & Exam Title</th>
                <th>Course Code</th>
                <th>Department & Semester</th>
                <th>Date & Time</th>
                <th>Hall / Room</th>
                <th>Max Marks</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.map((ex) => (
                <tr key={ex.id}>
                  <td>
                    <div className="cell-multiline">
                      <strong className="text-navy">{ex.subject}</strong>
                      <span className="text-muted text-xs">{ex.title}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-neutral">{ex.code}</span>
                  </td>
                  <td>
                    <div className="cell-multiline">
                      <span>{ex.department}</span>
                      <span className="text-muted text-xs">{ex.semester}</span>
                    </div>
                  </td>
                  <td>
                    <div className="cell-multiline">
                      <div className="flex-row gap-4 items-center">
                        <Calendar size={13} className="text-indigo" />
                        <strong>{ex.date}</strong>
                      </div>
                      <span className="text-muted text-xs">{ex.time}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex-row gap-4 items-center">
                      <MapPin size={13} className="text-emerald" />
                      <span>{ex.room}</span>
                    </div>
                  </td>
                  <td>
                    <strong>{ex.maxMarks} pts</strong>
                  </td>
                  <td>
                    <Badge variant={ex.status === 'Scheduled' ? 'success' : 'neutral'}>
                      {ex.status}
                    </Badge>
                  </td>
                  <td className="text-right">
                    <div className="action-buttons-group">
                      <button
                        className="icon-action-btn edit"
                        onClick={() => handleOpenEdit(ex)}
                        title="Edit Exam"
                        aria-label="Edit Exam"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        className="icon-action-btn delete"
                        onClick={() => setExamToDelete(ex)}
                        title="Delete Exam"
                        aria-label="Delete Exam"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Exam Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingExam ? 'Edit Exam Session' : 'Schedule New Exam'}
        subtitle="Specify subject, room allocation, exam date and timing."
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
              {editingExam ? 'Save Changes' : 'Schedule Exam'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>Subject Name *</label>
            <input
              type="text"
              placeholder="e.g. Deep Neural Networks & Transformers"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Course Code</label>
              <input
                type="text"
                placeholder="CS-401"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Exam Type / Title</label>
              <input
                type="text"
                placeholder="Mid-Term Assessment"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Time Slot *</label>
              <input
                type="text"
                placeholder="09:30 AM - 12:30 PM"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Exam Room / Hall Location</label>
              <input
                type="text"
                placeholder="Auditorium Hall A"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Max Marks</label>
              <input
                type="number"
                value={formData.maxMarks}
                onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* Delete Exam Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(examToDelete)}
        onClose={() => setExamToDelete(null)}
        onConfirm={() => {
          if (examToDelete) {
            onDeleteExam(examToDelete.id);
            setExamToDelete(null);
          }
        }}
        title="Cancel & Delete Exam"
        message={`Are you sure you want to remove "${examToDelete?.subject}" from the schedule?`}
      />
    </div>
  );
};
