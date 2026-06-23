// Central business profile for Basile Contractors LLC.
//
// ⚠️  PLACEHOLDER VALUES — replace everything marked TODO with real data
//     before launch. These flow into the visible page, the `tel:`/contact
//     links, the JSON-LD schema, and the analytics config.

export const business = {
  name: 'Basile Contractors LLC',
  shortName: 'Basile Contractors',
  url: 'https://basilecontractorsllc.com',

  // TODO: use the Google Ads call-tracking number once provisioned.
  // South Florida area codes: 305/786 (Miami-Dade), 954 (Broward), 561 (Palm Beach).
  phoneDisplay: '(954) 555-0123', // TODO real number
  phoneHref: '+19545550123', // TODO real number (E.164)
  email: 'info@basilecontractorsllc.com', // TODO confirm

  yearsExperience: '20+',
  license: 'CCC-0000000', // TODO real Florida roofing license #

  // TODO: real business address (used for LocalBusiness schema + local SEO).
  address: {
    street: '123 Example Blvd, Suite 100',
    city: 'Fort Lauderdale',
    region: 'FL',
    postalCode: '33301',
    country: 'US',
  },
  // TODO: real coordinates of the business address.
  geo: { lat: 26.1224, lng: -80.1373 },

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

  // TODO: real aggregate rating (pull from Google Business Profile).
  rating: { value: '4.9', count: 127 },

  // Analytics — leave blank to disable. Filling these in activates tracking.
  // GA4 events fired: phone_click, estimate_cta, generate_lead (form submit).
  ga4MeasurementId: '', // TODO 'G-XXXXXXXXXX'
  googleAdsId: '', // TODO 'AW-XXXXXXXXXX'
  googleAdsConversionLabel: '', // TODO conversion label for generate_lead
};

export default business;
