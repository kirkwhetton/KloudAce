import { useState, useEffect } from "react";
import flashcards, { EXAM_META } from "../flashcards";
import { loadAllTopics, loadExamCardCounts, loadPortalCards, loadTerraformLabCards, SUPABASE_EXAMS } from "../lib/cardLoader";

const DECK_COLOURS = [
  { from: "#f59e0b", to: "#b45309", icon: "#fcd34d" },
  { from: "#10b981", to: "#065f46", icon: "#6ee7b7" },
  { from: "#ec4899", to: "#9d174d", icon: "#f9a8d4" },
  { from: "#3b82f6", to: "#1e3a8a", icon: "#93c5fd" },
  { from: "#8b5cf6", to: "#4c1d95", icon: "#c4b5fd" },
  { from: "#ef4444", to: "#7f1d1d", icon: "#fca5a5" },
  { from: "#06b6d4", to: "#164e63", icon: "#67e8f9" },
  { from: "#84cc16", to: "#365314", icon: "#bef264" },
];

const TOPIC_ACCENTS = [
  "#0078d4", "#6366f1", "#10b981", "#f59e0b",
  "#ec4899", "#8b5cf6", "#0891b2", "#ef4444",
  "#84cc16", "#06b6d4", "#3b82f6", "#d97706",
];

const EXAM_COLOURS = {
  "AZ-900": { from: "#0ea5e9", to: "#0369a1", icon: "#7dd3fc" },  // sky blue
  "AZ-104": { from: "#6366f1", to: "#3730a3", icon: "#a5b4fc" },  // indigo
  "AZ-700": { from: "#0891b2", to: "#155e75", icon: "#67e8f9" },  // cyan
  "AZ-305": { from: "#8b5cf6", to: "#5b21b6", icon: "#c4b5fd" },  // violet
};

// Clean SVG icons — no emoji, consistent weight and style
const EXAM_ICONS = {
  // AZ-900: Cloud (foundations)
  "AZ-900": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 0 1 0 9Z"/>
    </svg>
  ),
  // AZ-104: Server / admin
  "AZ-104": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="5" rx="1"/>
      <rect x="2" y="11" width="20" height="5" rx="1"/>
      <rect x="2" y="19" width="20" height="2" rx="1"/>
      <circle cx="6" cy="5.5" r="0.75" fill="currentColor" stroke="none"/>
      <circle cx="6" cy="13.5" r="0.75" fill="currentColor" stroke="none"/>
    </svg>
  ),
  // AZ-700: Network / connectivity
  "AZ-700": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  // AZ-305: Architecture / design
  "AZ-305": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <path d="M17.5 14v3m0 3v.5M17.5 17h-3m6 0h.5"/>
    </svg>
  ),
};

// ── Static sub-components (defined outside to prevent remount on parent re-render) ──
const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" aria-hidden="true">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const Logo = () => (
  <>
    <div className="splash-cloud-logo">
      <svg className="splash-cloud-icon" viewBox="0 0 260 165" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <path id="splashCloud" d="M50 115C30 115 15 100 15 82C15 66 27 53 43 51C45 30 63 14 85 14C102 14 117 24 124 39C129 36 135 34 141 34C159 34 174 49 174 67C188 69 199 81 199 95C199 106 191 115 180 115Z"/>
        </defs>
        <use href="#splashCloud" x="20" y="27" fill="#185FA5"/>
        <use href="#splashCloud" x="40" y="47" fill="#ffffff" stroke="#2980D9" strokeWidth="5"/>
      </svg>
      <div className="splash-cloud-text">
        <span className="splash-cloud-brand">Kloud<span className="title-ace">Ace</span></span>
      </div>
    </div>
    <p className="splash-cloud-tagline">Your cloud learning and certification hub</p>
  </>
);

const BackButton = ({ onClick }) => (
  <button type="button" className="splash-back" onClick={onClick}><Chevron /> Back</button>
);

const ProvidersButton = ({ onBack }) => onBack ? (
  <button type="button" className="splash-providers-btn" onClick={onBack}><Chevron /> Providers</button>
) : null;

const SignOutButton = ({ onSignOut }) => (
  <button className="splash-signout" onClick={onSignOut}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
    Sign out
  </button>
);

