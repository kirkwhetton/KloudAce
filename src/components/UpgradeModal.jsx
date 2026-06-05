import "./UpgradeModal.css";

// Set VITE_LEMON_SQUEEZY_CHECKOUT_URL in .env.local once your LemonSqueezy
// product is created. The URL looks like:
//   https://kloudace.lemonsqueezy.com/checkout/buy/<variant-id>
// Optionally append ?checkout[email]=user@email.com to pre-fill the email.
const CHECKOUT_URL = import.meta.env.VITE_LEMON_SQUEEZY_CHECKOUT_URL;

const PREMIUM_FEATURES = [
  { icon: "📚", text: "Every card across all four exams — 1,000+ questions" },
  { icon: "🔬", text: "All card types: scenario tasks, script simulators, case studies" },
  { icon: "🖥️", text: "Azure Portal Labs — hands-on simulations of real Azure workflows" },
  { icon: "⚙️", text: "Terraform Labs — write real HCL and deploy Azure infrastructure" },
  { icon: "🎮", text: "All exam games: Connections, Crossword, and Wordle for every exam" },
  { icon: "📊", text: "Full readiness dashboard with SRS maturity and exam scores" },
  { icon: "♾️", text: "Everything in Free, always" },
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
        <button className="upgrade-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="upgrade-header">
          <span className="upgrade-crown">👑</span>
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
            Get Premium →
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
