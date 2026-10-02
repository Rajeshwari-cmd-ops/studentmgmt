import React, { useState } from 'react';
import {
  Code,
  Briefcase,
  TrendingUp,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Clock,
  BookOpen,
  Award
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const InstAcademics = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const programs = [
    {
      id: 'comp-app',
      icon: Code,
      category: 'Department of Computing',
      title: 'Computer Applications',
      degrees: 'BCA • MCA • B.Sc (Data Analytics)',
      duration: '3 to 4 Years',
      description:
        'Comprehensive computational foundations covering software engineering, algorithms, cloud architectures, database management, and applied artificial intelligence.',
      keyCourses: [
        'Data Structures & Algorithm Design',
        'Deep Neural Networks & Machine Learning',
        'Database Management & Distributed Systems',
        'Full-Stack Web & Mobile Architecture',
        'Cloud Infrastructure & DevOps'
      ],
      careerProspects: 'Software Engineer, Data Analyst, Cloud Architect, Systems Consultant'
    },
    {
      id: 'mgmt',
      icon: Briefcase,
      category: 'Department of Management Studies',
      title: 'Management',
      degrees: 'BBA • MBA (Core & Specialized)',
      duration: '2 to 3 Years',
      description:
        'Modern enterprise education integrating strategic planning, organizational leadership, marketing intelligence, financial modeling, and business analytics.',
      keyCourses: [
        'Strategic Corporate Management',
        'Marketing Research & Consumer Analytics',
        'Financial Reporting & Corporate Valuation',
        'Supply Chain & Operations Optimization',
        'Organizational Behavior & Human Resources'
      ],
      careerProspects: 'Business Analyst, Product Associate, Marketing Lead, Operations Manager'
    },
    {
      id: 'comm',
      icon: TrendingUp,
      category: 'Department of Commerce & Finance',
      title: 'Commerce',
      degrees: 'B.Com (Honors) • M.Com • Financial Analysis',
      duration: '3 Years',
      description:
        'Rigorous study of accounting standards, corporate taxation, banking frameworks, audit compliance, investment banking, and contemporary fintech applications.',
      keyCourses: [
        'Advanced Corporate Accounting & Auditing',
        'Direct & Indirect Taxation Law',
        'Financial Markets, Banking & Insurance',
        'Cost Accounting & Budgetary Control',
        'International Trade & Corporate Governance'
      ],
      careerProspects: 'Financial Analyst, Audit Associate, Tax Consultant, Investment Banker'
    },
    {
      id: 'prof-dev',
      icon: Cpu,
      category: 'Centre for Continuing Education',
      title: 'Professional & Skill Development',
      degrees: 'Executive Certificates • Industry Diplomas',
      duration: '6 Months to 1 Year',
      description:
        'Targeted upskilling tracks in high-demand domains including cybersecurity, data engineering, professional business communication, and executive management.',
      keyCourses: [
        'Cybersecurity & Network Defense Practicum',
        'Applied Python for Financial & Business Analytics',
        'Executive Business Writing & Presentation Mastery',
        'Agile Project Management & Scrum Frameworks',
        'AI Tools & Productivity in Enterprise Workflows'
      ],
      careerProspects: 'Specialist Certifications, Career Transition, Executive Readiness'
    }
  ];

  return (
    <section className="inst-section academics-section" id="academics">
      <div className="section-container">
        {/* Section Header */}
        <div className="editorial-section-head">
          <div className="section-kicker">ACADEMIC PROGRAMS</div>
          <h2 className="section-title">Structured Disciplines Designed for Professional Mastery</h2>
          <div className="section-title-line"></div>
          <p className="section-intro-text">
            FIC Institute offers specialized programs in computing, business administration, commerce, and advanced industry certifications, each crafted with theoretical depth and practical relevance.
          </p>
        </div>

        {/* Programs Editorial Cards Grid */}
        <div className="academics-grid">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <div key={program.id} className="academic-program-card">
                <div className="prog-card-header">
                  <div className="prog-icon-box">
                    <Icon size={24} />
                  </div>
                  <span className="prog-category-tag">{program.category}</span>
                </div>

                <div className="prog-card-body">
                  <h3 className="prog-title">{program.title}</h3>
                  <div className="prog-degrees-chip">{program.degrees}</div>
                  <p className="prog-description">{program.description}</p>
                </div>

                <div className="prog-card-footer">
                  <div className="prog-duration">
                    <Clock size={14} />
                    <span>{program.duration}</span>
                  </div>
                  <button
                    className="prog-explore-link"
                    onClick={() => setSelectedProgram(program)}
                  >
                    <span>Explore Program</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedProgram(null)}
          title={`${selectedProgram.title} Curriculum Overview`}
          subtitle={`${selectedProgram.category} • ${selectedProgram.degrees}`}
          size="lg"
          footer={
            <button
              className="btn btn-secondary"
              onClick={() => setSelectedProgram(null)}
            >
              Close Details
            </button>
          }
        >
          <div className="program-modal-dossier">
            <p className="prog-modal-desc">{selectedProgram.description}</p>

            <div className="prog-modal-block">
              <h4 className="prog-modal-heading">
                <BookOpen size={16} /> Core Curriculum Areas
              </h4>
              <div className="curriculum-list">
                {selectedProgram.keyCourses.map((c, i) => (
                  <div key={i} className="curriculum-item">
                    <CheckCircle2 size={16} className="gold-check" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="prog-modal-block">
              <h4 className="prog-modal-heading">
                <Award size={16} /> Career Pathways &amp; Outcomes
              </h4>
              <p className="prog-outcomes-text">{selectedProgram.careerProspects}</p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
