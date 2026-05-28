import { useState, useEffect, useRef, useCallback } from "react";
import QUESTIONS from "./games/nameThatServiceData";
import "./NameThatService.css";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(s) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" aria-hidden="true">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

export default function NameThatService({ onBack }) {
  const [questions]  = useState(() => shuffle(QUESTIONS));
  const [index, setIndex]     = useState(0);
  const [input, setInput]     = useState("");
  const [status, setStatus]   = useState("idle"); // idle | wrong | correct | revealed
  const [attempts, setAttempts] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [score, setScore]     = useState(0);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef(null);

  const q = questions[index];
  const total = questions.length;

  useEffect(() => {
    if (status === "idle") inputRef.current?.focus();
  }, [status, index]);

  // Auto-advance after correct answer
  useEffect(() => {
    if (status !== "correct") return;
    const t = setTimeout(() => advance(), 1400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const advance = useCallback(() => {
    if (index + 1 >= total) {
      setFinished(true);
    } else {
      setIndex(i => i + 1);
      setInput("");
      setStatus("idle");
      setAttempts(0);
    }
  }, [index, total]);

  const submit = () => {
    if (!input.trim() || shaking) return;
    const isCorrect = q.answers.some(a => normalize(a) === normalize(input));
    if (isCorrect) {
      if (attempts === 0) setScore(s => s + 1);
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

  const reveal = () => {
    setStatus("revealed");
    setAttempts(a => a + 1);
  };

  const restart = () => {
    setIndex(0);
    setInput("");
    setStatus("idle");
    setAttempts(0);
    setScore(0);
    setFinished(false);
  };

  const done = status === "correct" || status === "revealed";
  const showHint = q.hint && attempts >= 2 && !done;

  const pct = Math.round((index / total) * 100);

  if (finished) {
    const perfect = score === total;
    return (
      <div className="nts-shell">
        <div className="nts-card nts-end">
          <div className="nts-end-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="52" height="52" aria-hidden="true">
              <path d="M8 21h8M12 17v4M7 4H4a2 2 0 0 0-2 2v1c0 2.5 1.5 4.6 3.5 5.5"/>
              <path d="M17 4h3a2 2 0 0 1 2 2v1c0 2.5-1.5 4.6-3.5 5.5"/>
              <path d="M7 4h10v9a5 5 0 0 1-10 0V4z"/>
            </svg>
          </div>
          <h2 className="nts-end-title">{perfect ? "Perfect score!" : "Game complete!"}</h2>
          <div className="nts-end-score">{score}<span style={{ fontSize: "1.5rem", opacity: 0.5 }}>/{total}</span></div>
          <p className="nts-end-sub">First-attempt correct answers</p>
          <div className="nts-end-actions">
            <button className="nts-btn nts-btn--ghost" onClick={onBack}>Back to Games</button>
            <button className="nts-btn nts-btn--primary" onClick={restart}>Play Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nts-shell">
      <div className="nts-header">
        <button className="nts-back-btn" onClick={onBack}><Chevron /> Games</button>
        <span className="nts-title">Name That Service</span>
        <span className="nts-progress-label">{index + 1} / {total}</span>
      </div>

      <div className="nts-progress-bar-wrap">
        <div className="nts-progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="nts-card">
        <div className="nts-difficulty">
          <span className={`difficulty-badge difficulty-badge--${q.difficulty}`}>{q.difficulty}</span>
        </div>

        <p className="nts-prompt">{q.prompt}</p>

        {showHint && <p className="nts-hint">Hint: {q.hint}</p>}

        {!done && (
          <input
            ref={inputRef}
            className={[
              "nts-input",
              shaking        && "nts-input--shake",
              status === "wrong" && "nts-input--wrong",
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
          <div className="nts-feedback nts-feedback--correct">
            <div className="nts-feedback-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="17" height="17" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Correct!
            </div>
            {q.answers.length > 1 && (
              <p className="nts-feedback-accepted">Also accepted: {q.answers.filter(a => normalize(a) !== normalize(input)).join(", ")}</p>
            )}
          </div>
        )}

        {status === "revealed" && (
          <div className="nts-feedback nts-feedback--revealed">
            <div className="nts-feedback-row">Answer: {q.answers[0]}</div>
            {q.answers.length > 1 && (
              <p className="nts-feedback-accepted">Also accepted: {q.answers.slice(1).join(", ")}</p>
            )}
          </div>
        )}

        {status === "wrong" && (
          <div className="nts-feedback nts-feedback--wrong">
            <div className="nts-feedback-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Not quite — try again
            </div>
          </div>
        )}

        <div className="nts-controls">
          {!done && (
            <>
              <button className="nts-btn nts-btn--ghost" onClick={reveal}>Reveal answer</button>
              <button className="nts-btn nts-btn--primary" onClick={submit} disabled={!input.trim() || shaking}>
                Submit
              </button>
            </>
          )}
          {status === "revealed" && (
            <button className="nts-btn nts-btn--primary" onClick={advance}>Next →</button>
          )}
        </div>

        <div className="nts-score-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span className="nts-score-correct">{score}</span>
          <span>correct so far</span>
        </div>
      </div>
    </div>
  );
}
