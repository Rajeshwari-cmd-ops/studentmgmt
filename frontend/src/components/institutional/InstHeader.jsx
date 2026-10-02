import React, { useState } from 'react';
import {
  GraduationCap,
  Menu,
  X,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const InstHeader = ({ onOpenPortal, onOpenContact, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about' },
    { label: 'Academics', target: 'academics' },
    { label: 'Why FIC', target: 'why-fic' },
    { label: 'Student Life', target: 'student-life' },
    { label: 'Notices', target: 'notices' },
    { label: 'Contact', target: 'contact' }
  ];

  const handleNavClick = (target) => {
    setMobileMenuOpen(false);
    if (target === 'contact') {
      onOpenContact();
      return;
    }
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="inst-header">
      {/* Top Academic Info Strip */}
      <div className="inst-topbar">
        <div className="inst-topbar-inner">
          <div className="topbar-left">
            <span className="topbar-badge">Admissions 2026–27</span>
            <span className="topbar-text">Applications open for Undergraduate & Postgraduate Programs</span>
          </div>
          <div className="topbar-right">
            <span className="topbar-link">Academic Calendar</span>
            <span className="topbar-dot">•</span>
            <span className="topbar-link">Accreditation & Approvals</span>
            <span className="topbar-dot">•</span>
            <button className="topbar-btn" onClick={onOpenContact}>Inquiry Desk</button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="inst-navbar">
        <div className="inst-nav-inner">
          {/* Brand Logo & Wordmark */}
          <div className="inst-brand" onClick={() => handleNavClick('hero')} style={{ cursor: 'pointer' }}>
            <div className="brand-crest">
              <GraduationCap size={24} />
            </div>
            <div className="brand-titles">
              <span className="institute-name">FIC INSTITUTE</span>
              <span className="institute-tagline">Learning Today. Building Tomorrow.</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="inst-desktop-nav" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.target}
                className="nav-anchor"
                onClick={() => handleNavClick(link.target)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Portal CTA */}
          <div className="inst-header-actions">
            <button className="btn-portal-header" onClick={onOpenPortal}>
              <ShieldCheck size={16} />
              <span>Student Portal</span>
              <ArrowRight size={14} className="arrow-icon" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="inst-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="inst-mobile-menu">
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <button
                key={link.target}
                className="mobile-nav-anchor"
                onClick={() => handleNavClick(link.target)}
              >
                <span>{link.label}</span>
                <ChevronRight size={16} />
              </button>
            ))}
            <div className="mobile-menu-footer">
              <button className="btn-portal-full" onClick={() => { setMobileMenuOpen(false); onOpenPortal(); }}>
                <ShieldCheck size={16} />
                <span>Access Student Portal</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
