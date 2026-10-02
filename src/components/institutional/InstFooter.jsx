import React from 'react';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const InstFooter = ({ onOpenPortal, onOpenContact, onNavigateSection }) => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="inst-footer" id="contact">
      <div className="footer-top-container">
        <div className="footer-grid">
          {/* Brand & Address Column */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <div className="brand-crest small">
                <GraduationCap size={20} />
              </div>
              <div>
                <span className="footer-inst-name">FIC INSTITUTE</span>
                <span className="footer-inst-tagline">Learning Today. Building Tomorrow.</span>
              </div>
            </div>

            <p className="footer-brand-desc">
              Dedicated to academic rigor, student-centered mentorship, and transparent institutional governance through connected digital education systems.
            </p>

            <div className="footer-contact-details">
              <div className="f-contact-item">
                <MapPin size={16} className="f-icon" />
                <span>FIC Institute Campus, Institutional Area, Knowledge Park, India</span>
              </div>
              <div className="f-contact-item">
                <Phone size={16} className="f-icon" />
                <span>Admissions: +91 (0) 11-4500-9800 • Desk: Ext 101</span>
              </div>
              <div className="f-contact-item">
                <Mail size={16} className="f-icon" />
                <span>admissions@fic-institute.edu.in • registrar@fic-institute.edu.in</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-nav-list">
              <li><button onClick={() => scrollTo('hero')}>Home</button></li>
              <li><button onClick={() => scrollTo('about')}>About FIC Institute</button></li>
              <li><button onClick={() => scrollTo('why-fic')}>Why Choose FIC</button></li>
              <li><button onClick={() => scrollTo('student-life')}>Campus &amp; Student Life</button></li>
              <li><button onClick={() => scrollTo('notices')}>Notice Board</button></li>
              <li><button onClick={onOpenContact}>Admissions Inquiry</button></li>
            </ul>
          </div>

          {/* Column 3: Academic Disciplines */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Academic Divisions</h4>
            <ul className="footer-nav-list">
              <li><button onClick={() => scrollTo('academics')}>Department of Computing (BCA / MCA)</button></li>
              <li><button onClick={() => scrollTo('academics')}>Department of Management (BBA / MBA)</button></li>
              <li><button onClick={() => scrollTo('academics')}>Department of Commerce (B.Com Honors)</button></li>
              <li><button onClick={() => scrollTo('academics')}>Applied Data Science &amp; AI Tracks</button></li>
              <li><button onClick={() => scrollTo('academics')}>Executive &amp; Professional Skills</button></li>
            </ul>
          </div>

          {/* Column 4: Student Services & Portal */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Student Services</h4>
            <ul className="footer-nav-list">
              <li>
                <button className="footer-portal-link" onClick={onOpenPortal}>
                  <ShieldCheck size={14} />
                  <span>Student Management Portal</span>
                </button>
              </li>
              <li><button onClick={onOpenPortal}>Attendance Verification</button></li>
              <li><button onClick={onOpenPortal}>Exam Timetable &amp; Results</button></li>
              <li><button onClick={onOpenPortal}>Fee Invoicing &amp; Receipts</button></li>
              <li><button onClick={onOpenPortal}>Academic Advising &amp; Dossiers</button></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="footer-bottom-strip">
        <div className="footer-bottom-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} FIC Institute. All rights reserved. UGC &amp; AICTE Curriculum Aligned.
          </p>
          <div className="footer-legal-links">
            <span>Academic Integrity Policy</span>
            <span className="dot-sep">•</span>
            <span>Student Code of Conduct</span>
            <span className="dot-sep">•</span>
            <span>Privacy &amp; Data Governance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
