import { useState } from "react";
import "./hotspot.css";

export default function Hotspot({ card, onKnow, onSrsRate, hideAnswers, examMode, onExamAnswer }) {
  const [selectedZone, setSelectedZone] = useState(null);
  const [hoveredZone, setHoveredZone] = useState(null);

  const hasAnswered = selectedZone !== null;
  const isCorrect = hasAnswered && selectedZone === card.correctZone;

  const handleZoneClick = (zoneId) => {
    if (hasAnswered) return;
    setSelectedZone(zoneId);
    if (examMode) {
      const correct = zoneId === card.correctZone;
      const zone = card.zones.find(z => z.id === zoneId);
      const correctZone = card.zones.find(z => z.id === card.correctZone);
      onExamAnswer({ card, correct, given: zone?.label, expected: correctZone?.label });
    }
  };

  const getZoneFill = (zoneId) => {
    if (!hasAnswered) return hoveredZone === zoneId ? "rgba(0,120,212,0.12)" : "transparent";
    if (examMode || hideAnswers) return zoneId === selectedZone ? "rgba(99,102,241,0.2)" : "transparent";
    if (zoneId === card.correctZone) return "rgba(34,197,94,0.2)";
    if (zoneId === selectedZone) return "rgba(239,68,68,0.2)";
    return "transparent";
  };


  const correctZoneLabel = card.zones.find(z => z.id === card.correctZone)?.label;

  return (
    <div className="hotspot-card">
      <div className="hotspot-top">
        <div className="card-meta">
          <span className="mcq-category">{card.category}</span>
          <span className={`difficulty-badge difficulty-badge--${card.difficulty}`}>{card.difficulty}</span>
        </div>
      </div>

      <p className="hotspot-question">{card.question}</p>

      <div className="hotspot-diagram-wrap" aria-label={card.imageAlt}>
        <div className="hotspot-diagram-base">{card.diagram}</div>
        <svg
          className="hotspot-overlay"
          viewBox={card.viewBox}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {card.zones.map((zone) => (
            <rect
              key={zone.id}
              x={zone.x}
              y={zone.y}
              width={zone.width}
              height={zone.height}
              rx={8}
              fill={getZoneFill(zone.id)}
              stroke="none"
              style={{ cursor: hasAnswered ? "default" : "pointer", transition: "fill 0.15s, stroke 0.15s" }}
              onClick={() => handleZoneClick(zone.id)}
              onMouseEnter={() => !hasAnswered && setHoveredZone(zone.id)}
              onMouseLeave={() => setHoveredZone(null)}
            />
          ))}
        </svg>
      </div>

      {!hasAnswered && (
        <p className="hotspot-hint">Click the correct component in the diagram.</p>
      )}

      {hasAnswered && !examMode && (
        <div className={`mcq-feedback ${isCorrect ? "feedback-correct" : "feedback-wrong"}`}>
          <p className="feedback-text">
            {isCorrect
              ? <><span className="known-check">✓</span> Correct!</>
              : <>❌ Not quite — <strong>{correctZoneLabel}</strong> was the correct component</>
            }
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
            <button className="btn btn-review" onClick={() => setSelectedZone(null)}>🔁 Review Again</button>
            {onSrsRate ? (
              <button className="btn btn-know" onClick={() => onSrsRate(isCorrect ? 3 : 1)}>Continue →</button>
            ) : (
              <button className="btn btn-know" onClick={onKnow}><span className="known-check">✓</span> Next Card</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
