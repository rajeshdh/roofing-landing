'use client';

import { useEffect } from 'react';

/**
 * Fires conversion events for Google Analytics 4 / Google Ads via event
 * delegation, so the page itself can stay a server component. It pushes to
 * `dataLayer` (GTM-friendly) and calls `gtag` when present:
 *
 *   - [data-track="phone_click"]   → phone_click   (spec §8.1)
 *   - [data-track="estimate_cta"]  → estimate_cta  (spec §8.1)
 *   - <form data-track-form>       → generate_lead (spec §8.1, §4.4)
 *
 * No-ops harmlessly until a GA4 / Ads ID is configured in content/business.js.
 */
export default function AnalyticsTracker() {
  useEffect(() => {
    const track = (event, params = {}) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event, ...params });
      if (typeof window.gtag === 'function') {
        window.gtag('event', event, params);
      }
    };

    const onClick = (e) => {
      const el = e.target.closest('[data-track]');
      if (!el) return;
      track(el.getAttribute('data-track'), {
        label: el.getAttribute('data-track-label') || undefined,
      });
    };

    const onSubmit = (e) => {
      if (e.target instanceof HTMLFormElement && e.target.hasAttribute('data-track-form')) {
        track('generate_lead', { form: 'lead_form' });
      }
    };

    document.addEventListener('click', onClick);
    // Capture phase so the event fires before the native form navigation.
    document.addEventListener('submit', onSubmit, true);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('submit', onSubmit, true);
    };
  }, []);

  return null;
}
