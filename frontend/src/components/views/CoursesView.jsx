import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Users,
  Clock,
  Award,
  Search
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { Badge } from '../common/Badge';

export const CoursesView = ({
  courses = [],
  onSaveCourse,
  onDeleteCourse
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const initialForm = {
    id: '',
    code: '',
    title: '',
    department: 'Computer Science',
    duration: '4 Years',
    semesters: 8,
    credits: 4,
    studentsCount: 0,
    instructor: 'Faculty Member',
    description: '',
    status: 'Active'
  };
  const [formData, setFormData] = useState(initialForm);

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    const nextId = `CRS-${100 + courses.length + 1}`;
    setFormData({
      ...initialForm,
      id: nextId,
      code: `CS-${400 + courses.length + 1}`
    });
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setFormData({ ...course });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.code.trim()) return;

    onSaveCourse({
      ...formData,
      semesters: Number(formData.semesters) || 8,
      credits: Number(formData.credits) || 4,
      studentsCount: Number(formData.studentsCount) || 30
    });
    setIsModalOpen(false);
  };

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-heading">Curriculum & Course Directory</h2>
          <p className="view-subheading">
            Manage degree programs, credit distributions, and enrolled student allocations.
          </p>
        </div>
        <div className="view-header-actions">
          <button className="btn btn-primary" onClick={handleOpenAdd}>
            <Plus size={16} />
            <span>Add Course</span>
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="filters-card">
        <div className="filter-search-box full-width">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by course title, course code (e.g. CS-401) or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="cards-grid-3">
        {filteredCourses.map((c) => (
          <div key={c.id} className="course-card">
            <div className="course-card-top">
              <div className="course-code-tag">{c.code}</div>
              <Badge variant="success">{c.status || 'Active'}</Badge>
            </div>

            <h3 className="course-title">{c.title}</h3>
            <p className="course-dept">{c.department}</p>
            <p className="course-desc">{c.description || 'Comprehensive curriculum covering theoretical foundations, laboratory practicums, and capstone projects.'}</p>

            <div className="course-metrics-row">
              <div className="cm-item">
                <Clock size={14} />
                <span>{c.duration}</span>
              </div>
              <div className="cm-item">
                <Award size={14} />
                <span>{c.credits} Credits</span>
              </div>
              <div className="cm-item">
                <Users size={14} />
                <span>{c.studentsCount || 35} Enrolled</span>
              </div>
            </div>

            <div className="course-card-footer">
              <div className="course-instructor">
                <span className="label">Instructor:</span>
                <strong>{c.instructor}</strong>
              </div>
              <div className="action-buttons-group">
                <button
                  className="icon-action-btn edit"
                  onClick={() => handleOpenEdit(c)}
                  title="Edit Course"
                  aria-label="Edit Course"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  className="icon-action-btn delete"
                  onClick={() => setCourseToDelete(c)}
                  title="Delete Course"
                  aria-label="Delete Course"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Course Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCourse ? 'Edit Course Program' : 'Create New Course Program'}
        subtitle="Fill in syllabus details, credit values and department assignments."
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
              {editingCourse ? 'Save Changes' : 'Create Course'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row-2">
            <div className="form-group">
              <label>Course Code *</label>
              <input
                type="text"
                placeholder="e.g. CS-401"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Credits *</label>
              <input
                type="number"
                min="1"
                max="6"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Course Title *</label>
            <input
              type="text"
              placeholder="e.g. Deep Neural Networks & Transformers"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
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
              <label>Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Course Instructor / Lead Faculty</label>
            <input
              type="text"
              placeholder="e.g. Prof. Alan Turing"
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Description & Learning Outcomes</label>
            <textarea
              rows="3"
              placeholder="Overview of subject areas..."
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={Boolean(courseToDelete)}
        onClose={() => setCourseToDelete(null)}
        onConfirm={() => {
          if (courseToDelete) {
            onDeleteCourse(courseToDelete.id);
            setCourseToDelete(null);
          }
        }}
        title="Delete Course Program"
        message={`Are you sure you want to remove "${courseToDelete?.title}" (${courseToDelete?.code})?`}
      />
    </div>
  );
};
