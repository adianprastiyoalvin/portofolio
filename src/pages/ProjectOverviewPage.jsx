import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { WhiteBtn } from '../components/ui/WhiteBtn';
import { DarkBtn } from '../components/ui/DarkBtn';
import { DEFAULT_PROJECT } from '../data/projectsData';
import Lightbox from '../components/shared/Lightbox';

export default function ProjectOverview({ project = DEFAULT_PROJECT, onBack, onContactClick }) {
  const currentProject = project || DEFAULT_PROJECT;
  const titleRef = useRef(null);
  const taglineRef = useRef(null);

  // Documentation image lightbox
  const [selectedDoc, setSelectedDoc] = useState(null);
  const openDocLightbox = (doc, idx) =>
    setSelectedDoc({
      image: doc.image,
      title: doc.title || `Documentation ${idx + 1}`,
    });

  // Scroll to top immediately when overview mounts or project changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentProject.id]);

  // Title reveal animation
  useEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.1 }
      );
      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.25 }
        );
      }
    }, titleRef);

    return () => ctx.revert();
  }, [currentProject.id]);

  return (
    <div className="overview-page-wrapper" id="project-overview">
      {/* Top Floating Back Bar */}
      <div className="overview-nav-bar">
        <button
          type="button"
          onClick={onBack}
          className="overview-back-btn"
          aria-label="Back to projects"
          title="Back to Projects"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <main className="overview-content-container">
        {/* 1. Project Hero Header */}
        <section className="overview-hero-header">
          <h1 className="overview-main-title" ref={titleRef}>{currentProject.title}</h1>

          <div className="overview-category-badge">
            <span>{currentProject.category}</span>
            <span className="overview-badge-dot">•</span>
            <span>{currentProject.year}</span>
          </div>

          <p className="overview-hero-tagline" ref={taglineRef}>{currentProject.tagline}</p>

          <div className="overview-hero-cta">
            <DarkBtn
              href={currentProject.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="overview-live-btn"
            >
              <span>Live Website</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </DarkBtn>
          </div>
        </section>

        {/* 2. Project Image Showcase Container / Placeholder */}
        <section className="overview-showcase-section">
          <div className="overview-image-frame gray-placeholder">
            {currentProject.mockupImage || currentProject.image ? (
              <img
                src={currentProject.mockupImage || currentProject.image}
                alt={`${currentProject.title} Preview`}
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
                <span>{currentProject.title} Image Placeholder</span>
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
              {currentProject.overview}
            </p>
          </div>

          {/* 4. 3-Column Info Grid (My Role, The Team, Timeline) */}
          <div className="overview-meta-grid">
            {/* Col 1: My Role */}
            <div className="overview-meta-col">
              <h3 className="overview-col-title">My Role</h3>
              <p className="overview-col-text">{currentProject.myRole}</p>
            </div>

            {/* Col 2: The Team */}
            <div className="overview-meta-col">
              <h3 className="overview-col-title">The Team</h3>
              <p className="overview-col-text">{currentProject.teamDescription}</p>
            </div>

            {/* Col 3: Timeline */}
            <div className="overview-meta-col">
              <h3 className="overview-col-title">Timeline</h3>
              <p className="overview-col-text">{currentProject.timeline}</p>
            </div>
          </div>

          {/* 5. Overview Documentation Section */}
          <div className="overview-documentation-section">
            <h4 className="overview-documentation-title">Documentation</h4>
            <div className="overview-doc-grid">
              {(currentProject.documentations && currentProject.documentations.length > 0
                ? currentProject.documentations
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

          {/* 6. Overview Credits Section (Horizontal Layout) */}
          {currentProject.teamMembers && currentProject.teamMembers.length > 0 && (
            <div className="overview-credit">
              <h4 className="overview-credit-title">Credits</h4>
              <div className="overview-credit-horizontal-list">
                {currentProject.teamMembers.map((member, index) => (
                  <React.Fragment key={member.id || index}>
                    <div className="overview-credit-item">
                      {member.linkedin ? (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="overview-credit-name overview-credit-name--link"
                        >
                          {member.name}
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="overview-credit-link-icon"
                          >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </a>
                      ) : (
                        <span className="overview-credit-name">{member.name}</span>
                      )}
                    </div>

                    {/* Dot divider between items */}
                    {index < currentProject.teamMembers.length - 1 && (
                      <span className="overview-credit-dot" aria-hidden="true">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}