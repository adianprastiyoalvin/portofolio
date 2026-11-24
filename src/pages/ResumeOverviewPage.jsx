import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { DEFAULT_EXPERIENCE } from '../data/resumeData';
import Lightbox from '../components/shared/Lightbox';

export default function ResumeOverview({ experience = DEFAULT_EXPERIENCE, onBack }) {
  const currentExp = experience || DEFAULT_EXPERIENCE;
  const titleRef = useRef(null);
  const taglineRef = useRef(null);

  // Documentation image lightbox
  const [selectedDoc, setSelectedDoc] = useState(null);
  const openDocLightbox = (doc, idx) =>
    setSelectedDoc({
      image: doc.image,
      title: doc.title || `Documentation ${idx + 1}`,
    });

  // Scroll to top immediately when overview mounts or experience changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentExp]);

  // Entrance reveal animation for header text
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.05 }
        );
      }
      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.18 }
        );
      }
    });

    return () => ctx.revert();
  }, [currentExp]);

  return (
    <div className="overview-page-wrapper" id="resume-overview">
      {/* Top Back Navigation */}
      <div className="overview-nav-bar">
        <button
          type="button"
          onClick={onBack}
          className="overview-back-btn"
          aria-label="Back to resume"
          title="Back to Resume"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <main className="overview-content-container">
        {/* 1. Experience Hero Header */}
        <section className="overview-hero-header">
          <h1 className="overview-main-title" ref={titleRef}>
            {currentExp.role}
          </h1>

          <div className="overview-category-badge">
            <span>{currentExp.org}</span>
            <span className="overview-badge-dot">•</span>
            <span>{currentExp.year || currentExp.date}</span>
          </div>

          <p className="overview-hero-tagline" ref={taglineRef}>
            {currentExp.tagline || currentExp.description}
          </p>
        </section>

        {/* 2. Experience Image Showcase Container / Placeholder */}
        <section className="overview-showcase-section">
          <div className="overview-image-frame gray-placeholder">
            {currentExp.mockupImage || currentExp.image ? (
              <img
                src={currentExp.mockupImage || currentExp.image}
                alt={`${currentExp.role} - ${currentExp.org}`}
                className="overview-showcase-img"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            ) : (
              <div className="overview-image-placeholder">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>{currentExp.role} Image Placeholder</span>
              </div>
            )}
            <div className="overview-image-gradient" />
          </div>
        </section>

        {/* 3. Detailed Overview Section */}
        <section className="overview-details-section">
          <div className="overview-block-header">
            <span className="overview-section-tag">Overview</span>
            <p className="overview-main-paragraph">
              {currentExp.overview || currentExp.description}
            </p>
          </div>

          {/* 4. Meta Grid without The Team (My Role, Organization, Timeline) */}
          <div className="overview-meta-grid">
            {/* Col 1: My Role */}
            <div className="overview-meta-col">
              <h3 className="overview-col-title">My Role</h3>
              <p className="overview-col-text">{currentExp.myRole}</p>
            </div>

            {/* Col 2: Organization */}
            <div className="overview-meta-col">
              <h3 className="overview-col-title">Organization</h3>
              <p className="overview-col-text">{currentExp.org}</p>
            </div>

            {/* Col 3: Timeline */}
            <div className="overview-meta-col">
              <h3 className="overview-col-title">Timeline</h3>
              <p className="overview-col-text">{currentExp.timeline || currentExp.date}</p>
            </div>
          </div>

          {/* 5. Documentation Section (Clean Placeholder Frames, No Phase/Text) */}
          <div className="overview-documentation-section">
            <h4 className="overview-documentation-title">Documentation</h4>
            <div className="overview-doc-grid">
              {(currentExp.documentations && currentExp.documentations.length > 0
                ? currentExp.documentations
                : [
                    { id: 'doc-1' },
                    { id: 'doc-2' },
                    { id: 'doc-3' },
                  ]
              ).map((doc, idx) => (
                <div key={doc.id || idx} className="overview-doc-card">
                  <div
                    className={`overview-doc-img-frame gray-placeholder${
                      doc.image ? ' doc-clickable' : ''
                    }`}
                    onClick={doc.image ? () => openDocLightbox(doc, idx) : undefined}
                    role={doc.image ? 'button' : undefined}
                    tabIndex={doc.image ? 0 : undefined}
                    aria-label={
                      doc.image
                        ? `View ${
                            doc.title || `Documentation ${idx + 1}`
                          } in full size`
                        : undefined
                    }
                    onKeyDown={
                      doc.image
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              openDocLightbox(doc, idx);
                            }
                          }
                        : undefined
                    }
                  >
                    {doc.image ? (
                      <img
                        src={doc.image}
                        alt={doc.title || `Documentation ${idx + 1}`}
                        className="overview-doc-img"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="overview-doc-placeholder">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span>Documentation 0{idx + 1}</span>
                      </div>
                    )}
                    <div className="overview-doc-gradient" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documentation Image Lightbox */}
          {selectedDoc && (
            <Lightbox
              image={selectedDoc.image}
              title={selectedDoc.title}
              onClose={() => setSelectedDoc(null)}
            />
          )}
        </section>
      </main>
    </div>
  );
}