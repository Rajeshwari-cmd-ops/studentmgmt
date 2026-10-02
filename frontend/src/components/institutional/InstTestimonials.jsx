import React from 'react';
import { Quote } from 'lucide-react';

export const InstTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        '“The rigorous curriculum and hands-on laboratory sessions provided me with the depth needed to transition smoothly into enterprise software development. The mentorship from faculty made all the difference.”',
      author: 'Student / Alumni Name',
      role: 'Bachelor of Computer Applications (BCA)',
      batch: 'Batch of 2025 • [Placeholder: Replace with actual graduate story]'
    },
    {
      id: 2,
      quote:
        '“FIC Institute gave me an environment where academic discipline met strategic business case studies. The student portal made attendance, fees, and exam tracking straightforward and transparent.”',
      author: 'Student / Alumni Name',
      role: 'Master of Business Administration (MBA)',
      batch: 'Batch of 2024 • [Placeholder: Replace with actual graduate story]'
    },
    {
      id: 3,
      quote:
        '“The faculty’s focus on practical taxation, auditing, and corporate finance prepared me thoroughly for professional examinations and corporate internship placements.”',
      author: 'Student / Alumni Name',
      role: 'Bachelor of Commerce (B.Com Honors)',
      batch: 'Batch of 2025 • [Placeholder: Replace with actual graduate story]'
    }
  ];

  return (
    <section className="inst-section testimonials-section" id="testimonials">
      <div className="section-container">
        {/* Section Head */}
        <div className="editorial-section-head">
          <div className="section-kicker">STUDENT VOICES &amp; ALUMNI PERSPECTIVES</div>
          <h2 className="section-title">Experiences from Our Academic Community</h2>
          <div className="section-title-line"></div>
          <p className="section-intro-text">
            Reflections from students and graduates on learning rigor, campus culture, and faculty mentorship.
          </p>
        </div>

        {/* 3 Testimonials Cards Grid */}
        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="testimonial-quote-icon">
                <Quote size={24} />
              </div>
              <p className="testimonial-body-text">{item.quote}</p>
              <div className="testimonial-footer-meta">
                <div className="t-gold-divider"></div>
                <strong className="t-author-name">{item.author}</strong>
                <span className="t-author-role">{item.role}</span>
                <span className="t-author-batch">{item.batch}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
