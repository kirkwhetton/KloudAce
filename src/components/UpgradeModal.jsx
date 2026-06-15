import { CrossIcon, ArrowRightIcon } from "./Icons";
import "./UpgradeModal.css";

// Set VITE_LEMON_SQUEEZY_CHECKOUT_URL in .env.local once your LemonSqueezy
// product is created. The URL looks like:
//   https://kloudace.lemonsqueezy.com/checkout/buy/<variant-id>
// Optionally append ?checkout[email]=user@email.com to pre-fill the email.
const CHECKOUT_URL = import.meta.env.VITE_LEMON_SQUEEZY_CHECKOUT_URL;

const PREMIUM_FEATURES = [
  {
    text: "Every card across all four exams — 1,000+ questions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    text: "All card types: scenario tasks, script simulators, case studies",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="9" height="9" rx="1.5"/>
        <rect x="13" y="2" width="9" height="9" rx="1.5"/>
        <rect x="2" y="13" width="9" height="9" rx="1.5"/>
        <rect x="13" y="13" width="9" height="9" rx="1.5"/>
      </svg>
    ),
  },
  {
    text: "Azure Portal Labs — hands-on simulations of real Azure workflows",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <polyline points="8 21 12 17 16 21"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
      </svg>
    ),
  },
  {
    text: "Terraform Labs — write real HCL and deploy Azure infrastructure",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    text: "All exam games: Connections, Crossword, Wordle and Word Search",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    text: "Full readiness dashboard with SRS maturity and exam scores",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
        <line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
  },
  {
    text: "Everything in Free, always",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
];

export default function UpgradeModal({ onClose, userEmail }) {
  const checkoutUrl = userEmail && CHECKOUT_URL
    ? `${CHECKOUT_URL}?checkout[email]=${encodeURIComponent(userEmail)}`
    : CHECKOUT_URL;

  const handleUpgrade = () => {
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="upgrade-overlay" onClick={onClose}>
      <div className="upgrade-modal" onClick={e => e.stopPropagation()}>
        <button className="upgrade-close" onClick={onClose} aria-label="Close"><CrossIcon /></button>

        <div className="upgrade-header">
          <span className="upgrade-crown">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </span>
          <h2 className="upgrade-title">Upgrade to Premium</h2>
          <p className="upgrade-subtitle">Unlock everything and pass faster</p>
        </div>

        <div className="upgrade-price">
          <span className="upgrade-amount">£9.99</span>
          <span className="upgrade-period">/month</span>
          <span className="upgrade-tax">incl. VAT</span>
        </div>

        <ul className="upgrade-features">
          {PREMIUM_FEATURES.map(f => (
            <li key={f.text}>
              <span className="upgrade-feature-icon">{f.icon}</span>
              <span>{f.text}</span>
            </li>
          ))}
        </ul>

        {checkoutUrl ? (
          <button className="upgrade-cta" onClick={handleUpgrade}>
            Get Premium <ArrowRightIcon />
          </button>
        ) : (
          <button className="upgrade-cta upgrade-cta--soon" disabled>
            Coming soon — check back shortly
          </button>
        )}

        <p className="upgrade-terms">
          Cancel anytime · Secure checkout by LemonSqueezy · All taxes included
        </p>
      </div>
    </div>
  );
}
