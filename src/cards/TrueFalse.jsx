import { useState } from "react";
import "./truefalse.css";

export default function TrueFalse({ card, onKnow, onSrsRate, hideAnswers, examMode, onExamAnswer, onAnswer }) {
  const [selected, setSelected] = useState(null); // true | false | null
  const [reviewed, setReviewed] = useState(false);

  const hasAnswered = selected !== null;
  const isCorrect = hasAnswered && selected === card.answer;
  const handlePick = (val) => {
    if (hasAnswered) return;
    setSelected(val);
    onAnswer?.(val === card.answer);
    if (examMode) {
      onExamAnswer({ card, correct: val === card.answer, given: val ? "True" : "False", expected: card.answer ? "True" : "False" });
    }
  };

  const handleReview = () => {
    setSelected(null);
    setReviewed(false);
  };
  const getClass = (val) => {    if (!hasAnswered) return `tf-btn tf-btn-${val ? "true" : "false"}`;
    if (examMode || hideAnswers) return `tf-btn tf-btn-${val ? "true" : "false"}${val === selected ? " ms-selected" : ""}`;
    if (val === card.answer) return `tf-btn tf-btn-${val ? "true" : "false"} tf-correct`;
    if (val === selected)    return `tf-btn tf-btn-${val ? "true" : "false"} tf-wrong`;
    return `tf-btn tf-btn-${val ? "true" : "false"} tf-dimmed`;
  };

  const badgeId = !card.id?.toString().startsWith("CUSTOM:") ? card.id : null;
  return (    <div className="mcq-card tf-card">
      <div className="tf-top"><div className="card-meta"><span className="mcq-category">{card.category}</span><span className={`difficulty-badge difficulty-badge--${card.difficulty}`}>{card.difficulty}</span></div>
      </div>

      <p className="mcq-question">{card.question}</p>

      <div className="tf-choices">
        <button className={getClass(true)}  onClick={() => handlePick(true)}>
          <span className="tf-icon">✓</span> True
        </button>
        <button className={getClass(false)} onClick={() => handlePick(false)}>
          <span className="tf-icon">✕</span> False
        </button>
      </div>      {hasAnswered && !examMode && (
        <div className={`mcq-feedback ${isCorrect ? "feedback-correct" : "feedback-wrong"}`}>          <p className="feedback-text">
            {isCorrect ? <><span className="known-check">✓</span> Correct!</> : `❌ The answer is ${card.answer ? "True" : "False"}`}
            {!hideAnswers && <> — {card.answer ? "True." : "False."} {card.explanation}</>}
          </p>
          {!hideAnswers && card.learnUrl && (
            <a className="learn-more-link" href={card.learnUrl} target="_blank" rel="noopener noreferrer">
              📖 Learn more on Microsoft Learn
            </a>
          )}
          {hideAnswers && (
            <p className="hide-answers-notice">🙈 Answer hidden — toggle off in ⚙️ Settings to see explanations</p>
          )}            <div className="mcq-actions">
            <button className="btn btn-review" onClick={handleReview}>🔁 Review Again</button>
            {onSrsRate ? (
              <button className="btn btn-know" onClick={() => onSrsRate(isCorrect ? 3 : 1)}>
                Continue →
              </button>
            ) : (
              <button className="btn btn-know" onClick={onKnow}><span className="known-check">✓</span> Next Card</button>
            )}
          </div>
        </div>
      )}
      {badgeId && <span className="card-id-badge">#{badgeId}</span>}
    </div>
  );
}
