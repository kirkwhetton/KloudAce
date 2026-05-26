import { useMemo, useState } from "react";
import flashcards, { EXAM_META } from "./flashcards";
import { loadSrsData, isDue } from "./spacedRepetition";
import "./ReadinessDashboard.css";

const EXAM_ICONS = {
  "AZ-900": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>
    </svg>
  ),
  "AZ-104": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  "AZ-700": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  "AZ-305": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
};

const DEFAULT_EXAM_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

function getReadinessScore({ total, mature, mastered, masteredAndMature }) {
  if (total === 0) return 0;
  const combined = mastered + mature - masteredAndMature;
  return Math.round((combined / total) * 100);
}

function scoreColor() {
  return "var(--brand)";
}

function scoreLabel(score) {
  if (score >= 75) return "Ready";
  if (score >= 40) return "In Progress";
  return "Getting Started";
}

export default function ReadinessDashboard({ user, onClose, initialExam = null }) {
  const examData = useMemo(() => {
    let masteredIds;
    try { masteredIds = new Set(JSON.parse(localStorage.getItem(`azfc_mastered_${user.id}`) || "[]")); }
    catch { masteredIds = new Set(); }

    return Object.keys(EXAM_META).map((exam) => {
      const cards   = flashcards.filter((c) => c.exam === exam);
      const srsData = loadSrsData(user.id, exam);
      const mastered         = cards.filter((c) => masteredIds.has(c.id)).length;
      const mature           = cards.filter((c) => { const r = srsData[c.id]; return r && r.repetitions >= 3; }).length;
      const masteredAndMature = cards.filter((c) => { const r = srsData[c.id]; return masteredIds.has(c.id) && r && r.repetitions >= 3; }).length;
      const learning = cards.filter((c) => { const r = srsData[c.id]; return r && r.repetitions > 0 && r.repetitions < 3; }).length;
      const due      = cards.filter((c) => isDue(srsData[c.id])).length;
      const tracked  = cards.filter((c) => srsData[c.id] && srsData[c.id].repetitions > 0).length;

      const categoryMap = {};
      for (const c of cards) {
        if (!categoryMap[c.category]) categoryMap[c.category] = { total: 0, mastered: 0, mature: 0, masteredAndMature: 0, learning: 0 };
        categoryMap[c.category].total++;
        const isMastered = masteredIds.has(c.id);
        if (isMastered) categoryMap[c.category].mastered++;
        const r = srsData[c.id];
        if (r && r.repetitions >= 3) {
          categoryMap[c.category].mature++;
          if (isMastered) categoryMap[c.category].masteredAndMature++;
        } else if (r && r.repetitions > 0) categoryMap[c.category].learning++;
      }

      const diffMap      = { easy: 0, medium: 0, hard: 0, extreme: 0, untagged: 0 };
      const diffMastered = { easy: 0, medium: 0, hard: 0, extreme: 0, untagged: 0 };
      for (const c of cards) {
        const d = c.difficulty ?? "untagged";
        diffMap[d] = (diffMap[d] || 0) + 1;
        if (masteredIds.has(c.id)) diffMastered[d] = (diffMastered[d] || 0) + 1;
      }

      const typeCount = { flashcard: 0, mcq: 0, multi: 0, truefalse: 0, "image-mcq": 0, task: 0, script: 0 };
      for (const c of cards) {
        if (c.type === "truefalse") typeCount.truefalse++;
        else if (c.type === "image-mcq") typeCount["image-mcq"]++;
        else if (c.type === "multi") typeCount.multi++;
        else if (c.type === "task" && c.taskType === "script") typeCount.script++;
        else if (c.type === "task") typeCount.task++;
        else if (c.choices) typeCount.mcq++;
        else typeCount.flashcard++;
      }

      const score = getReadinessScore({ total: cards.length, mature, mastered, masteredAndMature });
      return { exam, cards, mastered, mature, learning, due, tracked, score, categoryMap, diffMap, diffMastered, typeCount };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const activeExams = examData.filter((d) => d.tracked > 0 || d.mastered > 0);
  const [selectedExam, setSelectedExam] = useState(() => {
    if (initialExam && activeExams.some((d) => d.exam === initialExam)) return initialExam;
    return activeExams[0]?.exam ?? null;
  });

  const [activeFilter, setActiveFilter] = useState(null);

  const current    = activeExams.find((d) => d.exam === selectedExam);
  const categories = current ? Object.entries(current.categoryMap).sort((a, b) => b[1].total - a[1].total) : [];

  const filteredCards = useMemo(() => {
    if (!activeFilter || !current) return null;
    const srsRec = loadSrsData(user.id, current.exam);
    const cards  = current.cards;
    if (activeFilter.type === "srs") {
      const mode = activeFilter.mode;
      if (mode === "mature")      return cards.filter(c => { const r = srsRec[c.id]; return r && r.repetitions >= 3; });
      if (mode === "learning")    return cards.filter(c => { const r = srsRec[c.id]; return r && r.repetitions > 0 && r.repetitions < 3; });
      if (mode === "not-started") return cards.filter(c => { const r = srsRec[c.id]; return !r || r.repetitions === 0; });
    }
    if (activeFilter.type === "cardtype") {
      const key = activeFilter.key;
      return cards.filter(c => {
        if (key === "truefalse") return c.type === "truefalse";
        if (key === "image-mcq") return c.type === "image-mcq";
        if (key === "multi")     return c.type === "multi";
        if (key === "script")    return c.type === "task" && c.taskType === "script";
        if (key === "task")      return c.type === "task" && c.taskType !== "script";
        if (key === "mcq")       return !!c.choices && !["truefalse","image-mcq","multi","task"].includes(c.type);
        return !c.choices && !["truefalse","image-mcq","multi","task"].includes(c.type);
      });
    }
    return null;
  }, [activeFilter, current, user.id]);

  const DIFF_META = [
    { key: "easy",    label: "Easy",    color: "var(--brand)" },
    { key: "medium",  label: "Medium",  color: "var(--text-secondary)" },
    { key: "hard",    label: "Hard",    color: "var(--text-secondary)" },
    { key: "extreme", label: "Extreme", color: "var(--text-primary)" },
    { key: "untagged",label: "Untagged",color: "var(--text-muted)" },
  ];

  const TYPE_META = [
    { key: "flashcard",  label: "Flip Cards" },
    { key: "mcq",        label: "MCQ" },
    { key: "multi",      label: "Multi-select" },
    { key: "truefalse",  label: "True / False" },
    { key: "image-mcq",  label: "Diagram MCQ" },
    { key: "task",       label: "Task" },
    { key: "script",     label: "Script" },
  ];

  const filterLabel = activeFilter?.type === "srs"
    ? { mature: "Mature", learning: "Learning", "not-started": "Not Started" }[activeFilter.mode]
    : TYPE_META.find(t => t.key === activeFilter?.key)?.label;

  return (
    <div className="rd-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="rd-modal">

        {/* ── Header ── */}
        <div className="rd-header">
          <div className="rd-header-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            Readiness Dashboard
          </div>
          <button className="rd-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* ── Exam tabs ── */}
        {activeExams.length > 0 && (
          <div className="rd-exam-tabs">
            {activeExams.map((d) => (
              <button
                key={d.exam}
                className={`rd-exam-tab${selectedExam === d.exam ? " active" : ""}`}
                onClick={() => { setSelectedExam(d.exam); setActiveFilter(null); }}
              >
                <span className="rd-tab-icon">{EXAM_ICONS[d.exam] || DEFAULT_EXAM_ICON}</span>
                <span className="rd-tab-code">{d.exam}</span>
                <span className="rd-tab-score" style={{ color: scoreColor() }}>{d.score}%</span>
              </button>
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {activeExams.length === 0 ? (
          <div className="rd-empty">
            <div className="rd-empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><path d="M18 2v4"/><path d="M20 4h-4"/>
              </svg>
            </div>
            <p className="rd-empty-title">Nothing to show yet</p>
            <p className="rd-empty-desc">
              Start studying with <strong>Spaced Repetition</strong> mode or <strong>mark cards as Mastered</strong> — your progress will appear here.
            </p>
          </div>
        ) : current && (
          <div className="rd-body">

            {/* ── Score hero ── */}
            <div className="rd-score-hero">
              <div className="rd-score-ring-wrap">
                <svg className="rd-score-ring" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border-subtle)" strokeWidth="10"/>
                  <circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke={scoreColor()}
                    strokeWidth="10"
                    strokeDasharray={`${(current.score / 100) * 327} 327`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    style={{ transition: "stroke-dasharray 0.6s ease" }}
                  />
                  <text x="60" y="56" textAnchor="middle" className="rd-ring-pct" style={{ fill: scoreColor() }}>{current.score}%</text>
                  <text x="60" y="72" textAnchor="middle" className="rd-ring-label">readiness</text>
                </svg>
              </div>
              <div className="rd-score-info">
                <p className="rd-score-status" style={{ color: scoreColor() }}>{scoreLabel(current.score)}</p>
                <p className="rd-score-exam">{EXAM_META[current.exam]?.fullName}</p>
                <p className="rd-score-hint">Score = (Mastered + SRS Mature) ÷ total cards</p>
              </div>
            </div>

            {/* ── Stat pills ── */}
            <div className="rd-stat-grid">
              <div className="rd-stat-pill">
                <span className="rd-stat-val">{current.cards.length}</span>
                <span className="rd-stat-lbl">Total Cards</span>
              </div>
              <button className="rd-stat-pill rd-stat-pill--btn" onClick={() => setActiveFilter({ type: "srs", mode: "mature" })}>
                <span className="rd-stat-val" style={{ color: "var(--brand)" }}>{current.mature}</span>
                <span className="rd-stat-lbl">Mature</span>
              </button>
              <button className="rd-stat-pill rd-stat-pill--btn" onClick={() => setActiveFilter({ type: "srs", mode: "learning" })}>
                <span className="rd-stat-val" style={{ color: "var(--brand)" }}>{current.learning}</span>
                <span className="rd-stat-lbl">Learning</span>
              </button>
              <button className="rd-stat-pill rd-stat-pill--btn" onClick={() => setActiveFilter({ type: "srs", mode: "not-started" })}>
                <span className="rd-stat-val">{current.cards.length - current.tracked}</span>
                <span className="rd-stat-lbl">Not Started</span>
              </button>
            </div>

            {/* ── Filter card list ── */}
            {activeFilter ? (
              <section className="rd-section">
                <div className="rd-filter-header">
                  <button className="rd-back-btn" onClick={() => setActiveFilter(null)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                    Back
                  </button>
                  <span className="rd-filter-label">{filterLabel} <span className="rd-filter-count">{filteredCards?.length ?? 0}</span></span>
                </div>
                <div className="rd-card-list">
                  {filteredCards?.map(card => {
                    const q = Array.isArray(card.question) ? card.question[0] : (card.question ?? "");
                    return (
                      <div key={card.id} className="rd-card-item">
                        <p className="rd-card-q">{q}</p>
                        <div className="rd-card-meta">
                          {card.category && <span className="rd-card-cat">{card.category}</span>}
                          {card.difficulty && <span className={`rd-card-diff rd-card-diff--${card.difficulty}`}>{card.difficulty}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : (
              <>
            {/* ── By Category ── */}
            <section className="rd-section">
              <h3 className="rd-section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
                By Category
              </h3>
              <div className="rd-category-list">
                {categories.map(([cat, stats]) => {
                  const pct = Math.round(((stats.mastered + stats.mature - stats.masteredAndMature) / stats.total) * 100);
                  return (
                    <div key={cat} className="rd-cat-row">
                      <div className="rd-cat-header">
                        <span className="rd-cat-name">{cat}</span>
                        <span className="rd-cat-counts">
                          {stats.mature > 0 && <span className="rd-badge mature">{stats.mature} mature</span>}
                          {stats.learning > 0 && <span className="rd-badge learning">{stats.learning} learning</span>}
                          <span className="rd-cat-total">{stats.total} cards</span>
                        </span>
                      </div>
                      <div className="rd-cat-bar-track">
                        <div className="rd-cat-bar-fill" style={{ width: `${pct}%`, background: scoreColor() }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── By Difficulty ── */}
            <section className="rd-section">
              <h3 className="rd-section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                </svg>
                By Difficulty
              </h3>
              <div className="rd-diff-grid">
                {DIFF_META.filter((d) => (current.diffMap[d.key] || 0) > 0).map((d) => {
                  const total = current.diffMap[d.key] || 0;
                  const done  = current.diffMastered[d.key] || 0;
                  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
                  return (
                    <div key={d.key} className="rd-diff-card">
                      <span className="rd-diff-label">{d.label}</span>
                      <span className="rd-diff-count">{done} / {total}</span>
                      <div className="rd-diff-bar-track">
                        <div className="rd-diff-bar-fill" style={{ width: `${pct}%`, background: d.color }}/>
                      </div>
                      <span className="rd-diff-pct" style={{ color: d.color }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Card Types ── */}
            <section className="rd-section">
              <h3 className="rd-section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                </svg>
                Card Types
              </h3>
              <div className="rd-type-grid">
                {TYPE_META.filter((t) => (current.typeCount[t.key] || 0) > 0).map((t) => (
                  <button key={t.key} className="rd-type-chip" onClick={() => setActiveFilter({ type: "cardtype", key: t.key })}>
                    <span className="rd-type-label">{t.label}</span>
                    <span className="rd-type-count">{current.typeCount[t.key]}</span>
                  </button>
                ))}
              </div>
            </section>
              </>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
