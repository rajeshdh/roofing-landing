# Basile Contractors LLC — Roofing Landing + Portfolio

Modern, elegant, SEO-focused landing page built with Next.js to generate roofing leads.

## Run locally

```bash
cd roofing-landing
npm install
npm run dev
```

Then open: `http://localhost:3000`

## Production checks

```bash
npm run lint
npm run build
```

## Updating content

Main editable content is in:

- `content/site-content.json`

You can add/update:

- Services
- Portfolio projects
- Testimonials
- FAQ items

The Next.js homepage renders those sections directly from this JSON file.

## Lead form handling

The contact form posts to `https://formsubmit.co/` (HTTPS) so leads can be captured without a custom backend. Replace this with your own preferred backend or CRM form endpoint at deployment time if needed.
