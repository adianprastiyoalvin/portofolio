import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PillBtn } from '../ui/PillBtn';
import { Pill } from '../ui/Pill';
import { BENTO_MODAL } from '../../data/aboutData';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================================
   BENTO 1: KIRI ATAS (Role Tags)
   ============================================================================ */
function Bento1Card() {
  return (
    <div className="bento-card bento-card-1" id="bento-card-1">
      <div className="bento-1-img-container">
        <img
          src="/assets/bento-img/bento1-img.webp"
          alt="Role tags background"
          className="bento-1-img"
          loading="lazy"
          decoding="async"
        />
        <div className="bento-1-img-gradient"></div>
      </div>

      <div className="bento-tags-flow">
        <div className="bento-tag-row">
          <Pill>Visual Enthusiast</Pill>
        </div>
        <div className="bento-tag-row">
          <Pill>Designer</Pill>
          <Pill>Photographer</Pill>
        </div>
        <div className="bento-tag-row">
          <Pill>Videographer</Pill>
          <Pill className="bento-pill-add">+</Pill>
        </div>
      </div>

      <div className="bento-bottom-gradient"></div>
    </div>
  );
}

/* ============================================================================
   BENTO 2: KIRI BAWAH (Profil & Tombol Buka Modal)
   ============================================================================ */
function Bento2Card({ onOpenModal }) {
  return (
    <div
      className="bento-card bento-card-2"
      id="bento-card-2"
      onClick={onOpenModal}
    >
      <div className="bento-2-img-container">
        <img
          src="/assets/bento-img/bento2-img.webp"
          alt="ADIAN Abiyyu Rahman Portrait"
          className="bento-2-img"
          loading="lazy"
          decoding="async"
        />
        <div className="bento-2-img-gradient"></div>
      </div>

      <div className="bento-profile-top-info">
        <div className="bento-info-icon-btn" title="About Info">
          <img
            src="/assets/icon/info-icn.svg"
            alt="Info icon"
            className="bento-info-svg"
            width="16"
            height="16"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="bento-profile-content">
        <h3 className="bento-profile-name">ADIAN Abiyyu Rahman</h3>
        <p className="bento-profile-bio">
          A Multidisciplinary Creative Who Works Across Design, Photography, And Videography.
        </p>
        <PillBtn id="btn-click-me" onClick={onOpenModal}>
          Click Me!
        </PillBtn>
      </div>

      <div className="bento-bottom-gradient"></div>
    </div>
  );
}

/* ============================================================================
   BENTO 3: TENGAH (Foto Utama & Floating Comment)
   ============================================================================ */
function Bento3Card({ commentRef }) {
  return (
    <div className="bento-card bento-card-3" id="bento-card-3">
      <div className="bento-3-img-container">
        <img
          src="/assets/bento-img/bento3-img.webp"
          alt="ADIAN Abiyyu Rahman Portrait"
          className="bento-3-img"
          loading="lazy"
          decoding="async"
        />
        <div className="bento-3-img-gradient"></div>
      </div>

      <div className="figma-comment-wrapper" ref={commentRef}>
        <div className="figma-comment bento-3-comment" id="figma-comment-gentleman">
          <span className="figma-cursor">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 1L6 14L8.5 8.5L14 6L1 1Z"
                fill="#000000"
                stroke="#36bffa"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>Handsome gentleman!</span>
        </div>
      </div>

      <div className="bento-bottom-gradient"></div>
    </div>
  );
}

/* ============================================================================
   BENTO 4: KANAN ATAS (Curriculum Vitae & Tombol Panah)
   ============================================================================ */
