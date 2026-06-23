import Image from 'next/image';
import siteContent from '@/content/site-content.json';
import business from '@/content/business.js';
import AnimatedCounter from './components/AnimatedCounter';
import ScrollReveal from './components/ScrollReveal';

const siteUrl = business.url;
const businessId = `${siteUrl}#business`;

// ── Structured data (spec §5.1: LocalBusiness + Service + Review) ─────────────
const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor', // a LocalBusiness subtype
  '@id': businessId,
  name: business.name,
  url: siteUrl,
  telephone: business.phoneHref,
  email: business.email,
  image: siteContent.portfolio[0]?.image,
  priceRange: '$$',
  description:
    'Licensed and insured South Florida roofing contractor specializing in roof repair, roof replacement, storm and hurricane damage, and commercial flat roofing across Miami-Dade, Broward, and Palm Beach.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: business.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: business.geo.lat,
    longitude: business.geo.lng,
  },
  areaServed: business.counties.map((county) => ({
    '@type': 'AdministrativeArea',
    name: `${county} County, Florida`,
  })),
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: business.rating.value,
    reviewCount: business.rating.count,
  },
  makesOffer: siteContent.services.map((service) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: service.title,
      description: service.description,
      areaServed: business.serviceArea,
      provider: { '@id': businessId },
    },
  })),
  review: siteContent.testimonials.map((item) => ({
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    author: { '@type': 'Person', name: item.author },
    reviewBody: item.quote,
  })),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: siteContent.faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

const stats = [
  { value: business.yearsExperience, label: 'Years Roofing South Florida' },
  { value: '450+', label: 'Roofs Repaired & Replaced' },
  { value: '24/7', label: 'Emergency Roof Response' },
];

// Echoes the Google Ads headlines for message match (spec §4.3).
const highlights = [
  '24/7 emergency response',
  'Licensed & insured',
  'Free inspections',
  'Same-day estimates',
];

const fallbackService = {
  title: 'Roofing Services',
  description: 'Repair, replacement, and storm-damage solutions tailored to your property.',
};

const serviceIcons = {
  'Roof Replacement': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12L12 4l9 8" /><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
    </svg>
  ),
  'Roof Repair & Leak Response': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3-3a1 1 0 000-1.4l-1.6-1.6a1 1 0 00-1.4 0z" />
      <path d="M13 8L4 17v3h3l9-9" />
    </svg>
  ),
  'Storm & Hurricane Damage': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16a4 4 0 11.9-7.9A5 5 0 0118 8a3.5 3.5 0 010 7" /><path d="M13 11l-3 4h3l-1 4 4-5h-3z" />
    </svg>
  ),
  'Commercial & Flat Roofing': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="1" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
  'Roof Inspections & Maintenance': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 11l2 2 4-4" />
    </svg>
  ),
};

const currentYear = new Date().getFullYear();
const countyList = business.counties.join(' · ');

