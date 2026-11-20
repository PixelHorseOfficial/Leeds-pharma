import React, { useEffect, useRef, useState } from "react";
import "./Home.css";

// ---- Image assets ----
// Hero/logo URLs are temporary Figma links (expire ~7 days). Export them from Figma,
// put all images in /public/images and update the paths below.
const F = "https://www.figma.com/api/mcp/asset/b0b24b62-ca21-4bd8-b012-96537c3b3544";
const A = {
  logo: "/images/logo.png",
  heroMain: `${F}/61063.png`,
  heroCapsule: `${F}/0ac98.png`,
  heroTablet: `${F}/69678.png`,
  heroDot: `${F}/0068f.png`,
  aboutVideo: "/videos/about.mp4",
  researchVideo: "/videos/research.mp4",
  labBackground: "/images/lab-corridor.jpg",
  globeVideo: "/videos/map3.mp4",
};

// TODO: replace with the real Leads Pharma enquiry email.
const CONTACT_EMAIL = "info@yourdomain.com";

// Where each call-to-action points. Everything is on one page for now, so these
// are on-page anchors — swap them for real routes/pages when they exist.
const LINKS = {
  products: "#products",
  contact: "#contact",
  learnMore: "#why",
  exploreApis: "#contact",
  viewProducts: "#contact",
  exploreRd: "#contact",
  quality: "#manufacturing",
  presence: "#contact",
  insights: "#contact",
};

const NAV = ["About", "Products", "API's", "Manufacturing", "Research", "Global"];
const NAV_IDS = ["about", "products", "apis", "manufacturing", "research", "global"];

const BADGES = ["Pharmaceutical Products", "APIs", "Manufacturing", "Healthcare Solutions"];

// [left %, top px, width %, src key, rotate deg, animate?]
const FLOATERS = [
  [20.04, 263, 11.65, "heroMain", -96, true], [63.96, 345, 26.7, "heroMain", -20, true],
  [30.96, 0, 23.94, "heroCapsule", -31, true], [65.79, 572, 27.28, "heroCapsule", 98, true],
  [52.22, 37, 10.08, "heroCapsule", 98, true], [12.21, 378, 18.26, "heroCapsule", 98, true],
  [13.28, 559, 11.9, "heroTablet"], [77.93, 56, 11.65, "heroDot"], [51.07, 141, 3.83, "heroDot"],
  [62.01, 634, 6.93, "heroDot"], [11.33, 743, 3.99, "heroDot"], [46.97, 295, 2.2, "heroDot"],
  [78.61, 600, 4, "heroDot"], [35.84, 224, 1.06, "heroDot"], [18.36, 511, 1.96, "heroDot"],
  [83.01, 548, 1.95, "heroDot"], [71.68, 830, 1.96, "heroDot"], [27.34, 579, 1.88, "heroDot"],
  [52.05, 198, 3.26, "heroTablet"], [29.79, 204, 5.54, "heroTablet"], [45.61, 820, 3.25, "heroTablet"],
  [86.23, 449, 3.26, "heroTablet"], [74.12, 786, 3.18, "heroTablet"], [6.93, 615, 3.26, "heroTablet"],
  [29.98, 394, 5.87, "heroTablet"], [65.72, 542, 5.87, "heroTablet"], [52.54, 719, 11.9, "heroTablet"],
  [22.36, 788, 5.95, "heroTablet"], [78.61, 268, 6.03, "heroTablet"], [60.74, 23, 5.62, "heroTablet"],
];

const ABOUT_CARDS = [
  ["Mission", "To develop and deliver quality pharmaceutical solutions through scientific expertise, responsible practices, and a continuous commitment to improving healthcare."],
  ["Vision", "To become a trusted pharmaceutical partner recognized for quality, innovation, scientific excellence, and meaningful contributions to healthcare."],
];

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z" />
  </svg>
);
const DropletIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z" />
  </svg>
);
const HourglassIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2h12M6 22h12M6 2c0 5 6 6 6 10s-6 5-6 10M18 2c0 5-6 6-6 10s6 5 6 10" />
  </svg>
);
const SpeakerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 9v6h4l5 4V5L8 9H4z" />
    <path d="M17 8a5 5 0 0 1 0 8M20 5a9 9 0 0 1 0 14" />
  </svg>
);
const AtomIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="1.6" fill="#fff" stroke="none" />
    <ellipse cx="12" cy="12" rx="9" ry="3.8" />
    <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
  </svg>
);
const CapsuleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="9" width="19" height="6" rx="3" transform="rotate(-30 12 12)" />
    <path d="M9.5 7.6l5 8.8" />
  </svg>
);

