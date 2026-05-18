# Basile Contractors LLC — Roofing Landing + Portfolio

Modern, elegant, SEO-focused landing page designed to generate roofing leads.

## Run locally

Because this is a static website, you can serve it with any static server.

```bash
cd roofing-landing
python3 -m http.server 4173
```

Then open: `http://localhost:4173`

## Updating content

Main editable content is in:

- `./content/site-content.json`

You can add/update:

- Services
- Portfolio projects
- Testimonials
- FAQ items

The page automatically renders those sections from this JSON file.

## Lead form handling

The contact form posts to `https://formsubmit.co/` (HTTPS) so leads can be captured without a custom backend. Replace this with your own preferred backend/CMS form endpoint at deployment time if needed.
