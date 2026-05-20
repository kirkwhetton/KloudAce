// 📦 We import useState from React.
// useState lets a component "remember" a value between renders.
// Here we'll use it to remember which answer the user clicked.
import { useState, useMemo } from "react";
import "./multichoice.css";

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function MultipleChoice({ card, onKnow, onSrsRate, hideAnswers, examMode, onExamAnswer }) {
  const [selected, setSelected] = useState(null);

  // Shuffle choices once when the card mounts (card.id change = new card).
  // We track the correct answer by its TEXT so the shuffle doesn't break it.
  const shuffledChoices = useMemo(
    () => shuffle(card.choices),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [card.id]
  );

  const correctText = card.choices[card.correctAnswer];
  const hasAnswered = selected !== null;
  const isCorrect = selected !== null && shuffledChoices[selected] === correctText;
  const handleSelect = (i) => {
    if (!hasAnswered) {
      setSelected(i);
      if (examMode) {
        const correct = shuffledChoices[i] === correctText;
        onExamAnswer({ card, correct, given: shuffledChoices[i], expected: correctText });
      }
    }
  };
  const handleReview = () => setSelected(null);
  const getButtonClass = (i) => {
    if (!hasAnswered) return "choice-btn";
    if (examMode || hideAnswers) return i === selected ? "choice-btn ms-selected" : "choice-btn dimmed";
    if (shuffledChoices[i] === correctText) return "choice-btn correct";
    if (i === selected) return "choice-btn wrong";
    return "choice-btn dimmed";
  };
  // 💡 JSX looks like HTML but it's actually JavaScript.
  // Curly braces {} let you drop back into JS inside JSX.
  const [scenarioOpen, setScenarioOpen] = useState(true);

  return (
    <div className="mcq-card">
      {/* Category badge— just displaying data from the card prop */}
      <div className="card-meta">
        <span className="mcq-category">{card.category}</span>
        <span className={`difficulty-badge difficulty-badge--${card.difficulty}`}>{card.difficulty}</span>
        {card.scenario && <span className="case-study-badge">Case Study</span>}
      </div>

      {/* Case study scenario — collapsible */}
      {card.scenario && (
        <div className="case-study-scenario">
          <button
            className="scenario-toggle"
            onClick={() => setScenarioOpen(o => !o)}
            aria-expanded={scenarioOpen}
          >
            <span className="scenario-toggle-icon">{scenarioOpen ? "▾" : "▸"}</span>
            Scenario
          </button>
          {scenarioOpen && (
            <div className="scenario-body">
              <pre className="scenario-text">{card.scenario}</pre>
            </div>
          )}
        </div>
      )}

      {/* The question text */}
      <p className="mcq-question">{card.question}</p>

      {/* .map() turns the choices array into an array of <button> elements.
          React needs a unique "key" on each item in a list — we use the index i. */}      <div className="mcq-choices">
        {shuffledChoices.map((choice, i) => (
          <button
            key={i}
            className={getButtonClass(i)}
            onClick={() => handleSelect(i)}
          >
            {/* Letters A B C D for each option */}
            <span className="choice-letter">
              {String.fromCharCode(65 + i)}
            </span>
            {choice}
          </button>
        ))}
      </div>

      {/* Conditional rendering — only show this block AFTER an answer is picked.
          The && operator means: "if hasAnswered is true, render what's on the right" */}      {hasAnswered && !examMode && (
        <div className={`mcq-feedback ${isCorrect ? "feedback-correct" : "feedback-wrong"}`}>
          <p className="feedback-text">
            {isCorrect ? <><span className="known-check">✓</span> Correct!</> : "❌ Not quite"}
            {!hideAnswers && <> — {card.answer}</>}
          </p>          {!hideAnswers && card.explanation && (
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
          )}          <div className="mcq-actions">
            <button className="btn btn-review" onClick={handleReview}>
              🔁 Review Again
            </button>
            {onSrsRate ? (
              <button className="btn btn-know" onClick={() => onSrsRate(isCorrect ? 3 : 1)}>
                Continue →
              </button>
            ) : (              <button className="btn btn-know" onClick={onKnow}>
                <span className="known-check">✓</span> Next Card
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MultipleChoice;
