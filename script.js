const fallbackContent = {
  services: [
    {
      title: "Roof Replacement",
      description:
        "Complete tear-off and replacement systems with premium materials and manufacturer-backed warranties."
    },
    {
      title: "Roof Repair",
      description:
        "Leak detection and precision roof repairs that restore function while preserving your roof's look."
    },
    {
      title: "Commercial Roofing",
      description:
        "Low-slope and flat-roof solutions designed for long-term durability and energy performance."
    }
  ],
  portfolio: [
    {
      title: "Architectural Shingle Upgrade",
      location: "Ridgewood, NJ",
      summary: "Full roof replacement with premium architectural shingles.",
      image:
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80",
      alt: "Newly installed dark shingle roof on a residential home"
    },
    {
      title: "Standing Seam Metal Roof",
      location: "Paramus, NJ",
      summary: "Modern standing seam installation for superior weather protection.",
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
      alt: "Silver standing seam metal roof on a modern building"
    },
    {
      title: "Commercial Flat Roof System",
      location: "Hackensack, NJ",
      summary: "Durable commercial membrane roof with drainage upgrades.",
      image:
        "https://images.unsplash.com/photo-1523419409543-1f057f5f7e51?auto=format&fit=crop&w=1200&q=80",
      alt: "Commercial flat roof with clean membrane finish"
    }
  ],
  testimonials: [
    {
      quote:
        "Basile Contractors was fast, communicative, and the workmanship was incredible. Our home looks amazing.",
      author: "Angela R.",
      role: "Homeowner"
    },
    {
      quote:
        "Professional crew from start to finish. They minimized downtime at our facility and delivered exactly as promised.",
      author: "D. Patel",
      role: "Property Manager"
    }
  ],
  faq: [
    {
      question: "How quickly can I get an estimate?",
      answer: "Most estimates are scheduled within 24 hours and delivered after site assessment."
    },
    {
      question: "Do you offer emergency leak response?",
      answer: "Yes. We provide rapid-response emergency roof tarping and repair services."
    }
  ]
};

function renderServices(items) {
  const target = document.getElementById("services-grid");
  target.innerHTML = items
    .map(
      (item) => `
      <article class="card">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </article>
    `
    )
    .join("");
}

function renderPortfolio(items) {
  const target = document.getElementById("portfolio-grid");
  target.innerHTML = items
    .map(
      (item) => `
      <article class="portfolio-card">
        <img src="${item.image}" alt="${item.alt}" loading="lazy" />
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <p class="portfolio-meta">${item.location}</p>
      </article>
    `
    )
    .join("");
}

function renderTestimonials(items) {
  const target = document.getElementById("testimonial-grid");
  target.innerHTML = items
    .map(
      (item) => `
      <article class="testimonial">
        <p>${item.quote}</p>
        <p class="portfolio-meta"><strong>${item.author}</strong> — ${item.role}</p>
      </article>
    `
    )
    .join("");
}

function renderFaq(items) {
  const target = document.getElementById("faq-list");
  target.innerHTML = items
    .map(
      (item) => `
      <details class="faq-item">
        <summary>${item.question}</summary>
        <p>${item.answer}</p>
      </details>
    `
    )
    .join("");
}

function setupRevealAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}

async function loadContent() {
  try {
    const response = await fetch("./content/site-content.json");
    if (!response.ok) {
      throw new Error("Unable to load dynamic content");
    }
    return await response.json();
  } catch {
    return fallbackContent;
  }
}

async function initPage() {
  const content = await loadContent();
  renderServices(content.services ?? fallbackContent.services);
  renderPortfolio(content.portfolio ?? fallbackContent.portfolio);
  renderTestimonials(content.testimonials ?? fallbackContent.testimonials);
  renderFaq(content.faq ?? fallbackContent.faq);
  setupRevealAnimation();
  document.getElementById("year").textContent = new Date().getFullYear();
}

initPage();
