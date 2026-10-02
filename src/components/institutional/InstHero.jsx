import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Calendar,
  Award,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

export const InstHero = ({ onOpenPortal, onExplore }) => {
  return (
    <section className="inst-hero-section" id="hero">
      <div className="hero-container">
        {/* Editorial Layout Grid */}
        <div className="hero-grid">
          {/* Left Column: Headlines & Content */}
          <div className="hero-copy-column">
            <div className="hero-kicker">
              <span className="kicker-line"></span>
              <span className="kicker-text">FIC INSTITUTE OF HIGHER LEARNING</span>
            </div>

            <h1 className="hero-headline" aria-label="Empowering Students Through Education, Skills & Opportunity">
              {['Empowering', 'Students', 'Through', 'Education,', 'Skills', '&', 'Opportunity'].map((word, idx) => (
                <span key={idx} className="hero-word-wrap">
                  <span
                    className="hero-word-inner"
                    style={{ animationDelay: `${idx * 45}ms` }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p className="hero-description">
              FIC Institute brings academics, student services and campus activities together through a connected digital experience.
            </p>

            <div className="hero-cta-group">
              <button className="btn-academic-primary" onClick={onExplore}>
                <span>Explore FIC Institute</span>
                <ArrowRight size={16} />
              </button>
              <button className="btn-academic-secondary" onClick={onOpenPortal}>
                <ShieldCheck size={16} />
                <span>Student Portal</span>
              </button>
            </div>

            <div className="hero-trust-badges">
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-icon" />
                <span>UGC &amp; AICTE Aligned</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-icon" />
                <span>Industry-Mentored Labs</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-icon" />
                <span>Digital Academic Dossier</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Academic Photography & Framed Card */}
          <div className="hero-media-column">
            <div className="hero-image-frame">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80"
                alt="FIC Institute campus students collaborating in state of the art study center"
                className="hero-main-img"
              />
              <div className="hero-image-caption">
                <div className="caption-gold-bar"></div>
                <div className="caption-content">
                  <strong>Academic Session 2026–2027</strong>
                  <span>Main Campus • Central Learning Center</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admission / Academic-Year Information Strip */}
      <div className="admission-info-strip">
        <div className="strip-container">
          <div className="strip-item">
            <div className="strip-icon-box">
              <Calendar size={18} />
            </div>
            <div className="strip-text">
              <span className="strip-label">Admissions Open</span>
              <strong>Academic Year 2026–27</strong>
            </div>
          </div>

          <div className="strip-divider"></div>

          <div className="strip-item">
            <div className="strip-icon-box">
              <Award size={18} />
            </div>
            <div className="strip-text">
              <span className="strip-label">Degree Framework</span>
              <strong>Undergraduate &amp; Postgraduate</strong>
            </div>
          </div>

          <div className="strip-divider"></div>

          <div className="strip-item">
            <div className="strip-icon-box">
              <BookOpen size={18} />
            </div>
            <div className="strip-text">
              <span className="strip-label">Curriculum Focus</span>
              <strong>Applications, Management &amp; Commerce</strong>
            </div>
          </div>

          <div className="strip-divider"></div>

          <div className="strip-item">
            <div className="strip-icon-box">
              <ShieldCheck size={18} />
            </div>
            <div className="strip-text">
              <span className="strip-label">Connected SIS</span>
              <strong>Live Student Management Portal</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
