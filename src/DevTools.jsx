import { useState } from "react";
import "./DevTools.css";

export default function DevTools({ onClose, showDevRecent, onToggleDevRecent, onOpenCardManager, selectedExam, deckSize, onSimulateSrs }) {
  const [copied, setCopied] = useState(false);

  const copyEnv = () => {
    const url = import.meta.env.VITE_SUPABASE_URL ?? "—";
    navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  };

  return (
    <div className="devtools-overlay" onClick={onClose}>
      <div className="devtools-panel" onClick={e => e.stopPropagation()}>
        <div className="devtools-header">
          <span className="devtools-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
            Developer Tools
          </span>
          <button className="devtools-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="devtools-section">
          <div className="devtools-section-title">Card Filters</div>
          <label className="devtools-row">
            <span className="devtools-row-label">
              Recently added
              <span className="devtools-row-sub">Show only cards added in the last 25 hours</span>
            </span>
            <button
              className={`toggle${showDevRecent ? " on" : ""}`}
              onClick={onToggleDevRecent}
              role="switch"
              aria-checked={showDevRecent}
            >
              <div className="toggle-thumb" />
            </button>
          </label>
        </div>

        <div className="devtools-section">
          <div className="devtools-section-title">Content</div>
          <button className="devtools-action-btn" onClick={() => { onOpenCardManager(); onClose(); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
            </svg>
            Card Manager
          </button>
        </div>

        <div className="devtools-section">
          <div className="devtools-section-title">SRS Simulation</div>
          <div className="devtools-row-sub" style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>
            {selectedExam ? `${deckSize} cards · ${selectedExam}` : "No exam selected"}
          </div>
          <button className="devtools-action-btn" onClick={() => onSimulateSrs("mix")} disabled={!selectedExam}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Simulate mixed SRS
          </button>
          <button className="devtools-action-btn" onClick={() => onSimulateSrs("mature")} disabled={!selectedExam}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            All Mature
          </button>
          <button className="devtools-action-btn devtools-action-btn--danger" onClick={() => onSimulateSrs("clear")} disabled={!selectedExam}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
            Clear SRS data
          </button>
        </div>

        <div className="devtools-section">
          <div className="devtools-section-title">Environment</div>
          <div className="devtools-env-row">
            <span className="devtools-env-label">Supabase URL</span>
            <button className="devtools-copy-btn" onClick={copyEnv}>{copied ? "Copied!" : "Copy"}</button>
          </div>
          <div className="devtools-env-value">{import.meta.env.VITE_SUPABASE_URL ?? "—"}</div>
        </div>
      </div>
    </div>
  );
}
