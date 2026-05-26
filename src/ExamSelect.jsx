import { useState, useEffect } from "react";
import flashcards, { EXAM_META } from "./flashcards";
import { loadAllTopics, loadExamCardCounts } from "./cardLoader";

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
    <p className="splash-cloud-tagline">Your cloud certification hub</p>
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

export default function ExamSelect({ user, onSelect, onLogout, onOpenDecks, onSelectByTopic, onSelectCustomDeck, onBack, loadingExam }) {
  const exams = Object.values(EXAM_META);
  const handleSignOut = () => onLogout();
  const [view, setView] = useState("chooser"); // "chooser" | "exams" | "topics" | "mydecks"
  const [animClass, setAnimClass] = useState("splash-initial"); // start with entry anim on first load
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

  // Animated navigation: drill in (forward) or back to chooser
  const navigateTo = (nextView) => {
    if (nextView === "topics" && !remoteTopics)
      loadAllTopics().then(t => { if (t) setRemoteTopics(t); });

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

              <button className="splash-choice-card" style={{ background: "linear-gradient(135deg, #0078d4, #004e8c)" }} onClick={() => navigateTo("mydecks")}>
                <span className="splash-choice-icon" style={{ color: "#93c5fd", background: "rgba(255,255,255,0.15)", borderColor: "rgba(147,197,253,0.4)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 2v3M8 2v3M2 10h20"/>
                  </svg>
                </span>
                <div className="splash-choice-title">My Cards</div>
                <div className="splash-choice-desc">Create and study your own custom decks</div>
                <div className="splash-choice-cta">Open My Cards →</div>
              </button>

              <button className="splash-choice-card" style={{ background: "linear-gradient(135deg, #0078d4, #004e8c)" }} onClick={() => navigateTo("topics")}>
                <span className="splash-choice-icon" style={{ color: "#93c5fd", background: "rgba(255,255,255,0.15)", borderColor: "rgba(147,197,253,0.4)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </span>
                <div className="splash-choice-title">By Topic</div>
                <div className="splash-choice-desc">Browse cards by subject across all exams</div>
                <div className="splash-choice-cta">Browse topics →</div>
              </button>
            </div>

          <SignOutButton onSignOut={handleSignOut} />
        </div>
      </div>
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
                    ? <span className="splash-exam-count">Loading…</span>
                    : <span className="splash-exam-count">{count} cards</span>
                  }
                  {meta.premium && <span className="splash-premium-badge">👑 Premium</span>}
                  <span className="splash-exam-arrow">
                    {loadingExam === meta.exam
                      ? <svg className="splash-loading-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" width="14" height="14"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
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
                >
                  <div className="splash-topic-name">{topic}</div>
                  <div className="splash-topic-count">{count}</div>
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

  // ── My Decks subview ─────────────────────────────────────────
  if (view === "mydecks") {
    return (
      <div className="splash-page">
        <div className={`splash-card ${animClass}`}>
          <BackButton onClick={() => navigateTo("chooser")} />
          <div className="splash-greeting-block">
            <h2 className="splash-greeting">My Cards</h2>
            <p className="splash-sub">Pick a custom deck to study.</p>
          </div>

          {customDecks.length === 0 ? (
            <div className="splash-mydecks-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" style={{ opacity: 0.35 }}>
                <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 2v3M8 2v3M2 10h20"/>
              </svg>
              <p>No custom decks yet.</p>
              <button className="splash-mydecks-create-btn" onClick={() => { onOpenDecks && onOpenDecks(); }}>
                + Create a Deck
              </button>
            </div>
          ) : (
            <>
              <div className="splash-cards">
                {customDecks.map((deck, i) => {
                  const colour = DECK_COLOURS[i % DECK_COLOURS.length];
                  const initials = deck.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
                  return (
                    <button
                      key={deck.id}
                      className="splash-exam-card"
                      style={{ background: `linear-gradient(135deg, ${colour.from}, ${colour.to})` }}
                      onClick={() => onSelectCustomDeck && onSelectCustomDeck(deck)}
                    >
                      <span className="splash-exam-icon" style={{ color: colour.icon, background: "rgba(255,255,255,0.15)", borderColor: `${colour.icon}44`, fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.5px" }}>
                        {initials}
                      </span>
                      <span className="splash-exam-code" style={{ fontSize: "1.1rem" }}>{deck.name}</span>
                      <span className="splash-exam-count">{deck.cards.length} card{deck.cards.length !== 1 ? "s" : ""}</span>
                      <span className="splash-exam-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="14" height="14">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </span>
                    </button>
                  );
                })}
              </div>
              <button className="splash-mydecks-create-btn" onClick={() => { onOpenDecks && onOpenDecks(); }}>
                + Create New Deck
              </button>
            </>
          )}

          <SignOutButton onSignOut={handleSignOut} />
        </div>
      </div>
    );
  }

  return null;
}