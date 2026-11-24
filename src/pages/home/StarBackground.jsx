import React, { useEffect, useRef } from "react";

export function StarBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId = null;
    let width = 0;
    let height = 0;
    let isRunning = false;
    let stars = [];
    let shootingStar = null;
    let lastShootingStarTime = performance.now();
    let ticking = false;

    // Scale canvas according to device pixel ratio (capped at 1.5 to preserve battery & GPU)
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Initialize stars based on viewport width
      const isMobile = width < 768;
      const count = isMobile ? 20 : 40;

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.6 + Math.random() * 1.1,
        baseAlpha: 0.25 + Math.random() * 0.5,
        alpha: 0.3,
        twinkleSpeed: 0.0015 + Math.random() * 0.003,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: `hsl(${180 + Math.random() * 50}, 100%, 92%)`,
      }));
    };

    // Main Canvas Render Loop
    const render = (time) => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw twinkling stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const pulse = (Math.sin(time * s.twinkleSpeed + s.twinkleOffset) + 1) / 2;
        s.alpha = s.baseAlpha * (0.35 + 0.65 * pulse);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fill();
      }

      // 2. Spawn and render shooting star
      if (!shootingStar && time - lastShootingStarTime > 6000 + Math.random() * 5000) {
        lastShootingStarTime = time;
        const startX = Math.random() * (width * 0.8);
        shootingStar = {
          startX,
          startY: -10,
          vx: 7 + Math.random() * 4,
          vy: 4 + Math.random() * 3,
          length: 80 + Math.random() * 40,
          startTime: time,
          duration: 900 + Math.random() * 400,
        };
      }

      if (shootingStar) {
        const elapsed = time - shootingStar.startTime;
        const t = elapsed / shootingStar.duration;

        if (t >= 1) {
          shootingStar = null;
        } else {
          const currentX = shootingStar.startX + shootingStar.vx * (elapsed / 16);
          const currentY = shootingStar.startY + shootingStar.vy * (elapsed / 16);

          const tailX = currentX - (shootingStar.vx / 8) * shootingStar.length;
          const tailY = currentY - (shootingStar.vy / 8) * shootingStar.length;

          const opacity = Math.sin(t * Math.PI) * 0.85;

          const grad = ctx.createLinearGradient(tailX, tailY, currentX, currentY);
          grad.addColorStop(0, "rgba(255, 255, 255, 0)");
          grad.addColorStop(0.7, "rgba(180, 235, 255, 0.6)");
          grad.addColorStop(1, "rgba(255, 255, 255, 0.95)");

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(currentX, currentY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.globalAlpha = opacity;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (isRunning) {
        isRunning = false;
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      }
    };

    const updateVisibility = () => {
      // Pause completely as soon as user enters the dark content wrapper (scrollY > height * 0.8)
      const inHeroArea = window.scrollY < height * 0.8;
      const shouldRun = !document.hidden && inHeroArea;

      if (shouldRun) {
        startLoop();
      } else {
        stopLoop();
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateVisibility);
      }
    };

    handleResize();
    updateVisibility();

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", updateVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stopLoop();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", updateVisibility);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className="star-canvas-bg"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
