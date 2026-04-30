import DigitalTwinWidget from "./components/digital-twin-widget";

const careerTimeline = [
  {
    period: "2025 - Present",
    role: "Fractional COO",
    company: "Paul Cobley Consulting / SisuScale",
    highlights: [
      "Partnering with founder-led SaaS businesses to remove founder dependency and install operating rhythm.",
      "Leading diagnostics and execution across product, operations, and delivery to reduce risk and firefighting.",
    ],
  },
  {
    period: "2021 - 2025",
    role: "Founder, CTO, Head of Product",
    company: "PickGuru",
    highlights: [
      "Built a fan-engagement platform blending live prediction games, social play, and gamification.",
      "Raised GBP 3.5M, led a strategic pivot to B2B SaaS, and delivered a seven-figure founder exit.",
    ],
  },
  {
    period: "2017 - 2021",
    role: "Founder & CEO",
    company: "Shiggle / Matulo Software",
    highlights: [
      "Built compliant products in regulated environments while leading remote cross-functional teams.",
      "Developed early operator playbooks, SOPs, and automation systems that became a repeatable framework.",
    ],
  },
  {
    period: "2007 - 2015",
    role: "Senior Engineer to Head of Java Development",
    company: "LVS",
    highlights: [
      "Delivered enterprise sportsbook platforms at scale across high-volume, regulated markets.",
      "Led technical transformation, cross-site engineering alignment, and launch recovery for major clients.",
    ],
  },
];

const portfolioLinks = [
  {
    title: "Case Studies",
    text: "Deep dives into founder-led scale-ups, operational diagnostics, and execution turnarounds.",
    href: "#",
    status: "Coming Soon",
  },
  {
    title: "Systems Playbooks",
    text: "Practical operating frameworks for teams moving from founder-heavy to process-driven execution.",
    href: "#",
    status: "Coming Soon",
  },
  {
    title: "Product + AI Builds",
    text: "Selected technical architecture and automation projects spanning SaaS, fintech, and sports tech.",
    href: "#",
    status: "Coming Soon",
  },
];

const metrics = [
  { label: "Years Building", value: "25+" },
  { label: "Capital Raised", value: "GBP 3.5M" },
  { label: "Founder Exit", value: "7 Figure" },
  { label: "Core Focus", value: "Scale Without Dependency" },
];

export default function Home() {
  return (
    <main>
      <div className="ambient" aria-hidden="true" />
      <header className="site-header">
        <a className="logo" href="#home" aria-label="Paul Cobley home">
          PC
        </a>
        <nav>
          <a href="#about">About</a>
          <a href="#journey">Journey</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero section" id="home">
        <p className="kicker">Founder. Operator. Technical Architect.</p>
        <h1>Enterprise Precision. Founder Energy. Execution That Scales.</h1>
        <p className="lead">
          I help founder-led SaaS businesses build calm, scalable systems so growth does
          not depend on one person carrying the whole company.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="https://www.linkedin.com/in/paul-cobley" target="_blank" rel="noreferrer">
            Connect on LinkedIn
          </a>
          <a className="button button-secondary" href="mailto:paul.cobley@gmail.com">
            Start a Conversation
          </a>
        </div>
        <div className="metric-grid" role="list" aria-label="Key experience metrics">
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.label} role="listitem">
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="about">
        <div className="section-top">
          <p className="kicker">About Me</p>
          <h2>From shipping code to scaling companies.</h2>
        </div>
        <div className="about-grid">
          <article className="panel">
            <h3>Hands-On Across the Stack</h3>
            <p>
              Over the past two decades, I have worked as an engineer, architect, founder,
              product leader, and operator. I understand the pressure points because I have
              lived them from inside the business.
            </p>
          </article>
          <article className="panel">
            <h3>Built in Regulated Markets</h3>
            <p>
              My background includes enterprise sportsbook systems, compliance-heavy
              platforms, and mission-critical delivery where quality, reliability, and pace
              all matter at once.
            </p>
          </article>
          <article className="panel">
            <h3>Founder Dependency Specialist</h3>
            <p>
              Today, I work with founders who have traction but feel trapped in the middle of
              everything. I help install structure, accountability, and systems that keep the
              business moving without constant founder intervention.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="journey">
        <div className="section-top">
          <p className="kicker">Career Journey</p>
          <h2>Key chapters across startups and enterprise platforms.</h2>
        </div>
        <div className="timeline">
          {careerTimeline.map((item) => (
            <article className="timeline-item" key={`${item.company}-${item.period}`}>
              <div className="timeline-meta">
                <span>{item.period}</span>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
              </div>
              <ul>
                {item.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="portfolio">
        <div className="section-top">
          <p className="kicker">Portfolio</p>
          <h2>Space reserved for upcoming work and case studies.</h2>
        </div>
        <div className="portfolio-grid">
          {portfolioLinks.map((item) => (
            <article className="panel portfolio-card" key={item.title}>
              <span className="status-pill">{item.status}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a href={item.href} aria-disabled="true" tabIndex={-1} className="disabled-link">
                View section
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="contact">
        <div className="contact-panel">
          <p className="kicker">Contact</p>
          <h2>Let&apos;s build a business that scales cleanly.</h2>
          <p>
            If you are in the messy middle and need operating structure without slowing down
            momentum, reach out.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="mailto:paul.cobley@gmail.com">
              paul.cobley@gmail.com
            </a>
            <a className="button button-secondary" href="https://paulcobley.uk" target="_blank" rel="noreferrer">
              paulcobley.uk
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>Paul Cobley</p>
        <p>Founder-led growth, systemized execution, and high-trust delivery.</p>
      </footer>

      <DigitalTwinWidget />
    </main>
  );
}
