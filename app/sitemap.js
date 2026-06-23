import business from '@/content/business.js';

export default function sitemap() {
  return [
    {
      url: business.url,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
