import React, { useState, useEffect, memo } from 'react';
import { WhiteBtn } from '../ui/WhiteBtn';

const Navbar = memo(function Navbar({ onContactClick }) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  // 1. Scroll Detection for Compact Navbar & Active Section Indicator with RAF throttling
  useEffect(() => {
    let ticking = false;
    const sections = ['contact', 'projects', 'resume', 'about', 'home'];

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const thresholdDown = 360;
      const thresholdUp = 280;

      setIsCompact((prev) => {
        if (currentScrollY > thresholdDown && !prev) return true;
        if (currentScrollY < thresholdUp && prev) return false;
        return prev;
      });

      // 1. If at or near top of the page, always activate 'home'
      if (currentScrollY < 300) {
        setActiveSection('home');
        ticking = false;
        return;
      }

      // 2. Check sections from bottom to top using getBoundingClientRect (immune to offsetParent nesting)
      const triggerY = 280;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY) {
            setActiveSection((prev) => (prev !== id ? id : prev));
            break;
          }
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile bottom sheet is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Keyboard shortcut to close with Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`navbar-header ${isCompact ? 'compact' : ''}`} 
        id="navbar"
      >
        <div className="navbar-container">
          {/* 1. Mobile Left: 3-Bar Hamburger Menu Toggle */}
          <button
            className={`mobile-hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            id="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line line-1"></span>
            <span className="hamburger-line line-2"></span>
            <span className="hamburger-line line-3"></span>
          </button>

          {/* 2. Mobile Center: Available for Projects Badge */}
          <div className="nav-mobile-available-badge" aria-label="Available for Projects">
            <span className="active-dot-green" aria-hidden="true" />
            <span className="nav-available-text">Available for Projects</span>
          </div>

          {/* Desktop Left: Nav Links */}
          <nav id="nav-menu" className="nav-menu" aria-label="Main Navigation">
            {navLinks.slice(0, 4).map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-item ${activeSection === link.id ? 'active' : ''}`}
                id={`nav-link-${link.id}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* 3. Right: White Contact / Email Button (Desktop: Full Pill, Mobile: Circular Icon) */}
          <div className="nav-action-wrapper">
            <WhiteBtn
              href="#contact"
              className="nav-white-btn"
              id="btn-contact-nav"
              onClick={onContactClick}
              title="Contact Me"
              aria-label="Contact Me"
            >
              <span className="nav-contact-icon">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <span className="nav-contact-text">Contact Me</span>
            </WhiteBtn>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Up Bottom Sheet (matching reference image 2) */}
      <div 
        className={`mobile-bottom-sheet-root ${mobileMenuOpen ? 'is-open' : ''}`}
        id="mobile-bottom-sheet-root"
      >
        {/* Dark Dimmed Backdrop */}
        <div 
          className="mobile-sheet-backdrop" 
          onClick={() => setMobileMenuOpen(false)} 
          aria-hidden="true" 
        />

        {/* Slide-up Bottom Panel */}
        <div 
          className="mobile-bottom-sheet-panel" 
          role="dialog" 
          aria-modal="true" 
          aria-label="Navigation Menu"
        >
          {/* Subtle Drag / Handle Pill */}
          <div className="mobile-sheet-drag-handle" />

          {/* Sheet Header */}
          <div className="mobile-sheet-header">
            <h3 className="mobile-sheet-title">Menu</h3>
            <p className="mobile-sheet-subtitle">Select the section you like.</p>
          </div>

          {/* Vertical Menu Links */}
          <nav className="mobile-sheet-nav-list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`mobile-sheet-nav-item ${isActive ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  <span className="mobile-sheet-nav-label">{link.label}</span>
                  {isActive && <span className="mobile-sheet-active-indicator" />}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
});

export default Navbar;