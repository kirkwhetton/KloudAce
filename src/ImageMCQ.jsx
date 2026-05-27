import { useState, useMemo, createElement } from "react";
import "./multichoice.css";
import "./imagemcq.css";

function reconstructElement(node) {
  if (node === null || node === undefined || typeof node !== "object") return node;
  if (Array.isArray(node)) return node.map(reconstructElement);
  if (typeof node.type === "string" && node.props !== undefined) {
    const { children, ...restProps } = node.props;
    if (children === undefined) return createElement(node.type, restProps);
    const recon = Array.isArray(children) ? children.map(reconstructElement) : reconstructElement(children);
    return createElement(node.type, restProps, recon);
  }
  return node;
}

function renderDiagram(diagram) {
  if (typeof diagram === "string") return <div dangerouslySetInnerHTML={{ __html: diagram }} style={{ width: "100%" }} />;
  if (typeof diagram === "function") return diagram();
  if (diagram && typeof diagram === "object" && typeof diagram.type === "string") return reconstructElement(diagram);
  return diagram;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ImageMCQ({ card, onKnow, onSrsRate, hideAnswers, examMode, onExamAnswer, onAnswer }) {
  const [selected, setSelected] = useState(null);

  const shuffledChoices = useMemo(() => shuffle(card.choices), [card.id]);
  const correctText = card.choices[card.correctAnswer];
  const hasAnswered = selected !== null;
  const isCorrect = hasAnswered && shuffledChoices[selected] === correctText;

  const handleSelect = (i) => {
    if (!hasAnswered) {
      setSelected(i);
      const correct = shuffledChoices[i] === correctText;
      onAnswer?.(correct);
      if (examMode) {
        onExamAnswer({ card, correct, given: shuffledChoices[i], expected: correctText });
      }
    }
  };
  const handleReview = () => setSelected(null);  const getButtonClass = (i) => {
    if (!hasAnswered) return "choice-btn";
    if (examMode || hideAnswers) return i === selected ? "choice-btn ms-selected" : "choice-btn dimmed";
    if (shuffledChoices[i] === correctText) return "choice-btn correct";
    if (i === selected) return "choice-btn wrong";
    return "choice-btn dimmed";
  };

  return (    <div className="mcq-card image-mcq-card">
      <div className="image-mcq-top"><div className="card-meta"><span className="mcq-category">{card.category}</span><span className={`difficulty-badge difficulty-badge--${card.difficulty}`}>{card.difficulty}</span></div>
      </div>

      <p className="mcq-question-header">{card.question_header}</p>

      <div className="image-mcq-diagram" aria-label={card.imageAlt}>
        {renderDiagram(card.diagram)}
      </div>

      <p className="imcq-question-footer">{card.question_footer ?? card.question}</p>

      <div className="mcq-choices">
        {shuffledChoices.map((choice, i) => (
          <button key={i} className={getButtonClass(i)} onClick={() => handleSelect(i)}>
            <span className="choice-letter">{String.fromCharCode(65 + i)}</span>
            {choice}
          </button>
        ))}
      </div>      {hasAnswered && !examMode && (
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
      {!card.id?.toString().startsWith("CUSTOM:") && <span className="card-id-badge">#{card.id}</span>}
    </div>
  );
}
