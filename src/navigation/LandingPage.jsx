import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadExamCardCounts } from "../lib/cardLoader";
import UpgradeModal from "../components/UpgradeModal";
import AboutModal from "../components/AboutModal";
import "./LandingPage.css";

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
      </svg>
    ),
    title: "Spaced Repetition",
    desc: "The SM-2 algorithm surfaces cards exactly when you're about to forget them — not before, not after. Study less, retain more.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "10 Card Types",
    desc: "Flashcards, MCQ, multi-select, true/false, hotspot diagrams, scenario tasks, script simulators, and more — matched to the real exam format.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Timed Exam Mode",
    desc: "60-minute mock exams drawn from real exam-weight topics. Silent answering, full results screen, and score breakdown by category.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>
      </svg>
    ),
    title: "Learning Games",
    desc: "Connections puzzles, Azure Wordle, themed crosswords, and word searches turn revision into something you actually want to do.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
    title: "Readiness Dashboard",
    desc: "See SRS maturity, mastered card counts, and an overall readiness score per exam and category — so you know exactly where to focus.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h10M7 11h6"/>
      </svg>
    ),
    title: "Azure Portal Labs",
    desc: "Hands-on portal simulations — configure real Azure services step by step in a faithful recreation of the Azure portal interface.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Free to Start",
    desc: "Core AZ-900 cards, all four games, exam mode, and streak tracking are free — no card required, no time limit.",
  },
];

const EXAMS = [
  {
    code: "AZ-900",
    name: "Azure Fundamentals",
    desc: "The foundation cert. Cloud concepts, Azure services, pricing, and governance — the entry point to the Azure certification path.",
    from: "#0ea5e9", to: "#0369a1",
  },
  {
    code: "AZ-104",
    name: "Azure Administrator",
    desc: "The hands-on administrator exam. VMs, networking, storage, identity, monitoring, and backup across real-world scenarios.",
    from: "#6366f1", to: "#3730a3",
  },
  {
    code: "AZ-700",
    name: "Network Engineer Associate",
    desc: "Deep networking. Virtual networks, VPN gateways, ExpressRoute, load balancers, firewalls, and hybrid connectivity.",
    from: "#0891b2", to: "#155e75",
  },
  {
    code: "AZ-305",
    name: "Solutions Architect Expert",
    desc: "Design-level thinking. Architecture patterns, business continuity, data storage solutions, and governance at scale.",
    from: "#8b5cf6", to: "#5b21b6",
  },
];

const FREE_FEATURES = [
  "Full AZ-900 game library (Connections, Crossword, Wordle)",
  "Core study cards across all four exams",
  "Spaced repetition with SM-2 algorithm",
  "Timed exam mode and silent practice",
  "Streak tracking and daily goal ring",
  "Readiness dashboard",
];

const PREMIUM_FEATURES = [
  "Every card across all four exams — 1,000+ questions",
  "Complete AZ-104, AZ-700, and AZ-305 question banks",
  "All card types including scenario tasks and script simulators",
  "Azure Portal Labs — hands-on simulations of real Azure workflows",
  "Priority access to new exam content",
  "Everything in Free, always",
];

const BUSINESS_FEATURES = [
  "Everything in Premium, for every team member",
  "Centralised billing — one invoice for the whole team",
  "Admin dashboard with team-wide readiness tracking",
  "Add or remove seats at any time",
  "Priority support",
  "Minimum 5 seats",
];

