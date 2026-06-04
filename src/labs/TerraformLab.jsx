import { useState, useRef, useEffect } from "react";
import "./terraformlab.css";

export default function TerraformLab({ card, onKnow, onSrsRate, hideAnswers, examMode, onExamAnswer, onAnswer }) {
  const [value, setValue]           = useState("");
  const [submitted, setSubmitted]   = useState(false);
  const [revealed, setRevealed]     = useState(false);
  const [termLines, setTermLines]   = useState([]);
  const [hasLintErrors, setHasLintErrors] = useState(false);
  const [showHelp, setShowHelp]     = useState(true);
  const [helpWidth, setHelpWidth]   = useState(300);
  const [dragging, setDragging]     = useState(false);
  const bottomRef                   = useRef(null);

  const onResizeStart = (e) => {
    e.preventDefault();
    const startX     = e.clientX;
    const startWidth = helpWidth;
    setDragging(true);

    const onMove = (e) => {
      const delta    = startX - e.clientX;
      const newWidth = Math.min(520, Math.max(180, startWidth + delta));
      setHelpWidth(newWidth);
    };
    const onUp = () => {
      setDragging(false);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const normalise   = (s) => s.trim().toLowerCase().replace(/\s+/g, " ");
  const stripQuotes = (s) => s.replace(/(['"])(.*?)\1/g, "$2");
  const norm        = (s) => stripQuotes(normalise(s));

  const normaliseToken = (t) =>
    typeof t === "string" ? { label: t, accept: [t] } : t;

  const normTokens = (card.requiredTokens || []).map(normaliseToken);

  const tokenResults = normTokens.map((t) => ({
    label: t.label,
    ok: t.accept.some((a) => norm(value).includes(norm(a))),
  }));
  const allCorrect = tokenResults.length > 0 && tokenResults.every((t) => t.ok);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [termLines, submitted]);

  const lintHCL = (code) => {
    const errors = [];
    const lines  = code.split("\n");

    // ── 1. Char-by-char: track string context for accurate brace count ──
    let inString = false;
    let depth    = 0;
    for (let i = 0; i < code.length; i++) {
      const ch = code[i];
      if (inString) {
        if (ch === "\\") { i++; continue; }    // escape sequence
        if (ch === '"')  { inString = false; }
        continue;
      }
      if (ch === "#") { while (i < code.length && code[i] !== "\n") i++; continue; } // line comment
      if (ch === '"') { inString = true; continue; }
      if (ch === "{") depth++;
      if (ch === "}") {
        if (depth === 0) { errors.push("Extra closing brace — one too many }"); break; }
        depth--;
      }
    }
    if (inString) errors.push("Unclosed string — missing closing quote \"");
    if (depth > 0) errors.push(`Unclosed block — missing ${depth} closing brace${depth > 1 ? "s" : ""} }`);

    // ── 2. Resource declaration — checked line-by-line to avoid cross-line regex ──
    const resourceLine = lines.find(l => /^\s*resource\b/.test(l));
    if (resourceLine && !/^\s*resource\s+"[^"]+"\s+"[^"]+"\s*\{/.test(resourceLine)) {
      errors.push('Resource declaration must be: resource "provider_type" "local_name" {');
    }

    // ── 3. Colon instead of = ──────────────────────────────────────────
    const colonLine = lines.find(l => /^\s+[\w-]+\s*:\s*\S/.test(l));
    if (colonLine) errors.push(`Use = for attribute assignment, not :   (line: "${colonLine.trim().slice(0, 40)}")`);

    // ── 4. Double equals ──────────────────────────────────────────────
    if (lines.some(l => /\w\s*==\s*/.test(l))) errors.push("Use = for assignment, not ==");

    // ── 5. List attributes must use [...] ──────────────────────────────
    for (const attr of (card.listAttributes || [])) {
      if (new RegExp(`\\b${attr}\\s*=\\s*"`).test(code))
        errors.push(`${attr} must be a list: ${attr} = ["value"]  (square brackets required)`);
    }

    // ── 6. Required attributes — line-anchored so "name" doesn't false-match "resource_group_name" ──
    for (const attr of (card.requiredAttributes || [])) {
      const pattern = new RegExp(`^\\s+${attr}\\s*=`, "m");
      if (!pattern.test(code))
        errors.push(`Missing required attribute: ${attr}`);
    }

    return errors;
  };

  const handleApply = () => {
    if (submitted || value.trim() === "") return;

    const lintErrors = lintHCL(value);

    // Extract resource type and local name for realistic plan output
    const resMatch = value.match(/resource\s+"([^"]+)"\s+"([^"]+)"/);
    const resType  = resMatch?.[1] ?? "resource";
    const resLocal = resMatch?.[2] ?? "this";

    const planLines = lintErrors.length > 0 ? [
      "$ terraform fmt",
      "Error: configuration could not be formatted",
      "$ terraform validate",
      ...lintErrors.map(e => `  ✕  ${e}`),
    ] : [
      "$ terraform fmt",
      "main.tf",
      "$ terraform validate",
      "Success! The configuration is valid.",
      "$ terraform plan",
      "Terraform will perform the following actions:",
      `  + resource "${resType}" "${resLocal}" will be created`,
      "Plan: 1 to add, 0 to change, 0 to destroy.",
      "$ terraform apply -auto-approve",
      allCorrect
        ? "Apply complete! Resources: 1 added, 0 changed, 0 destroyed."
        : "Apply failed. No changes. 0 added, 0 changed, 0 destroyed.",
    ];

    const passed = allCorrect && lintErrors.length === 0;
    setTermLines(planLines);
    setHasLintErrors(lintErrors.length > 0);
    setSubmitted(true);
    onAnswer?.(passed);
    if (examMode) {
      onExamAnswer({ card, correct: passed, given: value, expected: card.modelAnswer ?? "" });
    }
  };

  const handleRetry = () => {
    setValue("");
    setHasLintErrors(false);
    setSubmitted(false);
    setRevealed(false);
    setTermLines([]);
  };

  const passed     = allCorrect && !hasLintErrors;
  const handleNext = () => onSrsRate ? onSrsRate(passed ? 3 : 1) : onKnow();

  return (
    <div className="tf-lab-root">
      {/* ── Left: main lab area ─────────────────────────────── */}
      <div className="tf-lab-main">
        <div className="tf-lab-header">
          <div className="card-meta">
            <span className="task-category">{card.category}</span>
            <span className={`difficulty-badge difficulty-badge--${card.difficulty}`}>{card.difficulty}</span>
          </div>
          <span className="tf-lab-badge">
            <TerraformIcon />
            Terraform Lab
          </span>
          <span className="card-id-badge" style={{ marginLeft: "auto" }}>#{card.id}</span>
        </div>

        <p className="task-question">{card.question}</p>

        {/* Scaffold — read-only HCL context */}
        {card.scaffold && (
          <div className="tf-scaffold">
            <div className="tf-scaffold-bar">
              <span className="tf-file-icon">📄</span>
              <span className="tf-filename">main.tf</span>
              <span className="tf-scaffold-label">context (read-only)</span>
            </div>
            <pre className="tf-scaffold-body"><code>{card.scaffold}</code></pre>
          </div>
        )}

        {/* Editor */}
        <div className={`tf-editor-wrap${submitted ? (allCorrect && !hasLintErrors ? " tf-editor--correct" : " tf-editor--wrong") : ""}`}>
          <div className="tf-editor-bar">
            <span className="tf-file-icon">✏️</span>
            <span className="tf-filename">main.tf</span>
            <span className="tf-editor-label">your code</span>
          </div>
          <textarea
            className="tf-editor"
            value={value}
            onChange={(e) => { if (!submitted) setValue(e.target.value); }}
            placeholder={card.placeholder || "# Write your Terraform resource block here…\nresource \"azurerm_\" \"\" {\n\n}"}
            disabled={submitted}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            rows={10}
          />
        </div>

        {/* Apply button */}
        {!submitted && (
          <button className="tf-apply-btn" onClick={handleApply} disabled={value.trim() === ""}>
            <TerraformIcon size={16} />
            terraform apply
          </button>
        )}

        {/* Simulated terminal output */}
        {termLines.length > 0 && (
          <div className={`tf-terminal${submitted ? (allCorrect && !hasLintErrors ? " tf-terminal--pass" : " tf-terminal--fail") : ""}`}>
            <div className="tf-terminal-bar">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span className="terminal-title">Terminal</span>
            </div>
            <div className="tf-terminal-output">
              {termLines.map((line, i) => (
                <div key={i} className={`tf-term-line${line.startsWith("$") ? " tf-term-cmd" : ""}${line.startsWith("  ✕") || line.startsWith("Error:") ? " tf-term-err" : ""}${line.startsWith("╷") || line.startsWith("│") || line.startsWith("╵") ? " tf-term-warn" : ""}${line.includes("Apply complete") || line.includes("Success!") ? " tf-term-ok" : ""}`}>
                  {line}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>
        )}

        {/* Feedback */}
        {submitted && (
          <div className={`task-feedback ${allCorrect && !hasLintErrors ? "feedback-correct" : "feedback-wrong"}`}>
            <p className="task-feedback-text">
              {hasLintErrors
                ? "❌ Fix the syntax errors above before applying"
                : allCorrect
                  ? <><span className="known-check">✓</span> Configuration valid — apply succeeded!</>
                  : `❌ ${tokenResults.filter((t) => t.ok).length} / ${tokenResults.length} required blocks/attributes found`}
            </p>
            {!hideAnswers && (
              <ul className="token-check-list">
                {tokenResults.map(({ label, ok }) => (
                  <li key={label} className={ok ? "token-ok" : "token-missing"}>
                    {ok ? "✓" : "✕"} <code>{label}</code>
                  </li>
                ))}
              </ul>
            )}
            {!hideAnswers && !allCorrect && card.modelAnswer && (
              <div className="tf-model-answer">
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
                📖 Learn more
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

      {/* ── Resize handle ───────────────────────────────────── */}
      {card.helpText && (
        <div
          className={`tf-resize-handle${dragging ? " tf-resize-handle--dragging" : ""}`}
          onMouseDown={onResizeStart}
        />
      )}

      {/* ── Right: help panel ───────────────────────────────── */}
      {card.helpText && (
        <div className="tf-lab-help" style={{ width: helpWidth }}>
          <div className="tf-lab-help-header">
            <TerraformIcon size={13} />
            <span>Help</span>
            <label className="tf-help-toggle" title={showHelp ? "Hide help" : "Show help"}>
              <input
                type="checkbox"
                checked={showHelp}
                onChange={e => setShowHelp(e.target.checked)}
              />
              {showHelp ? "Hide" : "Show"}
            </label>
          </div>
          {showHelp && (
            <div className="tf-lab-help-body">
              <pre className="tf-help-panel"><code>{card.helpText}</code></pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TerraformIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {/* Terraform diamond logo approximation — 3 parallelogram segments */}
      <polygon points="8.5,2 3,5.5 3,12.5 8.5,9" />
      <polygon points="9.5,9.5 9.5,16.5 15,13 15,6" />
      <polygon points="3,14 8.5,17.5 8.5,10.5" />
      <polygon points="16,5.5 21,9 21,9 16,12.5" />
    </svg>
  );
}
