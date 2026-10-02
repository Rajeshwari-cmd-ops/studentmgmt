import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  FileText,
  ChevronRight,
  Download,
  Filter,
  ExternalLink
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const InstNotices = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedNotice, setSelectedNotice] = useState(null);

  const noticesData = [
    {
      id: 'NOT-2026-041',
      category: 'Admissions',
      date: 'Oct 02, 2026',
      title: 'Admissions Open: Round 2 Applications for BCA, BBA & B.Com Programs (2026–27)',
      department: 'Office of Registrar & Admissions',
      details:
        'Applications are invited for the upcoming academic session. Merit counseling and entrance verification schedules are available at the admissions office. Online application deadline is November 15, 2026.'
    },
    {
      id: 'NOT-2026-039',
      category: 'Examinations',
      date: 'Sep 29, 2026',
      title: 'Mid-Term Assessment Examination Schedule: Fall Semester 2026',
      department: 'Controller of Examinations',
      details:
        'The comprehensive examination timetable for Semester IV and Semester VI undergraduate programs has been finalized. Students are advised to verify hall assignments on the digital Student Portal.'
    },
    {
      id: 'NOT-2026-038',
      category: 'Academic Calendar',
      date: 'Sep 25, 2026',
      title: 'Revised Academic Calendar for Odd Semester 2026–27',
      department: 'Dean of Academics',
      details:
        'The revised academic calendar covering continuous internal assessments, laboratory evaluations, festival recess, and term-end commencement dates has been issued for student compliance.'
    },
    {
      id: 'NOT-2026-036',
      category: 'Results',
      date: 'Sep 20, 2026',
      title: 'Declaration of Re-evaluation & Supplementary Examination Results',
      department: 'Evaluation Division',
      details:
        'Results for the supplementary assessments conducted in August 2026 have been published. Digital scorecards are accessible via the Student Management Portal login.'
    },
    {
      id: 'NOT-2026-033',
      category: 'Events',
      date: 'Sep 15, 2026',
      title: 'Annual Inter-Collegiate Technology & Innovation Symposium "TechPulse 2026"',
      department: 'Student Affairs Council',
      details:
        'Registrations are open for the 3-day technical symposium featuring 24-hour hackathons, robotics challenges, and paper presentations with corporate scholarship prizes.'
    },
    {
      id: 'NOT-2026-029',
      category: 'Admissions',
      date: 'Sep 10, 2026',
      title: 'Merit Scholarship & Financial Assistance Guidelines 2026–27',
      department: 'Scholarship Committee',
      details:
        'Eligible students with CGPA above 3.80 are invited to submit scholarship renewal applications before the October cutoff date.'
    }
  ];

  const categories = ['All', 'Admissions', 'Examinations', 'Results', 'Events', 'Academic Calendar'];

  const filteredNotices = activeCategory === 'All'
    ? noticesData
    : noticesData.filter((n) => n.category === activeCategory);

  return (
    <section className="inst-section notices-section" id="notices">
      <div className="section-container">
        {/* Section Head */}
        <div className="editorial-section-head">
          <div className="section-kicker">OFFICIAL COMMUNICATIONS</div>
          <h2 className="section-title">Notice Board &amp; Academic Announcements</h2>
          <div className="section-title-line"></div>
          <p className="section-intro-text">
            Official institutional circulars, exam schedules, admissions notifications, and calendar updates.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="notice-category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`notice-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Compact Date-Stamped Rows */}
        <div className="notices-board-container">
          <div className="notices-table-header">
            <span>Date &amp; ID</span>
            <span>Subject / Notification</span>
            <span>Issuing Authority</span>
            <span className="text-right">Action</span>
          </div>

          <div className="notices-list">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="notice-row-item"
                onClick={() => setSelectedNotice(notice)}
              >
                <div className="notice-date-col">
                  <span className="notice-date-text">{notice.date}</span>
                  <span className="notice-id-text">{notice.id}</span>
                </div>

                <div className="notice-title-col">
                  <div className="notice-cat-badge">{notice.category}</div>
                  <strong className="notice-title-text">{notice.title}</strong>
                </div>

                <div className="notice-dept-col">
                  <span>{notice.department}</span>
                </div>

                <div className="notice-action-col">
                  <button
                    className="notice-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNotice(notice);
                    }}
                  >
                    <span>Read Circular</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedNotice(null)}
          title={selectedNotice.title}
          subtitle={`Ref: ${selectedNotice.id} • Date: ${selectedNotice.date} • ${selectedNotice.department}`}
          size="md"
          footer={
            <button
              className="btn btn-secondary"
              onClick={() => setSelectedNotice(null)}
            >
              Close
            </button>
          }
        >
          <div className="notice-modal-content">
            <div className="notice-modal-category">
              <strong>Category:</strong> {selectedNotice.category}
            </div>
            <p className="notice-modal-body">{selectedNotice.details}</p>
            <div className="notice-modal-footer-note">
              <span>Issued by the Office of the Registrar, FIC Institute.</span>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
