import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WhiteBtn } from '../ui/WhiteBtn';
import { EXPERIENCES_DATA } from '../../data/resumeData';

gsap.registerPlugin(ScrollTrigger);

export default function Resume({ onOpenOverview }) {
  const [activeExp, setActiveExp] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const entryRefs = useRef([]);

  // Urutan tampil ditentukan oleh angka pada id (exp-1 → exp-N),
  // bukan oleh posisi objek di array EXPERIENCES_DATA.
  const experiences = [...EXPERIENCES_DATA].sort((a, b) => {
    const numA = parseInt(a.id?.match(/\d+/)?.[0], 10);
    const numB = parseInt(b.id?.match(/\d+/)?.[0], 10);
    return (isNaN(numA) ? Infinity : numA) - (isNaN(numB) ? Infinity : numB);
  });

  // Title ScrollTrigger reveal animation
  useEffect(() => {
    if (!titleRef.current) return;
    const lines = titleRef.current.querySelectorAll('.resume-title-line-1, .resume-title-line-2');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            delay: 0.15,
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, titleRef);

    return () => ctx.revert();
  }, []);

  // Intersection Observer to detect which entry is most prominently in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px', // Active when entry is in central 40% of viewport
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!isNaN(index)) {
            setActiveExp(index);
          }
        }
      });
    }, observerOptions);

    const currentRefs = entryRefs.current;
    currentRefs.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      currentRefs.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="section-container resume-showcase-section" id="resume" ref={sectionRef}>
      {/* Mobile-Only Top Header (Shown on < 900px) */}
      <div className="resume-mobile-title-header">
        <div className="resume-title-text-group">
          <h2 className="resume-stacked-title">
            <span className="resume-title-line-1">My Resume</span>
            <span className="resume-title-line-2">& Experience</span>
          </h2>
          <p className="resume-sub-description">
            Here’s a closer look at where I’ve been, what I’ve learned, and what I’ve built along the way — from Information Systems to fullstack development, creative work, and beyond.
          </p>
        </div>
        <WhiteBtn
          href="https://drive.google.com/file/d/1oYE9yi1rgHcpcPOCCEHjZTv1OJdObKhD/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="resume-cv-btn"
        >
          <span>My CV</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </WhiteBtn>
      </div>

      <div className="resume-layout-split">
        {/* Kolom Kiri (~40% lebar) — Text content that user scrolls */}
        <div className="resume-col-left">
          <div className="resume-entries-list">
            {experiences.map((exp, index) => {
              const isActive = activeExp === index;
              return (
                <div
                  key={exp.id}
                  className={`resume-entry-block ${isActive ? 'is-active' : ''}`}
                  data-index={index}
                  ref={(el) => (entryRefs.current[index] = el)}
                  id={`entry-${exp.id}`}
                >
                  {/* Timeline Checkpoint Dot (GitHub-style commit graph) */}
                  <span className="resume-timeline-dot" aria-hidden="true" />

                  {/* Mobile Image Preview (Visible only on mobile screen) */}
                  <div className="resume-entry-mobile-preview">
                    <img
                      src={exp.image}
                      alt={exp.alt || exp.role}
                      className="resume-entry-mobile-img"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="resume-entry-mobile-gradient" />
                  </div>

                  {/* 1. Nama organisasi — label kecil di paling atas */}
                  <span className="resume-entry-org">{exp.org}</span>

                  {/* 2. Posisi/jabatan — headline utama, ukuran besar */}
                  <h3 className="resume-entry-role">{exp.role}</h3>

                  {/* 3. Durasi — di bawah posisi */}
                  <div className="resume-entry-date-row">
                    <span className="resume-entry-date">{exp.date}</span>
                  </div>

                  {/* 4. Deskripsi singkat — beberapa kalimat tentang peran */}
                  <p className="resume-entry-desc">{exp.tagline || exp.description}</p>

                  {/* 5. Button Read More */}
                  <div className="resume-entry-action">
                    <WhiteBtn
                      onClick={() => onOpenOverview?.(exp)}
                      className="resume-read-more-btn"
                    >
                      Read More
                    </WhiteBtn>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kolom Kanan (~60% lebar) — Sticky Title + Bento Image Panel (Desktop) */}
        <div className="resume-col-right">
          {/* Stacked Section Title (Resume on top, & Experience below) + My CV Button */}
          <div className="resume-title-header">
            <div className="resume-title-text-group">
              <h2 className="resume-stacked-title" ref={titleRef}>
                <span className="resume-title-line-1">My Resume</span>
                <span className="resume-title-line-2">& Experience</span>
              </h2>
              <p className="resume-sub-description" ref={descRef}>
                Here’s a closer look at where I’ve been, what I’ve learned, and what I’ve built along the way — from Information Systems to fullstack development, creative work, and beyond.
              </p>
            </div>
            <WhiteBtn
              href="https://drive.google.com/file/d/1oYE9yi1rgHcpcPOCCEHjZTv1OJdObKhD/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-cv-btn"
            >
              <span>My CV</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </WhiteBtn>
          </div>

          {/* Bento Image Panel (1 large hero card on top + 2 small side-by-side cards below) */}
          <div className="resume-fixed-image-panel">
            {experiences.map((exp, index) => {
              const isActive = activeExp === index;
              return (
                <div
                  key={`bento-${exp.id}`}
                  className={`resume-bento-slide ${isActive ? 'active' : ''}`}
                  aria-hidden={!isActive}
                >
                  {/* Top Large Hero Image Card */}
                  <div className="resume-bento-main-card">
                    <img
                      src={exp.image}
                      alt={exp.alt}
                      className="resume-hero-image"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="resume-image-gradient-overlay" />
                    <div className="resume-image-caption-pill">
                      <span className="resume-caption-text">{exp.role} — {exp.org}</span>
                    </div>
                  </div>

                  {/* Bottom 2 Smaller Side-by-Side Bento Images (Clean Visuals) */}
                  <div className="resume-bento-sub-row">
                    {exp.subImages?.map((sub, sIdx) => (
                      <div className="resume-bento-sub-card" key={sIdx}>
                        <img
                          src={typeof sub === 'string' ? sub : sub.src}
                          alt={exp.role}
                          className="resume-sub-image"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}