// Featured APIs (names from the content PDF). The hover descriptions are not in the PDF —
// have them reviewed before launch.
const APIS = [
  ["Doxofylline", "Bronchodilator used in the treatment of asthma and chronic obstructive pulmonary disease (COPD).", HeartIcon],
  ["Metadoxine", "Detoxifying agent used to accelerate alcohol and acetaldehyde metabolism.", DropletIcon],
  ["Fenoverine", "An antispasmodic agent indicated for the relief of gastrointestinal smooth muscle spasms and abdominal pain associated with digestive disorders.", HourglassIcon],
  ["Phentermine", "Appetite suppressant used for short-term management of obesity.", SpeakerIcon],
  ["Pirazepam", "Anxiolytic agent used for the short-term relief of anxiety symptoms.", AtomIcon],
  ["Tizanidine", "High-purity muscle relaxant API used for the management of neurological muscle spasticity.", CapsuleIcon],
];

// [area, description, gradient from, gradient to]
const PRODUCTS = [
  ["Cardiology", "Pharmaceutical products supporting cardiovascular healthcare and related therapeutic requirements.", "#0083d3", "#00b9c4"],
  ["Diabetes", "Products supporting diabetes management and associated healthcare needs.", "#19bcc8", "#4bd6ea"],
  ["Oncology", "Pharmaceutical solutions supporting relevant oncology and healthcare requirements.", "#2563c4", "#0a94d8"],
  ["Neurology", "Products addressing neurological and central nervous system healthcare requirements.", "#0e9fd0", "#3cc3d6"],
  ["Respiratory", "Pharmaceutical solutions supporting respiratory health and related conditions.", "#1eb1cd", "#7be0e8"],
  ["Gastroenterology", "Products supporting gastrointestinal and digestive healthcare requirements.", "#0083c6", "#00c4d0"],
];

const STEPS = [
  ["Research", "Scientific research focused on pharmaceutical opportunities and healthcare solutions."],
  ["Development", "Development of pharmaceutical formulations and products based on relevant healthcare requirements."],
  ["Testing", "Quality-focused testing and evaluation supporting product consistency and defined requirements."],
  ["Manufacturing", "Pharmaceutical manufacturing processes focused on consistency and process control."],
  ["Packaging", "Packaging processes designed to protect pharmaceutical product integrity."],
  ["Distribution", "Supporting the supply and distribution of pharmaceutical products to relevant markets and partners."],
];

const QUALITY_STAGES = ["Product development", "Formulation", "Testing", "Manufacturing", "Packaging", "Distribution"];
const QUALITY_FOCUS = ["Product consistency", "Process reliability", "Supply-chain quality"];

const WHY = [
  ["Pharmaceutical Expertise", "Our capabilities span pharmaceutical products, APIs, research, development, manufacturing, and supply."],
  ["Diverse Product Portfolio", "Our portfolio covers multiple therapeutic areas and pharmaceutical dosage forms."],
  ["API Capabilities", "Our API-related activities support selected pharmaceutical development and supply requirements."],
  ["Quality Focus", "Quality is considered throughout relevant stages of pharmaceutical development and manufacturing."],
  ["Hyderabad-Based", "Located in Hyderabad, Telangana, we operate within one of India's established pharmaceutical and life-sciences ecosystems."],
  ["Long-Term Partnerships", "We aim to build reliable and lasting relationships with pharmaceutical businesses, distributors, healthcare organizations, and industry partners."],
];

