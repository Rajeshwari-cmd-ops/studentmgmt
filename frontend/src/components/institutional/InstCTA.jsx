import React from 'react';
import {
  ShieldCheck,
  Mail,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export const InstCTA = ({ onOpenPortal, onOpenContact }) => {
  return (
    <section className="inst-section cta-section">
      <div className="section-container">
        <div className="cta-banner-card">
          <div className="cta-crest-icon">
            <GraduationCap size={32} />
          </div>

          <h2 className="cta-heading">
            Stay Connected With FIC Institute
          </h2>

          <p className="cta-subheading">
            Whether you are a current student managing your academic journey or an aspiring applicant seeking admissions counseling, we are here to guide you.
          </p>

          <div className="cta-buttons-row">
            <button className="btn-academic-gold" onClick={onOpenPortal}>
              <ShieldCheck size={16} />
              <span>Student Portal</span>
              <ArrowRight size={16} />
            </button>

            <button className="btn-academic-outline-white" onClick={onOpenContact}>
              <Mail size={16} />
              <span>Contact Institute</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
