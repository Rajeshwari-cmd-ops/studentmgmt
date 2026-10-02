import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Users,
  Target,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const InstAbout = ({ onExploreAcademics }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselSlides = [
    {
      src: '/images/campus-students.png',
      alt: 'FIC Institute campus students collaborating and walking to lectures',
      caption: '“Education is not merely the transmission of knowledge; it is the cultivation of capability and character.”',
      author: '— Academic Council, FIC Institute'
    },
    {
      src: '/images/library-students.png',
      alt: 'FIC Institute students conducting research in the university library',
      caption: '“Fostering critical intellect, collaborative research, and interdisciplinary problem solving.”',
      author: '— Faculty of Applied Sciences & Management'
    },
    {
      src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&auto=format&fit=crop&q=80',
      alt: 'FIC Institute graduating cohort celebrating convocation achievement',
      caption: '“Empowering ambitious graduates equipped for global leadership and societal impact.”',
      author: '— Office of Academic Affairs'
    }
  ];

  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const pillars = [
    {
      icon: BookOpen,
      title: 'Academic Excellence',
      description:
        'Rigorous curricula designed to build robust theoretical mastery, analytical rigor, and critical reasoning across all disciplines.'
    },
    {
      icon: Users,
      title: 'Student-Centered Learning',
      description:
        'Personalized mentorship models, structured faculty advising, and continuous feedback to help every student achieve their potential.'
    },
    {
      icon: Target,
      title: 'Industry-Relevant Skills',
      description:
        'Hands-on computational labs, modern case study seminars, corporate internships, and skill certification pathways.'
    },
    {
      icon: HeartHandshake,
      title: 'Supportive Campus Community',
      description:
        'An inclusive environment fostering collaborative academic societies, technical clubs, peer mentoring, and holistic well-being.'
    }
  ];

  return (
    <section className="inst-section about-section" id="about">
      <div className="section-container">
        {/* Section Header */}
        <div className="editorial-section-head">
          <div className="section-kicker">ABOUT THE INSTITUTE</div>
          <h2 className="section-title">A Foundation of Intellectual Rigor &amp; Practical Competence</h2>
          <div className="section-title-line"></div>
        </div>

        {/* Narrative & Image Asymmetric Grid */}
        <div className="about-editorial-grid">
          <div className="about-narrative-col">
            <h3 className="about-subheading">
              Shaping forward-thinking graduates through purposeful education.
            </h3>
            <p className="narrative-paragraph">
              FIC Institute is established with a clear mandate: to provide high-caliber education that bridges academic theory with industry practice. We offer contemporary undergraduate and postgraduate programs designed to prepare students for impactful careers in technology, enterprise management, and modern commerce.
            </p>
            <p className="narrative-paragraph">
              With an emphasis on structured mentorship, state-of-the-art laboratory infrastructure, and digital academic administration, FIC Institute ensures every student receives the guidance, resources, and environment necessary for intellectual and professional growth.
            </p>

            <div className="about-highlights-list">
              <div className="highlight-item">
                <CheckCircle2 size={18} className="gold-check" />
                <span>Interdisciplinary curriculum aligned with national and global standards</span>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={18} className="gold-check" />
                <span>Dedicated academic advisory and personalized performance tracking</span>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={18} className="gold-check" />
                <span>Modern digital student services supporting transparent academic life</span>
              </div>
            </div>

            <div className="about-action-row">
              <button className="btn-academic-primary btn-sm-text" onClick={onExploreAcademics}>
                <span>View Academic Programs</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <div className="about-visual-col">
            <div className="about-image-card">
              {/* Horizontal Sliding Carousel Viewport */}
              <div className="about-carousel-viewport">
                <div
                  className="about-carousel-track"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {carouselSlides.map((slide, idx) => (
                    <div key={idx} className="about-carousel-slide">
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="about-primary-img"
                      />
                    </div>
                  ))}
                </div>

                {/* Left/Right Navigation Arrows */}
                <button
                  type="button"
                  className="carousel-arrow prev"
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="carousel-arrow next"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Indicator Dots */}
                <div className="carousel-dots">
                  {carouselSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`carousel-dot ${idx === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Dynamic Quote Overlay */}
              <div className="about-quote-overlay">
                <p className="quote-text">{carouselSlides[currentSlide].caption}</p>
                <span className="quote-author">{carouselSlides[currentSlide].author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="pillars-grid">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="pillar-card">
                <div className="pillar-num">0{idx + 1}</div>
                <div className="pillar-icon-box">
                  <Icon size={22} />
                </div>
                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-desc">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
