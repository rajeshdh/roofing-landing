
import Image from 'next/image';
import siteContent from '@/content/site-content.json';
import AnimatedCounter from './components/AnimatedCounter';
import ScrollReveal from './components/ScrollReveal';
import ThreeHeroCanvas from './components/ThreeHeroCanvasWrapper';




const siteUrl = 'https://basilecontractorsllc.com';

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  name: 'Basile Contractors LLC',
  url: siteUrl,
  telephone: '+1-201-555-0123',
  email: 'info@basilecontractorsllc.com',
  areaServed: 'Northern New Jersey',
  priceRange: '$$',
  description:
    'Residential and commercial roofing contractor specializing in roof replacement, repairs, and emergency roofing services.',
};

const stats = [
  { value: '12+', label: 'Years of Roofing Excellence' },
  { value: '450+', label: 'Projects Completed' },
  { value: '24/7', label: 'Emergency Roof Support' },
];

const serviceIcons = {
  'Residential Roof Replacement': (
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
  'Commercial Roofing': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="1" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
  'Preventive Roof Maintenance': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

const currentYear = new Date().getFullYear();

export default function Home() {
  return (
    <>
      <main id="top">
        <header className="site-header">
          <div className="container nav">
            <a className="brand" href="#top" aria-label="Basile Contractors LLC home">
              <span className="brand-icon" aria-hidden="true">⬡</span>
              Basile Contractors LLC
            </a>
            <nav aria-label="Main navigation">
              <a href="#services">Services</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#testimonials">Reviews</a>
              <a href="#contact" className="cta-link">Get Estimate</a>
            </nav>
          </div>
        </header>

        <section className="hero section-shell hero-shell">
          <ThreeHeroCanvas />
          <div className="hero-glow hero-glow-1" aria-hidden="true" />
          <div className="hero-glow hero-glow-2" aria-hidden="true" />
          <div className="container hero-content">
            <p className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" /> Premium Roofing Solutions
            </p>
            <h1 className="hero-heading">
              Elegant Roofing<br />
              <span className="gradient-text">Crafted to Last</span>
            </h1>
            <p className="hero-copy">
              Basile Contractors LLC helps homeowners and businesses protect their properties with
              high-performance roofing, beautiful finishes, and dependable project delivery.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                <span>Request Free Estimate</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="tel:+12015550123" className="btn btn-secondary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
                Call (201) 555-0123
              </a>
            </div>
            <div className="trust-bar">
              <span className="trust-badge">✦ Licensed &amp; Insured</span>
              <span className="trust-badge">✦ Free Estimates</span>
              <span className="trust-badge">✦ Manufacturer Warranty</span>
            </div>
          </div>
          <div className="hero-scroll-hint" aria-hidden="true"><span /></div>
        </section>

        <section className="stats section-shell shell-delay-1">
          <div className="container stat-grid">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-head">
                <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> What We Do</p>
                <h2>Roofing Services Built for<br /><span className="gradient-text">Performance &amp; Curb Appeal</span></h2>
              </div>
            </ScrollReveal>
            <div className="card-grid">
              {siteContent.services.map((service, i) => (
                <ScrollReveal key={service.title} delay={i * 80}>
                  <article className="card">
                    <div className="card-icon" aria-hidden="true">
                      {serviceIcons[service.title]}
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <a href="#contact" className="card-link">
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
        </section>

        <section id="portfolio" className="section section-dark">
          <div className="container">
            <ScrollReveal>
              <div className="section-head">
                <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> Recent Work</p>
                <h2>Project <span className="gradient-text">Portfolio</span></h2>
              </div>
            </ScrollReveal>
            <div className="portfolio-grid">
              {siteContent.portfolio.map((project, i) => (
                <ScrollReveal key={project.title} delay={i * 100}>
                  <article className="portfolio-card">
                    <div className="image-frame">
                      <Image
                        src={project.image}
                        alt={project.alt}
                        width={720}
                        height={500}
                        className="portfolio-image"
                      />
                      <div className="image-overlay">
                        <span>{project.location}</span>
                      </div>
                    </div>
                    <div className="portfolio-body">
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="section">
          <div className="container">
            <ScrollReveal>
              <div className="section-head">
                <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> Client Feedback</p>
                <h2>Trusted by <span className="gradient-text">Property Owners</span></h2>
              </div>
            </ScrollReveal>
            <div className="testimonial-grid">
              {siteContent.testimonials.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 90}>
                  <article className="testimonial">
                    <div className="stars" aria-label="5 out of 5 stars">
                      {['★','★','★','★','★'].map((s, idx) => (
                        <span key={idx} className="star">{s}</span>
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
        </section>

        <section id="faq" className="section section-dark">
          <div className="container faq-container">
            <ScrollReveal>
              <div className="section-head">
                <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> FAQ</p>
                <h2>Answers <span className="gradient-text">Before You Start</span></h2>
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
        </section>

        <section id="contact" className="section section-contact">
          <div className="container contact-grid">
            <ScrollReveal>
              <div className="contact-info">
                <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> Get Started</p>
                <h2>Request a Free<br /><span className="gradient-text">Roofing Estimate</span></h2>
                <p className="contact-lead">
                  Tell us about your roof and we&apos;ll follow up quickly with a consultation and custom quote.
                </p>
                <ul className="contact-list">
                  <li>
                    <span className="contact-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 10.8 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                      </svg>
                    </span>
                    <a href="tel:+12015550123">(201) 555-0123</a>
                  </li>
                  <li>
                    <span className="contact-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <a href="mailto:info@basilecontractorsllc.com">info@basilecontractorsllc.com</a>
                  </li>
                  <li>
                    <span className="contact-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    Northern New Jersey &amp; nearby counties
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <form
                className="lead-form"
                action="https://formsubmit.co/info@basilecontractorsllc.com"
                method="post"
              >
                <input type="hidden" name="_subject" value="New Basile Contractors LLC lead" />
                <input type="hidden" name="_template" value="table" />
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
                    <input type="tel" name="phone" required placeholder="(201) 555-0000" />
                  </label>
                </div>
                <label>
                  Email
                  <input type="email" name="email" required placeholder="jane@example.com" />
                </label>
                <label>
                  Service Needed
                  <select name="service" required defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option>Roof Replacement</option>
                    <option>Roof Repair</option>
                    <option>Commercial Roofing</option>
                    <option>Emergency Roofing</option>
                  </select>
                </label>
                <label>
                  Project Details
                  <textarea name="message" rows="4" required placeholder="Describe your project or issue…" />
                </label>
                <button type="submit" className="btn btn-primary btn-full">
                  Submit Request
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-row">
          <p>© {currentYear} Basile Contractors LLC. All rights reserved.</p>
          <a href="#top" className="back-top">
            Back to top
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </a>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  );
}
