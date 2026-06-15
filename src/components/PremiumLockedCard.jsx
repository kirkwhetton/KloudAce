import { CrownIcon, LockIcon } from "./Icons";
import "./PremiumLockedCard.css";

export default function PremiumLockedCard({ card, onUpgrade }) {
  return (
    <div className="premium-card">
      <div className="premium-card-header">
        <div className="premium-card-meta">
          <span className="premium-card-category">{card.category}</span>
          {card.exam && <span className="premium-card-exam">{card.exam}</span>}
        </div>
        <span className="premium-pill"><CrownIcon /> Premium</span>
      </div>

      <div className="premium-card-preview" aria-hidden="true">
        <p className="premium-card-question-blurred">{card.question}</p>
      </div>

      <div className="premium-card-overlay">
        <span className="premium-lock-icon"><LockIcon size={32} /></span>
        <p className="premium-lock-title">Premium Content</p>
        <p className="premium-lock-desc">Upgrade to unlock all premium cards and exams.</p>
        <button className="premium-upgrade-btn" onClick={onUpgrade}>
          <CrownIcon /> Upgrade to Premium
        </button>
      </div>
    </div>
  );
}
