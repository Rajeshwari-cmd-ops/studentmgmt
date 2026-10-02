import React from 'react';
import {
  Calendar,
  Sparkles,
  Users2,
  Award,
  BookOpenCheck,
  Compass
} from 'lucide-react';

export const InstStudentExperience = () => {
  return (
    <section className="inst-section student-experience-section" id="student-life">
      <div className="section-container">
        {/* Section Head */}
        <div className="editorial-section-head">
          <div className="section-kicker">CAMPUS LIFE &amp; COMMUNITY</div>
          <h2 className="section-title">An Engaging, Diverse &amp; Vibrant Student Experience</h2>
          <div className="section-title-line"></div>
        </div>

        {/* Large Editorial Layout with Two Imagery Cards */}
        <div className="experience-editorial-grid">
          {/* Main Visual Feature */}
          <div className="experience-visual-card">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&auto=format&fit=crop&q=80"
              alt="FIC Institute student study group and seminar"
              className="experience-main-img"
            />
            <div className="experience-caption-strip">
              <span className="exp-gold-pill">Collaborative Learning</span>
              <strong>Active Student Societies &amp; Technical Hackathons</strong>
            </div>
          </div>

          {/* Narrative Content Card */}
          <div className="experience-narrative-card">
            <h3 className="experience-heading">
              Beyond textbooks: leadership, technical discovery, and community engagement.
            </h3>
            <p className="experience-paragraph">
              Life at FIC Institute is vibrant and intellectually stimulating. Students actively participate in student-led computing clubs, management symposiums, debate conclaves, sports meets, and national-level collegiate hackathons.
            </p>

            <div className="experience-features-list">
              <div className="exp-feature-item">
                <div className="exp-icon-circle">
                  <Sparkles size={18} />
                </div>
                <div>
                  <strong>Technical &amp; Academic Clubs</strong>
                  <p>Coding societies, finance forums, and AI study circles organizing regular workshops.</p>
                </div>
              </div>

              <div className="exp-feature-item">
                <div className="exp-icon-circle">
                  <Compass size={18} />
                </div>
                <div>
                  <strong>Industry Colloquiums &amp; Seminars</strong>
                  <p>Distinguished guest lectures from senior corporate leaders, founders, and research fellows.</p>
                </div>
              </div>

              <div className="exp-feature-item">
                <div className="exp-icon-circle">
                  <Award size={18} />
                </div>
                <div>
                  <strong>Annual Cultural &amp; Sports Fest</strong>
                  <p>Inter-collegiate competitions fostering leadership, sportsmanship, and creative expression.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
