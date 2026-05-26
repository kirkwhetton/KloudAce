import { useState } from "react";
import "./DevTools.css";

export default function DevTools({ onClose, showDevRecent, onToggleDevRecent, onOpenCardManager }) {
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