export default function LandingPage({ onGetStarted }) {
  const [examCounts, setExamCounts] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    loadExamCardCounts().then(c => { if (c) setExamCounts(c); });
  }, []);

  const totalCards = examCounts
    ? Object.values(examCounts).reduce((s, n) => s + n, 0)
    : null;

  const totalLabel = totalCards
    ? `${Math.floor(totalCards / 100) * 100}+`
    : "1000+";

  return (
    <div className="lp-root">
      {/* ── Nav ── */}
      <nav className="lp-nav">
        <Link className="lp-nav-pricing" to="/pricing">Pricing</Link>
        <button className="lp-nav-login" onClick={onGetStarted}>Log in</button>
      </nav>

      {/* ── Hero ── */}
      <section className="lp-hero">
        <div className="lp-hero-inner">

          {/* Site-wide logo — matches PlatformSelect and App header */}
          <div className="lp-hero-logo">
            <svg className="lp-hero-cloud-svg" viewBox="0 0 260 165" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <path id="lpHeroCloud" d="M50 115C30 115 15 100 15 82C15 66 27 53 43 51C45 30 63 14 85 14C102 14 117 24 124 39C129 36 135 34 141 34C159 34 174 49 174 67C188 69 199 81 199 95C199 106 191 115 180 115Z"/>
              </defs>
              <use href="#lpHeroCloud" x="20" y="27" fill="#185FA5"/>
              <use href="#lpHeroCloud" x="40" y="47" fill="#ffffff" stroke="#2980D9" strokeWidth="5"/>
            </svg>
            <div className="lp-hero-logo-text">
              <span className="lp-hero-brand">Kloud<span className="lp-hero-ace">Ace</span></span>
            </div>
          </div>
          <span className="lp-beta-badge">Beta</span>

          <h1 className="lp-hero-h1">The smartest way<br />to pass your cloud exam</h1>
          <p className="lp-hero-sub">
            Spaced repetition, scenario-based questions, timed exam mode, and<br className="lp-br" />
            interactive games — starting with Azure, expanding to AWS and GCP.
          </p>
          <div className="lp-hero-ctas">
            <button className="lp-cta-primary" onClick={onGetStarted}>
              Get started free
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <button className="lp-cta-secondary" onClick={onGetStarted}>Log in to existing account</button>
          </div>
          <div className="lp-hero-stats">
            <div className="lp-stat"><span className="lp-stat-n">{totalLabel}</span><span className="lp-stat-l">Questions</span></div>
            <div className="lp-stat-div"/>
            <div className="lp-stat"><span className="lp-stat-n">4</span><span className="lp-stat-l">Certifications</span></div>
            <div className="lp-stat-div"/>
            <div className="lp-stat"><span className="lp-stat-n">10</span><span className="lp-stat-l">Card types</span></div>
            <div className="lp-stat-div"/>
            <div className="lp-stat"><span className="lp-stat-n">4</span><span className="lp-stat-l">Learning games</span></div>
            <div className="lp-stat-div"/>
            <div className="lp-stat"><span className="lp-stat-n">6</span><span className="lp-stat-l">Labs</span></div>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="lp-section lp-section--mission">
        <div className="lp-section-inner lp-mission-inner">
          <div className="lp-mission-text">
            <div className="lp-section-label">Our mission</div>
            <h2 className="lp-section-h2">Add KloudAce to your study arsenal</h2>
            <p className="lp-mission-body">
              KloudAce fits into your study routine however you like to learn — whether that's video courses or official docs. Use it to reinforce what you're learning through spaced repetition, exam-realistic scenarios, hands-on labs, and games that make terminology actually stick.
            </p>
            <button className="lp-mission-link" onClick={() => setShowAbout(true)}>
              Read more about our approach
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
          <div className="lp-mission-stats">
            <div className="lp-mission-stat">
              <span className="lp-mission-stat-n">SM-2</span>
              <span className="lp-mission-stat-l">Spaced repetition algorithm</span>
            </div>
            <div className="lp-mission-stat">
              <span className="lp-mission-stat-n">9</span>
              <span className="lp-mission-stat-l">Question types matched to real exams</span>
            </div>
            <div className="lp-mission-stat">
              <span className="lp-mission-stat-n">4</span>
              <span className="lp-mission-stat-l">Learning games for vocabulary recall</span>
            </div>
            <div className="lp-mission-stat">
              <span className="lp-mission-stat-n">£0</span>
              <span className="lp-mission-stat-l">To get started — no card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="lp-section lp-section--light">
        <div className="lp-section-inner">
          <div className="lp-section-label">How it works</div>
          <h2 className="lp-section-h2">Everything you need to pass</h2>
          <div className="lp-features-grid">
            {FEATURES.map(f => (
              <div key={f.title} className="lp-feature-card">
                <div className="lp-feature-icon">{f.icon}</div>
                <h3 className="lp-feature-title">{f.title}</h3>
                <p className="lp-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it's for ── */}
      <section className="lp-section">
        <div className="lp-section-inner">
          <div className="lp-section-label">Who it's for</div>
          <h2 className="lp-section-h2">Not just for exam takers</h2>
          <p className="lp-audience-intro">Whether you're chasing a certification, exploring cloud for the first time, or keeping your Azure knowledge sharp at work — KloudAce is built for you.</p>
          <div className="lp-audience-grid">
            <div className="lp-audience-card">
              <div className="lp-audience-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <h3 className="lp-audience-title">Certification candidates</h3>
              <p className="lp-audience-desc">Structured study with timed exam mode, spaced repetition, and a readiness dashboard that tells you exactly where to focus. AZ-900 through AZ-305 covered.</p>
            </div>
            <div className="lp-audience-card">
              <div className="lp-audience-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3 className="lp-audience-title">Cloud learners</h3>
              <p className="lp-audience-desc">Explore Azure concepts at your own pace through scenario questions, hands-on portal simulations, Terraform labs, and learning games. No exam required.</p>
            </div>
            <div className="lp-audience-card">
              <div className="lp-audience-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
                </svg>
              </div>
              <h3 className="lp-audience-title">Working professionals</h3>
              <p className="lp-audience-desc">Stay sharp on the services you use every day, or branch into a new specialisation. Spaced repetition keeps knowledge fresh without cramming sessions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Exams ── */}
      <section className="lp-section lp-section--light">
        <div className="lp-section-inner">
          <div className="lp-section-label">Supported certifications</div>
          <h2 className="lp-section-h2">Start with Azure.<br />Expand to any cloud.</h2>
          <div className="lp-exams-grid">
            {EXAMS.map(e => (
              <div
                key={e.code}
                className="lp-exam-card"
                style={{ background: `linear-gradient(135deg, ${e.from}, ${e.to})` }}
              >
                <div className="lp-exam-top">
                  <span className="lp-exam-code">{e.code}</span>
                  <span className="lp-exam-cards">
                    {examCounts ? `${examCounts[e.code] ?? 0} cards` : "… cards"}
                  </span>
                </div>
                <div className="lp-exam-name">{e.name}</div>
                <p className="lp-exam-desc">{e.desc}</p>
              </div>
            ))}
            <div className="lp-exam-card lp-exam-card--soon">
              <div className="lp-exam-top">
                <span className="lp-exam-code">AZ-400</span>
                <span className="lp-exam-soon-badge">In development</span>
              </div>
              <div className="lp-exam-name">DevOps Engineer Expert</div>
              <p className="lp-exam-desc">CI/CD pipelines, source control strategy, infrastructure as code, and dependency management.</p>
            </div>
            <div className="lp-exam-card lp-exam-card--soon">
              <div className="lp-exam-top">
                <span className="lp-exam-code">AZ-800</span>
                <span className="lp-exam-soon-badge">In development</span>
              </div>
              <div className="lp-exam-name">Windows Server Hybrid Admin</div>
              <p className="lp-exam-desc">Core infrastructure — AD DS, storage, compute, and on-premises to Azure connectivity.</p>
            </div>
            <div className="lp-exam-card lp-exam-card--soon">
              <div className="lp-exam-top">
                <span className="lp-exam-code">AZ-801</span>
                <span className="lp-exam-soon-badge">In development</span>
              </div>
              <div className="lp-exam-name">Windows Server Hybrid Advanced</div>
              <p className="lp-exam-desc">Secure, monitor, and disaster-recover hybrid Windows Server infrastructure.</p>
            </div>
            <div className="lp-exam-card lp-exam-card--soon">
              <div className="lp-exam-top">
                <span className="lp-exam-code">AWS</span>
                <span className="lp-exam-soon-badge">Coming soon</span>
              </div>
              <div className="lp-exam-name">Amazon Web Services</div>
              <p className="lp-exam-desc">Solutions Architect, SysOps, Developer, and more — in development.</p>
            </div>
            <div className="lp-exam-card lp-exam-card--soon">
              <div className="lp-exam-top">
                <span className="lp-exam-code">GCP</span>
                <span className="lp-exam-soon-badge">Coming soon</span>
              </div>
              <div className="lp-exam-name">Google Cloud Platform</div>
              <p className="lp-exam-desc">Associate Cloud Engineer, Professional Architect, and more — in development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Free vs Premium ── */}
      <section className="lp-section">
        <div className="lp-section-inner">
          <div className="lp-section-label">Pricing</div>
          <h2 className="lp-section-h2">Free to start, powerful to finish</h2>
          <div className="lp-pricing-grid">

            <div className="lp-plan lp-plan--free">
              <div className="lp-plan-header">
                <div className="lp-plan-name">Free</div>
                <div className="lp-plan-price">£0</div>
              </div>
              <ul className="lp-plan-features">
                {FREE_FEATURES.map(f => (
                  <li key={f}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="lp-plan-cta lp-plan-cta--free" onClick={onGetStarted}>Get started free</button>
            </div>

            <div className="lp-plan lp-plan--premium">
              <div className="lp-plan-badge">Coming soon</div>
              <div className="lp-plan-header">
                <div className="lp-plan-name">Premium</div>
                <div className="lp-plan-price">£9.99<span>/month</span></div>
              </div>
              <ul className="lp-plan-features">
                {PREMIUM_FEATURES.map(f => (
                  <li key={f}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="lp-plan-cta lp-plan-cta--premium" onClick={() => setShowUpgrade(true)}>Get Premium →</button>
            </div>

            <div className="lp-plan lp-plan--business">
              <div className="lp-plan-badge">Coming soon</div>
              <div className="lp-plan-header">
                <div className="lp-plan-name">Business</div>
                <div className="lp-plan-price">£4.99<span>/user/month</span></div>
              </div>
              <ul className="lp-plan-features">
                {BUSINESS_FEATURES.map(f => (
                  <li key={f}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="lp-plan-cta lp-plan-cta--business" disabled>Coming soon</button>
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="lp-footer-cta">
        <div className="lp-section-inner lp-footer-cta-inner">
          <h2 className="lp-footer-cta-h2">Ready to pass your cloud exam?</h2>
          <p className="lp-footer-cta-sub">Start studying for free today — no card required.</p>
          <button className="lp-cta-primary" onClick={onGetStarted}>
            Create free account
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <p>© {new Date().getFullYear()} KloudAce. Microsoft Azure, Amazon Web Services, and Google Cloud are trademarks of their respective owners. KloudAce is not affiliated with or endorsed by Microsoft, Amazon, or Google.</p>
        <div className="lp-footer-links">
          <button className="lp-footer-link" onClick={() => setShowAbout(true)}>About</button>
          <span className="lp-footer-sep">·</span>
          <Link className="lp-footer-link" to="/pricing">Pricing</Link>
          <span className="lp-footer-sep">·</span>
          <Link className="lp-footer-link" to="/terms">Terms of Service</Link>
          <span className="lp-footer-sep">·</span>
          <Link className="lp-footer-link" to="/privacy">Privacy Policy</Link>
          <span className="lp-footer-sep">·</span>
          <Link className="lp-footer-link" to="/refunds">Refund Policy</Link>
          <span className="lp-footer-sep">·</span>
          <Link className="lp-footer-link" to="/contact">Contact</Link>
        </div>
      </footer>

      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  );
}
