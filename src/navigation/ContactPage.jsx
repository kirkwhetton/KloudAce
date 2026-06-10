import { Link, useNavigate } from "react-router-dom";
import { CONTACT_EMAIL } from "../components/legalContent";
import "../components/LegalModal.css";
import "./LandingPage.css";

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
        <div className="lp-section-inner">
          <div className="lp-section-label">Contact</div>
          <h2 className="lp-section-h2">Get in touch</h2>
          <div className="legal-body">
            <p>
              Got a question, found a bug, or want to suggest a feature? We'd love to hear from you.
            </p>
            <p>
              Email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we'll get back to you as soon as we can.
            </p>
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
          <Link className="lp-footer-link" to="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
