import { useState, useRef } from "react";
import "./multichoice.css";
import "./multiselect.css";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MultiSelect({ card, onKnow, onSrsRate, hideAnswers, examMode, onExamAnswer }) {
  const [selected, setSelected] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);

  // Compute shuffle during render, cached in a ref keyed by card+reviewCount.
  // Using a ref (not useMemo/useState) bypasses React's optimisation layer entirely.
  const shuffleCacheRef = useRef({ key: null, choices: [] });
  const cacheKey = `${card.id}-${reviewCount}`;
  if (shuffleCacheRef.current.key !== cacheKey) {
    shuffleCacheRef.current = { key: cacheKey, choices: shuffle(card.choices) };
  }
  const shuffledChoices = shuffleCacheRef.current.choices;

  const correctSet = new Set(card.correctAnswers);
  const totalCorrect = correctSet.size;

  const toggle = (choice) => {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(choice) ? next.delete(choice) : next.add(choice);
      return next;
    });
  };

  const handleSubmit = () => {
    if (selected.size === 0) return;
    setSubmitted(true);
    if (examMode) {
      const correct = selected.size === correctSet.size && [...selected].every(s => correctSet.has(s));
      onExamAnswer({ card, correct, given: [...selected].join(", "), expected: [...correctSet].join(", ") });
    }
  };

  const handleReview = () => {
    setSelected(new Set());
    setSubmitted(false);
    setReviewCount(c => c + 1);
  };

  const isFullyCorrect =
    submitted &&
    selected.size === correctSet.size &&
    [...selected].every((s) => correctSet.has(s));

  const getButtonClass = (choice) => {
    const isSelected = selected.has(choice);
    const isCorrect = correctSet.has(choice);
    if (!submitted) return `choice-btn ms-btn${isSelected ? " ms-selected" : ""}`;
    if (examMode || hideAnswers) return `choice-btn ms-btn${isSelected ? " ms-selected" : " dimmed"}`;
    if (isCorrect && isSelected) return "choice-btn correct";
    if (isCorrect && !isSelected) return "choice-btn ms-missed";
    if (!isCorrect && isSelected) return "choice-btn wrong";
    return "choice-btn dimmed";
  };

  return (
    <div className="mcq-card">
      <div className="card-meta">
        <span className="mcq-category">{card.category}</span>
        <span className={`difficulty-badge difficulty-badge--${card.difficulty}`}>{card.difficulty}</span>
      </div>
      <div className="ms-header">
        <p className="mcq-question">{card.question}</p>
        <span className="ms-instruction">Select {totalCorrect} answers</span>
      </div>

      <div className="mcq-choices">
        {shuffledChoices.map((choice, i) => (
          <button
            key={i}
            className={getButtonClass(choice)}
            onClick={() => toggle(choice)}
          >
            <span className={`ms-checkbox${selected.has(choice) ? " checked" : ""}${submitted && correctSet.has(choice) ? " correct-box" : ""}`}>
              {selected.has(choice) ? "✓" : ""}
            </span>
            {choice}
          </button>
        ))}
      </div>

      {!submitted && (
        <div className="ms-submit-row">
          <span className="ms-count">{selected.size} / {totalCorrect} selected</span>
          <button
            className="btn btn-know ms-submit-btn"
            onClick={handleSubmit}
            disabled={selected.size === 0}
          >
            Submit →
          </button>
        </div>
      )}

      {submitted && !examMode && (
        <div className={`mcq-feedback ${isFullyCorrect ? "feedback-correct" : "feedback-wrong"}`}>
          <p className="feedback-text">
            {isFullyCorrect ? <><span className="known-check">✓</span> Perfect!</> : "❌ Not quite"}
            {!hideAnswers && <> — {card.answer}</>}
          </p>
          {!hideAnswers && card.explanation && (
            <div className="mcq-explanation">
              <span className="explanation-label">💡 Explanation</span>
              <p>{card.explanation}</p>
            </div>
          )}
          {!hideAnswers && card.learnUrl && (
            <a className="learn-more-link" href={card.learnUrl} target="_blank" rel="noopener noreferrer">
              📖 Learn more on Microsoft Learn
            </a>
          )}
          {hideAnswers && (
            <p className="hide-answers-notice">🙈 Answer hidden — toggle off in ⚙️ Settings to see explanations</p>
          )}
          <div className="mcq-actions">
            <button className="btn btn-review" onClick={handleReview}>🔁 Review Again</button>
            {onSrsRate ? (
              <button className="btn btn-know" onClick={() => onSrsRate(isFullyCorrect ? 3 : 1)}>
                Continue →
              </button>
            ) : (
              <button className="btn btn-know" onClick={onKnow}><span className="known-check">✓</span> Next Card</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
