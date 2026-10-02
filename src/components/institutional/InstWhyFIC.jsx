import React from 'react';
import {
  GraduationCap,
  FlaskConical,
  LifeBuoy,
  Briefcase,
  CheckCircle2
} from 'lucide-react';

export const InstWhyFIC = () => {
  const pillars = [
    {
      icon: GraduationCap,
      tag: 'Academic Mentorship',
      title: 'Experienced Faculty',
      description:
        'Learn under scholarly educators, PhD faculty, and seasoned industry practitioners who bring deep conceptual domain expertise, active research publications, and dedicated student advising to every classroom.'
    },
    {
      icon: FlaskConical,
      tag: 'Hands-On Pedagogy',
      title: 'Practical Learning',
      description:
        'Classroom lectures are reinforced with advanced computing laboratories, simulation workshops, real-world case discussions, and industry-partnered capstone projects that test real problem-solving capabilities.'
    },
    {
      icon: LifeBuoy,
      tag: 'Holistic Guidance',
      title: 'Student Support',
      description:
        'Comprehensive institutional ecosystem offering structured academic advising, counseling services, remedial learning support, digital attendance transparency, and merit-based financial aid.'
    },
    {
      icon: Briefcase,
      tag: 'Professional Growth',
      title: 'Career Development',
      description:
        'Dedicated corporate relations cell facilitating campus recruitment drives, industry apprenticeships, technical resume clinics, interview preparation bootcamps, and executive alumni networks.'
    }
  ];

  return (
    <section className="inst-section why-fic-section" id="why-fic">
      <div className="section-container">
        {/* Editorial Section Head */}
        <div className="editorial-section-head">
          <div className="section-kicker">INSTITUTIONAL ADVANTAGE</div>
          <h2 className="section-title">Why Students Choose FIC Institute</h2>
          <div className="section-title-line"></div>
          <p className="section-intro-text">
            A cohesive environment designed to provide high-caliber academic foundations, professional discipline, and comprehensive individual mentorship.
          </p>
        </div>

        {/* Horizontal Editorial Strip Layout */}
        <div className="why-horizontal-layout">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="why-editorial-row">
                <div className="why-row-left">
                  <div className="why-number-badge">0{index + 1}</div>
                  <div className="why-icon-box">
                    <Icon size={24} />
                  </div>
                  <div className="why-header-text">
                    <span className="why-tag">{item.tag}</span>
                    <h3 className="why-title">{item.title}</h3>
                  </div>
                </div>

                <div className="why-row-right">
                  <p className="why-description">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
