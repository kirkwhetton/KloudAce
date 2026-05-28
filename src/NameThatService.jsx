import { useState, useEffect, useRef } from "react";
import "./NameThatService.css";

function normalize(s) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export default function NameThatService({ card, onKnow, onSrsRate }) {
  const [input, setInput]     = useState("");
  const [status, setStatus]   = useState("idle"); // idle | wrong | correct | revealed
  const [attempts, setAttempts] = useState(0);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const answers = card.answers ?? [];

  const handleNext = () => {
    if (onSrsRate) {
      onSrsRate(status === "correct" && attempts === 0 ? 5 : status === "correct" ? 3 : 1);
    } else {
      onKnow();
    }
  };

  useEffect(() => {
    if (status !== "correct") return;
    const t = setTimeout(handleNext, 1400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const submit = () => {
    if (!input.trim() || shaking) return;
    const isCorrect = answers.some(a => normalize(a) === normalize(input));
    if (isCorrect) {
      setStatus("correct");
    } else {
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setInput("");
        setAttempts(a => a + 1);
        setStatus("wrong");
        inputRef.current?.focus();
      }, 450);
    }
  };

  const done = status === "correct" || status === "revealed";
  const showHint = card.hint && attempts >= 2 && !done;

  return (
    <div className="nameit-card">
      <div className="card-meta">
        <span className="mcq-category">{card.category}</span>
        <span className={`difficulty-badge difficulty-badge--${card.difficulty}`}>{card.difficulty}</span>
      </div>

      <p className="nameit-prompt">{card.prompt}</p>

      {showHint && <p className="nameit-hint">Hint: {card.hint}</p>}

      {!done && (
        <input
          ref={inputRef}
          className={[
            "nameit-input",
            shaking            && "nameit-input--shake",
            status === "wrong" && "nameit-input--wrong",
          ].filter(Boolean).join(" ")}
          type="text"
          placeholder="Type the service name…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          disabled={shaking}
          autoComplete="off"
        />
      )}

      {status === "correct" && (
        <div className="nameit-feedback nameit-feedback--correct">
          <div className="nameit-feedback-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="17" height="17" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Correct!
          </div>
          {answers.length > 1 && (
            <p className="nameit-feedback-accepted">Also accepted: {answers.filter(a => normalize(a) !== normalize(input)).join(", ")}</p>
          )}
        </div>
      )}

      {status === "revealed" && (
        <div className="nameit-feedback nameit-feedback--revealed">
          <div className="nameit-feedback-row">Answer: {answers[0]}</div>
          {answers.length > 1 && (
            <p className="nameit-feedback-accepted">Also accepted: {answers.slice(1).join(", ")}</p>
          )}
        </div>
      )}

      {status === "wrong" && (
        <div className="nameit-feedback nameit-feedback--wrong">
          <div className="nameit-feedback-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Not quite — try again
          </div>
        </div>
      )}

      <div className="nameit-controls">
        {!done && (
          <>
            <button className="nameit-btn nameit-btn--ghost" onClick={() => { setStatus("revealed"); setAttempts(a => a + 1); }}>
              Reveal answer
            </button>
            <button className="nameit-btn nameit-btn--primary" onClick={submit} disabled={!input.trim() || shaking}>
              Submit
            </button>
          </>
        )}
        {status === "revealed" && (
          <button className="nameit-btn nameit-btn--primary" onClick={handleNext}>Next →</button>
        )}
      </div>

      {!card.id?.toString().startsWith("CUSTOM:") && <span className="card-id-badge">#{card.id}</span>}
    </div>
  );
}
