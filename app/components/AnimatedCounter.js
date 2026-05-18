'use client';

import { useEffect, useRef, useState } from 'react';

export default function AnimatedCounter({ value, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState('0');
  const started = useRef(false);

  // Extract numeric part and suffix (e.g. "450+" → 450, "+")
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
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
  }, [target, suffix]);

  return (
    <article ref={ref} className="stat-card">
      <span className="stat-value">{display}</span>
      <p>{label}</p>
    </article>
  );
}
