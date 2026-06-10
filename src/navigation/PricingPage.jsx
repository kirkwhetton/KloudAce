import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadExamCardCounts } from "../lib/cardLoader";
import LegalModal from "../components/LegalModal";
import UpgradeModal from "../components/UpgradeModal";
import "./LandingPage.css";

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

export default function PricingPage() {
  const navigate = useNavigate();
  const [examCounts, setExamCounts] = useState(null);
  const [legal, setLegal] = useState(null); // "terms" | "privacy" | null
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    loadExamCardCounts().then(c => { if (c) setExamCounts(c); });
  }, []);

  const totalCards = examCounts
    ? Object.values(examCounts).reduce((s, n) => s + n, 0)
    : null;

  const totalLabel = totalCards
    ? `${Math.floor(totalCards / 100) * 100}+`
    : "1000+";

  const goToApp = () => navigate("/");

  return (
    <div className="lp-root">
      {/* ── Nav ── */}
      <nav className="lp-nav">
        <Link to="/" className="lp-nav-brand">Kloud<span className="lp-nav-brand-ace">Ace</span></Link>
        <button className="lp-nav-login" onClick={goToApp}>Log in</button>
      </nav>

      {/* ── Pricing ── */}
      <section className="lp-section lp-section--mission">
        <div className="lp-section-inner">
          <div className="lp-section-label">Pricing</div>
          <h2 className="lp-section-h2">Free to start, powerful to finish</h2>
          <p className="lp-mission-body" style={{ marginBottom: "2.5rem" }}>
            {totalLabel} questions across {Object.keys(examCounts ?? {}).length || 4} Azure certifications — start studying for free, no card required.
          </p>
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
              <button className="lp-plan-cta lp-plan-cta--free" onClick={goToApp}>Get started free</button>
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

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <p>© {new Date().getFullYear()} KloudAce. Microsoft Azure, Amazon Web Services, and Google Cloud are trademarks of their respective owners. KloudAce is not affiliated with or endorsed by Microsoft, Amazon, or Google.</p>
        <div className="lp-footer-links">
          <Link className="lp-footer-link" to="/">Home</Link>
          <span className="lp-footer-sep">·</span>
          <button className="lp-footer-link" onClick={() => setLegal("terms")}>Terms of Service</button>
          <span className="lp-footer-sep">·</span>
          <button className="lp-footer-link" onClick={() => setLegal("privacy")}>Privacy Policy</button>
          <span className="lp-footer-sep">·</span>
          <a className="lp-footer-link" href="mailto:hello@kloudace.com">Contact</a>
        </div>
      </footer>

      {legal && <LegalModal initialTab={legal} onClose={() => setLegal(null)} />}
      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
    </div>
  );
}