function Bento4Card({ bookmarked, onToggleBookmark }) {
  return (
    <div className="bento-card bento-card-4" id="bento-card-4">
      <div className="bento-4-img-container">
        <img
          src="/assets/bento-img/bento4-img.webp"
          alt="Curriculum Vitae background"
          className="bento-4-img"
          loading="lazy"
          decoding="async"
        />
        <div className="bento-4-img-gradient"></div>
      </div>

      <div className="bento-4-top">
        <button
          className="bento-heart-btn"
          onClick={onToggleBookmark}
          aria-label="Save card"
        >
          <img
            src="/assets/icon/love-icn.svg"
            alt="Love icon"
            className="bento-love-svg"
            width="18"
            height="18"
            loading="lazy"
            decoding="async"
          />
        </button>
      </div>

      <div className="bento-4-center">
        <PillBtn
          href="https://drive.google.com/file/d/1oYE9yi1rgHcpcPOCCEHjZTv1OJdObKhD/view?usp=sharing"
          id="btn-cv-bento"
          className="bento-cv-pill"
        >
          <span>Curriculum Vitae</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </PillBtn>
      </div>

      <div className="bento-4-bottom">
        <a href="#resume" className="bento-arrow-circle" aria-label="Go to resume">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="bento-arrow-svg"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>

      <div className="bento-bottom-gradient"></div>
    </div>
  );
}

/* ============================================================================
   BENTO 5: KANAN BAWAH (Software and Tools / Ikon Aplikasi)
   ============================================================================ */
function Bento5Card() {
  return (
    <div className="bento-card bento-card-5" id="bento-card-5">
      <div className="bento-5-img-container">
        <img
          src="/assets/bento-img/bento5-img.webp"
          alt="Software and Tools background"
          className="bento-5-img"
          loading="lazy"
          decoding="async"
        />
        <div className="bento-5-img-gradient"></div>
      </div>

      <div className="bento-5-content">
        <h3 className="bento-5-title">Software and Tools</h3>
        <div className="tools-apps-grid">
          {/* Baris 1: Pemrograman, Database & Deployment */}
          <div className="tools-app-row">
            <div className="tool-app-item">
              <div className="tool-app-icon">
                <img
                  src="/assets/tools-img/python-tools.webp"
                  alt="Python"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="tool-badge-label">Python</span>
            </div>

            <div className="tool-app-item">
              <div className="tool-app-icon">
                <img
                  src="/assets/tools-img/googlecolab-tools.webp"
                  alt="Google Colab"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="tool-badge-label">Google Colab</span>
            </div>

            <div className="tool-app-item">
              <div className="tool-app-icon">
                <img
                  src="/assets/tools-img/postgresql-tools.webp"
                  alt="PostgreSQL"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="tool-badge-label">PostgreSQL</span>
            </div>

            <div className="tool-app-item">
              <div className="tool-app-icon">
                <img
                  src="/assets/tools-img/dbeaver-tools.webp"
                  alt="DBeaver"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="tool-badge-label">DBeaver</span>
            </div>
          </div>

          {/* Baris 2: BI & Interactive Dashboard */}
          <div className="tools-app-row">
            <div className="tool-app-item">
              <div className="tool-app-icon">
                <img
                  src="/assets/tools-img/powerbi-tools.webp"
                  alt="Power BI"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="tool-badge-label">Power BI</span>
            </div>

            <div className="tool-app-item">
              <div className="tool-app-icon">
                <img
                  src="/assets/tools-img/tableau-tools.webp"
                  alt="Tableau"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="tool-badge-label">Tableau</span>
            </div>

            <div className="tool-app-item">
              <div className="tool-app-icon">
                <img
                  src="/assets/tools-img/looker-tools.webp"
                  alt="Looker Studio"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="tool-badge-label">Looker Studio</span>
            </div>

            <div className="tool-app-item">
              <div className="tool-app-icon">
                <img
                  src="/assets/tools-img/streamlit-tools.webp"
                  alt="Streamlit"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="tool-badge-label">Streamlit</span>
            </div>
          </div>

          {/* Baris 3: Statistik & Code Editor */}
          <div className="tools-app-row">
            <div className="tool-app-item">
              <div className="tool-app-icon">
                <img
                  src="/assets/tools-img/rstudio-tools.webp"
                  alt="RStudio"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="tool-badge-label">RStudio</span>
            </div>

            <div className="tool-app-item">
              <div className="tool-app-icon">
                <img
                  src="/assets/tools-img/spss-tools.webp"
                  alt="SPSS"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="tool-badge-label">SPSS</span>
            </div>

            <div className="tool-app-item">
              <div className="tool-app-icon">
                <img
                  src="/assets/tools-img/minitab-tools.webp"
                  alt="Minitab"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="tool-badge-label">Minitab</span>
            </div>

            <div className="tool-app-item">
              <div className="tool-app-icon">
                <img
                  src="/assets/tools-img/visualstudiocode-tools.webp"
                  alt="VS Code"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="tool-badge-label">VS Code</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bento-bottom-gradient"></div>
    </div>
  );
}