// Topic cards drawn from the "News & Insights" intro in the content PDF.
// Add real articles here when they exist.
const NEWS = [
  ["Industry Insights", "Pharmaceutical industry insights and trends", "/videos/1.mp4"],
  ["Research", "Research perspectives and healthcare developments", "/videos/2.mp4"],
  ["Company", "Product updates and company announcements", "/videos/3.mp4"],
];

const FAQS = [
  ["What does Leads Pharma do?", "Leads Pharma is a Hyderabad-based pharmaceutical company focused on pharmaceutical products, APIs, and healthcare solutions."],
  ["Where is Leads Pharma located?", "Leads Pharma is based in Hyderabad, Telangana, India."],
  ["What types of pharmaceutical products does Leads Pharma offer?", "Our portfolio spans pharmaceutical products and selected dosage forms. Contact us for product details and availability."],
  ["Does Leads Pharma offer APIs?", "We are involved in API-related activities. Contact us for specific APIs, specifications, and availability."],
  ["What therapeutic areas does Leads Pharma cover?", "Our pharmaceutical portfolio covers multiple therapeutic areas, including cardiology, diabetes, oncology, neurology, respiratory healthcare, gastroenterology, and other healthcare categories."],
  ["Does Leads Pharma work with pharmaceutical distributors?", "Leads Pharma works within the pharmaceutical and healthcare supply ecosystem and can engage with distributors and other business partners depending on product and market requirements."],
  ["How can I enquire about a pharmaceutical product?", "Use our contact form for enquiries about pharmaceutical products, APIs, supply, and business partnerships."],
  ["How can I contact Leads Pharma for business enquiries?", "Use our contact form for enquiries about pharmaceutical products, APIs, supply, and business partnerships."],
];

// [column title, [[label, href], ...]]  (empty href renders plain text)
const FOOTER_COLS = [
  ["Company", [["About", "#about"], ["Quality", "#quality"], ["Why Leads Pharma", "#why"], ["News & Insights", "#news"], ["FAQ", "#faq"]]],
  ["Products", PRODUCTS.map(([name]) => [name, "#products"])],
  ["APIs", APIS.map(([name]) => [`${name} API`, "#apis"])],
  ["Contact", [["Hyderabad, Telangana, India", ""], ["Contact Us", "#contact"]]],
];

const Pill = ({ children, dot = "var(--primary)" }) => (
  <span className="pill"><i style={{ background: dot }} />{children}</span>
);

const Heading = ({ children, accent, className = "" }) => (
  <h2 className={`h2 ${className}`}>{children} <span className="grad-text">{accent}</span></h2>
);

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Check = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 6.5l2.2 2.2L9.5 3.5" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ---- Scroll-reveal + count-up helpers ----
function useInView(ref, options) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, options || { threshold: 0.25 });
    obs.observe(node);
    return () => obs.disconnect();
  }, [ref, options]);
  return inView;
}

// threshold 0 + positive bottom margin: reveal as soon as an element is within ~120px of the viewport,
// so nothing below the hero is ever sitting invisible (blank gap) on first load.
const REVEAL_OPTIONS = { threshold: 0, rootMargin: "0px 0px 120px 0px" };

/** Wraps any element; fades + slides in the first time it scrolls into view.
 * direction: undefined = slide up (default), "left" = slide in from the left,
 * "right" = slide in from the right. */
