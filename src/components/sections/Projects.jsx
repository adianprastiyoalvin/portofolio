import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DarkBtn } from '../ui/DarkBtn';
import { WhiteBtn } from '../ui/WhiteBtn';
import { PROJECTS_DATA } from '../../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

export default function Projects({ onOpenOverview }) {
  const projects = PROJECTS_DATA.slice(0, 4);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      const lines = titleRef.current.querySelectorAll('.title-reveal-line');
      gsap.fromTo(
        lines.length ? lines : titleRef.current,
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
            scrollTrigger: {
              trigger: descRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, titleRef);

    return () => ctx.revert();
  }, []);

  const handleOverviewClick = (e, proj) => {
    e.preventDefault();
    if (onOpenOverview) {
      onOpenOverview(proj);
    }
  };

  return (
    <section className="section-container" id="projects">
      <h2 className="dark-section-title" ref={titleRef}>
        <span className="title-reveal-line">A Space For</span>
        <br />
        <span className="title-reveal-line">Things I’ve Made</span>
      </h2>
      <p className="projects-sub-description" ref={descRef}>
        A collection of projects, experiments, and creative work I’ve built along the way, from digital products and interfaces to photographs, videos, and everything in between.
      </p>

      {/* 4 Projects Grid (2x2) */}
      <div className="projects-dark-container">
        {projects.map((proj) => (
          <div className="project-dark-card" key={proj.id} id={proj.id}>
            <div className="project-preview-frame">
              <img
                src={proj.image}
                alt={proj.title}
                className="project-card-img"
                loading="lazy"
                decoding="async"
              />
              <div className="project-frame-gradient" />
            </div>
            <div className="project-bottom-banner">
              <div className="project-info-group">
                <h3 className="project-dark-title">{proj.title}</h3>
                <div className="project-dark-category">
                  <span>{proj.category}</span>
                  <span className="project-category-dot">•</span>
                  <span>{proj.year}</span>
                </div>
              </div>
              <div className="project-action-row">
                <DarkBtn
                  href={`#overview-${proj.id}`}
                  onClick={(e) => handleOverviewClick(e, proj)}
                  className="project-dark-btn"
                >
                  View Overview
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </DarkBtn>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Centered See More Button */}
      <div className="projects-see-more-wrapper">
        <WhiteBtn href="#projects" className="projects-see-more-btn">
          See More Projects
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
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </WhiteBtn>
      </div>
    </section>
  );
}