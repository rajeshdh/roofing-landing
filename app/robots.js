import business from '@/content/business.js';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${business.url}/sitemap.xml`,
  };
}
