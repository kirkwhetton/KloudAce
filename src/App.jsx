import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import react from "react";
import CustomDecks from "./CustomDecks";
import Flashcard from "./Flashcard";
import MultipleChoice from "./multichoice";
import MultiSelect from "./MultiSelect";
import TrueFalse from "./TrueFalse";
import ImageMCQ from "./ImageMCQ";
import TaskSimulator from "./TaskSimulator";
import Hotspot from "./Hotspot";
import Connections from "./Connections";
import Crossword from "./Crossword";
import flashcards, { EXAM_META, FREE_CARD_IDS } from "./flashcards";
import { useAuthContext } from "./auth/AuthProvider";
import Login from "./auth/Login";
import ExamSelect from "./ExamSelect";
import UserProfile from "./auth/UserProfile";
import AdminPanel from "./admin/AdminPanel";
import { loadCardStatesRemote, saveCardStatesRemote } from "./cardStates";
import { loadExamCardsRemote, loadCardsByCategory, loadConnectionsCards, loadCrosswordCards, SUPABASE_EXAMS, wakeSupabase } from "./cardLoader";
import {
  loadSrsData, saveSrsData, loadSrsDataRemote, saveSrsDataRemote,
  updateSrsRecord, createSrsRecord, sortBySrs, isDue, getSrsStats,
} from "./spacedRepetition";
import ConfirmDialog from "./ConfirmDialog";
import ReadinessDashboard from "./ReadinessDashboard";
import GuidedTour from "./GuidedTour";
import PlatformSelect from "./PlatformSelect";
import { useStreak } from "./useStreak";
import { useSounds } from "./useSounds";
import { useDailyGoal } from "./useDailyGoal";
import { useTheme, THEMES } from "./useTheme";
import DevTools from "./DevTools";
import "./App.css";

