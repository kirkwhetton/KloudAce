import { Link, useNavigate } from "react-router-dom";
import { CONTACT_EMAIL } from "../components/legalContent";
import "./LandingPage.css";

const REASONS = [
  {
    title: "Bug reports",
    desc: "Something broken or not working as expected? Let us know what happened and we'll dig in.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="8" y="6" width="8" height="14" rx="4"/><path d="M19 7l-3 2M5 7l3 2M19 19l-3-2M5 19l3-2M12 6V3M9 3h6"/>
      </svg>
    ),
  },
  {
    title: "Feature ideas",
    desc: "Got a suggestion for a new exam, card type, or feature? We're actively shaping the roadmap.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2.05V17h6v-2.25c0-.85.4-1.55 1-2.05A7 7 0 0 0 12 2z"/>
      </svg>
    ),
  },
  {
    title: "Account & billing",
    desc: "Questions about your account, subscription, or a charge? Reach out and we'll sort it out.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
];

export default function ContactPage() {
  const navigate = useNavigate();
  const goToApp = () => navigate("/");

  return (
    <div className="lp-root">
      {/* ── Nav ── */}
      <nav className="lp-nav">
        <Link to="/" className="lp-nav-brand">Kloud<span className="lp-nav-brand-ace">Ace</span></Link>
        <span className="lp-nav-beta">Beta</span>
        <button className="lp-nav-login" onClick={goToApp}>Log in</button>
      </nav>

      {/* ── Contact content ── */}
      <section className="lp-section lp-section--mission">
        <div className="lp-section-inner lp-contact-inner">
          <div className="lp-section-label">Contact</div>
          <h2 className="lp-section-h2">Get in touch</h2>
          <p className="lp-mission-body lp-contact-intro">
            Got a question, found a bug, or want to suggest a feature? We'd love to hear from you — drop us an email and we'll get back to you as soon as we can.
          </p>

          <div className="lp-contact-grid">
            {REASONS.map(r => (
              <div className="lp-contact-card" key={r.title}>
                <div className="lp-contact-icon">{r.icon}</div>
                <h3 className="lp-contact-card-title">{r.title}</h3>
                <p className="lp-contact-card-desc">{r.desc}</p>
              </div>
            ))}
          </div>

          <a className="lp-contact-cta" href={`mailto:${CONTACT_EMAIL}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            {CONTACT_EMAIL}
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <p>© {new Date().getFullYear()} KloudAce. Microsoft Azure, Amazon Web Services, and Google Cloud are trademarks of their respective owners. KloudAce is not affiliated with or endorsed by Microsoft, Amazon, or Google.</p>
        <div className="lp-footer-links">
          <Link className="lp-footer-link" to="/">Home</Link>
          <span className="lp-footer-sep">·</span>
          <Link className="lp-footer-link" to="/pricing">Pricing</Link>
          <span className="lp-footer-sep">·</span>
          <Link className="lp-footer-link" to="/refunds">Refund Policy</Link>
          <span className="lp-footer-sep">·</span>
          <Link className="lp-footer-link" to="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
