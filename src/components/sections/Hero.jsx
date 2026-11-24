import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WhiteBtn } from '../ui/WhiteBtn';
import { DarkBtn } from '../ui/DarkBtn';
import Marquee from '../shared/Marquee';

gsap.registerPlugin(ScrollTrigger);

const PREFIX_WORDS = ['ADIAN', 'Space', 'for'];

const PHRASES = [
  'Digital Experience',
  'Visual Experience',
  'Capture Moments',
  'Tell Stories'
];

// Jeda antar pergantian frase, dihitung SETELAH animasi masuk selesai
const ROTATE_DELAY = 2800;

export default function Hero({ onLike, onOpenOverview }) {
  const [index, setIndex] = useState(0);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const badgeParallaxRef = useRef(null);
  const phraseRef = useRef(null);
  const prefixRef = useRef(null);
  const descRef = useRef(null);
  const btnGroupRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const indexRef = useRef(index);
  const prevIndexRef = useRef(index);
  const rotationTimerRef = useRef(null);

  indexRef.current = index;

  const clearRotationTimer = () => {
    if (rotationTimerRef.current) {
      clearTimeout(rotationTimerRef.current);
      rotationTimerRef.current = null;
    }
  };

  /**
   * Jadwalkan pergantian frase berikutnya.
   * Dipanggil dari onComplete animasi masuk agar jeda selalu konsisten
   * (timer tidak berjalan saat animasi masih berlangsung).
   */
  const scheduleNextTransition = () => {
    clearRotationTimer();
    rotationTimerRef.current = setTimeout(() => {
      const started = transitionTo((indexRef.current + 1) % PHRASES.length);
      if (!started) scheduleNextTransition(); // masih sibuk? coba lagi nanti
    }, ROTATE_DELAY);
  };

  // 1. Initial Page Load GSAP Entrance & Scroll Parallax
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // A. Status Badge Entrance
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
        );
      }

      // B. Prefix Words Entrance
      if (prefixRef.current) {
        const words = prefixRef.current.querySelectorAll('.hero-prefix-word');
        gsap.fromTo(
          words,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.85,
            ease: 'power3.out',
            delay: 0.25
          }
        );
      }

      // C. Initial Phrase Words Entrance
      if (phraseRef.current) {
        const words = phraseRef.current.querySelectorAll('.hero-gsap-word');
        gsap.fromTo(
          words,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.09,
            duration: 0.85,
            ease: 'power3.out',
            delay: 0.45
          }
        );
      }

      // D. Sub-Description Entrance
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.65 }
        );
      }

      // E. CTA Buttons Entrance
      if (btnGroupRef.current) {
        gsap.fromTo(
          btnGroupRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.8 }
        );
      }

      // F. Scroll Parallax: Title & Badge drift up and fade subtly on scroll (composite-only properties for 60fps)
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 0, opacity: 1 },
          {
            y: -70,
            opacity: 0.2,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      if (badgeParallaxRef.current) {
        gsap.fromTo(
          badgeParallaxRef.current,
          { y: 0, opacity: 1 },
          {
            y: -40,
            opacity: 0.2,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }
    }, heroRef);

    // Mulai siklus rotasi frase pertama kali
    scheduleNextTransition();

    return () => {
      ctx.revert();
      clearRotationTimer();
    };
  }, []);

  // 2. Trigger phrase exit transition
  const transitionTo = (nextIdx) => {
    if (isAnimatingRef.current || !phraseRef.current) return false;
    isAnimatingRef.current = true;

    const currentWords = phraseRef.current.querySelectorAll('.hero-gsap-word');

    gsap.to(currentWords, {
      y: -25,
      opacity: 0,
      stagger: 0.04,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setIndex(nextIdx);
      }
    });

    return true;
  };

  // 3. Auto-rotation kini dijadwalkan dari onComplete animasi masuk
  //    (lihat scheduleNextTransition) agar selalu sinkron dengan animasi.

  // 4. IN ANIMATION: Animate new words in after index changes.
  //    Memakai useLayoutEffect agar opacity:0 terpasang SEBELUM browser
  //    melakukan paint → tidak ada flash teks baru saat pergantian.
  useLayoutEffect(() => {
    // Lewati mount awal (entrance sudah ditangani effect #1).
    // Pengecekan via prevIndexRef aman terhadap double-invoke StrictMode.
    if (prevIndexRef.current === index) return;
    prevIndexRef.current = index;

    if (!phraseRef.current) {
      isAnimatingRef.current = false; // jangan biarkan guard macet
      return;
    }

    const words = phraseRef.current.querySelectorAll('.hero-gsap-word');

    // Hentikan tween lain pada elemen yang sama (mis. entrance) agar tidak bentrok
    gsap.killTweensOf(words);

    gsap.fromTo(
      words,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.09,
        duration: 0.75,
        ease: 'power3.out',
        onComplete: () => {
          isAnimatingRef.current = false;
          // Baru selesai tampil → baru hitung mundur ke pergantian berikutnya
          scheduleNextTransition();
        }
      }
    );
  }, [index]);

  // Bersihkan timer apapun saat unmount (jaga-jaga)
  useEffect(() => clearRotationTimer, []);

  const currentWords = PHRASES[index].split(' ');

  return (
    <main className="hero-section" id="home" ref={heroRef}>
      <div className="hero-content-wrapper">
        {/* Status Available Badge */}
        <div ref={badgeParallaxRef} className="hero-badge-wrap">
          <div className="hero-badge-available" id="hero-badge-available" ref={badgeRef}>
            <span className="active-dot-green"></span>
            <span>Available for Projects</span>
          </div>
        </div>

        {/* Hero Headline */}
        <h1 className="hero-main-title" ref={titleRef}>
          <span className="hero-title-prefix" ref={prefixRef}>
            {PREFIX_WORDS.map((word, idx) => (
              <span key={idx} className="hero-prefix-word">
                {word}
              </span>
            ))}
          </span>

          <span className="hero-rolling-window">
            <span key={index} className="hero-rolling-phrase" ref={phraseRef}>
              {currentWords.map((word, idx) => (
                <span key={idx} className="hero-gsap-word">
                  {word}
                </span>
              ))}
            </span>
          </span>
        </h1>

        {/* Hero Body Description */}
        <p className="hero-sub-description" ref={descRef}>
          A little corner of the internet where I put my code, designs, photos, videos, and whatever I’m currently obsessed with making.
        </p>

        {/* Hero CTA Buttons */}
        <div className="hero-btn-group" ref={btnGroupRef}>
          <WhiteBtn href="#contact">Let's Connect</WhiteBtn>
          <DarkBtn href="#projects">View My Work</DarkBtn>
        </div>
      </div>

      {/* Infinite Works Showcase */}
      <div className="hero-works-marquee">
        <Marquee onOpenOverview={onOpenOverview} />
      </div>
    </main>
  );
}