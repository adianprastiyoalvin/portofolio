import React from 'react';
import { PROJECTS_DATA } from '../../data/projectsData';

export default function Marquee({ onOpenOverview }) {
  // Auto-derived from projectsData.js — titles, categories & images always
  // stay in sync with the single source of truth.
  const works = [
    ...PROJECTS_DATA.map((project) => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      category: project.category,
      image: project.mockupImage || project.image,
    })),
    // Projects without an overview page are listed manually here
    {
      id: 'raso',
      slug: null, // RASO has no overview page yet
      title: 'RASO Food Blog',
      category: 'Web Design',
      image: '/assets/project-img/RASO Mobile Mockup.webp',
    },
  ];

  // Triplicate array for smooth, stutter-free continuous infinite scrolling
  const infiniteWorks = [...works, ...works, ...works];

  const handleCardClick = (work) => {
    const project = work.slug ? PROJECTS_DATA.find((p) => p.slug === work.slug) : null;
    if (project && onOpenOverview) {
      onOpenOverview(project);
    }
  };

  return (
    <section
      className="works-marquee-section"
      id="works-marquee-section"
      aria-label="Works Showcase Carousel"
    >
      <div className="works-marquee-track">
        {infiniteWorks.map((work, index) => {
          const isClickable = Boolean(work.slug);
          return (
            <div
              className={`work-mockup-card gray-placeholder${isClickable ? ' work-mockup-card--clickable' : ''}`}
              key={`${work.id}-${index}`}
              onClick={isClickable ? () => handleCardClick(work) : undefined}
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              aria-label={
                isClickable ? `View project overview: ${work.title}` : undefined
              }
              onKeyDown={
                isClickable
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(work);
                      }
                    }
                  : undefined
              }
            >
              {work.image ? (
              <>
                <img
                  src={work.image}
                  alt={work.title}
                  className="work-mockup-img"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
              </>
            ) : (
              <div className="work-mockup-inner-placeholder">
                <div className="work-placeholder-icon">
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div className="work-placeholder-title">{work.title}</div>
                <span className="work-placeholder-tag">{work.category}</span>
              </div>
            )}
            <div className="work-mockup-gradient"></div>
              <div className="work-mockup-caption-pill">
                <span className="work-mockup-caption-title">{work.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}