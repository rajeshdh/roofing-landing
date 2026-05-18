import Image from 'next/image';
import siteContent from '@/content/site-content.json';

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

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <main id="top">
        <header className="site-header">
          <div className="container nav">
            <a className="brand" href="#top" aria-label="Basile Contractors LLC home">
              Basile Contractors LLC
            </a>
            <nav aria-label="Main navigation">
              <a href="#services">Services</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#testimonials">Reviews</a>
              <a href="#contact" className="cta-link">
                Get Estimate
              </a>
            </nav>
          </div>
        </header>

        <section className="hero section-shell hero-shell">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />
          <div className="container hero-content">
            <p className="eyebrow">Premium Roofing Solutions</p>
            <h1>Elegant Roofing Crafted for Long-Term Protection</h1>
            <p className="hero-copy">
              Basile Contractors LLC helps homeowners and businesses protect their properties with
              high-performance roofing, beautiful finishes, and dependable project delivery.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                Request Free Estimate
              </a>
              <a href="tel:+12015550123" className="btn btn-secondary">
                Call (201) 555-0123
              </a>
            </div>
          </div>
        </section>

        <section className="stats section-shell shell-delay-1">
          <div className="container stat-grid">
            {stats.map((stat) => (
              <article key={stat.label}>
                <h2>{stat.value}</h2>
                <p>{stat.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="section section-shell shell-delay-2">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">What We Do</p>
              <h2>Roofing Services Built for Performance and Curb Appeal</h2>
            </div>
            <div className="card-grid" aria-live="polite">
              {siteContent.services.map((service) => (
                <article className="card" key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="section section-dark section-shell shell-delay-3">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Recent Work</p>
              <h2>Project Portfolio</h2>
            </div>
            <div className="portfolio-grid" aria-live="polite">
              {siteContent.portfolio.map((project) => (
                <article className="portfolio-card" key={project.title}>
                  <div className="image-frame">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      width={720}
                      height={500}
                      className="portfolio-image"
                    />
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <p className="portfolio-meta">{project.location}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="section section-shell shell-delay-4">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Client Feedback</p>
              <h2>Trusted by Property Owners</h2>
            </div>
            <div className="testimonial-grid" aria-live="polite">
              {siteContent.testimonials.map((item) => (
                <article className="testimonial" key={`${item.author}-${item.quote.slice(0, 16)}`}>
                  <p>{item.quote}</p>
                  <p className="portfolio-meta">
                    <strong>{item.author}</strong> — {item.role}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section section-shell shell-delay-5">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">FAQ</p>
              <h2>Answers Before You Start</h2>
            </div>
            <div className="faq-list" aria-live="polite">
              {siteContent.faq.map((item) => (
                <details className="faq-item" key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section section-contact section-shell shell-delay-6">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">Get Started</p>
              <h2>Request a Free Roofing Estimate</h2>
              <p>
                Tell us about your roof and we will follow up quickly with a consultation and custom
                quote.
              </p>
              <ul className="contact-list">
                <li>
                  <strong>Phone:</strong> <a href="tel:+12015550123">(201) 555-0123</a>
                </li>
                <li>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info@basilecontractorsllc.com">info@basilecontractorsllc.com</a>
                </li>
                <li>
                  <strong>Service Area:</strong> Northern New Jersey & nearby counties
                </li>
              </ul>
            </div>
            <form
              className="lead-form"
              action="https://formsubmit.co/info@basilecontractorsllc.com"
              method="post"
            >
              <input type="hidden" name="_subject" value="New Basile Contractors LLC lead" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="honeypot" />
              <label>
                Full Name
                <input type="text" name="name" required />
              </label>
              <label>
                Phone
                <input type="tel" name="phone" required />
              </label>
              <label>
                Email
                <input type="email" name="email" required />
              </label>
              <label>
                Service Needed
                <select name="service" required defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Roof Replacement</option>
                  <option>Roof Repair</option>
                  <option>Commercial Roofing</option>
                  <option>Emergency Roofing</option>
                </select>
              </label>
              <label>
                Project Details
                <textarea name="message" rows="4" required />
              </label>
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-row">
          <p>© {currentYear} Basile Contractors LLC. All rights reserved.</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
    </>
  );
}
