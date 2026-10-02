import React from 'react';
import {
  ShieldCheck,
  UserCheck,
  CalendarCheck,
  BookOpen,
  FileCheck2,
  Receipt,
  BarChart3,
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

export const InstPortalShowcase = ({ onOpenPortal }) => {
  const portalFeatures = [
    {
      icon: UserCheck,
      title: 'Student Profile & Dossier',
      description: 'Comprehensive academic bio, enrolled major, guardian contacts, and verified credentials.'
    },
    {
      icon: CalendarCheck,
      title: 'Real-Time Attendance',
      description: 'Transparent class regularity records, daily roll call statuses, and absence logs.'
    },
    {
      icon: BookOpen,
      title: 'Curriculum & Courses',
      description: 'Detailed syllabus outlines, credit distributions, lecture hours, and faculty assignments.'
    },
    {
      icon: FileCheck2,
      title: 'Examinations & Hall Passes',
      description: 'Exam dates, timing schedules, assigned exam halls, internal grades, and scorecards.'
    },
    {
      icon: Receipt,
      title: 'Fees & Invoicing Ledger',
      description: 'Semester tuition statements, scholarship adjustments, payment history, and instant receipts.'
    },
    {
      icon: BarChart3,
      title: 'Academic Reports & Transcripts',
      description: 'Semester-by-semester GPA trends, degree audit progress, and printable academic dossiers.'
    }
  ];

  return (
    <section className="inst-section portal-showcase-section" id="portal-showcase">
      <div className="section-container">
        {/* Navy Showcase Container */}
        <div className="portal-showcase-card">
          <div className="portal-showcase-head">
            <div className="showcase-badge">
              <Sparkles size={14} />
              <span>CONNECTED STUDENT INFORMATION SYSTEM</span>
            </div>

            <h2 className="showcase-title">
              Everything students need, in one place.
            </h2>
            <p className="showcase-subtitle">
              FIC Institute integrates academic management, attendance tracking, examination schedules, fee ledgers, and student records into an intuitive digital portal.
            </p>

            <div className="showcase-cta-wrap">
              <button className="btn-portal-primary" onClick={onOpenPortal}>
                <Lock size={16} />
                <span>Login to Student Portal</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* 6 Features Grid */}
          <div className="portal-features-grid">
            {portalFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="portal-feature-item" onClick={onOpenPortal} style={{ cursor: 'pointer' }}>
                  <div className="pf-icon-box">
                    <Icon size={20} />
                  </div>
                  <div className="pf-content">
                    <h4 className="pf-title">{feat.title}</h4>
                    <p className="pf-desc">{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="portal-showcase-bottom">
            <span>Secure SSL Encrypted • Role-Based Access Control • LocalStorage Persistent</span>
          </div>
        </div>
      </div>
    </section>
  );
};
