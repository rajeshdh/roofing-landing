// Central business profile for Basile Contractors LLC.
//
// Some fields are VERIFIED from public records (BBB / Sunbiz / company sites,
// June 2026). Others are still PLACEHOLDER (TODO) — confirm with the client
// before launch. These flow into the visible page, the `tel:`/contact links,
// the JSON-LD schema, and the analytics config.

export const business = {
  name: 'Basile Contractors LLC',
  shortName: 'Basile Contractors',
  owner: 'Luigi Basile', // verified (reference only; not rendered)

  // VERIFIED live domain. NOTE: this is the company's general-contracting site —
  // confirm the final domain/subdomain this roofing landing page deploys to.
  url: 'https://basilecontractors.com',

  // VERIFIED main line, shared with Basile USA. The spec (§4.4) wants a dedicated
  // Google Ads CALL-TRACKING number — swap this once that's provisioned.
  phoneDisplay: '(954) 300-4200',
  phoneHref: '+19543004200',

  // TODO confirm. Aligned to the real domain (the old basilecontractorsllc.com
  // does not resolve). The lead form posts here via formsubmit.co.
  email: 'info@basilecontractors.com',

  yearsExperience: '20+',

  // TODO ⚠️ No roofing (CCC) license was found in public records — the licensed
  // record for Luigi Basile is Certified Underground Utility & Excavation, NOT
  // roofing. Confirm a roofing-qualifying license BEFORE publishing this claim.
  license: 'CCC-0000000', // PLACEHOLDER

  // VERIFIED HQ (Broward). Miami-Dade office: 7353 NW 56th St, Miami, FL 33166.
  address: {
    street: '3830 SW 30th Ave',
    city: 'Fort Lauderdale',
    region: 'FL',
    postalCode: '33312',
    country: 'US',
  },
  // Approximate coordinates for the HQ address — TODO verify exact lat/lng.
  geo: { lat: 26.0945, lng: -80.179 },

  counties: ['Miami-Dade', 'Broward', 'Palm Beach'],
  serviceArea: 'South Florida',
  cities: [
    'Miami',
    'Fort Lauderdale',
    'West Palm Beach',
    'Boca Raton',
    'Hollywood',
    'Pompano Beach',
  ],

  // TODO ⚠️ Unverified — no public roofing review aggregate exists. Drives the
  // JSON-LD AggregateRating; do NOT ship fabricated review counts (SEO risk).
  rating: { value: '4.9', count: 127 }, // PLACEHOLDER

  // Analytics — leave blank to disable. Filling these in activates tracking.
  // GA4 events fired: phone_click, estimate_cta, generate_lead (form submit).
  ga4MeasurementId: '', // TODO 'G-XXXXXXXXXX'
  googleAdsId: '', // TODO 'AW-XXXXXXXXXX'
  googleAdsConversionLabel: '', // TODO conversion label for generate_lead
};

export default business;