function Reveal({ children, as: Tag = "div", className = "", delay = 0, direction, ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref, REVEAL_OPTIONS);
  const dirClass = direction === "left" ? " reveal-left" : direction === "right" ? " reveal-right" : "";
  return (
    <Tag
      ref={ref}
      className={`reveal${dirClass}${inView ? " in-view" : ""}${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// NOTE: CountUp / StatsRow are not used right now — the content PDF has no figures.
// If you get real numbers (years, sites, countries…), pass them to <StatsRow stats={[["25+", "Label"], …]} className="stats-4" />
// and the count-up animation comes back.

/** Counts a stat string ("1,200+", "98%", "25+") up from 0 once `start` becomes true. */
function CountUp({ value, start, duration = 1600 }) {
  const match = String(value).match(/^([\d,]+)(.*)$/);
  const digits = match ? match[1] : "0";
  const suffix = match ? match[2] : "";
  const target = parseInt(digits.replace(/,/g, ""), 10) || 0;
  const useCommas = digits.includes(",");
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return <>{useCommas ? display.toLocaleString("en-US") : display}{suffix}</>;
}

/** A stats row that counts every number up together once the row scrolls into view. */
function StatsRow({ stats, className, gradText = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.4 });
  return (
    <div className={className} ref={ref}>
      {stats.map(([n, l], i) => (
        <div key={l}>
          <strong className={gradText ? "grad-text" : ""}>
            <CountUp value={n} start={inView} duration={1200 + i * 150} />
          </strong>
          <span className="caps">{l}</span>
        </div>
      ))}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className={`nav-wrap${open ? " menu-open" : ""}`}>
      <nav className="nav">
        <a className="brand" href="#top" onClick={close}>
          <img src={A.logo} alt="" width="44" height="38" />
          <span style={{ color: "#008bd0" }}>Leads Pharma</span>
        </a>
        <ul className="nav-links">
          {NAV.map((n, i) => (<li key={n}><a href={`#${NAV_IDS[i]}`}>{n}</a></li>))}
        </ul>
        <a className="btn btn-primary btn-sm nav-cta" href={LINKS.contact}>Contact Us</a>
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>
      <ul className="mobile-menu" onClick={close}>
        {NAV.map((n, i) => (<li key={n}><a href={`#${NAV_IDS[i]}`}>{n}</a></li>))}
        <li><a className="btn btn-primary" href={LINKS.contact}>Contact Us</a></li>
      </ul>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg hero-media" aria-hidden="true">
        <video
          className="hero-video"
          src="/videos/hero-sec-bgg.mp4"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate nofullscreen"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Mobile-only copy of the heading, shown over the empty side of the video.
            The real <h1> below stays in the DOM (visually hidden on mobile) for SEO/screen readers. */}
        <div className="hero-overlay-title" aria-hidden="true">
          Advancing Healthcare Through <span className="grad-text">Scientific Innovation</span>
        </div>
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="pill glass"><i style={{ background: "var(--teal)" }} />Pharmaceutical Company in Hyderabad</span>
          <h1 className="hero-title">
            Advancing Healthcare Through <span className="grad-text">Scientific Innovation</span>
          </h1>
          <p className="lead">
            Leads Pharma is a Hyderabad-based pharmaceutical company focused on pharmaceutical
products, active pharmaceutical ingredients (APIs), and healthcare solutions.

          </p>
          <div className="btn-row">
            <a className="btn btn-primary" href={LINKS.products}>Explore Products <Arrow /></a>
            <a className="btn btn-ghost" href={LINKS.contact}>Contact Us</a>
          </div>
          <div className="badge-row">
            {BADGES.map((b) => (<span className="pill glass small" key={b}><Check />{b}</span>))}
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          {FLOATERS.map(([l, t, w, key, rot, anim], i) => (
            <img
              key={i}
              src={A[key]}
              alt=""
              className={anim ? "floater float" : "floater"}
              style={{ left: `${l}%`, top: `${t / 10.2}%`, width: `${w}%`, "--rot": `${rot || 0}deg`, animationDelay: `${(i % 6) * -1.2}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <Reveal className="about-media">
          <video
            className="about-video"
            src={A.aboutVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="glass-card trusted">
            <small>Based in</small>
            <strong className="grad-text">Hyderabad</strong>
            <span>Telangana, India</span>
          </div>
        </Reveal>
        <div className="about-copy">
          <Reveal><Pill>About Leads Pharma</Pill></Reveal>
          <Reveal delay={80}>
            <h2 className="h2 center-md">
              Science-Led. <span className="grad-text">Patient-First.</span> Globally Trusted.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="lead-sm">
              Leads Pharma is a pharmaceutical company based in Hyderabad, India, focused on pharmaceutical
              products, active pharmaceutical ingredients, product development, manufacturing, and supply.
            </p>
            <p className="lead-sm">
              Our portfolio spans multiple dosage forms and therapeutic applications, enabling us to address
              diverse healthcare requirements. From pharmaceutical formulations and APIs to research and product
              development, we bring together scientific expertise and quality-focused processes across the
              pharmaceutical lifecycle.
            </p>
            <p className="lead-sm">
              We aim to build long-term relationships with pharmaceutical businesses, distributors, healthcare
              organizations, and industry partners through a focus on quality, consistency, reliability, and
              responsive service.
            </p>
          </Reveal>
          <div className="grid-2">
            {ABOUT_CARDS.map(([t, d], i) => (
              <Reveal as="div" className="card soft" key={t} delay={180 + i * 80}>
                <h3>{t}</h3><p>{d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={320}>
            <div className="btn-row cta-gap">
              <a className="btn btn-primary" href={LINKS.learnMore}>Learn More <Arrow /></a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Apis() {
  return (
    <section className="apis" id="apis">
      <video
        className="apis-video"
        src="/videos/final.mp4"
        poster={A.labBackground}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="apis-overlay" aria-hidden="true" />
      <div className="container">
        <Reveal><span className="pill glass"><i style={{ background: "var(--primary)" }} />Active Pharmaceutical Ingredients <b className="grad-text">(APIs)</b></span></Reveal>
        <Reveal delay={80}><Heading className="on-dark" accent="for Pharmaceutical Development">Active Pharmaceutical Ingredients</Heading></Reveal>
        <Reveal delay={110}><p className="tagline">Precision Molecules. Reliable Pharmaceutical Solutions.</p></Reveal>
        <Reveal delay={140}>
          <p className="lead-sm on-dark-soft">
            Active Pharmaceutical Ingredients (APIs) are fundamental components of pharmaceutical formulations.
            Leads Pharma is involved in API-related pharmaceutical activities, supporting selected pharmaceutical
            development and supply requirements.
          </p>
          <p className="lead-sm on-dark-soft">
            Our API portfolio covers pharmaceutical ingredients associated with different therapeutic applications,
            with a focus on quality, consistency, and dependable supply.
          </p>
        </Reveal>
        <div className="grid-3">
          {APIS.map(([name, desc, Icon], i) => (
            <Reveal as="div" className="glass-card api-card" key={name} delay={i * 80}>
              <span className="api-icon"><Icon /></span>
              <h3>{name} API</h3>
              <p className="api-desc">{desc}</p>
              <hr />
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="btn-row cta-gap">
            <a className="btn btn-primary" href={LINKS.exploreApis}>Explore APIs <Arrow /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section className="section" id="products">
      <div className="container">
        <Reveal><Pill>Pharmaceutical Products</Pill></Reveal>
        <Reveal delay={80}><Heading accent="Across Multiple Therapeutic Areas">Pharmaceutical Products</Heading></Reveal>
        <Reveal delay={110}><p className="tagline">Precision Therapeutics. Healthcare-Focused Solutions.</p></Reveal>
        <Reveal delay={140}>
          <p className="lead-sm narrow">
            Leads Pharma offers pharmaceutical products across diverse therapeutic areas and dosage forms. Our
            portfolio is focused on supporting healthcare requirements through quality-oriented pharmaceutical
            formulations.
          </p>
        </Reveal>
        <div className="grid-3 products">
          {PRODUCTS.map(([name, desc, c1, c2], i) => (
            <Reveal as="article" className="product" key={name} delay={i * 80}>
              <div className="product-top" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
                <div className="bottle"><i /><b><em>LEADS</em></b></div>
              </div>
              <div className="product-body">
                <h3>{name}</h3>
                <p>{desc}</p>
                <div className="row"><a href={LINKS.viewProducts} className="more">Learn more →</a></div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="btn-row cta-gap">
            <a className="btn btn-primary" href={LINKS.viewProducts}>View All Products <Arrow /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Manufacturing() {
  return (
    <section className="section" id="manufacturing">
      <div className="container">
        <Reveal><Pill>Manufacturing</Pill></Reveal>
        <Reveal delay={80}><Heading accent="Medicine">From Molecule to</Heading></Reveal>
        <Reveal delay={110}><p className="tagline">Quality-Focused Processes Across the Pharmaceutical Lifecycle</p></Reveal>
        <Reveal delay={140}>
          <p className="lead-sm">
            Pharmaceutical manufacturing requires consistency, controlled processes, and attention to quality at
            every stage.
          </p>
          <p className="lead-sm">
            Leads Pharma's approach covers product development, formulation, quality evaluation, manufacturing,
            packaging, and supply, supporting the consistent delivery of pharmaceutical products.
          </p>
        </Reveal>
        <ol className="timeline">
          {STEPS.map(([t, d], i) => (
            <Reveal as="li" className={i % 2 ? "right" : "left"} key={t} delay={i * 100}>
              <div className="step-text">
                <small>Step 0{i + 1}</small>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
              <span className="step-dot">{i + 1}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Scattered background dust around the helix: [x, y, radius, baseOpacity]
// NOTE: Dna is currently unused in Research (replaced by the research video below),
// but left here in case you want to bring the illustration back somewhere.
const DNA_DUST = [
  [18, 38, 1.6, .55], [46, 18, 1.3, .4], [190, 46, 1.6, .5], [205, 94, 1.3, .45],
  [16, 150, 1.4, .5], [198, 170, 1.5, .4], [30, 230, 1.3, .5], [196, 250, 1.6, .45],
  [60, 270, 1.3, .4], [150, 286, 1.4, .5], [8, 100, 1.2, .35], [210, 210, 1.3, .4],
  [40, 90, 1.1, .3], [170, 130, 1.2, .35],
];

function Dna() {
  const rowRefs = useRef([]);
  const CX = 110;

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let raf;
    let t = 0;
    const animate = () => {
      t += 0.015;
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const w = Math.abs(Math.sin(i * 0.5 + t)) * 34 + 4;
        row.line.setAttribute("x1", CX - w);
        row.line.setAttribute("x2", CX + w);
        row.left.setAttribute("cx", CX - w);
        row.right.setAttribute("cx", CX + w);
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const rows = Array.from({ length: 18 }, (_, i) => {
    const w = Math.abs(Math.sin(i * 0.5)) * 34 + 4;
    const y = 15 + i * 15;
    const setRef = (key) => (el) => {
      rowRefs.current[i] = { ...(rowRefs.current[i] || {}), [key]: el };
    };
    return (
      <g key={i} filter="url(#dnaGlow)">
        <line ref={setRef("line")} x1={CX - w} x2={CX + w} y1={y} y2={y} stroke="#0e7fb8" strokeOpacity=".55" strokeWidth="1" />
        <circle ref={setRef("left")} cx={CX - w} cy={y} r="3" fill={i % 3 ? "#0083d3" : "#00b7b7"} />
        <circle ref={setRef("right")} cx={CX + w} cy={y} r="3" fill={i % 2 ? "#00b7b7" : "#0083d3"} />
      </g>
    );
  });

  return (
    <svg className="dna" viewBox="0 0 220 300" role="img" aria-label="DNA helix illustration">
      <defs>
        <radialGradient id="dnaHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00b7b7" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00b7b7" stopOpacity="0" />
        </radialGradient>
        <filter id="dnaGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx={CX} cy="150" r="110" fill="url(#dnaHalo)" />
      {DNA_DUST.map(([x, y, r, o], i) => (
        <circle key={`d${i}`} className="dna-dust" cx={x} cy={y} r={r} fill="#eaf6ff" opacity={o} style={{ animationDelay: `${i * -0.7}s` }} />
      ))}
      {rows}
    </svg>
  );
}

/** Slowly rotating molecule/hub icon (currently not rendered). Rotation is handled in CSS
 * via the .hub-rotate group so it stays smooth and GPU-friendly. */
function Hub() {
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2;
    return { x: 50 + Math.cos(angle) * 36, y: 50 + Math.sin(angle) * 36 };
  });
  return (
    <svg className="hub" viewBox="0 0 100 100" role="img" aria-hidden="true">
      {/* Rotating network */}
      <g className="hub-rotate">
        {points.map((p, i) => (
          <line key={`line-${i}`} x1="50" y1="50" x2={p.x} y2={p.y} stroke="#1d7fae" strokeWidth="1" />
        ))}
        {points.map((p, i) => (
          <circle key={`point-${i}`} cx={p.x} cy={p.y} r="4.5" fill="#00b7b7" />
        ))}
      </g>

      {/* Center stays fixed */}
      <circle cx="50" cy="50" r="7" fill="#0083d3" />
    </svg>
  );
}

function Research() {
  return (
    <section className="research" id="research">
      <div className="hero-bg" aria-hidden="true">
        <video
          className="hero-video"
          src={A.researchVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="container research-grid">
        <div>
          <Reveal direction="left"><span className="pill dark"><i style={{ background: "var(--teal)" }} />Research &amp; Innovation</span></Reveal>
          <Reveal direction="left" delay={80}><h2 className="h2 on-dark">Pharmaceutical Research <span className="grad-text">&amp; Development</span></h2></Reveal>
          <Reveal direction="left" delay={110}><p className="tagline">Discovery Labs Where New Healthcare Solutions Begin</p></Reveal>
          <Reveal direction="left" delay={140}>
            <p className="lead-sm on-dark-soft">
              Research and development play an important role in advancing pharmaceutical products and addressing
              evolving healthcare requirements.
            </p>
            <p className="lead-sm on-dark-soft">
              Leads Pharma's research-oriented approach supports the exploration of pharmaceutical molecules,
              formulations, product opportunities, and potential healthcare solutions.
            </p>
            <p className="lead-sm on-dark-soft">
              By connecting research with product development and manufacturing capabilities, we aim to translate
              scientific opportunities into practical pharmaceutical products.
            </p>
          </Reveal>
          <Reveal direction="left" delay={180}>
            <div className="btn-row cta-gap">
              <a className="btn btn-primary" href={LINKS.exploreRd}>Explore R&amp;D <Arrow /></a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Quality() {
  return (
    <section className="section" id="quality">
      <div className="container quality-grid">
        <div className="quality-copy">
          <Reveal><Pill>Quality</Pill></Reveal>
          <Reveal delay={80}><Heading accent="Pharmaceutical Development">Quality at Every Stage of</Heading></Reveal>
          <Reveal delay={140}>
            <p className="lead-sm">
              Quality is an essential part of pharmaceutical product development, manufacturing, and supply.
            </p>
            <p className="lead-sm">
              Leads Pharma follows a quality-focused approach across relevant stages of the pharmaceutical
              lifecycle, from product development and formulation to testing, manufacturing, packaging, and
              distribution.
            </p>
            <p className="lead-sm">
              Our focus is on maintaining product consistency, process reliability, and quality throughout the
              supply chain.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="btn-row cta-gap">
              <a className="btn btn-primary" href={LINKS.quality}>Our Quality Approach <Arrow /></a>
            </div>
          </Reveal>
        </div>
        <Reveal className="stage-card" direction="right" delay={120}>
          <ol className="stage-list">
            {QUALITY_STAGES.map((s, i) => (
              <li key={s}><span className="stage-num">0{i + 1}</span>{s}</li>
            ))}
          </ol>
          <div className="chip-row">
            {QUALITY_FOCUS.map((c) => (<span className="pill small" key={c}><Check />{c}</span>))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const spark = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--primary)" aria-hidden="true"><path d="M12 2l2.2 7.8L22 12l-7.800 2.200L12 22l-2.200-7.800L2 12l7.800-2.200z" /></svg>
);

function Why() {
  return (
    <section className="section" id="why">
      <div className="container">
        <Reveal><Pill>Why Leads Pharma</Pill></Reveal>
        <Reveal delay={80}><Heading accent="Leads Pharma?">Why Choose</Heading></Reveal>
        <div className="grid-3">
          {WHY.map(([t, d], i) => (
            <Reveal as="div" className="card why" key={t} delay={i * 80}>
              <span className="why-icon">{spark}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlobalPresence() {
  return (
    <section className="section" id="global">
      <div className="container">
        <Reveal><Pill>Global Presence</Pill></Reveal>
        <Reveal delay={80}><Heading accent="Healthcare Markets">Connecting Pharmaceutical Solutions With</Heading></Reveal>
        <Reveal delay={140}>
          <p className="lead-sm">
            Leads Pharma works within the pharmaceutical and healthcare ecosystem to support the supply of
            pharmaceutical products and related solutions.
          </p>
          <p className="lead-sm">
            Our focus is on developing strong relationships with pharmaceutical businesses, distributors,
            healthcare organizations, and other partners while expanding access to quality pharmaceutical products
            across relevant markets.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div className="btn-row cta-gap">
            <a className="btn btn-primary" href={LINKS.presence}>Explore Our Presence <Arrow /></a>
          </div>
        </Reveal>
        <Reveal className="globe-card" delay={220}>
          <video
          className="globe-video"
            src={A.globeVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </Reveal>
      </div>
    </section>
  );
}

function News() {
  return (
    <section className="section" id="news">
      <div className="container">
        <Reveal><Pill>News &amp; Insights</Pill></Reveal>
        <Reveal delay={80}><Heading accent="Leads Pharma">Latest From</Heading></Reveal>
        <Reveal delay={140}>
          <p className="lead-sm">
            Stay updated with pharmaceutical industry insights, healthcare developments, product updates, research
            perspectives, company announcements, and pharmaceutical trends.
          </p>
        </Reveal>
        <div className="grid-3 news">
          {NEWS.map(([tag, title, video], i) => (
            <Reveal as="article" key={title} delay={i * 100}>
              <div className="news-img">
                <video
                  src={video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                />
                <span className="tag">{tag}</span>
              </div>
              <h3>{title}</h3>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="btn-row cta-gap">
            <a className="btn btn-primary" href={LINKS.insights}>View All Insights <Arrow /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <Reveal><Pill>FAQ</Pill></Reveal>
        <Reveal delay={80}><Heading accent="Questions">Frequently Asked</Heading></Reveal>
        <div className="faq-list">
          {FAQS.map(([q, a], i) => (
            <Reveal as="details" className="faq-item" key={q} delay={i * 50}>
              <summary>{q}</summary>
              <p>{a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="cta-wrap" id="contact">
      <Reveal as="div" className="cta">
        <h2>Partner With Leads Pharma</h2>
        <p>Looking for pharmaceutical products, APIs, or a pharmaceutical supply partner? Contact
Leads Pharma to discuss your requirements.
</p>
        {/* <p>Connect with Leads Pharma to discuss your requirements and explore opportunities for collaboration.</p> */}
        <div className="btn-row center">
          <a className="btn btn-white" href={`mailto:${CONTACT_EMAIL}`}>Contact Us</a>
          <a className="btn btn-glass" href={LINKS.products}>Explore Products</a>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const onSubmit = (e) => { e.preventDefault(); e.target.reset(); };
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a className="brand on-dark" href="#top"><img src={A.logo} alt="" width="44" height="38" /><span>Leads Pharma</span></a>
            <p className="foot-text">
              Advancing healthcare through scientific innovation. Leads Pharma is a Hyderabad-based pharmaceutical
              company focused on developing, manufacturing, and supplying quality pharmaceutical products and APIs.
            </p>
            <small className="caps">Newsletter</small>
            <form className="newsletter" onSubmit={onSubmit}>
              <input type="email" placeholder="you@company.com" aria-label="Email address" required />
              <button type="submit">Subscribe</button>
            </form>
            <div className="social">{["Li", "Tw", "Yt", "Ig"].map((s) => (<a href="#top" key={s}>{s}</a>))}</div>
          </div>
          {FOOTER_COLS.map(([title, items]) => (
            <div key={title}>
              <h4>{title}</h4>
              <ul>
                {items.map(([label, href]) => (
                  <li key={label}>{href ? <a href={href}>{label}</a> : label}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 Leads Pharma. All rights reserved.</span>
          <span className="legal"><a href="#top">Privacy</a><a href="#top">Terms</a></span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="home">
      <Header />
      <main>
        <Hero />
        <About />
        <Apis />
        <Products />
        <Manufacturing />
        <Research />
        <Quality />
        <Why />
        <GlobalPresence />
        <News />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}