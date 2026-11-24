import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GMAIL_COMPOSE_URL =
  'https://mail.google.com/mail/?view=cm&fs=1&to=adianalvin.45@gmail.com';

const Footer = memo(function Footer({ onVisionClick }) {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-animate',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 88%',
            once: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="site-footer" id="contact" ref={footerRef}>
      <div className="footer-container">
        {/* Bagian Atas: Kiri (Brand & Kontak) + Kanan (2 Kolom Link) */}
        <div className="footer-top">
          {/* Kolom Kiri */}
          <div className="footer-brand footer-animate">
            <h2 className="footer-name">Adian Prastiyo Alvin</h2>
            <p className="footer-bio">
              Business Statistics student exploring data analytics, machine learning, and digital experiences. Building insights and sharing the journey.
            </p>

            {/* Lokasi, Email, Telepon */}
            <ul className="footer-contact-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Surabaya, Indonesia • Available Worldwide</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onVisionClick}
                >
                  adianalvin.45@gmail.com
                </a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+6285733741416">(+62) 85733741416</a>
              </li>
            </ul>

            {/* Follow Me & Ikon Sosmed */}
            <div className="footer-social">
              <span className="footer-social-label">Follow me</span>
              <div className="footer-social-icons">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/adianprastiyoalvin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  data-tooltip="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/adianvin.l"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  data-tooltip="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/adianalvin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  data-tooltip="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Dua Tombol CTA Pill */}
            <div className="footer-cta-group">
              <a
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onVisionClick}
                className="btn-cta-primary"
              >
                <span>Let's Work Together</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="#resume" className="btn-cta-secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>View My Resume</span>
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Expertise & Quick Links */}
          <div className="footer-links-wrapper footer-animate">
            <div className="footer-column">
              <h3>Expertise</h3>
              <ul>
                <li><a href="#projects">Data Analytics & BI</a></li>
                <li><a href="#projects">Statistical Modeling</a></li>
                <li><a href="#projects">Machine Learning</a></li>
                <li><a href="#projects">Dashboard & Visualization</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#resume">Resume</a></li>
                <li><a href="#projects">Projects</a></li>
                <li>
                  <a
                    href={GMAIL_COMPOSE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onVisionClick}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Garis Pemisah */}
        <hr className="footer-divider" />

        {/* Bagian Bawah: Copyright & Policy */}
        <div className="footer-bottom">
          <p className="footer-copyright">© 2026 Adian Prastiyo Alvin. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#home">Privacy Policy</a>
            <a href="#home">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;