export default function Home() {
  const featuredService = siteContent.services[0] ?? fallbackService;
  const secondaryServices = siteContent.services.slice(1);
  const requestedServices = secondaryServices.slice(0, 3);

  return (
    <>
      <main id="top">
        <header className="site-header">
          <div className="container nav">
            <a className="brand" href="#top" aria-label={`${business.name} home`}>
              <span className="brand-mark" aria-hidden="true">BC</span>
              <span>
                <strong>{business.name}</strong>
                <small>South Florida roofing</small>
              </span>
            </a>
            <nav aria-label="Main navigation">
              <a href="#services">Services</a>
              <a href="#portfolio">Projects</a>
              <a href="#testimonials">Reviews</a>
              <a href="#faq">FAQ</a>
            </nav>
            <a href="#contact" className="btn btn-primary nav-cta" data-track="estimate_cta">
              Free Estimate
            </a>
          </div>
        </header>

        <section className="hero section-shell">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="container hero-grid">
            <ScrollReveal className="hero-copy-block">
              <p className="eyebrow">
                <span className="eyebrow-dot" aria-hidden="true" /> {business.serviceArea}&apos;s 24/7 Roofing Team
              </p>
              <h1>
                Roof Repair &amp; Replacement Across
                <span className="gradient-text"> South Florida</span>
              </h1>
              <p className="hero-copy">
                24/7 emergency response, free inspections, and same-day estimates from a licensed,
                insured team with {business.yearsExperience} years of local roofing expertise — from
                storm and hurricane damage to full tile, metal, and shingle replacements.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary" data-track="estimate_cta">
                  <span>Request Free Estimate</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href={`tel:${business.phoneHref}`} className="btn btn-secondary" data-track="phone_click">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                  </svg>
                  Call {business.phoneDisplay}
                </a>
              </div>
              <ul className="hero-points">
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="trust-bar">
                <span className="trust-badge">Licensed &amp; insured · FL #{business.license}</span>
                <span className="trust-badge">HVHZ hurricane-rated systems</span>
                <span className="trust-badge">Insurance-claim documentation</span>
              </div>
            </ScrollReveal>

            <ScrollReveal className="hero-panel-wrap" delay={120}>
              <div className="hero-panel">
                <div className="hero-panel-top">
                  <div>
                    <p className="panel-label">Why South Florida calls us</p>
                    <h2>Storm-ready roofing, done right</h2>
                  </div>
                  <span className="status-pill">Now booking</span>
                </div>

                <div className="hero-panel-card primary-panel-card">
                  <div>
                    <p className="panel-label">How it works</p>
                    <h3>Free inspection. Same-day estimate. Clean install.</h3>
                  </div>
                  <p>
                    From the first inspection to final cleanup, every step is mapped around speed,
                    clear communication, and HVHZ-compliant installation — including full
                    documentation if you&apos;re filing an insurance claim.
                  </p>
                  <div className="panel-metrics">
                    <div>
                      <strong>Same-day</strong>
                      <span>Free estimate turnaround</span>
                    </div>
                    <div>
                      <strong>24/7</strong>
                      <span>Emergency roof response</span>
                    </div>
                  </div>
                </div>

                <div className="hero-panel-grid">
                  <article className="hero-panel-card compact-panel-card">
                    <p className="panel-label">Most requested</p>
                    <ul className="service-chip-list">
                      {(requestedServices.length ? requestedServices : [featuredService]).map((service) => (
                        <li key={service.title}>{service.title}</li>
                      ))}
                    </ul>
                  </article>
                  <article className="hero-panel-card compact-panel-card accent-panel-card">
                    <p className="panel-label">Coverage</p>
                    <h3>{business.serviceArea}</h3>
                    <p>Serving {countyList} — homeowners, multifamily, and commercial properties.</p>
                  </article>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="overview-band">
          <div className="container overview-grid">
            <div className="stat-grid">
              {stats.map((stat) => (
                <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
            <ScrollReveal className="overview-copy" delay={80}>
              <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> Why homeowners call us first</p>
              <h2>Straightforward roofing guidance, built for South Florida weather</h2>
              <p>
                We pair hurricane-rated materials with honest recommendations and responsive project
                management — so you always know what&apos;s happening with your roof, your timeline,
                and your insurance claim.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-head section-head-split">
                <div>
                  <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> What We Do</p>
                  <h2>Roofing services built for South Florida roofs</h2>
                </div>
                <p>
                  Every service is engineered for South Florida heat, sun, and hurricane season — with
                  clean detailing and a smooth experience from inspection to cleanup.
                </p>
              </div>
            </ScrollReveal>

            <div className="services-layout">
              <ScrollReveal className="service-featured" delay={40}>
                <article className="service-spotlight">
                  <div className="card-icon" aria-hidden="true">
                    {serviceIcons[featuredService.title]}
                  </div>
                  <p className="panel-label">Featured service</p>
                  <h3>{featuredService.title}</h3>
                  <p>{featuredService.description}</p>
                  <a href="#contact" className="card-link" data-track="estimate_cta">
                    Discuss your project
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </article>
              </ScrollReveal>

              <div className="card-grid service-stack">
                {secondaryServices.map((service, i) => (
                  <ScrollReveal key={service.title} delay={100 + i * 70}>
                    <article className="card">
                      <div className="card-icon" aria-hidden="true">
                        {serviceIcons[service.title]}
                      </div>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <a href="#contact" className="card-link" data-track="estimate_cta">
                        Get a quote
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section section-dark">
          <div className="container">
            <ScrollReveal>
              <div className="section-head section-head-split">
                <div>
                  <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> Recent Work</p>
                  <h2>Recent South Florida roofing projects</h2>
                </div>
                <p>
                  Real projects across Miami-Dade, Broward, and Palm Beach — upgraded materials and
                  installation details that hold up to South Florida weather.
                </p>
              </div>
            </ScrollReveal>
            <div className="portfolio-grid portfolio-grid-editorial">
              {siteContent.portfolio.map((project, i) => {
                const location = project.location?.trim();

                return (
                  <ScrollReveal key={project.title} delay={i * 100}>
                    <article className={`portfolio-card ${i === 0 ? 'portfolio-card-featured' : ''}`}>
                      <div className="image-frame">
                        <Image
                          src={project.image}
                          alt={project.alt}
                          width={720}
                          height={500}
                          sizes="(max-width: 820px) 100vw, 580px"
                          className="portfolio-image"
                        />
                        {location ? (
                          <div className="image-overlay">
                            <span>{location}</span>
                          </div>
                        ) : null}
                      </div>
                      <div className="portfolio-body">
                        {location ? <p className="panel-label">{location}</p> : null}
                        <h3>{project.title}</h3>
                        <p>{project.summary}</p>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="testimonials" className="section">
          <div className="container narrative-grid">
            <div>
              <ScrollReveal>
                <div className="section-head">
                  <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> Client Feedback</p>
                  <h2>Trusted by South Florida property owners</h2>
                </div>
              </ScrollReveal>
              <div className="testimonial-grid">
                {siteContent.testimonials.map((item, i) => (
                  <ScrollReveal key={item.id} delay={i * 90}>
                    <article className="testimonial">
                      <div className="stars" aria-label="5 out of 5 stars">
                        {['★', '★', '★', '★', '★'].map((_, idx) => (
                          <span key={idx} className="star">★</span>
                        ))}
                      </div>
                      <p className="testimonial-quote">{item.quote}</p>
                      <footer className="testimonial-footer">
                        <div className="avatar" aria-hidden="true">{item.author.charAt(0)}</div>
                        <div>
                          <p className="testimonial-author">{item.author}</p>
                          <p className="testimonial-role">{item.role}</p>
                        </div>
                      </footer>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <div id="faq">
              <ScrollReveal>
                <div className="section-head">
                  <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> FAQ</p>
                  <h2>Answers that keep the process simple</h2>
                </div>
              </ScrollReveal>
              <div className="faq-list">
                {siteContent.faq.map((item, i) => (
                  <ScrollReveal key={item.question} delay={i * 70}>
                    <details className="faq-item">
                      <summary>
                        <span>{item.question}</span>
                        <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </summary>
                      <p>{item.answer}</p>
                    </details>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section section-contact">
          <div className="container contact-shell">
            <ScrollReveal>
              <div className="contact-info">
                <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> Get Started</p>
                <h2>Request your free roofing estimate</h2>
                <p className="contact-lead">
                  Tell us about your roof and we&apos;ll follow up with the right next step,
                  a recommended scope, and a clean path to scheduling. Typical response time:
                  within 1 hour.
                </p>
                <ul className="contact-list">
                  <li>
                    <span className="contact-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 10.8 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                      </svg>
                    </span>
                    <a href={`tel:${business.phoneHref}`} data-track="phone_click">{business.phoneDisplay}</a>
                  </li>
                  <li>
                    <span className="contact-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <a href={`mailto:${business.email}`}>{business.email}</a>
                  </li>
                  <li>
                    <span className="contact-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    Serving {countyList}
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <form
                className="lead-form"
                action={`https://formsubmit.co/${business.email}`}
                method="post"
                data-track-form
              >
                <input type="hidden" name="_subject" value={`New ${business.name} lead`} />
                <input type="hidden" name="_template" value="table" />
                {/* Lead Source for CRM routing (spec §7.2). Update per channel/UTM if needed. */}
                <input type="hidden" name="lead_source" value="Website" />
                <input
                  type="text"
                  name="_honey"
                  autoComplete="off"
                  className="honeypot"
                  aria-hidden="true"
                  tabIndex={-1}
                />
                <div className="form-row">
                  <label>
                    Full Name
                    <input type="text" name="name" required placeholder="Jane Smith" />
                  </label>
                  <label>
                    Phone
                    <input type="tel" name="phone" required placeholder="(954) 555-0000" />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Email
                    <input type="email" name="email" required placeholder="jane@example.com" />
                  </label>
                  <label>
                    Property Address
                    <input type="text" name="address" required placeholder="Street, City, FL" />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Roof Type
                    <select name="roof_type" required defaultValue="">
                      <option value="" disabled>Select one</option>
                      <option>Shingle</option>
                      <option>Tile</option>
                      <option>Metal</option>
                      <option>Flat / Commercial</option>
                      <option>Not sure</option>
                    </select>
                  </label>
                  <label>
                    What do you need?
                    <select name="issue" required defaultValue="">
                      <option value="" disabled>Select one</option>
                      <option>Roof Leak</option>
                      <option>Storm / Hurricane Damage</option>
                      <option>Roof Replacement</option>
                      <option>Roof Inspection</option>
                      <option>Other</option>
                    </select>
                  </label>
                </div>
                <label>
                  Urgency
                  <select name="priority" required defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option>Emergency (need help now)</option>
                    <option>Urgent (this week)</option>
                    <option>Standard (this month)</option>
                    <option>Just planning ahead</option>
                  </select>
                </label>
                <label>
                  Project Details
                  <textarea name="message" rows="4" placeholder="Describe your roof or the issue you're seeing…" />
                </label>
                <button type="submit" className="btn btn-primary btn-full" data-track="estimate_cta">
                  Get My Free Estimate
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <p className="form-note">
                  Free inspection &amp; same-day estimate · We respond within 1 hour
                </p>
              </form>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-row">
          <p>
            © {currentYear} {business.name} · Licensed &amp; insured FL #{business.license} ·
            Serving {countyList}
          </p>
          <a href="#top" className="back-top">
            Back to top
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </a>
        </div>
      </footer>

      {/* Sticky mobile conversion bar — call + estimate always one tap away. */}
      <div className="mobile-cta-bar">
        <a href={`tel:${business.phoneHref}`} className="btn btn-secondary" data-track="phone_click">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
          </svg>
          Call now
        </a>
        <a href="#contact" className="btn btn-primary" data-track="estimate_cta">
          Free estimate
        </a>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
