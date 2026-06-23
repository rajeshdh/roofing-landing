'use client';

import { useEffect, useRef, useState } from 'react';

export default function AnimatedCounter({ value, label }) {
  const ref = useRef(null);
  // Start from the real value so it renders correctly without JS / before the
  // animation runs (server render + no-JS visitors see "450+", not "0").
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  // Extract numeric part and suffix (e.g. "450+" → 450, "+").
  // Values whose suffix still contains a digit (e.g. "24/7") aren't a clean
  // count-up, so we leave them static.
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;
  const animatable = Boolean(match) && !/\d/.test(suffix);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Nothing to animate, motion is unwanted, or the API is unavailable:
    // leave the real value (the initial state) on screen.
    if (!animatable || prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const ANIMATION_DURATION_MS = 1600;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          // Reset to 0 so the count-up has somewhere to start from.
          setDisplay('0' + suffix);
          const duration = ANIMATION_DURATION_MS;
          const start = performance.now();
          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            setDisplay(String(current) + suffix);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, animatable]);

  return (
    <article ref={ref} className="stat-card">
      <span className="stat-value">{display}</span>
      <p>{label}</p>
    </article>
  );
}
