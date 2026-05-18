'use client';

import { useEffect, useRef } from 'react';

/**
 * Wraps children in a div that fades/slides up when it enters the viewport.
 * Extra classes can be passed via `className`.
 */
export default function ScrollReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Trigger when at least 12% of the element is visible
    const REVEAL_THRESHOLD = 0.12;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('sr-visible');
          observer.unobserve(el);
        }
      },
      { threshold: REVEAL_THRESHOLD },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`sr-hidden ${className}`}>
      {children}
    </div>
  );
}
