import React, { useState, useEffect, useRef } from 'react';

export const InstStatistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    {
      numeric: 2500,
      suffix: '+',
      format: (n) => n.toLocaleString() + '+',
      label: 'Enrolled Students',
      caption: 'Active undergraduate & postgraduate cohorts'
    },
    {
      numeric: 18,
      suffix: '+',
      format: (n) => n + '+',
      label: 'Academic Programs',
      caption: 'Computing, management & commerce degrees'
    },
    {
      numeric: 95,
      suffix: '+',
      format: (n) => n + '+',
      label: 'Faculty & Mentors',
      caption: 'Scholarly educators & domain specialists'
    },
    {
      numeric: 15,
      suffix: '+',
      format: (n) => n + '+',
      label: 'Years of Learning',
      caption: 'Committed to academic and career excellence'
    }
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quartic curve for smooth slowdown
      const easeOut = 1 - Math.pow(1 - progress, 4);

      setCounts(stats.map((s) => Math.round(s.numeric * easeOut)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="inst-section stats-section" id="statistics">
      <div className="section-container">
        <div className="stats-editorial-strip">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`stat-editorial-item ${isVisible ? 'is-visible' : ''}`}
            >
              <div className="stat-val-text">
                {isVisible ? stat.format(counts[idx]) : `0${stat.suffix}`}
              </div>
              <strong className="stat-label-text">{stat.label}</strong>
              <p className="stat-caption-text">{stat.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
