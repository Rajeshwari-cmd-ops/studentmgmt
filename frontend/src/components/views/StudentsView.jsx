import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Filter,
  Eye,
  Edit2,
  Trash2,
  ArrowUpDown,
  Download,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  User,
  ShieldCheck,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Printer
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { EmptyState } from '../common/EmptyState';
import { Pagination } from '../common/Pagination';

export const StudentsView = ({
  students = [],
  onSaveStudent,
  onDeleteStudent,
  courses = [],
  selectedStudentForDetail,
  onCloseDetailModal,
  onOpenDetailModal
}) => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Form State
  const initialFormData = {
    id: '',
    name: '',
    photo: '',
    gender: 'Female',
    dob: '',
    phone: '',
    email: '',
    course: courses[0]?.title || 'B.Tech in Artificial Intelligence',
    department: courses[0]?.department || 'Computer Science',
    semester: 'Semester 1',
    admissionDate: new Date().toISOString().split('T')[0],
    status: 'Active',
    cgpa: 3.5,
    attendanceRate: 95.0,
    address: '',
    guardianName: '',
    guardianPhone: '',
    guardianRelation: 'Parent'
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  // Unique lists for filters
  const departments = useMemo(() => {
    const list = Array.from(new Set(students.map((s) => s.department).filter(Boolean)));
    return ['All', ...list];
  }, [students]);

  const semesters = useMemo(() => {
    const list = Array.from(new Set(students.map((s) => s.semester).filter(Boolean)));
    return ['All', ...list];
  }, [students]);

  // Filtered & Sorted Students
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          s.name.toLowerCase().includes(query) ||
          s.id.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query) ||
          s.phone.toLowerCase().includes(query);

        const matchesDept = departmentFilter === 'All' || s.department === departmentFilter;
        const matchesSem = semesterFilter === 'All' || s.semester === semesterFilter;
        const matchesStatus = statusFilter === 'All' || s.status === statusFilter;

        return matchesSearch && matchesDept && matchesSem && matchesStatus;
      })
      .sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [students, searchQuery, departmentFilter, semesterFilter, statusFilter, sortBy, sortOrder]);

  // Paginated students
  const totalPages = Math.ceil(filteredStudents.length / pageSize);
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredStudents.slice(start, start + pageSize);
  }, [filteredStudents, currentPage, pageSize]);

  // Handlers
  const handleOpenAdd = () => {
    const nextIdNumber = students.length + 1;
    const formattedId = `STU-2024-${String(nextIdNumber).padStart(3, '0')}`;
    setFormData({
      ...initialFormData,
      id: formattedId,
      photo: `https://images.unsplash.com/photo-${1534528741775 + nextIdNumber}?w=200&auto=format&fit=crop&q=80`
    });
    setEditingStudent(null);
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setFormData({ ...student });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.id.trim()) errors.id = 'Student ID is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address format';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.dob) errors.dob = 'Date of birth is required';
    if (!formData.course) errors.course = 'Course selection is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSaveStudent({
      ...formData,
      cgpa: Number(formData.cgpa) || 3.5,
      attendanceRate: Number(formData.attendanceRate) || 95.0
    });

    setIsFormModalOpen(false);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const exportStudentsCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Course', 'Department', 'Semester', 'Status', 'CGPA', 'Attendance'];
    const rows = filteredStudents.map((s) => [
      s.id,
      `"${s.name}"`,
      s.email,
      s.phone,
      `"${s.course}"`,
      `"${s.department}"`,
      s.semester,
      s.status,
      s.cgpa,
      `${s.attendanceRate}%`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'FIC_Institute_Students_Directory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="view-container">
      {/* Header Actions & Controls */}
      <div className="view-header-bar">
        <div>
          <h2 className="view-heading">Student Directory</h2>
          <p className="view-subheading">
            Manage comprehensive student records, enrollment status, academic performance, and personal dossiers.
          </p>
        </div>
        <div className="view-header-actions">
          <button className="btn btn-outline" onClick={exportStudentsCSV}>
            <Download size={15} />
            <span>Export CSV</span>
          </button>
          <button className="btn btn-primary" onClick={handleOpenAdd}>
            <Plus size={16} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="filters-card">
        <div className="filter-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by student name, roll ID, email or phone..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="filter-dropdowns-row">
          <div className="filter-select-group">
            <label>Department:</label>
            <select
              value={departmentFilter}
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-select-group">
            <label>Semester:</label>
            <select
              value={semesterFilter}
              onChange={(e) => {
                setSemesterFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              {semesters.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-select-group">
            <label>Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Graduated">Graduated</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Students Table */}
      <div className="dashboard-card">
        {paginatedStudents.length === 0 ? (
          <EmptyState
            title="No students match your search"
            description="Try removing or adjusting filters to find students in the directory."
            action={
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSearchQuery('');
                  setDepartmentFilter('All');
                  setSemesterFilter('All');
                  setStatusFilter('All');
                }}
              >
                Clear Filters
              </button>
            }
          />
        ) : (
          <>
            <div className="table-responsive">
              <table className="clean-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('name')} className="sortable-th">
                      <span>Student</span>
                      <ArrowUpDown size={13} />
                    </th>
                    <th>ID & Contact</th>
                    <th>Course & Department</th>
                    <th>Semester</th>
                    <th onClick={() => handleSort('cgpa')} className="sortable-th">
                      <span>CGPA</span>
                      <ArrowUpDown size={13} />
                    </th>
                    <th onClick={() => handleSort('attendanceRate')} className="sortable-th">
                      <span>Attendance</span>
                      <ArrowUpDown size={13} />
                    </th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div
                          className="table-user-cell clickable"
                          onClick={() => onOpenDetailModal(s)}
                        >
                          <img src={s.photo} alt={s.name} className="table-avatar" />
                          <div>
                            <strong className="user-name">{s.name}</strong>
                            <span className="user-sub">{s.gender} • {s.dob}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="cell-multiline">
                          <span className="font-mono text-xs font-bold text-navy">{s.id}</span>
                          <span className="text-muted text-xs">{s.email}</span>
                          <span className="text-muted text-xs">{s.phone}</span>
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
                        <strong className="text-indigo font-bold">
                          {s.cgpa ? Number(s.cgpa).toFixed(2) : 'N/A'}
                        </strong>
                      </td>
                      <td>
                        <div className="attendance-pill-cell">
                          <span className="font-semibold">{s.attendanceRate}%</span>
                          <div className="mini-bar-track">
                            <div
                              className="mini-bar-fill"
                              style={{ width: `${s.attendanceRate || 0}%` }}
                            />
                          </div>
                        </div>
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
                        <div className="action-buttons-group">
                          <button
                            className="icon-action-btn view"
                            onClick={() => onOpenDetailModal(s)}
                            title="View Student Details"
                            aria-label="View Student Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="icon-action-btn edit"
                            onClick={() => handleOpenEdit(s)}
                            title="Edit Student"
                            aria-label="Edit Student"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            className="icon-action-btn delete"
                            onClick={() => setStudentToDelete(s)}
                            title="Delete Student"
                            aria-label="Delete Student"
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

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredStudents.length}
              pageSize={pageSize}
            />
          </>
        )}
      </div>

      {/* ================= ADD / EDIT STUDENT MODAL ================= */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingStudent ? 'Edit Student Profile' : 'Enroll New Student'}
        subtitle="Complete the form fields below to record the student file."
        size="lg"
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsFormModalOpen(false)}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>
              {editingStudent ? 'Save Changes' : 'Enroll Student'}
            </button>
          </>
        }
      >
        <form onSubmit={handleFormSubmit} className="form-grid">
          <div className="form-row-2">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Seraphina Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={formErrors.name ? 'input-error' : ''}
              />
              {formErrors.name && <span className="error-text">{formErrors.name}</span>}
            </div>

            <div className="form-group">
              <label>Student ID *</label>
              <input
                type="text"
                placeholder="e.g. STU-2024-001"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className={formErrors.id ? 'input-error' : ''}
              />
              {formErrors.id && <span className="error-text">{formErrors.id}</span>}
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>University Email *</label>
              <input
                type="email"
                placeholder="student@edupulse.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={formErrors.email ? 'input-error' : ''}
              />
              {formErrors.email && <span className="error-text">{formErrors.email}</span>}
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={formErrors.phone ? 'input-error' : ''}
              />
              {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
            </div>
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label>Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className={formErrors.dob ? 'input-error' : ''}
              />
              {formErrors.dob && <span className="error-text">{formErrors.dob}</span>}
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Graduated">Graduated</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Course / Degree *</label>
              <select
                value={formData.course}
                onChange={(e) => {
                  const selectedCourse = courses.find((c) => c.title === e.target.value);
                  setFormData({
                    ...formData,
                    course: e.target.value,
                    department: selectedCourse ? selectedCourse.department : formData.department
                  });
                }}
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label>Semester</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
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

            <div className="form-group">
              <label>Admission Date</label>
              <input
                type="date"
                value={formData.admissionDate}
                onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>CGPA (0.00 - 4.00)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4.0"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Guardian Name</label>
              <input
                type="text"
                placeholder="Guardian / Parent Name"
                value={formData.guardianName || ''}
                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Guardian Phone</label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                value={formData.guardianPhone || ''}
                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Residential Campus Address</label>
            <input
              type="text"
              placeholder="e.g. 742 Evergreen Terrace, Seattle, WA"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Photo URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={formData.photo || ''}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
            />
          </div>
        </form>
      </Modal>

      {/* ================= STUDENT DETAILS DOSSIER MODAL ================= */}
      {selectedStudentForDetail && (
        <Modal
          isOpen={true}
          onClose={onCloseDetailModal}
          title={`Student Dossier - ${selectedStudentForDetail.name}`}
          subtitle={`${selectedStudentForDetail.id} • ${selectedStudentForDetail.course}`}
          size="xl"
          footer={
            <>
              <button
                className="btn btn-secondary"
                onClick={() => window.print()}
              >
                <Printer size={15} />
                <span>Print Profile</span>
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onCloseDetailModal();
                  handleOpenEdit(selectedStudentForDetail);
                }}
              >
                <Edit2 size={15} />
                <span>Edit Student</span>
              </button>
            </>
          }
        >
          <div className="student-detail-dossier">
            {/* Dossier Header Hero */}
            <div className="dossier-hero">
              <img
                src={selectedStudentForDetail.photo}
                alt={selectedStudentForDetail.name}
                className="dossier-avatar"
              />
              <div className="dossier-hero-info">
                <div className="dossier-title-row">
                  <h3>{selectedStudentForDetail.name}</h3>
                  <Badge variant={selectedStudentForDetail.status === 'Active' ? 'success' : 'neutral'}>
                    {selectedStudentForDetail.status}
                  </Badge>
                </div>
                <p className="dossier-program">{selectedStudentForDetail.course}</p>

                <div className="dossier-chips-row">
                  <span className="dossier-chip">
                    <User size={13} /> {selectedStudentForDetail.gender}
                  </span>
                  <span className="dossier-chip">
                    <Calendar size={13} /> DOB: {selectedStudentForDetail.dob}
                  </span>
                  <span className="dossier-chip">
                    <Mail size={13} /> {selectedStudentForDetail.email}
                  </span>
                  <span className="dossier-chip">
                    <Phone size={13} /> {selectedStudentForDetail.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Metric Strips */}
            <div className="dossier-metrics-grid">
              <div className="dossier-metric-card">
                <span className="dm-label">Cumulative GPA</span>
                <strong className="dm-value text-indigo">
                  {selectedStudentForDetail.cgpa ? selectedStudentForDetail.cgpa.toFixed(2) : '3.80'}
                </strong>
                <span className="dm-sub text-success">Good Academic Standing</span>
              </div>
              <div className="dossier-metric-card">
                <span className="dm-label">Attendance Rate</span>
                <strong className="dm-value text-emerald">
                  {selectedStudentForDetail.attendanceRate || 95}%
                </strong>
                <span className="dm-sub">Active Term Regularity</span>
              </div>
              <div className="dossier-metric-card">
                <span className="dm-label">Fee Status</span>
                <strong className="dm-value">
                  {selectedStudentForDetail.feeStatus || 'Paid'}
                </strong>
                <span className="dm-sub">
                  Balance: ${selectedStudentForDetail.feePending || 0}
                </span>
              </div>
              <div className="dossier-metric-card">
                <span className="dm-label">Admitted</span>
                <strong className="dm-value">
                  {selectedStudentForDetail.admissionDate || '2024-08-15'}
                </strong>
                <span className="dm-sub">{selectedStudentForDetail.semester}</span>
              </div>
            </div>

            {/* Dossier Tabs / Sections */}
            <div className="dossier-sections-grid">
              {/* Left Column: Personal & Guardian Info */}
              <div className="dossier-section-box">
                <h4 className="dossier-section-title">
                  <ShieldCheck size={16} /> Personal & Guardian Profile
                </h4>
                <div className="dossier-info-list">
                  <div className="dossier-info-row">
                    <span>Department:</span>
                    <strong>{selectedStudentForDetail.department}</strong>
                  </div>
                  <div className="dossier-info-row">
                    <span>Campus Residence:</span>
                    <strong>{selectedStudentForDetail.address || '742 Evergreen Terrace, Seattle, WA'}</strong>
                  </div>
                  <div className="dossier-info-row">
                    <span>Primary Guardian:</span>
                    <strong>{selectedStudentForDetail.guardianName || 'Dr. Arthur Vance'}</strong>
                  </div>
                  <div className="dossier-info-row">
                    <span>Guardian Relation:</span>
                    <strong>{selectedStudentForDetail.guardianRelation || 'Father'}</strong>
                  </div>
                  <div className="dossier-info-row">
                    <span>Guardian Contact:</span>
                    <strong>{selectedStudentForDetail.guardianPhone || '+1 (555) 902-1144'}</strong>
                  </div>
                </div>
              </div>

              {/* Right Column: Exam & Assessment Results */}
              <div className="dossier-section-box">
                <h4 className="dossier-section-title">
                  <Award size={16} /> Exam Assessments & Grades
                </h4>
                {selectedStudentForDetail.examResults && selectedStudentForDetail.examResults.length > 0 ? (
                  <div className="dossier-results-table-wrap">
                    <table className="clean-table compact">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Score</th>
                          <th>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedStudentForDetail.examResults.map((r, idx) => (
                          <tr key={idx}>
                            <td><strong>{r.subject}</strong></td>
                            <td>{r.marks}</td>
                            <td>
                              <span className="badge badge-success badge-sm">{r.grade}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted text-sm" style={{ padding: '12px 0' }}>
                    Midterm assessments scheduled for the active term.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ================= CONFIRM DELETE DIALOG ================= */}
      <ConfirmDialog
        isOpen={Boolean(studentToDelete)}
        onClose={() => setStudentToDelete(null)}
        onConfirm={() => {
          if (studentToDelete) {
            onDeleteStudent(studentToDelete.id);
            setStudentToDelete(null);
          }
        }}
        title="Delete Student Record"
        message={`Are you sure you want to permanently remove "${studentToDelete?.name}" (${studentToDelete?.id}) from the database?`}
        confirmText="Delete Student"
      />
    </div>
  );
};