/* ============================================================================
   KOMPONEN UTAMA: AboutMe
   ============================================================================ */
export default function AboutMe() {
  const [bookmarked, setBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const sectionRef = useRef(null);
  const commentRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const handleOpenModal = (e) => {
    if (e) e.stopPropagation();
    setIsClosing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = (e) => {
    if (e) e.stopPropagation();
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 280);
  };

  // Keyboard shortcut to close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen && !isClosing) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, isClosing]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Entrance animations on scroll
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
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
      }

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
              trigger: titleRef.current || descRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      if (commentRef.current) {
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
          gsap.fromTo(
            commentRef.current,
            { x: 15, y: 15, opacity: 0, scale: 0.8, rotation: 6 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                once: true,
              },
            }
          );
        } else {
          const getOffscreenCoords = () => {
            if (!commentRef.current) return { x: 600, y: 400 };
            const rect = commentRef.current.getBoundingClientRect();
            const offX = Math.max(window.innerWidth - rect.left + 150, 600);
            const offY = Math.max(window.innerHeight - rect.top + 150, 400);
            return { x: offX, y: offY };
          };

          const { x: startX, y: startY } = getOffscreenCoords();

          gsap.fromTo(
            commentRef.current,
            {
              x: startX,
              y: startY,
              opacity: 0,
              scale: 0.6,
              rotation: 12,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1.4,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                once: true,
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-container" id="about" ref={sectionRef}>
      <h2 className="dark-section-title" ref={titleRef}>
        <span className="title-reveal-line">A Little More</span>
        <br />
        <span className="title-reveal-line">About Me</span>
      </h2>
      <p className="about-sub-description" ref={descRef}>
        I’m ADIAN, an aspiring fullstack web developer, designer, photographer, and visual storyteller. I build with code, create with visuals, and keep exploring whatever sparks my curiosity.
      </p>

      {/* Grid Utama: 3 Kolom (Kiri: Bento 1 & 2 | Tengah: Bento 3 | Kanan: Bento 4 & 5) */}
      <div className="about-bento-grid" id="about-bento-grid">
        <div className="bento-col bento-col-left">
          <Bento1Card />
          <Bento2Card onOpenModal={handleOpenModal} />
        </div>

        <div className="bento-col bento-col-center">
          <Bento3Card commentRef={commentRef} />
        </div>

        <div className="bento-col bento-col-right">
          <Bento4Card
            bookmarked={bookmarked}
            onToggleBookmark={() => setBookmarked(!bookmarked)}
          />
          <Bento5Card />
        </div>
      </div>

      {/* Pop-up Modal dari Bento 2 */}
      {isModalOpen && (
        <div
          className={`bento-modal-backdrop ${isClosing ? 'is-closing' : ''}`}
          onClick={handleCloseModal}
        >
          <div
            className={`bento-modal-card ${isClosing ? 'is-closing' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bento-modal-photo-wrapper gray-placeholder">
              {BENTO_MODAL.image ? (
                <img
                  src={BENTO_MODAL.image}
                  alt={BENTO_MODAL.title || 'Showcase photo'}
                  className="bento-modal-photo-img"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="bento-modal-photo-placeholder">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>Full Showcase Photo (Placeholder)</span>
                </div>
              )}
              <div className="bento-modal-gradient"></div>
            </div>

            <div className="bento-modal-top">
              <div className="bento-info-icon-btn" title="About Info">
                <img
                  src="/assets/icon/info-icn.svg"
                  alt="Info icon"
                  className="bento-info-svg"
                  width="16"
                  height="16"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <button
                className="bento-modal-close-btn"
                onClick={handleCloseModal}
                aria-label="Close modal"
                title="Close (Esc)"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <span>Close</span>
              </button>
            </div>

            <div className="bento-modal-bottom">
              <div className="bento-modal-text">
                <h3 className="bento-modal-title">{BENTO_MODAL.title}</h3>
                <p className="bento-modal-bio">{BENTO_MODAL.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}