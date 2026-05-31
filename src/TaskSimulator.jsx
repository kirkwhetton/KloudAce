import { useState, useRef, useEffect } from "react";
import "./tasksimulator.css";

/**
 * TaskSimulator — interactive fill-in / command-builder card type.
 *
 * Card shape (type: "task"):
 * {
 *   id, exam, category, question,
 *   explanation: string,
 *   taskType: "fill-in" | "order" | "match",
 *
 *   // fill-in: one or more blanks to complete
 *   blanks: [{ label: string, answer: string, hint?: string }],
 *
 *   // order: drag-free ordering — user clicks to build sequence
 *   steps?: string[],          // correct order
 *
 *   // match: left-hand items paired to right-hand ite          {!hideAnswers && (
            <ul className="token-check-list">
              {finalTokenResults.map(({ label, ok }) => (
                <li key={label} className={ok ? "token-ok" : "token-missing"}>
                  {ok ? "✓" : "✕"} <code>{label}</code>
                </li>
              ))}
            </ul>
          )}pairs?: { left: string, right: string }[],
 * }
 */
export default function TaskSimulator({ card, onKnow, onSrsRate, hideAnswers, examMode, onExamAnswer, onAnswer }) {
  const props = { card, onKnow, onSrsRate, hideAnswers, examMode, onExamAnswer, onAnswer };
  const Inner =
    card.taskType === "order"  ? <OrderTask  {...props} /> :
    card.taskType === "match"  ? <MatchTask  {...props} /> :
    card.taskType === "script" ? <ScriptTask {...props} /> :
    card.taskType === "fault"  ? <FaultTask  {...props} /> :
                                 <FillInTask {...props} />;
  return (
    <div className={`task-simulator-shell${card.taskType === "script" ? " task-simulator-shell--wide" : ""}`}>
      {Inner}
      <span className="card-id-badge">#{card.id}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FILL-IN TASK
   User types the answer for each blank.
───────────────────────────────────────────── */
function FillInTask({ card, onKnow, onSrsRate, hideAnswers, examMode, onExamAnswer, onAnswer }) {
  const [values, setValues]     = useState(() => card.blanks.map(() => ""));
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed]  = useState(false);

  const normalize = (s) => s.trim().toLowerCase().replace(/\s+/g, " ");

  const results = card.blanks.map((b, i) => normalize(values[i]) === normalize(b.answer));
  const allCorrect = results.every(Boolean);

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    onAnswer?.(allCorrect);
    if (examMode) {
      onExamAnswer({ card, correct: allCorrect, given: values.join(", "), expected: card.blanks.map(b => b.answer).join(", ") });
    }
  };

  const handleReveal = () => setRevealed(true);

  const handleRetry = () => {
    setValues(card.blanks.map(() => ""));
    setSubmitted(false);
    setRevealed(false);
  };

  const handleNext = () => onSrsRate ? onSrsRate(allCorrect ? 3 : 1) : onKnow();

  return (
    <div className="task-card">
      <div className="task-header">
        <div className="card-meta">
          <span className="task-category">{card.category}</span>
          <span className={`difficulty-badge difficulty-badge--${card.difficulty}`}>{card.difficulty}</span>
        </div>
        <span className="task-type-badge">⌨️ Fill In</span>
      </div>

      <p className="task-question">{card.question}</p>

      <div className="task-blanks">
        {card.blanks.map((blank, i) => (
          <div key={i} className="task-blank-row">
            <label className="task-blank-label">{blank.label}</label>
            <div className="task-blank-input-wrap">
              <input
                className={`task-input${submitted ? (results[i] ? " input-correct" : " input-wrong") : ""}`}
                value={values[i]}
                onChange={e => {
                  if (submitted) return;
                  const next = [...values];
                  next[i] = e.target.value;
                  setValues(next);
                }}
                onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }}
                placeholder={blank.hint || "Type your answer…"}
                disabled={submitted}
                spellCheck={false}
                autoComplete="off"
              />
              {submitted && (
                <span className={`input-icon ${results[i] ? "icon-correct" : "icon-wrong"}`}>
                  {results[i] ? "✓" : "✕"}
                </span>
              )}
            </div>
            {submitted && !results[i] && !hideAnswers && (
              <p className="task-correct-answer">Correct: <code>{blank.answer}</code></p>
            )}
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          className="task-submit-btn"
          onClick={handleSubmit}
          disabled={values.some(v => v.trim() === "")}
        >
          ✔ Check Answers
        </button>
      ) : (
        <div className={`task-feedback ${allCorrect ? "feedback-correct" : "feedback-wrong"}`}>
          <p className="task-feedback-text">
            {allCorrect ? <><span className="known-check">✓</span> All correct!</> : `❌ ${results.filter(Boolean).length} / ${card.blanks.length} correct`}
          </p>
          {!hideAnswers && card.explanation && !revealed && (
            <button className="task-reveal-btn" onClick={handleReveal}>💡 Show explanation</button>
          )}          {!hideAnswers && revealed && card.explanation && (
            <div className="task-explanation">
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
          {!examMode && (
            <div className="task-actions">
              <button className="btn btn-review" onClick={handleRetry}>🔁 Try Again</button>              <button className="btn btn-know" onClick={handleNext}>
                {onSrsRate ? "Continue →" : <><span className="known-check">✓</span> Next Card</>}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ORDER TASK
   User clicks steps in the correct sequence.
───────────────────────────────────────────── */
function OrderTask({ card, onKnow, onSrsRate, hideAnswers, examMode, onExamAnswer }) {
  const [options] = useState(() => {
    const arr = [...card.steps];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });
  const [sequence, setSequence] = useState([]); // indices into options[]
  const [submitted, setSubmitted]   = useState(false);
  const [revealed, setRevealed]     = useState(false);

  const isSelected = (i) => sequence.includes(i);

  const handleClick = (i) => {
    if (submitted) return;
    if (isSelected(i)) {
      setSequence(sequence.filter(s => s !== i));
    } else {
      setSequence([...sequence, i]);
    }
  };

  const userOrder = sequence.map(i => options[i]);
  const allCorrect = JSON.stringify(userOrder) === JSON.stringify(card.steps);

  const handleSubmit = () => {
    if (sequence.length !== card.steps.length) return;
    setSubmitted(true);
    if (examMode) {
      onExamAnswer({ card, correct: allCorrect, given: userOrder.join(" → "), expected: card.steps.join(" → ") });
    }
  };

  const handleRetry = () => { setSequence([]); setSubmitted(false); setRevealed(false); };
  const handleNext  = () => onSrsRate ? onSrsRate(allCorrect ? 3 : 1) : onKnow();

  return (
    <div className="task-card">
      <div className="task-header">
        <div className="card-meta">
          <span className="task-category">{card.category}</span>
          <span className={`difficulty-badge difficulty-badge--${card.difficulty}`}>{card.difficulty}</span>
        </div>
        <span className="task-type-badge">🔢 Order Steps</span>
      </div>

      <p className="task-question">{card.question}</p>
      <p className="task-instruction">Click the steps below in the correct order.</p>

      {/* Selected sequence */}
      <div className="order-sequence">
        {sequence.length === 0
          ? <span className="order-placeholder">Your sequence will appear here…</span>
          : sequence.map((optIdx, pos) => (
            <div key={pos} className={`order-seq-item${submitted ? (card.steps[pos] === options[optIdx] ? " seq-correct" : " seq-wrong") : ""}`}>
              <span className="order-seq-num">{pos + 1}</span>
              <span>{options[optIdx]}</span>
              {!submitted && (
                <button className="order-seq-remove" onClick={() => handleClick(optIdx)}>✕</button>
              )}
            </div>
          ))
        }
      </div>

      {/* Clickable options */}
      <div className="order-options">
        {options.map((step, i) => (
          <button
            key={i}
            className={`order-option${isSelected(i) ? " selected" : ""}`}
            onClick={() => handleClick(i)}
            disabled={submitted}
          >
            {step}
          </button>
        ))}
      </div>

      {!submitted ? (
        <button
          className="task-submit-btn"
          onClick={handleSubmit}
          disabled={sequence.length !== card.steps.length}
        >
          ✔ Check Order
        </button>
      ) : (
        <div className={`task-feedback ${allCorrect ? "feedback-correct" : "feedback-wrong"}`}>
          <p className="task-feedback-text">
            {allCorrect ? <><span className="known-check">✓</span> Perfect order!</> : "❌ Not quite — see correct order below"}
          </p>
          {!hideAnswers && !allCorrect && (
            <ol className="order-correct-list">
              {card.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          )}
          {!hideAnswers && card.explanation && !revealed && (
            <button className="task-reveal-btn" onClick={() => setRevealed(true)}>💡 Show explanation</button>
          )}          {!hideAnswers && revealed && card.explanation && (
            <div className="task-explanation">
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
          {!examMode && (
            <div className="task-actions">
              <button className="btn btn-review" onClick={handleRetry}>🔁 Try Again</button>              <button className="btn btn-know" onClick={handleNext}>
                {onSrsRate ? "Continue →" : <><span className="known-check">✓</span> Next Card</>}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MATCH TASK
   User pairs left-hand items to right-hand items.
───────────────────────────────────────────── */
function MatchTask({ card, onKnow, onSrsRate, hideAnswers, examMode, onExamAnswer }) {
  const lefts  = card.pairs.map(p => p.left);
  const [rights] = useState(() => {
    const arr = card.pairs.map(p => p.right);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });
  const [selections, setSelections] = useState({}); // { leftIndex: rightIndex }
  const [activeLeft, setActiveLeft] = useState(null);
  const [submitted, setSubmitted]   = useState(false);
  const [revealed, setRevealed]     = useState(false);

  const usedRights = new Set(Object.values(selections));

  const handleLeft = (i) => {
    if (submitted) return;
    setActiveLeft(activeLeft === i ? null : i);
  };

  const handleRight = (j) => {
    if (submitted || activeLeft === null) return;
    setSelections(prev => ({ ...prev, [activeLeft]: j }));
    setActiveLeft(null);
  };

  const results = lefts.map((_, i) => {
    const pickedRight = rights[selections[i]];
    return pickedRight === card.pairs[i].right;
  });

  const allAnswered = Object.keys(selections).length === lefts.length;
  const allCorrect  = results.every(Boolean);

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
    if (examMode) {
      const given    = lefts.map((l, i) => `${l} → ${rights[selections[i]] ?? "?"}`).join(", ");
      const expected = card.pairs.map(p => `${p.left} → ${p.right}`).join(", ");
      onExamAnswer({ card, correct: allCorrect, given, expected });
    }
  };

  const handleRetry = () => { setSelections({}); setActiveLeft(null); setSubmitted(false); setRevealed(false); };
  const handleNext  = () => onSrsRate ? onSrsRate(allCorrect ? 3 : 1) : onKnow();

  return (
    <div className="task-card">
      <div className="task-header">
        <div className="card-meta">
          <span className="task-category">{card.category}</span>
          <span className={`difficulty-badge difficulty-badge--${card.difficulty}`}>{card.difficulty}</span>
        </div>
        <span className="task-type-badge">🔗 Match</span>
      </div>

      <p className="task-question">{card.question}</p>
      <p className="task-instruction">Select a left item, then select its matching right item.</p>

      <div className="match-grid">
        {/* Left column */}
        <div className="match-col">
          {lefts.map((left, i) => (
            <button
              key={i}
              className={`match-item match-left
                ${activeLeft === i ? " active" : ""}
                ${submitted ? (results[i] ? " match-correct" : " match-wrong") : ""}
                ${selections[i] !== undefined ? " paired" : ""}
              `}
              onClick={() => handleLeft(i)}
              disabled={submitted}
            >
              {left}
              {selections[i] !== undefined && (
                <span className="match-paired-arrow">→ {rights[selections[i]]}</span>
              )}
            </button>
          ))}
        </div>

        {/* Right column */}
        <div className="match-col">
          {rights.map((right, j) => (
            <button
              key={j}
              className={`match-item match-right
                ${usedRights.has(j) ? " used" : ""}
                ${activeLeft !== null && !usedRights.has(j) ? " targetable" : ""}
              `}
              onClick={() => handleRight(j)}
              disabled={submitted || (usedRights.has(j) && Object.entries(selections).find(([,v]) => v === j)?.[0] === undefined)}
            >
              {right}
            </button>
          ))}
        </div>
      </div>

      {!submitted ? (
        <button
          className="task-submit-btn"
          onClick={handleSubmit}
          disabled={!allAnswered}
        >
          ✔ Check Matches
        </button>
      ) : (
        <div className={`task-feedback ${allCorrect ? "feedback-correct" : "feedback-wrong"}`}>
          <p className="task-feedback-text">
            {allCorrect ? <><span className="known-check">✓</span> All matched!</> : `❌ ${results.filter(Boolean).length} / ${lefts.length} correct`}
          </p>
          {!hideAnswers && !allCorrect && (
            <ul className="match-correct-list">
              {card.pairs.map((p, i) => (
                <li key={i} className={results[i] ? "match-ans-ok" : "match-ans-bad"}>
                  {results[i] ? "✓" : "✕"} <strong>{p.left}</strong> → {p.right}
                </li>
              ))}
            </ul>
          )}
          {!hideAnswers && card.explanation && !revealed && (
            <button className="task-reveal-btn" onClick={() => setRevealed(true)}>💡 Show explanation</button>
          )}          {!hideAnswers && revealed && card.explanation && (
            <div className="task-explanation">
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
          {!examMode && (
            <div className="task-actions">
              <button className="btn btn-review" onClick={handleRetry}>🔁 Try Again</button>              <button className="btn btn-know" onClick={handleNext}>
                {onSrsRate ? "Continue →" : <><span className="known-check">✓</span> Next Card</>}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCRIPT TASK
   User types full CLI / PowerShell commands from memory.
   Supports --help / Get-Help inline, just like a real terminal.
   History is a list of { input, output, kind } entries.
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   FAULT TASK
   User reads a scenario and selects which option describes the fault.
───────────────────────────────────────────── */
function FaultTask({ card, onKnow, onSrsRate, hideAnswers, examMode, onExamAnswer }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const isCorrect = selected === card.correctFault;

  const handleSubmit = () => {
    if (submitted || selected === null) return;
    setSubmitted(true);
    if (examMode) {
      onExamAnswer({ card, correct: isCorrect, given: selected, expected: card.correctFault });
    }
  };

  const handleRetry = () => { setSelected(null); setSubmitted(false); setRevealed(false); };
  const handleNext  = () => onSrsRate ? onSrsRate(isCorrect ? 3 : 1) : onKnow();

  return (
    <div className="task-card">
      <div className="task-header">
        <div className="card-meta">
          <span className="task-category">{card.category}</span>
          <span className={`difficulty-badge difficulty-badge--${card.difficulty}`}>{card.difficulty}</span>
        </div>
        <span className="task-type-badge">🔍 Find the Fault</span>
      </div>

      <p className="task-question">{card.question}</p>

      <div className="fault-scenario">{card.scenario}</div>

      <p className="task-instruction">Select the fault in this configuration:</p>

      <div className="fault-options">
        {card.faults.map((fault, i) => {
          let cls = "fault-option";
          if (submitted) {
            if (fault === card.correctFault) cls += " fault-correct";
            else if (fault === selected)     cls += " fault-wrong";
            else                             cls += " fault-dimmed";
          } else if (fault === selected) {
            cls += " fault-selected";
          }
          return (
            <button key={i} className={cls} onClick={() => { if (!submitted) setSelected(fault); }} disabled={submitted}>
              {fault}
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button className="task-submit-btn" onClick={handleSubmit} disabled={selected === null}>
          ✔ Identify Fault
        </button>
      ) : (
        <div className={`task-feedback ${isCorrect ? "feedback-correct" : "feedback-wrong"}`}>
          <p className="task-feedback-text">
            {isCorrect ? <><span className="known-check">✓</span> Correct — fault identified!</> : "❌ Not quite — the correct fault is highlighted above"}
          </p>
          {!hideAnswers && card.fix && (
            <div className="fault-fix">
              <span className="explanation-label">🔧 Fix</span>
              <p>{card.fix}</p>
            </div>
          )}
          {!hideAnswers && card.explanation && !revealed && (
            <button className="task-reveal-btn" onClick={() => setRevealed(true)}>💡 Show explanation</button>
          )}
          {!hideAnswers && revealed && card.explanation && (
            <div className="task-explanation">
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
          {!examMode && (
            <div className="task-actions">
              <button className="btn btn-review" onClick={handleRetry}>🔁 Try Again</button>
              <button className="btn btn-know" onClick={handleNext}>
                {onSrsRate ? "Continue →" : <><span className="known-check">✓</span> Next Card</>}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Detect help invocations and return the help text string, or null. */
function resolveHelp(raw, card) {
  const t = raw.trim();
  const isPosh = (card.shell || "bash") === "powershell";
  // Bash: any "--help" flag, or "man <cmd>", or "az <cmd> --help"
  // PowerShell: "Get-Help <cmd>" or "<cmd> -?"
  const isHelp = isPosh
    ? /get-help\s/i.test(t) || /\-\?/.test(t)
    : /--help/.test(t) || /^man\s/.test(t);
  if (!isHelp) return null;
  return card.helpText || "# No help text defined for this command.";
}

function ScriptTask({ card, onKnow, onSrsRate, hideAnswers, examMode, onExamAnswer }) {
  // history: array of { input: string, output: string|null, kind: "help"|"error"|"answer"|null }
  const [history, setHistory]     = useState([]);
  const [value, setValue]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed]   = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  const shell      = card.shell || "bash";
  const prompt     = shell === "powershell" ? "PS > " : "$ ";
  const badgeLabel = shell === "powershell" ? "ᴾˢ PowerShell" : "🐧 Bash / CLI";

  // Scroll to bottom whenever history grows
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, submitted]);
  // Strip single/double quotes around values so "MyRG" and 'MyRG' both match MyRG
  const stripQuotes = (s) => s.replace(/(['"])(.*?)\1/g, "$2");
  const normalise = (s) => stripQuotes(s.trim().toLowerCase().replace(/\s+/g, " "));

  /**
   * Normalise a requiredToken entry into { label, accept[] }.
   * Supports both legacy strings and the new object format:
   *   string  → { label: str, accept: [str] }
   *   object  → { label, accept[] }  (already correct shape)
   */
  const normaliseToken = (t) =>
    typeof t === "string"
      ? { label: t, accept: [t] }
      : t;

  /** Check a single normalised token against a raw input string */
  const tokenMatches = (normTok, rawNorm) =>
    normTok.accept.some(a => rawNorm.includes(a.toLowerCase()));

  const normTokens = (card.requiredTokens || []).map(normaliseToken);
  const runLine = () => {
    const raw = value.trim();
    if (!raw) return;

    // In exam mode — skip help/error checks, just capture & grade immediately
    if (examMode) {
      const rawNorm = normalise(raw);
      const tok = normTokens.map(t => ({ label: t.label, ok: tokenMatches(t, rawNorm) }));
      const correct = tok.length > 0 && tok.every(t => t.ok);
      setHistory(h => [...h, { input: raw, output: null, kind: "answer" }]);
      setSubmitted(true);
      setValue("");
      onExamAnswer({ card, correct, given: raw, expected: normTokens.map(t => t.label).join(" ") });
      return;
    }

    // Check for help
    const helpOut = resolveHelp(raw, card);
    if (helpOut) {
      setHistory(h => [...h, { input: raw, output: helpOut, kind: "help" }]);
      setValue("");
      inputRef.current?.focus();
      return;
    }    // Any other non-answer command typed before submit — show a "not recognised" line
    // so the terminal feels real, but don't lock the card
    const isAnswerAttempt = normTokens.some(tok =>
      normalise(raw).includes(tok.accept[0].split(" ")[0].toLowerCase())
    );
    if (!isAnswerAttempt) {
      setHistory(h => [...h, {
        input: raw,
        output: shell === "powershell"
          ? `'${raw.split(" ")[0]}' is not recognized as a cmdlet, function, script file, or operable program.`
          : `${raw.split(" ")[0]}: command not found`,
        kind: "error",
      }]);
      setValue("");
      inputRef.current?.focus();
      return;
    }    // It's the real answer attempt — grade it
    setHistory(h => [...h, { input: raw, output: null, kind: "answer" }]);
    setSubmitted(true);
    setValue("");
  };
  const handleKeyDown = (e) => {
    if (examMode && e.key === "Enter" && !e.shiftKey) { e.preventDefault(); runLine(); return; }
    if ((e.ctrlKey || e.shiftKey) && e.key === "Enter") { e.preventDefault(); runLine(); }
  };

  const handleRetry = () => {
    setHistory([]);
    setValue("");
    setSubmitted(false);
    setRevealed(false);
  };
  const handleNext = () => onSrsRate ? onSrsRate(finalCorrect ? 3 : 1) : onKnow();
  // Final token results are based on the answer line in history
  const answerEntry = history.find(h => h.kind === "answer");
  const finalTokenResults = normTokens.map(t => ({
    label: t.label,
    ok: answerEntry ? tokenMatches(t, normalise(answerEntry.input)) : false,
  }));
  const finalCorrect = finalTokenResults.length > 0 && finalTokenResults.every(t => t.ok);
  return (
    <div className="task-card task-card--script">      <div className="task-header">
        <div className="card-meta">
          <span className="task-category">{card.category}</span>
          <span className={`difficulty-badge difficulty-badge--${card.difficulty}`}>{card.difficulty}</span>
        </div>
        <span className={shell === "powershell" ? "task-type-badge-ps" : "task-type-badge"}>{badgeLabel}</span>
      </div>

      <p className="task-question">{card.question}</p>
      {card.helpText && !submitted && (
        <p className="script-help-tip">
          💡 Tip: type <code>{shell === "powershell" ? "Get-Help <command>" : "command --help"}</code> or just <code>{shell === "powershell" ? "-?" : "--help"}</code> in the terminal for usage info.
        </p>
      )}

      <div className={`script-terminal${submitted ? (finalCorrect ? " terminal-correct" : " terminal-wrong") : ""}`}>
        {/* Window chrome */}
        <div className="script-terminal-bar">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
          <span className="terminal-title">{shell === "powershell" ? "ᴾˢ PowerShell" : "Terminal"}</span>
        </div>

        {/* Scrollable output area */}
        <div className="script-terminal-output">
          {history.map((entry, i) => (
            <div key={i} className="term-history-block">
              {/* The command the user typed */}
              <div className="term-history-line">
                <span className="script-prompt">{prompt}</span>
                <span className="term-input-echo">{entry.input}</span>
              </div>
              {/* Output beneath it */}
              {entry.output && (
                <pre className={`term-output ${entry.kind === "error" ? "term-output-error" : entry.kind === "help" ? "term-output-help" : ""}`}>
                  {entry.output}
                </pre>
              )}
            </div>
          ))}

          {/* Live input row — hidden once submitted */}
          {!submitted && (
            <div className="script-terminal-body">
              <span className="script-prompt">{prompt}</span>
              <textarea
                ref={inputRef}
                className="script-input"
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder=""
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                rows={3}
              />
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>      {!submitted && (
        <>
          <p className="script-hint">
            {examMode
              ? <><kbd>Enter</kbd> to submit your answer</>
              : <><kbd>Shift</kbd>+<kbd>Enter</kbd> to run &nbsp;·&nbsp; try <code>{shell === "powershell" ? "Get-Help" : "--help"}</code> first</>
            }
          </p>
          <button className="task-submit-btn" onClick={runLine} disabled={value.trim() === ""}>
            {examMode ? "▶ Submit Answer" : "▶ Run Command"}
          </button>
        </>
      )}

      {submitted && (
        <div className={`task-feedback ${finalCorrect ? "feedback-correct" : "feedback-wrong"}`}>
          <p className="task-feedback-text">
            {finalCorrect ? <><span className="known-check">✓</span> Correct!</> : `❌ ${finalTokenResults.filter(t => t.ok).length} / ${finalTokenResults.length} tokens matched`}
          </p>          {!hideAnswers && (
            <ul className="token-check-list">
              {finalTokenResults.map(({ label, ok }) => (
                <li key={label} className={ok ? "token-ok" : "token-missing"}>
                  {ok ? "✓" : "✕"} {label}
                </li>
              ))}
            </ul>
          )}
          {!hideAnswers && !finalCorrect && card.modelAnswer && (
            <div className="script-model-answer">
              <span className="explanation-label">✅ Model answer</span>
              <pre><code>{card.modelAnswer}</code></pre>
            </div>
          )}
          {!hideAnswers && card.explanation && !revealed && (
            <button className="task-reveal-btn" onClick={() => setRevealed(true)}>💡 Show explanation</button>
          )}
          {!hideAnswers && revealed && card.explanation && (
            <div className="task-explanation">
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
          )}          {!examMode && (
            <div className="task-actions">
              <button className="btn btn-review" onClick={handleRetry}>🔁 Try Again</button>
              <button className="btn btn-know" onClick={handleNext}>
                {onSrsRate ? "Continue →" : <><span className="known-check">✓</span> Next Card</>}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

}
