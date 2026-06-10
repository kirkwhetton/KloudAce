import { Link, useNavigate } from "react-router-dom";
import { TermsContent, PrivacyContent, RefundContent } from "../components/legalContent";
import "../components/LegalModal.css";
import "./LandingPage.css";

const TITLES = {
  terms: "Terms of Service",
  privacy: "Privacy Policy",
  refunds: "Refund Policy",
};

export default function LegalPage({ tab }) {
  const navigate = useNavigate();
  const goToApp = () => navigate("/");

  return (
    <div className="lp-root">
      {/* ── Nav ── */}
      <nav className="lp-nav">
        <Link to="/" className="lp-nav-brand">Kloud<span className="lp-nav-brand-ace">Ace</span></Link>
        <button className="lp-nav-login" onClick={goToApp}>Log in</button>
      </nav>

      {/* ── Legal content ── */}
      <section className="lp-section lp-section--mission">
        <div className="lp-section-inner">
          <div className="lp-section-label">Legal</div>
          <h2 className="lp-section-h2">{TITLES[tab]}</h2>
          <div className="legal-page-tabs">
            <Link className={`legal-page-tab${tab === "terms" ? " active" : ""}`} to="/terms">Terms of Service</Link>
            <Link className={`legal-page-tab${tab === "privacy" ? " active" : ""}`} to="/privacy">Privacy Policy</Link>
            <Link className={`legal-page-tab${tab === "refunds" ? " active" : ""}`} to="/refunds">Refund Policy</Link>
          </div>
          <div className="legal-page-content">
            {tab === "terms" ? <TermsContent /> : tab === "privacy" ? <PrivacyContent /> : <RefundContent />}
          </div>
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
          <a className="lp-footer-link" href="mailto:hello@kloudace.com">Contact</a>
        </div>
      </footer>
    </div>
  );
}
