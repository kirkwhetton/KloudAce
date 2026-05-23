import React, { useState, useMemo } from "react";
import { useAuthContext } from "./AuthProvider";
import ConfirmDialog from "../ConfirmDialog";
import flashcards from "../flashcards";
import { clearSrsDataForExam, clearSrsDataForCards } from "../spacedRepetition";
import { useTheme, THEMES } from "../useTheme";
import "./UserProfile.css";

function StreakCalendar({ activeDates = [], streak = 0, longestStreak = 0 }) {
  const activeSet = new Set(activeDates);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Build 15 weeks × 7 days grid, newest week on the right
  const WEEKS = 15;
  const cells = [];
  const startDay = new Date(today);
  startDay.setDate(today.getDate() - (WEEKS * 7 - 1));

  for (let w = 0; w < WEEKS; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDay);
      date.setDate(startDay.getDate() + w * 7 + d);
      const str = date.toISOString().slice(0, 10);
      week.push({ str, active: activeSet.has(str), isToday: str === today.toISOString().slice(0, 10), future: date > today });
    }
    cells.push(week);
  }

  const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="streak-calendar">
      <div className="streak-calendar-stats">
        <span>🔥 <strong>{streak}</strong> day streak</span>
        <span>🏆 Best: <strong>{longestStreak}</strong></span>
      </div>
      <div className="streak-calendar-grid">
        <div className="streak-calendar-days">
          {DAY_LABELS.map((l, i) => <span key={i}>{l}</span>)}
        </div>
        <div className="streak-calendar-weeks">
          {cells.map((week, wi) => (
            <div key={wi} className="streak-calendar-week">
              {week.map((cell) => (
                <div
                  key={cell.str}
                  className={`streak-cell${cell.active ? " active" : ""}${cell.isToday ? " today" : ""}${cell.future ? " future" : ""}`}
                  title={cell.str}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UserProfile({ onClose, onOpenDashboard, streak = 0, longestStreak = 0, activeDates = [], dailyGoal = 20, onSetGoal }) {
  const { user, updateProfile, changePassword, error, setError } = useAuthContext();
  const { theme, setTheme } = useTheme(user?.id);

  // ── Profile tab state
  const [name, setName]   = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileMsg, setProfileMsg] = useState(null);
  const [profileSaving, setProfileSaving] = useState(false);

  // ── Password tab state
  const [currentPw, setCurrentPw]   = useState("");
  const [newPw, setNewPw]           = useState("");
  const [confirmPw, setConfirmPw]   = useState("");
  const [pwMsg, setPwMsg]           = useState(null);
  const [pwSaving, setPwSaving]     = useState(false);
  // ── Tab
  const [tab, setTab] = useState("profile"); // "profile" | "password" | "stats" | "settings"

  // ── Settings
  const settingsKey = user ? `azfc_settings_${user.id}` : "azfc_settings_guest";
  const loadSettings = () => {
    try { return JSON.parse(localStorage.getItem(settingsKey) || "{}"); }
    catch { return {}; }
  };  const [hideAnswers, setHideAnswersState] = useState(() => loadSettings().hideAnswers ?? false);
  const toggleHideAnswers = (val) => {
    setHideAnswersState(val);
    const s = loadSettings();
    localStorage.setItem(settingsKey, JSON.stringify({ ...s, hideAnswers: val }));
  };

  const [hideDifficulty, setHideDifficultyState] = useState(() => loadSettings().hideDifficulty ?? false);
  const toggleHideDifficulty = (val) => {
    setHideDifficultyState(val);
    const s = loadSettings();
    localStorage.setItem(settingsKey, JSON.stringify({ ...s, hideDifficulty: val }));
  };

  const [soundEnabled, setSoundEnabledState] = useState(() => loadSettings().soundEnabled ?? false);
  const toggleSound = (val) => {
    setSoundEnabledState(val);
    const s = loadSettings();
    localStorage.setItem(settingsKey, JSON.stringify({ ...s, soundEnabled: val }));
  };

  // ── Stats from localStorage
  function getStats() {
    const prefix = `azfc_srs_${user?.id}_`;
    const exams = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(prefix)) {
        const exam = k.replace(prefix, "");
        try {
          const data = JSON.parse(localStorage.getItem(k) || "{}");
          const records = Object.values(data);
          exams.push({
            exam,
            tracked: records.length,
            mature:  records.filter((r) => r.repetitions >= 3).length,
            learning: records.filter((r) => r.repetitions > 0 && r.repetitions < 3).length,
          });
        } catch { /* skip */ }
      }
    }
    const masteredCount = (() => {
      try { return JSON.parse(localStorage.getItem(`azfc_mastered_${user?.id}`) || "[]").length; }
      catch { return 0; }
    })();
    return { exams, masteredCount };
  }  const [statsKey, setStatsKey] = useState(0);
  const [clearConfirm, setClearConfirm] = useState(false);
  const [granularConfirm, setGranularConfirm] = useState(null); // { title, message, onConfirm }
  const [expandedExam, setExpandedExam] = useState(null); // exam name whose categories are visible
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stats = useMemo(() => getStats(), [statsKey]);  const handleClearAllSrs = () => {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(`azfc_srs_${user?.id}_`)) keys.push(k);
    }
    if (keys.length === 0) return;
    keys.forEach((k) => localStorage.removeItem(k));
    setStatsKey((n) => n + 1);
  };

  const handleClearExamSrs = (exam) => {
    clearSrsDataForExam(user?.id, exam);
    setStatsKey((n) => n + 1);
    setExpandedExam(null);
  };

  const handleClearCategorySrs = (exam, category) => {
    const cardIds = flashcards
      .filter((c) => c.exam === exam && c.category === category)
      .map((c) => c.id);
    clearSrsDataForCards(user?.id, exam, cardIds);
    setStatsKey((n) => n + 1);
  };

  // Build per-category breakdown for an exam from localStorage
  const getCategoryStats = (exam) => {
    const key = `azfc_srs_${user?.id}_${exam}`;
    let data = {};
    try { data = JSON.parse(localStorage.getItem(key) || "{}"); } catch { /* ignore */ }
    const idToRecord = data;
    const catMap = {};
    flashcards
      .filter((c) => c.exam === exam && idToRecord[String(c.id)])
      .forEach((c) => {
        const cat = c.category || "Uncategorised";
        if (!catMap[cat]) catMap[cat] = { tracked: 0, mature: 0, learning: 0, cardIds: [] };
        const r = idToRecord[String(c.id)];
        catMap[cat].tracked++;
        catMap[cat].cardIds.push(c.id);
        if (r.repetitions >= 3) catMap[cat].mature++;
        else if (r.repetitions > 0) catMap[cat].learning++;
      });
    return Object.entries(catMap).sort((a, b) => b[1].tracked - a[1].tracked);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setError(null); setProfileMsg(null);
    if (!name.trim() || !email.trim()) { setProfileMsg({ ok: false, text: "Name and email are required." }); return; }
    setProfileSaving(true);
    const ok = await updateProfile({ name: name.trim(), email: email.trim() });
    setProfileSaving(false);
    setProfileMsg(ok ? { ok: true, text: "Profile updated successfully." } : { ok: false, text: error || "Update failed." });
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setError(null); setPwMsg(null);
    if (!currentPw || !newPw || !confirmPw) { setPwMsg({ ok: false, text: "All fields are required." }); return; }
    if (newPw.length < 10) { setPwMsg({ ok: false, text: "New password must be at least 10 characters." }); return; }
    if (newPw !== confirmPw) { setPwMsg({ ok: false, text: "New passwords do not match." }); return; }
    setPwSaving(true);
    const ok = await changePassword({ currentPassword: currentPw, newPassword: newPw });
    setPwSaving(false);
    if (ok) {
      setPwMsg({ ok: true, text: "Password changed successfully." });
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
    } else {
      setPwMsg({ ok: false, text: error || "Password change failed." });
    }
  };

  return (    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>        {clearConfirm && (
          <ConfirmDialog
            title="Clear all SRS tracking?"
            message={`This resets every card's interval, ease factor and review history across all exams. This cannot be undone.`}
            confirmLabel="Yes, clear all"
            onConfirm={() => { handleClearAllSrs(); setClearConfirm(false); }}
            onCancel={() => setClearConfirm(false)}
          />
        )}
        {granularConfirm && (
          <ConfirmDialog
            title={granularConfirm.title}
            message={granularConfirm.message}
            confirmLabel="Yes, clear"
            onConfirm={() => { granularConfirm.onConfirm(); setGranularConfirm(null); }}
            onCancel={() => setGranularConfirm(null)}
          />
        )}
        <button className="profile-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase() || "?"}
          </div>
          <div>
            <h2 className="profile-name">{user?.name}</h2>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>

        <div className="profile-tabs">
          {[            { id: "profile",  label: "👤 Profile" },
            { id: "password", label: "🔒 Password" },
            { id: "stats",    label: "📊 Stats" },
            { id: "settings", label: "⚙️ Settings" },
          ].map((t) => (
            <button
              key={t.id}
              className={`profile-tab${tab === t.id ? " active" : ""}`}
              onClick={() => { setTab(t.id); setProfileMsg(null); setPwMsg(null); setError(null); }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Profile tab ── */}
        {tab === "profile" && (
          <form className="profile-form" onSubmit={handleProfileSave}>
            <label className="profile-label">
              Display name
              <input
                className="profile-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label className="profile-label">
              Email address
              <input
                className="profile-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>
            {profileMsg && (
              <p className={`profile-msg ${profileMsg.ok ? "ok" : "err"}`}>{profileMsg.text}</p>
            )}
            <button className="profile-save-btn" type="submit" disabled={profileSaving}>
              {profileSaving ? "Saving…" : "Save changes"}
            </button>

            {/* ── Premium status ── */}
            <div className={`premium-profile-card${user?.isPremium ? " premium-profile-card--active" : ""}`}>
              <div className="premium-profile-card-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="premium-profile-icon">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span className="premium-profile-title">
                  {user?.isPremium ? "Premium" : "Free Plan"}
                </span>
                <span className={`premium-profile-badge${user?.isPremium ? " premium-profile-badge--on" : ""}`}>
                  {user?.isPremium ? "Active" : "Upgrade"}
                </span>
              </div>
              {user?.isPremium ? (
                <ul className="premium-profile-perks">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Full access to all exams and card types
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Spaced repetition, exam mode &amp; readiness dashboard
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Difficulty filters, flagged &amp; mastered card tracking
                  </li>
                </ul>
              ) : (
                <>
                  <p className="premium-profile-desc">
                    Upgrade to unlock spaced repetition, exam mode, readiness dashboard, difficulty filters, and full card access.
                  </p>
                  <button className="premium-profile-cta">
                    Upgrade to Premium
                  </button>
                </>
              )}
            </div>
          </form>
        )}

        {/* ── Password tab ── */}
        {tab === "password" && (
          <form className="profile-form" onSubmit={handlePasswordSave}>
            <label className="profile-label">
              Current password
              <input
                className="profile-input"
                type="password"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                autoComplete="current-password"
              />
            </label>
            <label className="profile-label">
              New password
              <input
                className="profile-input"
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                autoComplete="new-password"
              />
            </label>
            <label className="profile-label">
              Confirm new password
              <input
                className="profile-input"
                type="password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                autoComplete="new-password"
              />
            </label>
            {pwMsg && (
              <p className={`profile-msg ${pwMsg.ok ? "ok" : "err"}`}>{pwMsg.text}</p>
            )}
            <button className="profile-save-btn" type="submit" disabled={pwSaving}>
              {pwSaving ? "Saving…" : "Change password"}
            </button>
          </form>
        )}

        {/* ── Stats tab ── */}
        {tab === "stats" && (
          <div className="profile-stats">
            <StreakCalendar activeDates={activeDates} streak={streak} longestStreak={longestStreak} />
            <div className="profile-stats-summary">
              <div className="pstat-card">
                <span className="pstat-value">{stats.masteredCount}</span>
                <span className="pstat-label">⭐ Mastered</span>
              </div>
              <div className="pstat-card">
                <span className="pstat-value">{stats.exams.reduce((s, e) => s + e.mature, 0)}</span>
                <span className="pstat-label"><span className="srs-emoji-dot" style={{background:"var(--srs-dot-mature)"}}></span> Mature</span>
              </div>
              <div className="pstat-card">
                <span className="pstat-value">{stats.exams.reduce((s, e) => s + e.learning, 0)}</span>
                <span className="pstat-label"><span className="srs-emoji-dot" style={{background:"var(--srs-dot-learning)"}}></span> Learning</span>
              </div>
            </div>
            {onOpenDashboard && (
              <button
                className="profile-dashboard-btn"
                onClick={() => { onClose(); onOpenDashboard(); }}
              >
                📊 View Full Readiness Dashboard
              </button>
            )}
            {stats.exams.length === 0 ? (
              <p className="profile-empty">No SRS data yet — start reviewing cards to see progress here.</p>            ) : (
              <>
                <table className="profile-stats-table">
                  <thead>
                    <tr>
                      <th>Exam</th>
                      <th>Tracked</th>                      <th><span className="srs-emoji-dot" style={{background:"var(--srs-dot-mature)"}}></span> Mature</th>
                      <th><span className="srs-emoji-dot" style={{background:"var(--srs-dot-learning)"}}></span> Learning</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>                    {stats.exams.map((e) => (
                      <React.Fragment key={e.exam}>
                        <tr>
                          <td>
                            <button
                              className="srs-expand-btn"
                              onClick={() => setExpandedExam(expandedExam === e.exam ? null : e.exam)}
                              title="Show/hide category breakdown"
                            >
                              {expandedExam === e.exam ? "▾" : "▸"} {e.exam}
                            </button>
                          </td>
                          <td>{e.tracked}</td>
                          <td>{e.mature}</td>
                          <td>{e.learning}</td>
                          <td>
                            <button
                              className="srs-clear-exam-btn"
                              title={`Clear SRS for ${e.exam}`}
                              onClick={() => setGranularConfirm({
                                title: `Clear SRS for ${e.exam}?`,
                                message: `This resets all ${e.tracked} tracked card(s) for ${e.exam}. This cannot be undone.`,
                                onConfirm: () => handleClearExamSrs(e.exam),
                              })}
                            >
                              🗑
                            </button>
                          </td>
                        </tr>
                        {expandedExam === e.exam && getCategoryStats(e.exam).map(([cat, cs]) => (
                          <tr key={`${e.exam}-${cat}`} className="srs-category-row">
                            <td className="srs-cat-name">↳ {cat}</td>
                            <td>{cs.tracked}</td>
                            <td>{cs.mature}</td>
                            <td>{cs.learning}</td>
                            <td>
                              <button
                                className="srs-clear-exam-btn"
                                title={`Clear SRS for ${cat}`}
                                onClick={() => setGranularConfirm({
                                  title: `Clear SRS for "${cat}"?`,
                                  message: `This resets ${cs.tracked} card(s) in "${cat}" (${e.exam}). This cannot be undone.`,
                                  onConfirm: () => handleClearCategorySrs(e.exam, cat),
                                })}
                              >
                                🗑
                              </button>
                            </td>
                          </tr>                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
                <button className="profile-clear-srs-btn" onClick={() => setClearConfirm(true)}>
                  🗑 Clear all SRS tracking
                </button>
              </>
            )}</div>
        )}        {/* ── Settings tab ── */}
        {tab === "settings" && (
          <div className="profile-settings">            <div className="settings-row">
              <div className="settings-row-label">
                <span className="settings-row-title">🙈 Hide answers</span>
                <span className="settings-row-desc">
                  Hides the correct answer and explanation after answering — helps avoid memorising answer text instead of understanding.
                </span>
              </div>
              <button
                className={`toggle${hideAnswers ? " on" : ""}`}
                onClick={() => toggleHideAnswers(!hideAnswers)}
                aria-pressed={hideAnswers}
                aria-label="Toggle hide answers"
              >
                <span className="toggle-thumb" />
              </button>
            </div>
            <div className="settings-row">
              <div className="settings-row-label">
                <span className="settings-row-title">🏷️ Hide difficulty badges</span>
                <span className="settings-row-desc">
                  Hides the Easy / Medium / Hard / Extreme badge on each card — useful if you don't want difficulty hints while studying.
                </span>
              </div>
              <button
                className={`toggle${hideDifficulty ? " on" : ""}`}
                onClick={() => toggleHideDifficulty(!hideDifficulty)}
                aria-pressed={hideDifficulty}
                aria-label="Toggle hide difficulty badges"
              >
                <span className="toggle-thumb" />
              </button>
            </div>

            <div className="settings-row">
              <div className="settings-row-label">
                <span className="settings-row-title">🔊 Sound effects</span>
                <span className="settings-row-desc">
                  Play a sound on correct and incorrect answers.
                </span>
              </div>
              <button
                className={`toggle${soundEnabled ? " on" : ""}`}
                onClick={() => toggleSound(!soundEnabled)}
                aria-pressed={soundEnabled}
                aria-label="Toggle sound effects"
              >
                <span className="toggle-thumb" />
              </button>
            </div>

            <div className="settings-row">
              <div className="settings-row-label">
                <span className="settings-row-title">🎯 Daily goal</span>
                <span className="settings-row-desc">Target number of cards to answer each day.</span>
              </div>
              <select
                className="goal-select"
                value={dailyGoal}
                onChange={e => onSetGoal?.(Number(e.target.value))}
              >
                {[5, 10, 15, 20, 30, 50].map(n => (
                  <option key={n} value={n}>{n} cards</option>
                ))}
              </select>
            </div>

            {/* ── Appearance ── */}
            <div className="settings-section-title">Appearance</div>
            <div className="theme-grid">
              {THEMES.map(({ value, label }) => (
                <button
                  key={value}
                  className={`theme-btn${theme === value ? " active" : ""}`}
                  onClick={() => setTheme(value)}
                >
                  <span className={`theme-swatch theme-swatch--${value}`} />
                  <span className="theme-btn-label">{label.replace(/^[^\s]+\s/, "")}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