export default function ExamSelect({ user, isGuest, isPremium, onSelect, onLogout, onOpenDecks, onSelectByTopic, onSelectCustomDeck, onBack, loadingExam, cardLoadError }) {
  const exams = Object.values(EXAM_META);
  const handleSignOut = () => onLogout();
  const [view, setView] = useState(() => {
    if (!user?.id) return "chooser";
    try {
      const p = JSON.parse(localStorage.getItem(`azfc_settings_${user.id}`) || "{}").preferredStudyMode;
      return ["exams", "topics", "labs", "games"].includes(p) ? p : "chooser";
    } catch { return "chooser"; }
  });
  const [animClass, setAnimClass] = useState(() => {
    if (!user?.id) return "splash-initial";
    try {
      const p = JSON.parse(localStorage.getItem(`azfc_settings_${user.id}`) || "{}").preferredStudyMode;
      return ["exams", "topics", "labs", "games"].includes(p) ? "" : "splash-initial";
    } catch { return "splash-initial"; }
  });
  const [showGuestGamesModal, setShowGuestGamesModal] = useState(false);
  const [showGuestLabsModal, setShowGuestLabsModal] = useState(false);
  const [showLabUpgradeModal, setShowLabUpgradeModal] = useState(false);
  const [gameExam, setGameExam] = useState("ALL");
  const [portalCards, setPortalCards] = useState(null);
  const [terraformCards, setTerraformCards] = useState(null);
  const [labExam, setLabExam] = useState("ALL");
  const [customDecks, setCustomDecks] = useState([]);
  const [topicSearch, setTopicSearch] = useState("");
const [remoteTopics, setRemoteTopics] = useState(null);
  const [examCardCounts, setExamCardCounts] = useState(null);

  const [typedGreeting, setTypedGreeting] = useState("");
  const [typedSub, setTypedSub] = useState("");
  const [typingPhase, setTypingPhase] = useState("greeting");

  useEffect(() => {
    if (view !== "chooser") return;
    const firstName = user?.name?.split(" ")[0] || "";
    const greeting = `Welcome back, ${firstName}`;
    const sub = "How would you like to study today?";
    setTypedGreeting("");
    setTypedSub("");
    setTypingPhase("greeting");
    let cancelled = false;
    const typeText = (text, setter, speed, onDone) => {
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        i++;
        setter(text.slice(0, i));
        if (i < text.length) setTimeout(tick, speed);
        else onDone?.();
      };
      setTimeout(tick, speed);
    };
    typeText(greeting, setTypedGreeting, 56, () => {
      if (cancelled) return;
      setTimeout(() => {
        if (cancelled) return;
        setTypingPhase("sub");
        typeText(sub, setTypedSub, 38, () => {
          if (!cancelled) setTypingPhase("done");
        });
      }, 180);
    });
    return () => { cancelled = true; };
  }, [view]);

  useEffect(() => {
    const load = () => setCustomDecks(JSON.parse(localStorage.getItem("customDecks") || "[]"));
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  useEffect(() => {
    loadExamCardCounts().then(c => { if (c) setExamCardCounts(c); });
  }, []);

  // Load topics on mount if that's the preferred starting view
  useEffect(() => {
    if (view === "topics" && !remoteTopics)
      loadAllTopics().then(t => { if (t) setRemoteTopics(t); });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Load portal + terraform cards when Labs view is opened
  useEffect(() => {
    if (view !== "labs") return;
    if (!portalCards) loadPortalCards().then(c => { if (c) setPortalCards(c); });
    if (!terraformCards) loadTerraformLabCards().then(c => { setTerraformCards(c ?? []); });
  }, [view]); // eslint-disable-line react-hooks/exhaustive-deps

  // Animated navigation: drill in (forward) or back to chooser
  const navigateTo = (nextView) => {
    if (nextView === "topics" && !remoteTopics)
      loadAllTopics().then(t => { if (t) setRemoteTopics(t); });

    // Persist or clear preferred study mode
    if (user?.id) {
      try {
        const key = `azfc_settings_${user.id}`;
        const s = JSON.parse(localStorage.getItem(key) || "{}");
        if (nextView === "chooser") {
          const { preferredStudyMode: _, ...rest } = s;
          localStorage.setItem(key, JSON.stringify(rest));
        } else {
          localStorage.setItem(key, JSON.stringify({ ...s, preferredStudyMode: nextView }));
        }
      } catch {}
    }

    const goingBack = nextView === "chooser";
    if (goingBack) {
      setView(nextView);
      setAnimClass("");
    } else {
      setAnimClass("subview-enter-prep");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setView(nextView);
          setAnimClass("subview-enter");
          setTimeout(() => setAnimClass(""), 380);
        });
      });
    }
  };