// Fisher-Yates shuffle — returns a new shuffled array, never mutates original
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  const { isAuthenticated, user, logout, loading, isGuest } = useAuthContext();

  // ── Per-user storage keys ──────────────────────────────────────
  // Scoped to user.id so each account has its own flags & progress.
  const flagKey  = user ? `azfc_flagged_${user.id}` : "azfc_flagged_guest";
  const knownKey = user ? `azfc_known_${user.id}`   : "azfc_known_guest";

  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [remoteCards, setRemoteCards] = useState(null);
  const [loadingCards, setLoadingCards] = useState(false);
  const [loadingExam, setLoadingExam] = useState(null);
  const [cardLoadError, setCardLoadError] = useState(null);
  const [categories, setCategories] = useState(new Set(["All"]));
  const [index, setIndex] = useState(0);
  const [known, setKnown] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(knownKey) || "[]")); }
    catch { return new Set(); }
  });
  const [finished, setFinished] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [randomised, setRandomised] = useState(() => {
    try { return JSON.parse(localStorage.getItem(user ? `azfc_settings_${user.id}` : "azfc_settings_guest") || "{}").randomised ?? false; }
    catch { return false; }
  });
  const [flagged, setFlagged] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(flagKey) || "[]")); }
    catch { return new Set(); }
  });
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [showDueOnly, setShowDueOnly] = useState(false);
  const [defaultDisabledTypes, setDefaultDisabledTypes] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(user ? `azfc_settings_${user.id}` : "azfc_settings_guest") || "{}").defaultDisabledTypes ?? []); }
    catch { return new Set(); }
  });
  const [disabledTypes, setDisabledTypes] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(user ? `azfc_settings_${user.id}` : "azfc_settings_guest") || "{}").defaultDisabledTypes ?? []); }
    catch { return new Set(); }
  });
  const masteredKey = user ? `azfc_mastered_${user.id}` : "azfc_mastered_guest";
  const [mastered, setMastered] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(user ? `azfc_mastered_${user.id}` : "azfc_mastered_guest") || "[]")); }
    catch { return new Set(); }
  });
  const [showMastered, setShowMastered] = useState(false); // include mastered in deck
  const [srsMode, setSrsMode] = useState(false);
  const [srsData, setSrsData] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(null); // { title, message, onConfirm }
  const [showDashboard, setShowDashboard] = useState(false);
  const [showCustomDecks, setShowCustomDecks] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState(new Set()); // empty = all
  const [showDevRecent, setShowDevRecent] = useState(() => {
    try { return JSON.parse(localStorage.getItem(user ? `azfc_settings_${user.id}` : "azfc_settings_guest") || "{}").showDevRecent ?? false; }
    catch { return false; }
  });
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showDevTools, setShowDevTools] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0); // increment to force re-shuffle
  const [isExiting, setIsExiting] = useState(false); // true during exit animation
  const [isEntering, setIsEntering] = useState(false); // true during deck enter animation

  // ── Guided tour — shown once per user, or on demand ───────────
  const tourSeenKey = user ? `azfc_tour_seen_${user.id}` : null;
  const [showTour, setShowTour] = useState(false);
  const [tourFired, setTourFired] = useState(false);

  // ── Streak tracker ─────────────────────────────────────────────
  const { streak, longestStreak, recordActivity, activeDates } = useStreak(user?.id);
  const { goal: dailyGoal, count: dailyCount, increment: incrementGoal, setGoal } = useDailyGoal(user?.id);

  // Custom Decks
  const [customDecks, setCustomDecks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("customDecks") || "[]"); } catch { return []; }
  });
  const [customDeckCards, setCustomDeckCards] = useState([]); // active custom deck cards

  // ── Theme ───────────────────────────────────────────────────────
  const { theme, setTheme } = useTheme(user?.id);
  const handleTourDone = () => {
    setShowTour(false);
    if (tourSeenKey) localStorage.setItem(tourSeenKey, "1");
  };

  const handleSimulateSrs = (mode) => {
    if (!user || !selectedExam) return;
    const key = `azfc_srs_${user.id}_${selectedExam}`;
    if (mode === 'clear') {
      localStorage.removeItem(key);
      setSrsData({});
      return;
    }
    const future = (days) => { const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString(); };
    const past   = (days) => { const d = new Date(); d.setDate(d.getDate() - days); return d.toISOString(); };
    const records = {};
    deck.forEach((card, i) => {
      if (mode === 'mature') {
        records[card.id] = { id: card.id, easeFactor: 2.5, interval: 30, repetitions: 5, nextReview: future(30), lastReview: past(5) };
      } else if (mode === 'mix') {
        const bucket = i % 3;
        if (bucket === 1)
          records[card.id] = { id: card.id, easeFactor: 2.2, interval: 6,  repetitions: 1, nextReview: future(1),  lastReview: past(1) };
        else if (bucket === 2)
          records[card.id] = { id: card.id, easeFactor: 2.5, interval: 30, repetitions: 5, nextReview: future(25), lastReview: past(5) };
        // bucket 0 = no record (not started)
      }
    });
    localStorage.setItem(key, JSON.stringify(records));
    setSrsData(records);
  };
  const settingsKey = user ? `azfc_settings_${user.id}` : "azfc_settings_guest";
  const [hideAnswers, setHideAnswers] = useState(() => {
    try { return JSON.parse(localStorage.getItem(user ? `azfc_settings_${user.id}` : "azfc_settings_guest") || "{}").hideAnswers ?? false; }
    catch { return false; }
  });
  const [hideDifficulty, setHideDifficulty] = useState(() => {
    try { return JSON.parse(localStorage.getItem(user ? `azfc_settings_${user.id}` : "azfc_settings_guest") || "{}").hideDifficulty ?? false; }
    catch { return false; }
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    try { return JSON.parse(localStorage.getItem(user ? `azfc_settings_${user.id}` : "azfc_settings_guest") || "{}").soundEnabled ?? false; }
    catch { return false; }
  });
  const sounds = useSounds(soundEnabled);
  const onAnswer = (correct) => correct ? sounds.correct() : sounds.incorrect();

  const EXAM_DURATION = 60 * 60; // 60 minutes
  const [examMode, setExamMode]           = useState(false);
  const [examTimer, setExamTimer]         = useState(false); // optional timed mode
  const [examReady, setExamReady]         = useState(false);
  const [timeLeft, setTimeLeft]           = useState(EXAM_DURATION);
  const [examExpired, setExamExpired]     = useState(false);
  const [examResults, setExamResults]     = useState([]);
  const [examDone, setExamDone]           = useState(false);
  const timerRef                          = useRef(null);

  // Start timer only once the user clicks Begin — and only if timed mode is on
  useEffect(() => {
    if (examReady && examTimer) {
      setTimeLeft(EXAM_DURATION);
      setExamExpired(false);
      setExamResults([]);
      setExamDone(false);
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setExamExpired(true);
            setExamDone(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      if (!examReady) {
        setTimeLeft(EXAM_DURATION);
        setExamExpired(false);
      }
    }
    return () => clearInterval(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examReady, examTimer]);

  // Reset fully when exam mode is toggled off or exam changes
  useEffect(() => {
    if (examMode) { setExamTimer(true); }
    else { setExamReady(false); setExamTimer(false); }
  }, [examMode]);

  useEffect(() => {
    if (examMode) { setExamMode(false); setExamReady(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExam]);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // ── Wake Supabase on mount to pre-warm the connection ──────────
  useEffect(() => { wakeSupabase(); }, []);

  // ── Reset navigation state on sign out ────────────────────────
  useEffect(() => {
    if (!isAuthenticated) {
      setSelectedPlatform(null);
      setSelectedExam(null);
    }
  }, [isAuthenticated]);

  // ── Re-load persisted data when the logged-in user changes ─────
  // (e.g. user A logs out, user B logs in on the same device)
  useEffect(() => {
    try { setFlagged(new Set(JSON.parse(localStorage.getItem(flagKey)  || "[]"))); }
    catch { setFlagged(new Set()); }
    try { setKnown(  new Set(JSON.parse(localStorage.getItem(knownKey) || "[]"))); }
    catch { setKnown(new Set()); }
    try { setMastered(new Set(JSON.parse(localStorage.getItem(masteredKey) || "[]"))); }
    catch { setMastered(new Set()); }
    setIndex(0); setFinished(false); setCategories(new Set(["All"]));
    // Sync flagged & mastered from Supabase in background
    if (user) {
      loadCardStatesRemote(user.id).then((remote) => {
        if (!remote) return;
        const rf = new Set(remote.flagged);
        const rm = new Set(remote.mastered);
        setFlagged(rf);
        setMastered(rm);
        localStorage.setItem(flagKey,     JSON.stringify([...rf]));
        localStorage.setItem(masteredKey, JSON.stringify([...rm]));
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Load SRS data whenever user or exam changes
  // Show localStorage cache immediately, then sync from Supabase in background
  useEffect(() => {
    if (!user || !selectedExam) return;
    setSrsData(loadSrsData(user.id, selectedExam));
    loadSrsDataRemote(user.id, selectedExam).then((remote) => {
      if (remote) {
        setSrsData(remote);
        saveSrsData(user.id, selectedExam, remote);
      }
    });
  }, [user?.id, selectedExam]);

  // Cards are pre-loaded in handleExam before selectedExam is set.
  // Only clear remoteCards when returning to exam select.
  useEffect(() => {
    if (!selectedExam) { setRemoteCards(null); setLoadingCards(false); }
  }, [selectedExam]);

  // Refs for keyboard shortcuts — populated after deck/current are derived below
  const deckRef    = useRef(null);
  const indexRef   = useRef(index);
  const currentRef = useRef(null);

  // ── Persist flagged & known across page refreshes ─────────────
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(flagKey, JSON.stringify([...flagged]));
    saveCardStatesRemote(user.id, flagged, mastered);
  }, [flagged, flagKey, user]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(knownKey, JSON.stringify([...known]));
  }, [known, knownKey, user]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(masteredKey, JSON.stringify([...mastered]));
    saveCardStatesRemote(user.id, flagged, mastered);
  }, [mastered, masteredKey, user]);

  // ── Derived deck (all hooks must be above the auth gate) ───────
  const isPremium = !!user?.isPremium;

  // Step 1: filter by exam, then apply free tier card restriction
  // For migrated exams, use remoteCards (Supabase) + bundled hotspot/image cards (not in DB)
  const bundledSpecial = selectedExam
    ? flashcards.filter((c) => c.exam === selectedExam && (c.type === "hotspot" || c.type === "image"))
    : [];
  const baseCards = remoteCards ? [...remoteCards, ...bundledSpecial] : flashcards;
  const examDeck = (selectedExam?.startsWith("CUSTOM:")
    ? customDeckCards
    : selectedExam?.startsWith("TOPIC:")
      ? (remoteCards ?? [])
      : selectedExam?.startsWith("GAMES:")
        ? (remoteCards ?? []).filter((c) => c.type === selectedExam.slice("GAMES:".length))
        : baseCards.filter((c) => c.exam === selectedExam)
  ).filter((c) => isPremium || c.exam === "AZ-900" || FREE_CARD_IDS.has(c.id) || selectedExam?.startsWith("CUSTOM:") || selectedExam?.startsWith("GAMES:"))
  .slice(0, isGuest && selectedExam !== "AZ-900" && !selectedExam?.startsWith("CUSTOM:") && !selectedExam?.startsWith("GAMES:") ? 30 : Infinity);

  // Step 2: filter by selected categories — "🚩 Flagged" and "All" are virtual
  const filteredDeck = examDeck.filter((c) => {
    if (categories.has("🚩 Flagged") && categories.size === 1) return flagged.has(c.id);
    if (categories.has("All")) return true;
    // Multi-select: card matches if its category is in the selected set
    // Also include flagged cards if 🚩 Flagged is among selections
    return categories.has(c.category) || (categories.has("🚩 Flagged") && flagged.has(c.id));
  });

  // Step 2b: filter flagged only if sidebar toggle is on
  const afterFlagFilter = showFlaggedOnly
    ? filteredDeck.filter((c) => flagged.has(c.id))
    : filteredDeck;

  // Step 2c: hide mastered cards unless the user wants to see them
  const afterMasteredFilter = showMastered
    ? afterFlagFilter
    : afterFlagFilter.filter((c) => !mastered.has(c.id));

  // Step 2d: exclude disabled card types
  const getCardTypeKey = (c) => {
    if (!!c.scenario && c.type !== "task")  return "case-study";
    if (c.type === "task" && c.taskType === "fault")  return "fault";
    if (c.type === "task" && c.taskType === "script") return "script";
    if (c.type === "task")        return "task";
    if (c.type === "hotspot")     return "hotspot";
    if (c.type === "image-mcq")   return "image-mcq";
    if (c.type === "truefalse")   return "truefalse";
    if (c.type === "multi")       return "multi";
    if (!!c.choices && !c.scenario) return "mcq";
    return "flashcard";
  };
  const afterTypeFilter = disabledTypes.size === 0
    ? afterMasteredFilter
    : afterMasteredFilter.filter(c => !disabledTypes.has(getCardTypeKey(c)));

  // Step 2e: filter by difficulty
  const afterDifficultyFilter = difficultyFilter.size === 0
    ? afterTypeFilter
    : afterTypeFilter.filter((c) => difficultyFilter.has(c.difficulty ?? "easy"));

  // Step 2f: filter to due-for-review cards only
  const afterDueFilter = showDueOnly
    ? afterDifficultyFilter.filter((c) => isDue(srsData[c.id]))
    : afterDifficultyFilter;

  // Step 2g: dev — show only cards added in the last 25 hours
  const DEV_WINDOW_MS = 25 * 60 * 60 * 1000;
  const preShuffle = showDevRecent
    ? afterDueFilter.filter((c) => { const ts = c.devAdded || c.created_at; return ts && Date.now() - new Date(ts).getTime() < DEV_WINDOW_MS; })
    : afterDueFilter;

  // Step 3: order — exam mode gets its own pipeline (no easy, random 40); otherwise SRS or shuffle
  const EXAM_CARD_LIMIT = 40;
  const deck = useMemo(
    () => {
      if (examMode) {
        const filtered = preShuffle.filter(c =>
          (c.difficulty ?? "medium") !== "easy" &&
          !(c.type === "task" && c.taskType === "script")
        );
        return shuffle(filtered).slice(0, EXAM_CARD_LIMIT);
      }
      if (srsMode) return sortBySrs(preShuffle, srsData);
      return randomised ? shuffle(preShuffle) : preShuffle;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [randomised, selectedExam, categories, showFlaggedOnly, flagged, disabledTypes, mastered, showMastered, srsMode, srsData, difficultyFilter, shuffleKey, showDueOnly, showDevRecent, customDeckCards, examMode, remoteCards]
  );

  const CATEGORIES = [
    ...(examDeck.some((c) => flagged.has(c.id)) ? ["🚩 Flagged"] : []),
    "All",
    ...new Set(examDeck.map((c) => c.category)),
  ];
  const current = deck[index];

  // Keep refs in sync — must be after deck/current are derived
  useEffect(() => { deckRef.current    = deck;    }, [deck]);
  useEffect(() => { indexRef.current   = index;   }, [index]);
  useEffect(() => { currentRef.current = current; }, [current]);

  // Auto-show tour when first card becomes visible for a new user
  useEffect(() => {
    if (!current || tourFired || !tourSeenKey) return;
    if (!localStorage.getItem(tourSeenKey)) {
      setShowTour(true);
      setTourFired(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // ── Keyboard shortcuts ─────────────────────────────────────────
  // ←/→ navigate, F = flag, M = master. Stable effect — reads via refs.
  useEffect(() => {
    if (!selectedExam || finished || examMode || showProfile || showDashboard || showCustomDecks || confirmDialog) return;
    const handler = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const d = deckRef.current; const i = indexRef.current;
        if (i + 1 >= d.length) setFinished(true);
        else setIndex((prev) => prev + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "f" || e.key === "F") {
        const c = currentRef.current;
        if (c) setFlagged((prev) => { const n = new Set(prev); n.has(c.id) ? n.delete(c.id) : n.add(c.id); return n; });
      } else if (e.key === "m" || e.key === "M") {
        const c = currentRef.current;
        if (c) {
          setMastered((prev) => { const n = new Set(prev); n.has(c.id) ? n.delete(c.id) : n.add(c.id); return n; });
          setIndex((prev) => { const d = deckRef.current; return prev + 1 < d.length ? prev + 1 : prev; });
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExam, finished, examMode, showProfile, showDashboard, showCustomDecks, confirmDialog]);

  // useCallback must also be before any conditional return
  const advance = useCallback(
    (markKnown) => {
      if (markKnown) {
        setKnown((prev) => new Set(prev).add(current?.id));
        recordActivity();
        incrementGoal();
      }
      if (index + 1 >= deck.length) setFinished(true);
      else setIndex((i) => i + 1);
    },
    [index, deck.length, current, recordActivity, incrementGoal]
  );

  const fetchWithTimeout = (promise, ms = 25_000) =>
    Promise.race([promise, new Promise(resolve => setTimeout(() => resolve(null), ms))]);

  const handleExam = async (exam) => {
    setCategories(new Set(["All"])); setIndex(0); setKnown(new Set()); setFinished(false); setDisabledTypes(new Set(defaultDisabledTypes));
    setCustomDeckCards([]);
    setCardLoadError(null);

    if (SUPABASE_EXAMS.has(exam)) {
      setLoadingExam(exam);
      const cards = await fetchWithTimeout(loadExamCardsRemote(exam));
      setLoadingExam(null);
      if (!cards) { setCardLoadError(exam); return; }
      setRemoteCards(cards);
    } else if (exam.startsWith("TOPIC:")) {
      setLoadingExam(exam);
      const cards = await fetchWithTimeout(loadCardsByCategory(exam.slice("TOPIC:".length)));
      setLoadingExam(null);
      if (!cards) { setCardLoadError(exam); return; }
      setRemoteCards(cards);
    } else if (exam.startsWith("GAMES:")) {
      setLoadingExam(exam);
      const loader = exam === "GAMES:crossword" ? loadCrosswordCards() : loadConnectionsCards();
      const cards = await fetchWithTimeout(loader);
      setLoadingExam(null);
      if (!cards) { setCardLoadError(exam); return; }
      setRemoteCards(cards);
    } else {
      setRemoteCards(null);
    }

    setSelectedExam(exam);
    setIsEntering(true);
    setTimeout(() => setIsEntering(false), 380);
  };

  const handleCustomDeck = (deck) => {
    const examId = `CUSTOM:${deck.id}`;
    const nameSlug = deck.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const cards = deck.cards.map((c, i) => {
      const sixDigit = String(i + 1).padStart(6, "0");
      // Only use a user-set displayId if it's a non-numeric string (i.e. manually typed, not a Date.now() timestamp)
      const rawId = c.id !== undefined && c.id !== null ? String(c.id).trim() : "";
      const isTimestamp = /^\d{10,}$/.test(rawId); // 10+ digits = timestamp
      const displayId = rawId && !isTimestamp ? rawId : `${nameSlug}-${sixDigit}`;
      return {
        id: `${examId}-${i}`,
        displayId,
        exam: examId,
        category: deck.name,
        question: c.question,
        answer: c.answer,
        tag: c.tag || "",
        difficulty: c.difficulty || "medium",
      };
    });
    setCustomDeckCards(cards);
    setSelectedExam(examId);
    setCategories(new Set(["All"]));
    setIndex(0);
    setKnown(new Set());
    setFinished(false);
    setDisabledTypes(new Set(defaultDisabledTypes));
    setShowCustomDecks(false);
    setIsEntering(true);
    setTimeout(() => setIsEntering(false), 380);
  };

  const handleDashboardLaunch = (cards) => {
    setCustomDeckCards(cards);
    setSelectedExam("CUSTOM:dashboard");
    setCategories(new Set(["All"]));
    setIndex(0);
    setKnown(new Set());
    setFinished(false);
    setSrsMode(false);
    setDisabledTypes(new Set(defaultDisabledTypes));
    setShowDashboard(false);
    setIsEntering(true);
    setTimeout(() => setIsEntering(false), 380);
  };

  // Inline card save — updates localStorage + live session state without reopening the deck editor
  const handleInlineCardSave = (card, { question, answer, tag, deckId, difficulty, newDeckName }) => {
    const sourceDeckId = Number(card.exam.slice("CUSTOM:".length));
    const cardIndex = Number(card.id.slice(card.exam.length + 1));
    const allDecks = JSON.parse(localStorage.getItem("customDecks") || "[]");
    let updatedDecks;

    if (deckId === "__new__") {
      const newDeck = { id: Date.now(), name: newDeckName, cards: [{ id: Date.now() + 1, question, answer, tag: tag || "", difficulty }] };
      updatedDecks = allDecks.map(d =>
        d.id !== sourceDeckId ? d : { ...d, cards: d.cards.filter((_, i) => i !== cardIndex) }
      ).concat(newDeck);
      localStorage.setItem("customDecks", JSON.stringify(updatedDecks));
      setCustomDecks(updatedDecks);
      setCustomDeckCards(prev => prev.filter(c => c.id !== card.id));
      return;
    }

    const targetDeckId = Number(deckId);
    if (sourceDeckId === targetDeckId) {
      updatedDecks = allDecks.map(d =>
        d.id !== targetDeckId ? d
          : { ...d, cards: d.cards.map((c, i) => i === cardIndex ? { ...c, question, answer, tag, difficulty } : c) }
      );
    } else {
      const rawCard = allDecks.find(d => d.id === sourceDeckId)?.cards[cardIndex] || {};
      updatedDecks = allDecks.map(d => {
        if (d.id === sourceDeckId) return { ...d, cards: d.cards.filter((_, i) => i !== cardIndex) };
        if (d.id === targetDeckId) return { ...d, cards: [...d.cards, { ...rawCard, question, answer, tag, difficulty }] };
        return d;
      });
    }

    localStorage.setItem("customDecks", JSON.stringify(updatedDecks));
    setCustomDecks(updatedDecks);

    const targetDeck = updatedDecks.find(d => d.id === targetDeckId);
    setCustomDeckCards(prev => prev.map(c =>
      c.id !== card.id ? c : {
        ...c, question, answer, tag, difficulty,
        category: targetDeck?.name || c.category,
        exam: `CUSTOM:${targetDeckId}`,
      }
    ));
  };

  // Smooth exit back to exam select — plays CSS animation then clears exam
  const goToExams = () => {
    setSidebarOpen(false);
    setShowProfile(false);
    setShowDashboard(false);
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      setSelectedExam(null);
    }, 380);
  };

  // ── Auth gate — AFTER all hooks ────────────────────────────────
  if (loading) return (
    <div className="app-loading">
      <svg className="app-loading-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
    </div>
  );
  if (!isAuthenticated) return <Login />;

  // ── Platform gate ──────────────────────────────────────────────
  if (!selectedPlatform) {
    return (
      <PlatformSelect
        user={user}
        onSelect={(platform) => setSelectedPlatform(platform)}
        onLogout={logout}
      />
    );
  }

  // ── Exam splash gate ───────────────────────────────────────────
  if (!selectedExam) {
    return (
      <>
        <ExamSelect
          user={user}
          isGuest={isGuest}
          onSelect={(exam) => handleExam(exam)}
          onLogout={logout}
          onOpenDecks={() => setShowCustomDecks(true)}
          onSelectCustomDeck={handleCustomDeck}
          onSelectByTopic={(topic) => handleExam(`TOPIC:${topic}`)}
          onBack={() => setSelectedPlatform(null)}
          loadingExam={loadingExam}
          cardLoadError={cardLoadError}
        />
        {showCustomDecks && (
          <CustomDecks
            onClose={() => setShowCustomDecks(false)}
            onStudy={handleCustomDeck}
          />
        )}
      </>
    );
  }

  const restart = () => { setIndex(0); setKnown(new Set()); setFinished(false); setSessionKey(k => k + 1); };

  const toggleFlag = (id) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleMastered = (id) => {
    const isCurrentlyMastered = mastered.has(id);
    setMastered((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    if (!isCurrentlyMastered) goNext();
  };

  const handleSrsRate = (quality) => {
    if (!current) return;
    const existing = srsData[current.id] || createSrsRecord(current.id);
    const updated = updateSrsRecord(existing, quality);
    const newSrsData = { ...srsData, [current.id]: updated };
    setSrsData(newSrsData);
    if (user) {
      saveSrsData(user.id, selectedExam, newSrsData);
      saveSrsDataRemote(user.id, selectedExam, newSrsData);
    }
    goNext();
  };

  const goNext = () => {
    if (index + 1 >= deck.length) setFinished(true);
    else setIndex((i) => i + 1);
  };

  const handleExamAnswer = (result) => {
    const newResults = [...examResults, result];
    setExamResults(newResults);
    // If last card, end exam
    if (index + 1 >= deck.length) {
      clearInterval(timerRef.current);
      setExamDone(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  const handleCategory = (cat) => {
    setCategories((prev) => {
      const next = new Set(prev);
      if (cat === "All") {
        // "All" clears everything else and selects only All
        return new Set(["All"]);
      }
      // Deselect if already selected (unless it's the only one)
      if (next.has(cat)) {
        next.delete(cat);
        // If nothing left, fall back to All
        if (next.size === 0 || (next.size === 1 && next.has("All"))) return new Set(["All"]);
        next.delete("All"); // remove All when a specific category is picked
        return next;
      }
      // Select this category, remove "All"
      next.delete("All");
      next.add(cat);
      return next;
    });
    setIndex(0); setKnown(new Set()); setFinished(false);
  };

  const handleRandomise = () => {
    setRandomised((r) => {
      const next = !r;
      try { const s = JSON.parse(localStorage.getItem(settingsKey) || "{}"); localStorage.setItem(settingsKey, JSON.stringify({ ...s, randomised: next })); } catch {}
      return next;
    });
    setIndex(0); setKnown(new Set()); setFinished(false);
  };

  const knownInDeck = deck.filter((c) => known.has(c.id)).length;
  const flaggedInDeck = deck.filter((c) => flagged.has(c.id)).length;
  const progress = deck.length > 0 ? Math.round((knownInDeck / deck.length) * 100) : 0;
  const srsStats = getSrsStats(deck, srsData);
  const srsDueCount = deck.filter(c => isDue(srsData[c.id])).length;

  // Derive the SRS progress dot for the current card
  function getSrsDot(cardId) {
    const r = srsData[cardId];
    if (!r || r.repetitions === 0) return { cssVar: "--srs-dot-new",      label: "Not started" };
    if (r.repetitions >= 3)        return { cssVar: "--srs-dot-mature",   label: "Mature" };
    return                                { cssVar: "--srs-dot-learning", label: "Learning" };
  }

  const guestLock = (content) => {
    if (!isGuest) return content;
    return (
      <div className="guest-gate-wrapper">
        <div className="guest-gate" onClick={logout}>
          <div className="guest-gate-inner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{width:12,height:12}}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Sign up free to unlock
          </div>
        </div>
        <div className="guest-locked-content">{content}</div>
      </div>
    );
  };

  const premiumLock = (content) => {
    if (isPremium) return content;
    return (
      <div className="premium-gate-wrapper">
        <div className="premium-gate" onClick={() => setShowProfile(true)}>
          <div className="premium-gate-inner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{width:12,height:12}}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Unlock Premium
          </div>
        </div>
        <div className="premium-locked-content">{content}</div>
      </div>
    );
  };

  return (
    <div className={`app${isExiting ? " app--exiting" : ""}${isEntering ? " app--entering" : ""}`} data-exam={selectedExam}>

      {isGuest && (
        <div className="guest-banner">
          <span>Welcome to Kloud Ace, you're exploring as a guest — <strong>Sign up for a free account to unlock additional features and the AZ-900 card deck.</strong></span>
          <button className="guest-banner-cta" onClick={logout}>Sign up free</button>
        </div>
      )}

      {showTour && <GuidedTour onDone={handleTourDone} />}

      {showProfile && <UserProfile onClose={() => {
        setShowProfile(false);
        try {
          const s = JSON.parse(localStorage.getItem(settingsKey) || "{}");
          setHideAnswers(s.hideAnswers ?? false);
          setHideDifficulty(s.hideDifficulty ?? false);
          setSoundEnabled(s.soundEnabled ?? true);
          setShowDevRecent(s.showDevRecent ?? false);
          setRandomised(s.randomised ?? false);
          const ddt = new Set(s.defaultDisabledTypes ?? []);
          setDefaultDisabledTypes(ddt);
          setDisabledTypes(new Set(ddt));
        } catch { /* ignore */ }
      }} onOpenDashboard={() => setShowDashboard(true)}
      streak={streak} longestStreak={longestStreak} activeDates={activeDates ?? []}
      dailyGoal={dailyGoal} onSetGoal={setGoal} />}

      {showDashboard && (
        <ReadinessDashboard
          user={user}
          initialExam={selectedExam}
          onClose={() => setShowDashboard(false)}
          onLaunchDeck={handleDashboardLaunch}
        />
      )}

      {showCustomDecks && (
        <CustomDecks onClose={() => setShowCustomDecks(false)} onStudy={handleCustomDeck} />
      )}

      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}

      {showDevTools && user?.isDeveloper && (
        <DevTools
          onClose={() => setShowDevTools(false)}
          showDevRecent={showDevRecent}
          onToggleDevRecent={() => { setShowDevRecent(d => { const next = !d; try { const s = JSON.parse(localStorage.getItem(settingsKey) || "{}"); localStorage.setItem(settingsKey, JSON.stringify({ ...s, showDevRecent: next })); } catch {} return next; }); setIndex(0); setFinished(false); }}
          onOpenCardManager={() => setShowAdminPanel(true)}
          selectedExam={selectedExam}
          deckSize={deck.length}
          onSimulateSrs={handleSimulateSrs}
        />
      )}

      {confirmDialog && (
        <ConfirmDialog
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmLabel="Yes, reset"
          onConfirm={() => { confirmDialog.onConfirm(); setConfirmDialog(null); }}
          onCancel={() => setConfirmDialog(null)}
        />
      )}

      {/* ── Sidebar overlay ── */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar panel ── */}
      <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="sidebar-header">
          <span>⚙️ Options</span>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <div className="sidebar-section">
          <h3>Card Type</h3>
          {guestLock(<div className="sidebar-type-filter">
            {[
              { value: "both",       label: "All",            color: "#2563eb", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
              { value: "flashcard",  label: "Flip",           color: "#7c3aed", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> },
              { value: "mcq",        label: "MCQ",            color: "#16a34a", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
              { value: "multi",      label: "Multi",          color: "#ea580c", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg> },
              { value: "truefalse",  label: "T / F",          color: "#dc2626", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/><path d="M20 12H4"/></svg> },
              { value: "image-mcq",  label: "Diagram",        color: "#0891b2", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> },
              { value: "hotspot",    label: "Hotspot",        color: "#db2777", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg> },
              { value: "task",       label: "Task",           color: "#d97706", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg> },
              { value: "script",     label: "Script",         color: "#059669", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
              { value: "fault",       label: "Find the Fault", color: "#e11d48", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
              { value: "case-study", label: "Case Study",     color: "#4f46e5", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
              { value: "connections", label: "Connections",   color: "#0d9488", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
            ].map(({ value, label, color, icon }) => {
              const isAll = value === "both";
              const isDisabled = !isAll && disabledTypes.has(value);
              const allClear = disabledTypes.size === 0;
              return (
                <button
                  key={value}
                  className={`sidebar-type-btn${isAll && allClear ? " active" : ""}${isDisabled ? " type-disabled" : ""}`}
                  onClick={() => {
                    if (isAll) { setDisabledTypes(new Set(defaultDisabledTypes)); }
                    else {
                      setDisabledTypes(prev => {
                        const next = new Set(prev);
                        next.has(value) ? next.delete(value) : next.add(value);
                        return next;
                      });
                    }
                    setIndex(0); setFinished(false);
                  }}
                  style={!isDisabled ? { "--type-color": color } : {}}
                  title={isDisabled ? `Re-enable ${label}` : isAll ? "Show all types" : `Hide ${label} cards`}
                >
                  <span className="sidebar-type-icon">{icon}</span>
                  <span className="sidebar-type-label">{label}</span>
                </button>
              );
            })}
          </div>)}
        </div>

        <div className="sidebar-section">
          <h3>Card Order</h3>
          {premiumLock(<>
            <label className="toggle-row">
              <span className="toggle-row-label">
                <svg className="sidebar-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="14" x2="22" y2="14"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="14" x2="4" y2="14"/></svg>
                Spaced Repetition
              </span>
              <div className={`toggle${srsMode ? " on" : ""}`} onClick={() => { setSrsMode(s => !s); setIndex(0); setFinished(false); }} role="switch" aria-checked={srsMode}>
                <div className="toggle-thumb" />
              </div>
            </label>
            {srsMode && (
              <div className="srs-sidebar-stats">
                <span className="srs-stat srs-stat-due"><span className="srs-emoji-dot" style={{background:"var(--srs-dot-new)"}}></span> {srsStats.due} reviewing</span>
                <span className="srs-stat srs-stat-learning"><span className="srs-emoji-dot" style={{background:"var(--srs-dot-learning)"}}></span> {srsStats.learning} learning</span>
                <span className="srs-stat srs-stat-mature"><span className="srs-emoji-dot" style={{background:"var(--srs-dot-mature)"}}></span> {srsStats.mature} mature</span>
              </div>
            )}
            <label className="toggle-row">
              <span className="toggle-row-label">
                <svg className="sidebar-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
                Randomise cards
              </span>
              <div className={`toggle${randomised ? " on" : ""}${srsMode ? " disabled" : ""}`} onClick={() => { if (!srsMode) handleRandomise(); }} role="switch" aria-checked={randomised} aria-disabled={srsMode}>
                <div className="toggle-thumb" />
              </div>
            </label>
            {randomised && !srsMode && (
              <button className="sidebar-action-btn" onClick={() => { setShuffleKey((k) => k + 1); setIndex(0); setKnown(new Set()); setFinished(false); }}>
                <svg className="sidebar-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
                Re-shuffle deck
              </button>
            )}
          </>)}
        </div>

        <div className="sidebar-section">
          <h3>Session</h3>
          <button className="sidebar-action-btn" onClick={() => { restart(); setSidebarOpen(false); }}>
            <svg className="sidebar-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
            Restart session
          </button>
        </div>

        <div className="sidebar-section">
          <h3>Progress</h3>
          {guestLock(
            <button className="sidebar-action-btn" onClick={() => { setShowDashboard(true); setSidebarOpen(false); }}>
              <svg className="sidebar-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
              Readiness Dashboard
            </button>
          )}
        </div>

        <div className="sidebar-section">
          <h3>Exam Mode</h3>
          {premiumLock(<>
            <label className="toggle-row">
              <span className="toggle-row-label">
                <svg className="sidebar-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                Exam Mode
              </span>
              <div className={`toggle${examMode ? " on" : ""}`} onClick={() => { setExamMode(m => !m); setSidebarOpen(false); }} role="switch" aria-checked={examMode}>
                <div className="toggle-thumb" />
              </div>
            </label>
            {examMode && (
              <label className="toggle-row" style={{ marginTop: "0.5rem" }}>
                <span className="toggle-row-label">
                  <svg className="sidebar-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Timed <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>(60 min)</span>
                </span>
                <div className={`toggle${examTimer ? " on" : ""}`} onClick={() => setExamTimer(t => !t)} role="switch" aria-checked={examTimer}>
                  <div className="toggle-thumb" />
                </div>
              </label>
            )}
          </>)}
        </div>

        <div className="sidebar-section">
          <h3>Review Filter</h3>
          {premiumLock(
            <label className="toggle-row">
              <span className="toggle-row-label">
                <span className="srs-emoji-dot" style={{background:"var(--srs-dot-new)"}}></span>
                Due for review only ({srsDueCount})
              </span>
              <div className={`toggle${showDueOnly ? " on" : ""}`} onClick={() => { setShowDueOnly(d => !d); setIndex(0); setFinished(false); }} role="switch" aria-checked={showDueOnly}>
                <div className="toggle-thumb" />
              </div>
            </label>
          )}
        </div>

        <div className="sidebar-section">
          <h3>Flagged Cards</h3>
          {premiumLock(<>
            <label className="toggle-row">
              <span className="toggle-row-label">
                <svg className="sidebar-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                Flagged only ({flagged.size})
              </span>
              <div className={`toggle${showFlaggedOnly ? " on" : ""}`} onClick={() => { setShowFlaggedOnly(f => !f); setIndex(0); setFinished(false); }} role="switch" aria-checked={showFlaggedOnly}>
                <div className="toggle-thumb" />
              </div>
            </label>
            {flagged.size > 0 && (
              <button className="sidebar-action-btn danger" onClick={() => { setFlagged(new Set()); setShowFlaggedOnly(false); }}>
                <svg className="sidebar-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                Clear all flags
              </button>
            )}
          </>)}
        </div>

        <div className="sidebar-section">
          <h3>Mastered Cards</h3>
          {premiumLock(<>
            <label className="toggle-row">
              <span className="toggle-row-label">
                <svg className="sidebar-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Show mastered ({mastered.size})
              </span>
              <div className={`toggle${showMastered ? " on" : ""}`} onClick={() => { setShowMastered(m => !m); setIndex(0); setFinished(false); }} role="switch" aria-checked={showMastered}>
                <div className="toggle-thumb" />
              </div>
            </label>
            {mastered.size > 0 && (
              <button className="sidebar-action-btn danger" onClick={() => setMastered(new Set())}>
                <svg className="sidebar-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                Clear all mastered
              </button>
            )}
          </>)}
        </div>

        <div className="sidebar-section">
          <h3>Difficulty</h3>
          {premiumLock(
            <div className="sidebar-type-filter">
              {[
                { value: "all",     dot: null,                     text: "All" },
                { value: "easy",    dot: "var(--diff-easy-text)",   text: "Easy" },
                { value: "medium",  dot: "var(--diff-med-text)",    text: "Medium" },
                { value: "hard",    dot: "var(--diff-hard-text)",   text: "Hard" },
                { value: "extreme", dot: "var(--diff-ext-text)",    text: "Extreme" },
              ].map(({ value, dot, text }) => (
                <button
                  key={value}
                  className={`sidebar-type-btn${value === "all" ? (difficultyFilter.size === 0 ? " active" : "") : (difficultyFilter.has(value) ? " active" : "")}`}
                  onClick={() => {
                    if (value === "all") { setDifficultyFilter(new Set()); }
                    else { setDifficultyFilter(prev => { const next = new Set(prev); next.has(value) ? next.delete(value) : next.add(value); return next; }); }
                    setIndex(0); setFinished(false);
                  }}
                >
                  {dot && <span className="diff-dot" style={{background: dot}}></span>}{text}
                </button>
              ))}
            </div>
          )}
        </div>


      </aside>

      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-logo-block">
            <div className="header-cloud-logo">
              <svg className="header-cloud-svg" viewBox="0 0 260 165" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                  <path id="headerCloud" d="M50 115C30 115 15 100 15 82C15 66 27 53 43 51C45 30 63 14 85 14C102 14 117 24 124 39C129 36 135 34 141 34C159 34 174 49 174 67C188 69 199 81 199 95C199 106 191 115 180 115Z"/>
                </defs>
                <use href="#headerCloud" x="20" y="5" fill="#185FA5"/>
                <use href="#headerCloud" x="40" y="25" fill="#ffffff" stroke="#2980D9" strokeWidth="5"/>
              </svg>
              <div className="header-cloud-text">
                <span className="header-cloud-brand">Kloud<span className="title-ace">Ace</span></span>
              </div>
            </div>
            <p className="header-subtitle">Your cloud learning and certification hub</p>
          </div>
        </div>
        <div className="header-actions">
          {user?.isDeveloper && (
            <button
              className={`devtools-icon-btn${showDevTools ? " active" : ""}`}
              onClick={() => setShowDevTools(v => !v)}
              title="Developer tools"
              aria-label="Developer tools"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
              </svg>
            </button>
          )}
          {/* User pill — clickable to open profile */}
          <span className="header-user" data-tour="header-user" onClick={() => isGuest ? logout() : setShowProfile(true)} title={isGuest ? "Sign up for a free account" : "Edit profile"}>
            <svg className="user-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
            {user.name}
          </span>

          {/* Action buttons */}
          <div className="header-buttons-stack">
            <div className="header-buttons">
              <button className="header-btn" onClick={() => setSidebarOpen(true)} aria-label="Open options" data-tour="options-btn">
                <span className="header-btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </span>
                <span className="header-btn-label">Options</span>
              </button>
              <button className="header-btn" onClick={() => setShowTour(true)} title="Take the guided tour">
                <span className="header-btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                    <line x1="9" y1="3" x2="9" y2="18"/>
                    <line x1="15" y1="6" x2="15" y2="21"/>
                  </svg>
                </span>
                <span className="header-btn-label">Tour</span>
              </button>
              {/* Divider */}
              <span className="header-btn-divider" />
              <button className="header-btn header-btn--signout" onClick={logout} title={isGuest ? "Sign up for a free account" : "Sign out"}>
                <span className="header-btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                </span>
                <span className="header-btn-label">{isGuest ? "Sign Up" : "Sign Out"}</span>
              </button>
            </div>
            <div className="header-btn-row">
              <button className="header-btn header-btn--dashboard" onClick={() => setShowDashboard(true)} title="Readiness dashboard" data-tour="dashboard-btn">
                <span className="header-btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                    <line x1="2" y1="20" x2="22" y2="20"/>
                  </svg>
                </span>
                <span className="header-btn-label">Dashboard</span>
              </button>
              <button className="header-btn header-btn--decks" onClick={() => setShowCustomDecks(true)} title="My custom flashcard decks">
                <span className="header-btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="6" width="20" height="14" rx="2"/>
                    <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                    <line x1="12" y1="11" x2="12" y2="17"/>
                    <line x1="9" y1="14" x2="15" y2="14"/>
                  </svg>
                </span>
                <span className="header-btn-label">My Cards</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Exam Mode timer banner ── */}
      {examMode && (
        <div className={`exam-timer-banner${examExpired ? " expired" : examReady && examTimer && timeLeft <= 60 ? " warning" : ""}`}>
          {examExpired ? (
            <>
              <span className="exam-timer-icon">🚨</span>
              <span className="exam-timer-label">Time's up!</span>
              <button className="exam-timer-stop" onClick={() => setExamMode(false)}>Dismiss</button>
            </>
          ) : !examReady ? (
            <>
              <span className="exam-timer-icon">🎓</span>
              <span className="exam-timer-label">Exam Mode{examTimer ? " — timed" : ""} — ready when you are</span>
              <button className="exam-timer-stop" onClick={() => setExamMode(false)}>✕ Cancel</button>
            </>
          ) : (
            <>
              <span className="exam-timer-icon">🎓</span>
              <span className="exam-timer-label">Exam Mode</span>
              {examTimer && (
                <span className={`exam-timer-clock${timeLeft <= 60 ? " tick" : ""}`}>{formatTime(timeLeft)}</span>
              )}
              <button className="exam-timer-stop" onClick={() => setExamMode(false)}>✕ Stop</button>
            </>
          )}
        </div>
      )}

      {/* Category pills — multi-select */}
      <nav className="category-nav" data-tour="category-nav">
        <button className="cat-btn" onClick={goToExams}>← Exams</button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`cat-btn${categories.has(cat) ? " active" : ""}${cat === "🚩 Flagged" ? " flagged-cat" : ""}`}
            onClick={() => handleCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="progress-area">
        <div className="progress-stats">
          <span>Card <strong>{Math.min(index + 1, deck.length)}</strong> of <strong>{deck.length}</strong></span>
          <span>
            {srsMode
              ? srsDueCount > 0 && <span className="srs-due-badge"><span className="srs-emoji-dot" style={{background:"var(--srs-dot-new)"}}></span> {srsDueCount} reviewing</span>
              : <>
                  {flaggedInDeck > 0 && <span className="flag-stat">🚩 {flaggedInDeck} &nbsp;·&nbsp; </span>}
                  <span className="known-check" aria-hidden="true">✓</span> <strong>{knownInDeck}</strong> known ({progress}%)
                </>
            }
          </span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {dailyGoal > 0 && (
        <div className="study-stats-strip" data-tour="stats-strip">
          {(() => {
            const R = 10;
            const circ = 2 * Math.PI * R;
            const pct = Math.min(dailyCount / dailyGoal, 1);
            const done = dailyCount >= dailyGoal;
            return (
              <span className={`daily-goal-pill${done ? " daily-goal-pill--done" : ""}`} title="Daily card goal">
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r={R} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.25"/>
                  <circle cx="12" cy="12" r={R} fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${pct * circ} ${circ}`}
                    strokeLinecap="round"
                    transform="rotate(-90 12 12)"
                  />
                </svg>
                <span className="daily-goal-label">
                  {done ? "Goal met! ✓" : `${dailyCount} / ${dailyGoal} today`}
                </span>
              </span>
            );
          })()}
          <span
            className={`streak-pill${streak >= 7 ? " streak-pill--hot" : ""}`}
            title={`${streak}-day streak 🔥  (best: ${longestStreak})`}
          >
            🔥 <strong>{streak}</strong>
          </span>
        </div>
      )}

      <main className={`main-content${current?.taskType === "script" ? " main-content--wide" : ""}`}>
        {examMode && !examReady ? (
          <div className="exam-intro-box">
            <div className="exam-intro-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h2 className="exam-intro-title">Exam Mode</h2>
            <p className="exam-intro-desc">
              You have <strong>60 minutes</strong> to answer <strong>40 random questions</strong>.<br />The timer starts the moment you press <strong>Begin</strong>.
            </p>
            <ul className="exam-intro-rules">
              <li>
                <svg className="exam-rule-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/>
                  <polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
                </svg>
                40 questions selected at random from this deck
              </li>
              <li>
                <svg className="exam-rule-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
                Easy cards excluded — Medium, Hard and Extreme only
              </li>
              <li>
                <svg className="exam-rule-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
                </svg>
                Script/terminal cards excluded — question-based only
              </li>
              <li>
                <svg className="exam-rule-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                No feedback or correct answers shown during the exam
              </li>
              {examTimer && <li>
                <svg className="exam-rule-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                60-minute timer starts when you press Begin
              </li>}
              {examTimer && <li>
                <svg className="exam-rule-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                Banner pulses red in the final 60 seconds
              </li>}
              <li>
                <svg className="exam-rule-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
                </svg>
                Score report with category breakdown shown at the end
              </li>
            </ul>
            <button className="exam-intro-begin" onClick={() => { setShuffleKey(k => k + 1); setExamResults([]); setExamDone(false); setIndex(0); setExamReady(true); }}>
              Begin Exam
            </button>
            <button className="exam-intro-cancel" onClick={() => setExamMode(false)}>
              Cancel
            </button>
          </div>
        ) : examMode && examDone ? (
          <div className="exam-results-screen">
            <div className="exam-results-header">
              <span className="exam-results-icon">{examExpired ? "⏰" : "🎓"}</span>
              <h2>{examExpired ? "Time's Up!" : "Exam Complete!"}</h2>
              <p className="exam-results-sub">
                {examResults.filter(r => r.correct).length} / {examResults.length} correct
                {examResults.length < deck.length ? ` (${deck.length - examResults.length} not reached)` : ""}
              </p>
              <div className="exam-results-score">
                {Math.round((examResults.filter(r => r.correct).length / Math.max(deck.length, 1)) * 100)}%
              </div>
            </div>

            {/* Category breakdown */}
            {(() => {
              const cats = {};
              deck.forEach((card, i) => {
                const cat = card.category || "Uncategorised";
                if (!cats[cat]) cats[cat] = { correct: 0, total: 0 };
                cats[cat].total++;
                if (examResults[i]?.correct) cats[cat].correct++;
              });
              return (
                <div className="exam-category-breakdown">
                  <h3 className="exam-breakdown-title">Category breakdown</h3>
                  <div className="exam-breakdown-grid">
                    {Object.entries(cats).sort((a, b) => b[1].total - a[1].total).map(([cat, s]) => {
                      const pct = Math.round((s.correct / s.total) * 100);
                      const cls = pct >= 80 ? "strong" : pct >= 50 ? "ok" : "weak";
                      return (
                        <div key={cat} className={`exam-breakdown-item exam-breakdown-item--${cls}`}>
                          <span className="exam-breakdown-cat">{cat}</span>
                          <span className="exam-breakdown-score">{s.correct}/{s.total}</span>
                          <span className="exam-breakdown-pct">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            <div className="exam-results-list">
              {deck.map((card, i) => {
                const result = examResults[i];
                if (!result) {
                  return (
                    <div key={card.id} className="exam-result-row exam-result-skipped">
                      <span className="exam-result-num">{i + 1}</span>
                      <div className="exam-result-body">
                        <span className="exam-result-cat-chip">{card.category}</span>
                        <p className="exam-result-q">{card.question}</p>
                        <p className="exam-result-meta">⏭️ Not reached</p>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={card.id} className={`exam-result-row ${result.correct ? "exam-result-correct" : "exam-result-wrong"}`}>
                    <span className="exam-result-num">{i + 1}</span>
                    <div className="exam-result-body">
                      <span className="exam-result-cat-chip">{card.category}</span>
                      <p className="exam-result-q">{card.question}</p>
                    </div>
                    <span className="exam-result-badge">{result.correct ? <span className="known-check">✓</span> : "❌"}</span>
                  </div>
                );
              })}
            </div>

            <div className="exam-results-actions">
              <button className="exam-intro-begin" onClick={() => { setExamResults([]); setExamDone(false); setIndex(0); setExamReady(false); }}>
                🔄 Try Again
              </button>
              <button className="exam-intro-cancel" onClick={() => { setExamMode(false); setIndex(0); }}>
                Exit Exam Mode
              </button>
            </div>
          </div>
        ) : finished && !examMode ? (
          <div className="results-card">
            <h2>🎉 Session Complete!</h2>
            <p>You've worked through all <strong>{deck.length}</strong> cards in this session.</p>
            <button className="btn-restart" onClick={restart}>🔄 Start Again</button>

            {!isPremium && (
              <div className="unlock-premium-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="unlock-premium-icon">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <h3 className="unlock-premium-title">Want more?</h3>
                <p className="unlock-premium-desc">
                  You've completed your free deck. Upgrade to Premium to unlock the full question bank — hundreds more cards, exam mode, spaced repetition, and readiness tracking.
                </p>
                <button className="unlock-premium-btn" onClick={() => setShowProfile(true)}>
                  Upgrade to Premium
                </button>
              </div>
            )}
          </div>
        ) : loadingCards ? (
          <div className="empty-deck-card">
            <div className="deck-loading-spinner" aria-label="Loading cards" />
            <p className="empty-deck-desc" style={{ marginTop: "1rem" }}>Loading cards…</p>
          </div>
        ) : deck.length === 0 ? (
          <div className="empty-deck-card">
            <p className="empty-deck-icon">🔍</p>
            <h3 className="empty-deck-title">No cards match your filters</h3>
            <p className="empty-deck-desc">
              {showDevRecent
                ? "No cards with a devAdded timestamp within the last 25 hours. Tag cards with devAdded to use this filter."
                : showDueOnly
                ? "No cards are due for review right now — check back later or turn off the Due for review filter."
                : showFlaggedOnly
                ? "You have no flagged cards under the current filters."
                : disabledTypes.size > 0
                ? "No cards of this type exist in the selected categories."
                : difficultyFilter.size > 0
                ? "No cards match the selected difficulty."
                : "Try selecting different categories or adjusting your filters."}
            </p>
            <div className="empty-deck-actions">
              {showDevRecent && (
                <button className="sidebar-action-btn" onClick={() => { setShowDevRecent(false); setIndex(0); }}>
                  Remove dev filter
                </button>
              )}
              {showDueOnly && (
                <button className="sidebar-action-btn" onClick={() => { setShowDueOnly(false); setIndex(0); }}>
                  Remove due filter
                </button>
              )}
              {showFlaggedOnly && (
                <button className="sidebar-action-btn" onClick={() => { setShowFlaggedOnly(false); setIndex(0); }}>
                  Remove flagged filter
                </button>
              )}
              {disabledTypes.size > 0 && (
                <button className="sidebar-action-btn" onClick={() => { setDisabledTypes(new Set(defaultDisabledTypes)); setIndex(0); }}>
                  Show all card types
                </button>
              )}
              {difficultyFilter.size > 0 && (
                <button className="sidebar-action-btn" onClick={() => { setDifficultyFilter(new Set()); setIndex(0); }}>
                  Clear difficulty filter
                </button>
              )}
              <button className="sidebar-action-btn" onClick={() => handleCategory("All")}>
                Reset categories
              </button>
            </div>
          </div>
        ) : (
          current && (
            <div className="card-wrapper">
              <div className="card-action-row" data-tour="flag-btn">
                <button
                  className={`flag-btn${flagged.has(current.id) ? " flagged" : ""}`}
                  onClick={() => toggleFlag(current.id)}
                  title={flagged.has(current.id) ? "Remove flag" : "Flag for review"}
                >
                  {flagged.has(current.id) ? "🚩 Flagged" : "🏳 Flag"}
                </button>
                <button
                  className={`mastered-btn${mastered.has(current.id) ? " mastered" : ""}`}
                  onClick={() => toggleMastered(current.id)}
                  title={mastered.has(current.id) ? "Unmark as mastered" : "Mark as mastered — removes from deck"}
                >
                  {mastered.has(current.id) ? "⭐ Mastered" : "☆ Mark mastered"}
                </button>
              </div>
              <div className="card-body-wrapper">
                {current.type === "truefalse" ? (
                  <TrueFalse
                    key={`${sessionKey}-${current.id}`}
                    card={current}
                    onKnow={() => advance(true)}
                    onSrsRate={srsMode ? handleSrsRate : undefined}
                    hideAnswers={hideAnswers}
                    examMode={examMode && examReady}
                    onExamAnswer={handleExamAnswer}
                    onAnswer={onAnswer}
                  />
                ) : current.type === "image-mcq" ? (
                  <ImageMCQ
                    key={`${sessionKey}-${current.id}`}
                    card={current}
                    onKnow={() => advance(true)}
                    onSrsRate={srsMode ? handleSrsRate : undefined}
                    hideAnswers={hideAnswers}
                    examMode={examMode && examReady}
                    onExamAnswer={handleExamAnswer}
                    onAnswer={onAnswer}
                  />
                ) : current.type === "task" ? (
                  <TaskSimulator
                    key={`${sessionKey}-${current.id}`}
                    card={current}
                    onKnow={() => advance(true)}
                    onSrsRate={srsMode ? handleSrsRate : undefined}
                    hideAnswers={hideAnswers}
                    examMode={examMode && examReady}
                    onExamAnswer={handleExamAnswer}
                    onAnswer={onAnswer}
                  />
                ) : current.type === "hotspot" ? (
                  <Hotspot
                    key={`${sessionKey}-${current.id}`}
                    card={current}
                    onKnow={() => advance(true)}
                    onSrsRate={srsMode ? handleSrsRate : undefined}
                    hideAnswers={hideAnswers}
                    examMode={examMode && examReady}
                    onExamAnswer={handleExamAnswer}
                    onAnswer={onAnswer}
                  />
                ) : current.type === "multi" ? (
                  <MultiSelect
                    key={`${sessionKey}-${current.id}`}
                    card={current}
                    onKnow={() => advance(true)}
                    onSrsRate={srsMode ? handleSrsRate : undefined}
                    hideAnswers={hideAnswers}
                    examMode={examMode && examReady}
                    onExamAnswer={handleExamAnswer}
                    onAnswer={onAnswer}
                  />
                ) : current.type === "connections" ? (
                  <Connections
                    key={`${sessionKey}-${current.id}`}
                    card={current}
                    onKnow={() => advance(true)}
                    onSrsRate={srsMode ? handleSrsRate : undefined}
                  />
                ) : current.type === "crossword" ? (
                  <Crossword
                    key={`${sessionKey}-${current.id}`}
                    card={current}
                    onKnow={() => advance(true)}
                    onSrsRate={srsMode ? handleSrsRate : undefined}
                  />
                ) : current.choices ? (
                  <MultipleChoice
                    key={`${sessionKey}-${current.id}`}
                    card={current}
                    onKnow={() => advance(true)}
                    onSrsRate={srsMode ? handleSrsRate : undefined}
                    hideAnswers={hideAnswers}
                    examMode={examMode && examReady}
                    onExamAnswer={handleExamAnswer}
                    onAnswer={onAnswer}
                  />
                ) : (
                  <Flashcard
                    key={`${sessionKey}-${current.id}`}
                    card={current}
                    onKnow={() => { onAnswer(true); advance(true); }}
                    onSrsRate={srsMode ? handleSrsRate : undefined}
                    hideAnswers={hideAnswers}
                    examMode={examMode && examReady}
                    onExamAnswer={handleExamAnswer}
                    hideDifficulty={hideDifficulty}
                    onSaveCard={selectedExam?.startsWith("CUSTOM:") ? (updated) => handleInlineCardSave(current, updated) : undefined}
                    decks={selectedExam?.startsWith("CUSTOM:") ? customDecks : undefined}
                    displayId={current.displayId || undefined}
                  />
                )}
                {srsMode && (() => {
                  const dot = getSrsDot(current.id);
                  return (
                    <div className="srs-dot-footer">
                      <span
                        className="srs-progress-dot"
                        style={{ backgroundColor: `var(${dot.cssVar})` }}
                        title={`SRS: ${dot.label}`}
                      />
                      <span className="srs-dot-label">{dot.label}</span>
                    </div>
                  );
                })()}
              </div>
            </div>
          )
        )}
      </main>

      {/* Prev / Next navigation — hidden in exam mode */}
      {!finished && !examMode && deck.length > 0 && (
        <div className="card-nav" data-tour="card-nav">
          <button
            className="card-nav-btn"
            onClick={goPrev}
            disabled={index === 0}
          >
            ← Previous
          </button>
          <span className="card-nav-counter">{index + 1} / {deck.length}</span>
          <button
            className="card-nav-btn"
            onClick={goNext}
            disabled={index + 1 >= deck.length}
          >
            Next →
          </button>
        </div>
      )}

      <footer className="app-footer">
        Built with React + Vite &nbsp;·&nbsp; KloudAce
      </footer>
    </div>
  );
}

export default App;
