import React, { useState, useEffect, useRef } from 'react';
import FibotFace from './FibotFace';

/**
 * Interactive Floating Fibot Avatar with smooth CSS/Physics-based eye tracking.
 * Optimized for 60/120fps with on-demand RAF loops (0% idle CPU usage).
 */
export default function FibotAvatar({ onClick, isOpen }) {
  const [eyePos, setEyePos] = useState({ x: 0, y: 40 }); // Default: eyes centered
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const targetEyePosRef = useRef({ x: 0, y: 40 });
  const currentEyePosRef = useRef({ x: 0, y: 40 });
  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef(null);
  const rafIdRef = useRef(null);
  const blinkTimeoutRef = useRef(null);

  // Helper: Start interpolation animation only when needed and automatically stop when settled
  const requestEyeMotion = () => {
    if (rafIdRef.current) return;

    const animateLoop = () => {
      const curr = currentEyePosRef.current;
      const target = targetEyePosRef.current;

      const nextX = curr.x + (target.x - curr.x) * 0.16;
      const nextY = curr.y + (target.y - curr.y) * 0.16;

      currentEyePosRef.current = { x: nextX, y: nextY };

      const diffX = Math.abs(nextX - target.x);
      const diffY = Math.abs(nextY - target.y);

      if (diffX > 0.05 || diffY > 0.05) {
        setEyePos({ x: nextX, y: nextY });
      }

      // Once settled, stop the RAF loop completely
      if (diffX < 0.15 && diffY < 0.15) {
        currentEyePosRef.current = { ...target };
        setEyePos({ ...target });
        rafIdRef.current = null;
        return;
      }

      rafIdRef.current = requestAnimationFrame(animateLoop);
    };

    rafIdRef.current = requestAnimationFrame(animateLoop);
  };

  // 1. Natural Organic Blink Loop
  useEffect(() => {
    let active = true;

    const scheduleNextBlink = () => {
      const delay = Math.random() * 4000 + 3500; // Blink every 3.5 - 7.5s
      blinkTimeoutRef.current = setTimeout(() => {
        if (!active) return;
        setIsBlinking(true);
        setTimeout(() => {
          if (!active) return;
          setIsBlinking(false);
          scheduleNextBlink();
        }, 180);
      }, delay);
    };

    scheduleNextBlink();

    return () => {
      active = false;
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  // 2. Scroll Momentum Tracking & Direction Detection
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (currentScrollY < 30) {
        targetEyePosRef.current = { x: 0, y: 40 };
        requestEyeMotion();
        return;
      }

      if (deltaY > 2) {
        // Scrolling DOWN -> Eyes look down
        const intensity = Math.min(Math.max(deltaY * 1.4, 25), 60);
        targetEyePosRef.current = { x: -48, y: intensity };
        requestEyeMotion();
      } else if (deltaY < -2) {
        // Scrolling UP -> Eyes look up
        const intensity = Math.max(Math.min(deltaY * 1.4, -25), -70);
        targetEyePosRef.current = { x: -48, y: intensity };
        requestEyeMotion();
      }

      // Settle back to resting look when scroll ends
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (window.scrollY < 30) {
          targetEyePosRef.current = { x: 0, y: 40 };
        } else {
          targetEyePosRef.current = { x: -48, y: 0 };
        }
        requestEyeMotion();
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  // 3. Cursor Tracking on Hover
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const relX = (e.clientX - centerX) / (rect.width / 2);
    const relY = (e.clientY - centerY) / (rect.height / 2);

    targetEyePosRef.current = {
      x: relX * 20,
      y: relY * 25,
    };
    requestEyeMotion();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (window.scrollY < 30) {
      targetEyePosRef.current = { x: 0, y: 40 };
    } else {
      targetEyePosRef.current = { x: -48, y: 0 };
    }
    requestEyeMotion();
  };

  return (
    <div
      className={`fibot-floating-container ${isOpen ? 'is-modal-active' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Tooltip Greeting */}
      <div className={`fibot-tooltip ${isHovered && !isOpen ? 'is-visible' : ''}`}>
        <span>Ask Fibot AI</span>
        <div className="fibot-tooltip-arrow" />
      </div>

      {/* Floating Avatar Trigger */}
      <button
        type="button"
        className="fibot-avatar-btn"
        onClick={onClick}
        aria-label="Open Fibot AI Assistant Chatbot"
        title="Open Fibot AI Chatbot"
        id="fibot-avatar-trigger"
      >
        <div className="fibot-avatar-ring" />

        {/* Pure CSS & SVG Fibot Face with dynamic physics eye movement */}
        <FibotFace
          size={62}
          eyeX={eyePos.x}
          eyeY={eyePos.y}
          isBlinking={isBlinking}
          className="fibot-avatar-pure-face"
        />
      </button>
    </div>
  );
}