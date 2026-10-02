import React from 'react';

export const InstStatistics = () => {
  const stats = [
    {
      value: '—',
      label: 'Enrolled Students',
      caption: 'Active undergraduate & postgraduate cohorts'
    },
    {
      value: '—',
      label: 'Academic Programs',
      caption: 'Computing, management & commerce degrees'
    },
    {
      value: '—',
      label: 'Faculty & Mentors',
      caption: 'Scholarly educators & domain specialists'
    },
    {
      value: '—',
      label: 'Years of Learning',
      caption: 'Committed to academic and career excellence'
    }
  ];

  return (
    <section className="inst-section stats-section">
      <div className="section-container">
        <div className="stats-editorial-strip">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-editorial-item">
              <div className="stat-val-text">{stat.value}</div>
              <strong className="stat-label-text">{stat.label}</strong>
              <p className="stat-caption-text">{stat.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