const topicMap = flashcards.reduce((acc, c) => {
    const t = (c.category || "Uncategorised").trim();
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});
  const topics = remoteTopics ?? Object.entries(topicMap).sort((a, b) => b[1] - a[1]);

  const handleSelectTopic = (topic) => {
    if (onSelectByTopic) onSelectByTopic(topic);
    else onSelect && onSelect(`TOPIC:${topic}`);
  };
  // ── Chooser ──────────────────────────────────────────────────
  if (view === "chooser") {
    return (
      <>
      <div className="splash-page">
        <div className={`splash-card ${animClass}`}>
          <ProvidersButton onBack={onBack} />
          <Logo />
          <div className="splash-greeting-block">
            <h2 className="splash-greeting">
              {typedGreeting}
              {typingPhase === "greeting" && <span className="typing-cursor" aria-hidden="true">|</span>}
            </h2>
            <p className="splash-sub">
              {typedSub}
              {typingPhase === "sub" && <span className="typing-cursor" aria-hidden="true">|</span>}
            </p>
          </div>
          <div className="splash-chooser-grid">
              <button className="splash-choice-card" style={{ background: "linear-gradient(135deg, #0078d4, #004e8c)" }} onClick={() => navigateTo("exams")}>
                <span className="splash-choice-icon" style={{ color: "#93c5fd", background: "rgba(255,255,255,0.15)", borderColor: "rgba(147,197,253,0.4)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </span>
                <div className="splash-choice-title">Exam Cards</div>
                <div className="splash-choice-desc">Study official exam decks (AZ-900, AZ-104, AZ-700…)</div>
                <div className="splash-choice-cta">Start exam study →</div>
              </button>

              <button className="splash-choice-card" style={{ background: "linear-gradient(135deg, #0369a1, #0c4a6e)" }} onClick={() => isGuest ? setShowGuestLabsModal(true) : navigateTo("labs")}>
                <span className="splash-choice-icon" style={{ color: "#7dd3fc", background: "rgba(255,255,255,0.15)", borderColor: "rgba(125,211,252,0.4)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                    <path d="M7 8h10M7 11h6"/>
                  </svg>
                </span>
                <div className="splash-choice-title">Labs</div>
                <div className="splash-choice-desc">Hands-on Azure portal simulations — practice configuring real services</div>
                <div className="splash-choice-cta">Open Labs →</div>
              </button>

              <button className="splash-choice-card" style={{ background: "linear-gradient(135deg, #d97706, #92400e)" }} onClick={() => navigateTo("topics")}>
                <span className="splash-choice-icon" style={{ color: "#fcd34d", background: "rgba(255,255,255,0.15)", borderColor: "rgba(252,211,77,0.4)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </span>
                <div className="splash-choice-title">By Topic</div>
                <div className="splash-choice-desc">Browse cards by subject across all exams</div>
                <div className="splash-choice-cta">Browse topics →</div>
              </button>

              <button className="splash-choice-card" style={{ background: "linear-gradient(135deg, #0f766e, #134e4a)" }} onClick={() => isGuest ? setShowGuestGamesModal(true) : navigateTo("games")}>
                <span className="splash-choice-icon" style={{ color: "#5eead4", background: "rgba(255,255,255,0.15)", borderColor: "rgba(94,234,212,0.4)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="9" height="9" rx="1.5"/>
                    <rect x="13" y="2" width="9" height="9" rx="1.5"/>
                    <rect x="2" y="13" width="9" height="9" rx="1.5"/>
                    <rect x="13" y="13" width="9" height="9" rx="1.5"/>
                  </svg>
                </span>
                <div className="splash-choice-title">Games</div>
                <div className="splash-choice-desc">Connections puzzles and learning games</div>
                <div className="splash-choice-cta">Play now →</div>
              </button>
            </div>

          <SignOutButton onSignOut={handleSignOut} />
        </div>
      </div>

      {showGuestGamesModal && (
        <div className="guest-games-overlay" onClick={() => setShowGuestGamesModal(false)}>
          <div className="guest-games-modal" onClick={e => e.stopPropagation()}>
            <div className="guest-games-modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="28" height="28">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3 className="guest-games-modal-title">Account required</h3>
            <p className="guest-games-modal-body">Games are available to registered users. Create a free account to access Connections puzzles and more.</p>
            <div className="guest-games-modal-actions">
              <button className="guest-games-modal-btn guest-games-modal-btn--primary" onClick={handleSignOut}>
                Sign up / Sign in
              </button>
              <button className="guest-games-modal-btn guest-games-modal-btn--ghost" onClick={() => setShowGuestGamesModal(false)}>
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      {showGuestLabsModal && (
        <div className="guest-games-overlay" onClick={() => setShowGuestLabsModal(false)}>
          <div className="guest-games-modal" onClick={e => e.stopPropagation()}>
            <div className="guest-games-modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="28" height="28">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3 className="guest-games-modal-title">Account required</h3>
            <p className="guest-games-modal-body">Labs are available to registered users. Create a free account to access Azure portal simulations and hands-on exercises.</p>
            <div className="guest-games-modal-actions">
              <button className="guest-games-modal-btn guest-games-modal-btn--primary" onClick={handleSignOut}>
                Sign up / Sign in
              </button>
              <button className="guest-games-modal-btn guest-games-modal-btn--ghost" onClick={() => setShowGuestLabsModal(false)}>
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      {showLabUpgradeModal && (
        <div className="guest-games-overlay" onClick={() => setShowLabUpgradeModal(false)}>
          <div className="guest-games-modal" onClick={e => e.stopPropagation()}>
            <div className="guest-games-modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="28" height="28">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="guest-games-modal-title">Premium lab</h3>
            <p className="guest-games-modal-body">This lab requires a Premium subscription. Upgrade to unlock all portal simulations and hands-on Azure exercises.</p>
            <div className="guest-games-modal-actions">
              <button className="guest-games-modal-btn guest-games-modal-btn--ghost" onClick={() => setShowLabUpgradeModal(false)}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
      </>
    );
  }

  // ── Exams subview ────────────────────────────────────────────
  if (view === "exams") {
    return (
      <div className="splash-page">
        <div className={`splash-card ${animClass}`}>
          <BackButton onClick={() => navigateTo("chooser")} />
          <div className="splash-greeting-block">
            <h2 className="splash-greeting">Which exam?</h2>
            <p className="splash-sub">Pick an official exam deck to start studying.</p>
          </div>

          <div className="splash-cards">
            {exams.map((meta) => {
              const colours = EXAM_COLOURS[meta.exam] || { from: "#0078d4", to: "#004e8c", icon: "#60b8ff" };
              const icon = EXAM_ICONS[meta.exam] || (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                </svg>
              );
              const bundledExtra = flashcards.filter((c) => c.exam === meta.exam && (c.type === "hotspot" || c.type === "image")).length;
              const count = examCardCounts
                ? (examCardCounts[meta.exam] || 0) + bundledExtra
                : SUPABASE_EXAMS.has(meta.exam)
                  ? null
                  : flashcards.filter((c) => c.exam === meta.exam).length;
              return (
                <button
                  key={meta.exam}
                  className="splash-exam-card"
                  data-tour="exam-card"
                  style={{ background: `linear-gradient(135deg, ${colours.from}, ${colours.to})` }}
                  onClick={() => onSelect(meta.exam)}
                  disabled={!!loadingExam}
                >
                  <span className="splash-exam-icon" style={{ color: colours.icon, background: "rgba(255,255,255,0.15)", borderColor: `${colours.icon}44` }}>{icon}</span>
                  <span className="splash-exam-code">{meta.exam}</span>
                  <span className="splash-exam-name">{meta.fullName}</span>
                  {loadingExam === meta.exam
                    ? <span className="splash-exam-count">Loading… (may take 30s)</span>
                    : cardLoadError === meta.exam
                      ? <span className="splash-exam-count" style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>Failed to load — tap to retry</span>
                      : <span className="splash-exam-count">{count === null ? "…" : `${count} cards`}</span>
                  }
                  {meta.premium && <span className="splash-premium-badge">👑 Premium</span>}
                  <span className="splash-exam-arrow">
                    {loadingExam === meta.exam
                      ? <svg className="splash-loading-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" width="14" height="14"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                      : cardLoadError === meta.exam
                        ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="14" height="14"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
                    }
                  </span>
                </button>
              );
            })}
          </div>

          <SignOutButton onSignOut={handleSignOut} />
        </div>
      </div>
    );
  }
  // ── Topics subview ───────────────────────────────────────────
  if (view === "topics") {
    const filteredTopics = topics.filter(([topic]) =>
      topic.toLowerCase().includes(topicSearch.toLowerCase())
    );
    return (
      <div className="splash-page">
        <div className={`splash-card ${animClass}`}>
          <BackButton onClick={() => navigateTo("chooser")} />
          <div className="splash-greeting-block">
            <h2 className="splash-greeting">Browse by Topic</h2>
            <p className="splash-sub">{topics.length} topics across all exams — pick one to start studying.</p>
          </div>

          <div className="splash-topics-search-wrap">
            <span className="splash-topics-search-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </span>
            <input
              className="splash-topics-search"
              type="text"
              placeholder="Search topics…"
              value={topicSearch}
              onChange={e => setTopicSearch(e.target.value)}
            />
          </div>

          <div className="splash-topics-list">
            {filteredTopics.map(([topic, count], i) => {
              const accent = TOPIC_ACCENTS[i % TOPIC_ACCENTS.length];
              return (
                <button
                  key={topic}
                  className="splash-topic-card"
                  style={{ "--topic-accent": accent }}
                  onClick={() => handleSelectTopic(topic)}
                  disabled={loadingExam === `TOPIC:${topic}`}
                >
                  <div className="splash-topic-name">{topic}</div>
                  <div className="splash-topic-count">
                    {loadingExam === `TOPIC:${topic}`
                      ? "Loading…"
                      : cardLoadError === `TOPIC:${topic}`
                        ? "Failed — tap to retry"
                        : count}
                  </div>
                </button>
              );
            })}
            {filteredTopics.length === 0 && (
              <p style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--text-muted)", fontSize: "0.88rem", padding: "1.5rem 0" }}>
                No topics match "{topicSearch}"
              </p>
            )}
          </div>

          <SignOutButton onSignOut={handleSignOut} />
        </div>
      </div>
    );
  }

  // ── Games subview ────────────────────────────────────────────
  if (view === "games" && !isGuest) {
    const gameKey = (base) => gameExam === "ALL" ? base : `${base}:${gameExam}`;

    const CARD_GAMES = [
      {
        key: "GAMES:connections",
        title: "Connections",
        desc: "Group 16 items into four hidden categories. Four colour-coded tiers, four mistakes allowed.",
        cta: "Play Connections →",
        from: "#0f766e", to: "#134e4a", icon: "#5eead4",
        onPlay: () => onSelect(gameKey("GAMES:connections")),
        iconSvg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="9" height="9" rx="1.5"/>
            <rect x="13" y="2" width="9" height="9" rx="1.5"/>
            <rect x="2" y="13" width="9" height="9" rx="1.5"/>
            <rect x="13" y="13" width="9" height="9" rx="1.5"/>
          </svg>
        ),
      },
      {
        key: "GAMES:crossword",
        title: "Crossword",
        desc: "Solve Azure-themed crossword puzzles. Click a cell, type your answer, and work through across and down clues.",
        cta: "Play Crossword →",
        from: "#1d4ed8", to: "#1e3a8a", icon: "#93c5fd",
        onPlay: () => onSelect(gameKey("GAMES:crossword")),
        iconSvg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="4" height="4" rx="0.5"/>
            <rect x="10" y="3" width="4" height="4" rx="0.5"/>
            <rect x="17" y="3" width="4" height="4" rx="0.5"/>
            <rect x="3" y="10" width="4" height="4" rx="0.5"/>
            <rect x="10" y="10" width="4" height="4" rx="0.5"/>
            <rect x="17" y="10" width="4" height="4" rx="0.5"/>
            <rect x="3" y="17" width="4" height="4" rx="0.5"/>
            <rect x="10" y="17" width="4" height="4" rx="0.5"/>
            <rect x="17" y="17" width="4" height="4" rx="0.5"/>
          </svg>
        ),
      },
      {
        key: "GAMES:wordle",
        title: "Azure Wordle",
        desc: "Guess the Azure term from its definition. Six attempts, colour-coded feedback — green means correct position.",
        cta: "Play Wordle →",
        from: "#7c3aed", to: "#4c1d95", icon: "#c4b5fd",
        onPlay: () => onSelect(gameKey("GAMES:wordle")),
        iconSvg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="3" width="4" height="4" rx="0.5"/>
            <rect x="7" y="3" width="4" height="4" rx="0.5"/>
            <rect x="12" y="3" width="4" height="4" rx="0.5"/>
            <rect x="17" y="3" width="4" height="4" rx="0.5"/>
            <rect x="22" y="3" width="0" height="4" rx="0.5"/>
            <rect x="2" y="10" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5"/>
            <rect x="7" y="10" width="4" height="4" rx="0.5"/>
            <rect x="12" y="10" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.8"/>
            <rect x="17" y="10" width="4" height="4" rx="0.5"/>
            <rect x="2" y="17" width="4" height="4" rx="0.5"/>
            <rect x="7" y="17" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.5"/>
            <rect x="12" y="17" width="4" height="4" rx="0.5"/>
            <rect x="17" y="17" width="4" height="4" rx="0.5" fill="currentColor"/>
          </svg>
        ),
      },
    ];

    return (
      <div className="splash-page">
        <div className={`splash-card ${animClass}`}>
          <BackButton onClick={() => navigateTo("chooser")} />
          <div className="splash-greeting-block">
            <h2 className="splash-greeting">Games</h2>
            <p className="splash-sub">Learn through play — pick a game to get started.</p>
          </div>

          <div className="games-exam-filter">
            {["ALL", "AZ-900", "AZ-104", "AZ-700", "AZ-305"].map(ex => (
              <button
                key={ex}
                className={`games-exam-pill${gameExam === ex ? " active" : ""}`}
                onClick={() => setGameExam(ex)}
              >
                {ex === "ALL" ? "All exams" : ex}
              </button>
            ))}
          </div>

          <div className="splash-chooser-grid">
            {CARD_GAMES.map(g => (
              <button
                key={g.key}
                className="splash-choice-card"
                style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                onClick={g.onPlay}
                disabled={!!loadingExam}
              >
                <span className="splash-choice-icon" style={{ color: g.icon, background: "rgba(255,255,255,0.15)", borderColor: `${g.icon}44` }}>
                  {g.iconSvg}
                </span>
                <div className="splash-choice-title">{g.title}</div>
                <div className="splash-choice-desc">{g.desc}</div>
                <div className="splash-choice-cta">
                  {loadingExam?.startsWith(g.key) ? "Loading…" : cardLoadError?.startsWith(g.key) ? "Failed — tap to retry" : g.cta}
                </div>
              </button>
            ))}
          </div>

          <SignOutButton onSignOut={handleSignOut} />
        </div>
      </div>
    );
  }

  // ── Labs subview ──────────────────────────────────────────────
  if (view === "labs") {
    const EXAM_COLOURS_LAB = {
      "AZ-900": { from: "#0ea5e9", to: "#0369a1" },
      "AZ-104": { from: "#6366f1", to: "#3730a3" },
      "AZ-700": { from: "#0891b2", to: "#155e75" },
      "AZ-305": { from: "#8b5cf6", to: "#5b21b6" },
    };
    const DIFF_LABELS = { easy: "Easy", medium: "Medium", hard: "Hard", extreme: "Extreme" };

    const filteredLabs = (portalCards ?? []).filter(
      c => labExam === "ALL" || c.exam === labExam
    );

    return (
      <>
      <div className="splash-page">
        <div className={`splash-card splash-card--wide ${animClass}`}>
          <BackButton onClick={() => navigateTo("chooser")} />
          <div className="splash-greeting-block">
            <h2 className="splash-greeting">Labs</h2>
            <p className="splash-sub">Hands-on portal simulations — configure real Azure services step by step.</p>
          </div>

          <div className="games-exam-filter">
            {["ALL", "AZ-900", "AZ-104", "AZ-700", "AZ-305"].map(ex => (
              <button
                key={ex}
                className={`games-exam-pill${labExam === ex ? " active" : ""}`}
                onClick={() => setLabExam(ex)}
              >
                {ex === "ALL" ? "All exams" : ex}
              </button>
            ))}
          </div>

          {portalCards === null ? (
            <div className="splash-mydecks-empty">
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Loading labs…</p>
            </div>
          ) : filteredLabs.length === 0 ? (
            <div className="splash-mydecks-empty">
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>No labs available for this exam yet.</p>
            </div>
          ) : (
            <div className="splash-labs-grid">
              {filteredLabs.map(card => {
                const colours = EXAM_COLOURS_LAB[card.exam] ?? { from: "#374151", to: "#1f2937" };
                const isLocked = !isPremium && !card.is_free;
                return (
                  <button
                    key={card.id}
                    className={`splash-lab-card${isLocked ? " splash-lab-card--locked" : ""}`}
                    onClick={() => isLocked ? setShowLabUpgradeModal(true) : onSelect(`LAB:${card.id}`)}
                  >
                    <div
                      className="splash-lab-badge"
                      style={{ background: `linear-gradient(135deg, ${colours.from}, ${colours.to})` }}
                    >
                      <span className="splash-lab-exam">{card.exam}</span>
                      <span className="splash-lab-diff">{DIFF_LABELS[card.difficulty] ?? card.difficulty}</span>
                    </div>
                    <p className="splash-lab-task">{card.task}</p>
                    <span className="splash-lab-cta">
                      {isLocked ? (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="11" height="11">
                            <rect x="3" y="11" width="18" height="11" rx="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                          </svg>
                          Premium
                        </>
                      ) : (
                        <>
                          Start lab
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="12" height="12">
                            <polyline points="9 18 15 12 9 6"/>
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Terraform Labs section ── */}
          <div className="splash-labs-section-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#7b42bc" aria-hidden="true" style={{ flexShrink: 0 }}>
              <polygon points="8.5,2 3,5.5 3,12.5 8.5,9"/>
              <polygon points="9.5,9.5 9.5,16.5 15,13 15,6"/>
              <polygon points="3,14 8.5,17.5 8.5,10.5"/>
              <polygon points="16,5.5 21,9 21,9 16,12.5"/>
            </svg>
            <span style={{ color: "#7b42bc", fontWeight: 700 }}>Terraform Labs</span>
            <span className="splash-labs-section-tag">IaC</span>
          </div>

          {terraformCards === null ? (
            <div className="splash-mydecks-empty">
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Loading Terraform labs…</p>
            </div>
          ) : terraformCards.length === 0 ? (
            <div className="splash-tf-coming-soon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#7b42bc" aria-hidden="true" style={{ opacity: 0.4 }}>
                <polygon points="8.5,2 3,5.5 3,12.5 8.5,9"/>
                <polygon points="9.5,9.5 9.5,16.5 15,13 15,6"/>
                <polygon points="3,14 8.5,17.5 8.5,10.5"/>
                <polygon points="16,5.5 21,9 21,9 16,12.5"/>
              </svg>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: 0 }}>
                Terraform labs coming soon — write real HCL to deploy Azure infrastructure
              </p>
            </div>
          ) : (
            <div className="splash-labs-grid">
              {terraformCards.filter(c => labExam === "ALL" || c.exam === labExam).map(card => {
                const isLocked = !isPremium && !card.is_free;
                return (
                  <button
                    key={card.id}
                    className={`splash-lab-card splash-lab-card--terraform${isLocked ? " splash-lab-card--locked" : ""}`}
                    onClick={() => isLocked ? setShowLabUpgradeModal(true) : onSelect(`TERRAFORM:${card.id}`)}
                  >
                    <div className="splash-lab-badge" style={{ background: "linear-gradient(135deg, #7b42bc, #4c1d95)" }}>
                      <span className="splash-lab-exam">{card.exam}</span>
                      <span className="splash-lab-diff">{card.difficulty}</span>
                    </div>
                    <p className="splash-lab-task">{card.description ?? card.question ?? card.task}</p>
                    <span className="splash-lab-cta">
                      {isLocked ? (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="11" height="11">
                            <rect x="3" y="11" width="18" height="11" rx="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                          </svg>
                          Premium
                        </>
                      ) : (
                        <>
                          Start lab
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="12" height="12">
                            <polyline points="9 18 15 12 9 6"/>
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <SignOutButton onSignOut={handleSignOut} />
        </div>
      </div>

      {showLabUpgradeModal && (
        <div className="guest-games-overlay" onClick={() => setShowLabUpgradeModal(false)}>
          <div className="guest-games-modal" onClick={e => e.stopPropagation()}>
            <div className="guest-games-modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="28" height="28">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="guest-games-modal-title">Premium lab</h3>
            <p className="guest-games-modal-body">This lab requires a Premium subscription. Upgrade to unlock all portal simulations and hands-on Azure exercises.</p>
            <div className="guest-games-modal-actions">
              <button className="guest-games-modal-btn guest-games-modal-btn--ghost" onClick={() => setShowLabUpgradeModal(false)}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
      </>
    );
  }

  return null;
}