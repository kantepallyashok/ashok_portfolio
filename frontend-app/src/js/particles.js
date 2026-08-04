/**
 * particles.js — lightweight vanilla canvas particle network (no dependency).
 * Renders drifting nodes connected by faint lines, tinted with the theme
 * colors. Pauses when the tab is hidden and respects prefers-reduced-motion.
 */
import { profile } from '../data/profile.js';

export function initParticles(canvasId = 'particles') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');

  const primary = hexToRgb(profile.theme.primary) || { r: 46, g: 141, b: 255 };
  const accent = hexToRgb(profile.theme.secondary) || { r: 255, g: 153, b: 0 };

  let width = 0;
  let height = 0;
  let particles = [];
  let raf = null;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    spawn();
  }

  function spawn() {
    // density scales with viewport, capped for performance
    const count = Math.min(Math.floor((width * height) / 16000), 90);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
      aws: Math.random() > 0.8, // ~20% AWS-orange nodes
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      const c = p.aws ? accent : primary;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.55)`;
      ctx.fill();

      // connecting lines
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${primary.r},${primary.g},${primary.b},${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  }

  function start() {
    if (raf == null) draw();
  }
  function stop() {
    if (raf != null) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }

  resize();

  if (prefersReduced) {
    // draw a single static frame, no animation
    draw();
    stop();
  } else {
    start();
    document.addEventListener('visibilitychange', () => {
      document.hidden ? stop() : start();
    });
  }

  window.addEventListener('resize', debounce(resize, 200));
}

function hexToRgb(hex) {
  if (!hex) return null;
  const m = hex.replace('#', '').match(/.{1,2}/g);
  if (!m || m.length < 3) return null;
  return { r: parseInt(m[0], 16), g: parseInt(m[1], 16), b: parseInt(m[2], 16) };
}

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
