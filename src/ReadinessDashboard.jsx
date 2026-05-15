import { useMemo, useState } from "react";
import flashcards, { EXAM_META } from "./flashcards";
import { loadSrsData, isDue } from "./spacedRepetition";
import "./ReadinessDashboard.css";

const EXAM_ICONS = { "AZ-900": "☁️", "AZ-104": "🛠️", "AZ-700": "🌐" };

function getReadinessScore({ total, mature, mastered, masteredAndMature }) {
  if (total === 0) return 0;
  // mastered + mature, but don't double-count cards that are both
  const combined = mastered + mature - masteredAndMature;
  return Math.round((combined / total) * 100);
}

function scoreColor(score) {
  if (score >= 75) return "var(--srs-dot-mature)";
  if (score >= 40) return "var(--srs-dot-learning)";
  return "var(--srs-dot-new)";
}

function scoreLabel(score) {
  if (score >= 75) return "Ready 🎯";
  if (score >= 40) return "In Progress 📈";
  return "Reviewing 🔄";
}

export default function ReadinessDashboard({ user, onClose, initialExam = null }) {  const examData = useMemo(() => {
    // Load once — mastered is per-user, not per-exam
    let masteredIds;
    try { masteredIds = new Set(JSON.parse(localStorage.getItem(`azfc_mastered_${user.id}`) || "[]")); }
    catch { masteredIds = new Set(); }

    return Object.keys(EXAM_META).map((exam) => {
      const cards = flashcards.filter((c) => c.exam === exam);
      const srsData = loadSrsData(user.id, exam);      const mastered        = cards.filter((c) => masteredIds.has(c.id)).length;
      const mature          = cards.filter((c) => { const r = srsData[c.id]; return r && r.repetitions >= 3; }).length;
      const masteredAndMature = cards.filter((c) => { const r = srsData[c.id]; return masteredIds.has(c.id) && r && r.repetitions >= 3; }).length;
      const learning = cards.filter((c) => { const r = srsData[c.id]; return r && r.repetitions > 0 && r.repetitions < 3; }).length;
      const due      = cards.filter((c) => isDue(srsData[c.id])).length;
      const tracked  = cards.filter((c) => srsData[c.id] && srsData[c.id].repetitions > 0).length;

      // Category breakdown
      const categoryMap = {};      for (const c of cards) {
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

      // Difficulty breakdown
      const diffMap = { easy: 0, medium: 0, hard: 0, extreme: 0, untagged: 0 };
      const diffMastered = { easy: 0, medium: 0, hard: 0, extreme: 0, untagged: 0 };
      for (const c of cards) {
        const d = c.difficulty ?? "untagged";
        diffMap[d] = (diffMap[d] || 0) + 1;
        if (masteredIds.has(c.id)) diffMastered[d] = (diffMastered[d] || 0) + 1;
      }
      // Card type breakdown
      const typeCount = { flashcard: 0, mcq: 0, multi: 0, truefalse: 0, "image-mcq": 0, task: 0, script: 0 };
      for (const c of cards) {
        if (c.type === "truefalse") typeCount.truefalse++;
        else if (c.type === "image-mcq") typeCount["image-mcq"]++;        else if (c.type === "multi") typeCount.multi++;
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

  // Only show exams where the user has actually started (SRS tracked or cards mastered)
  const activeExams = examData.filter((d) => d.tracked > 0 || d.mastered > 0);
  const [selectedExam, setSelectedExam] = useState(() => {
    // Prefer the passed-in exam if it has activity, else first active exam
    if (initialExam && activeExams.some((d) => d.exam === initialExam)) return initialExam;
    return activeExams[0]?.exam ?? null;
  });

  const current = activeExams.find((d) => d.exam === selectedExam);
  const categories = current ? Object.entries(current.categoryMap).sort((a, b) => b[1].total - a[1].total) : [];
  const DIFF_META = [
    { key: "easy",    label: "Easy",    color: "var(--diff-easy-text)" },
    { key: "medium",  label: "Medium",  color: "var(--diff-med-text)" },
    { key: "hard",    label: "Hard",    color: "var(--diff-hard-text)" },
    { key: "extreme", label: "Extreme", color: "var(--diff-ext-text)" },
    { key: "untagged",label: "Untagged",color: "var(--text-muted)" },
  ];
  const TYPE_META = [
    { key: "flashcard",  label: "🔄 Flip Cards" },
    { key: "mcq",        label: "☑️ MCQ" },
    { key: "multi",      label: "✅ Multi-select" },
    { key: "truefalse",  label: "⚖️ True / False" },
    { key: "image-mcq",  label: "🖼️ Diagram" },
    { key: "task",       label: "⌨️ Task" },
    { key: "script",     label: "📜 Script" },
  ];

  return (
    <div className="rd-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="rd-modal">
        <div className="rd-header">
          <h2 className="rd-title">📊 Readiness Dashboard</h2>
          <button className="rd-close" onClick={onClose}>✕</button>
        </div>        {/* Exam tabs — only shown when there is something to display */}
        {activeExams.length > 0 && (
          <div className="rd-exam-tabs">
            {activeExams.map((d) => (
              <button
                key={d.exam}
                className={`rd-exam-tab${selectedExam === d.exam ? " active" : ""}`}
                onClick={() => setSelectedExam(d.exam)}
              >
                <span className="rd-tab-icon">{EXAM_ICONS[d.exam] || "📋"}</span>
                <span className="rd-tab-code">{d.exam}</span>
                <span className="rd-tab-score" style={{ color: scoreColor(d.score) }}>
                  {d.score}%
                </span>
              </button>
            ))}
          </div>
        )}

        {activeExams.length === 0 ? (
          <div className="rd-empty">
            <p className="rd-empty-icon">🌱</p>
            <p className="rd-empty-title">Nothing to show yet</p>
            <p className="rd-empty-desc">
              Start studying with <strong>Spaced Repetition</strong> mode or <strong>Mark cards as mastered</strong> — your progress will appear here.
            </p>
          </div>
        ) : current && (
          <div className="rd-body">
            {/* Score hero */}
            <div className="rd-score-hero">
              <div className="rd-score-ring-wrap">                <svg className="rd-score-ring" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border-subtle)" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke={scoreColor(current.score)}
                    strokeWidth="10"
                    strokeDasharray={`${(current.score / 100) * 327} 327`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    style={{ transition: "stroke-dasharray 0.6s ease" }}
                  />                  <text x="60" y="56" textAnchor="middle" className="rd-ring-pct" style={{ fill: scoreColor(current.score) }}>{current.score}%</text>
                  <text x="60" y="72" textAnchor="middle" className="rd-ring-label">readiness</text>
                </svg>
              </div>
              <div className="rd-score-info">
                <p className="rd-score-status" style={{ color: scoreColor(current.score) }}>{scoreLabel(current.score)}</p>
                <p className="rd-score-exam">{EXAM_META[current.exam]?.fullName}</p>
                <p className="rd-score-hint">Score = (Mastered + SRS Mature) ÷ total cards</p>
              </div>
            </div>            {/* Stat pills */}
            <div className="rd-stat-grid">
              <div className="rd-stat-pill">
                <span className="rd-stat-val">{current.cards.length}</span>
                <span className="rd-stat-lbl">Total Cards</span>
              </div>              <div className="rd-stat-pill rd-stat-mature">
                <span className="rd-stat-val" style={{ color: "var(--srs-dot-mature)" }}><span className="srs-emoji-dot" style={{background:"var(--srs-dot-mature)"}}></span> {current.mature}</span>
                <span className="rd-stat-lbl">Mature</span>
              </div>
              <div className="rd-stat-pill rd-stat-learning">
                <span className="rd-stat-val" style={{ color: "var(--srs-dot-learning)" }}><span className="srs-emoji-dot" style={{background:"var(--srs-dot-learning)"}}></span> {current.learning}</span>
                <span className="rd-stat-lbl">Learning</span>
              </div>              <div className="rd-stat-pill rd-stat-due">
                <span className="rd-stat-val" style={{ color: "var(--srs-dot-new)" }}><span className="srs-emoji-dot" style={{background:"var(--srs-dot-new)"}}></span> {current.cards.length - current.tracked}</span>
                <span className="rd-stat-lbl">Reviewing</span>
              </div>
            </div>

            {/* Category breakdown */}
            <section className="rd-section">
              <h3 className="rd-section-title">📂 By Category</h3>
              <div className="rd-category-list">
                {categories.map(([cat, stats]) => {
                  const pct = Math.round(((stats.mastered + stats.mature - stats.masteredAndMature) / stats.total) * 100);
                  return (
                    <div key={cat} className="rd-cat-row">
                      <div className="rd-cat-header">
                        <span className="rd-cat-name">{cat}</span>                        <span className="rd-cat-counts">                          {stats.mature > 0 && <span className="rd-badge mature"><span className="srs-emoji-dot" style={{background:"var(--srs-dot-mature)"}}></span> {stats.mature}</span>}
                          {stats.learning > 0 && <span className="rd-badge learning"><span className="srs-emoji-dot" style={{background:"var(--srs-dot-learning)"}}></span> {stats.learning}</span>}
                          {(stats.total - (stats.mature + stats.learning)) > 0 && <span className="rd-badge not-started"><span className="srs-emoji-dot" style={{background:"var(--srs-dot-new)"}}></span> {stats.total - stats.mature - stats.learning}</span>}
                          <span className="rd-cat-total">{stats.total} cards</span>
                        </span>
                      </div>
                      <div className="rd-cat-bar-track">
                        <div
                          className="rd-cat-bar-fill"
                          style={{ width: `${pct}%`, background: scoreColor(pct) }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Difficulty breakdown */}
            <section className="rd-section">
              <h3 className="rd-section-title">🎯 By Difficulty</h3>
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
                        <div className="rd-diff-bar-fill" style={{ width: `${pct}%`, background: d.color }} />
                      </div>
                      <span className="rd-diff-pct" style={{ color: d.color }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Card type breakdown */}
            <section className="rd-section">
              <h3 className="rd-section-title">🃏 Card Types in Deck</h3>
              <div className="rd-type-grid">
                {TYPE_META.filter((t) => (current.typeCount[t.key] || 0) > 0).map((t) => (
                  <div key={t.key} className="rd-type-chip">
                    <span className="rd-type-label">{t.label}</span>
                    <span className="rd-type-count">{current.typeCount[t.key]}</span>
                  </div>
                ))}
              </div>            </section>
          </div>
        )}
      </div>
    </div>
  );
}
