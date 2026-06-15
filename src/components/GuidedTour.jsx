// filepath: src/GuidedTour.jsx
// ─── Guided Tour ──────────────────────────────────────────────────────────────
// Spotlight-style step-by-step walkthrough for first-time users.
// Usage:  <GuidedTour onDone={fn} />
// Expects data-tour="<id>" attributes on the elements you want to highlight.
// Falls back to a centred card if the target element isn't found.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from "react";
import "./GuidedTour.css";

export const MAIN_TOUR_STEPS = [
  {
    target: null,
    title: "Welcome to KloudAce ☁️",
    body: (
      <>
        <p className="tour-welcome-mission">
          Designed to help cloud professionals stay sharp and give exam candidates
          the edge they need to pass their Azure certifications.
        </p>
        <p className="tour-welcome-section-label">Key features</p>
        <div className="tour-welcome-features">
          <span>Flashcards</span>
          <span>MCQ &amp; Multi-select</span>
          <span>Spaced Repetition</span>
          <span>Exam Mode</span>
          <span>Streaks</span>
          <span>Daily Goals</span>
        </div>
      </>
    ),
    placement: "center",
    welcome: true,
  },
  {
    target: "header-user",
    title: "Your profile",
    body:  "Click your name to edit your account, set a daily card goal, choose default card types, toggle random order, and view your Spaced Repetition stats.",
    placement: "bottom",
  },
  {
    target: "dashboard-btn",
    title: "Readiness Dashboard",
    body:  "Track progress across all exams — SRS maturity, mastered counts, and an overall readiness score.",
    placement: "bottom",
  },
  {
    target: "my-cards-btn",
    title: "My Cards",
    body:  "Create your own custom flashcard decks, add cards from any exam, and study them just like the official decks.",
    placement: "bottom",
  },
  {
    target: "options-btn",
    title: "Options sidebar",
    body:  "Filter by card type (flip cards, MCQ, True/False, diagrams, scripts…), difficulty, or enable Spaced Repetition and Exam Mode.",
    placement: "bottom",
  },
  {
    target: "category-nav",
    title: "Category filter",
    body:  "Drill into a specific topic or multi-select categories. Flagged cards appear as their own virtual category.",
    placement: "bottom",
  },
  {
    target: "stats-strip",
    title: "Daily goal & streak",
    body:  "Your daily card goal progress and study streak live here. Set your goal in Profile — the ring fills as you study and resets at midnight.",
    placement: "top",
  },
  {
    target: "flag-btn",
    title: "Flag & Master",
    body:  "🚩 Flag tricky cards to review later. ⭐ Mark as Mastered to pull them from your active deck. Keyboard shortcuts: F and M.",
    placement: "top",
  },
  {
    target: "card-nav",
    title: "Navigation",
    body:  "Use these buttons or ← → arrow keys to move between cards.",
    placement: "top",
  },
  {
    target: null,
    title: "You're all set! 🎉",
    body:  "Good luck with your cloud certification. You can replay this tour anytime using the 🗺️ Tour button in the header.",
    placement: "center",
  },
];

export const SETTINGS_TOUR_STEPS = [
  {
    target: "sidebar-card-type",
    title: "Card Type",
    body:  "Show or hide specific card types — flip cards, MCQ, multi-select, True/False, diagrams, hotspots, scripts, and more. Tap 'All' to reset.",
    placement: "left",
  },
  {
    target: "sidebar-card-order",
    title: "Card Order",
    body:  "Switch on Spaced Repetition to study cards in priority order based on your review history, or randomise the deck for variety. Re-shuffle anytime.",
    placement: "left",
  },
  {
    target: "sidebar-session",
    title: "Session",
    body:  "Choose how many cards make up a study session — smaller sessions are easier to complete in one sitting. Restart resets your progress for the current deck.",
    placement: "left",
  },
  {
    target: "sidebar-progress",
    title: "Progress",
    body:  "Jump to the Readiness Dashboard to see your overall progress across exams.",
    placement: "left",
  },
  {
    target: "sidebar-exam-mode",
    title: "Exam Mode",
    body:  "Simulate the real exam with a focused, randomised set of harder questions — optionally under a 60-minute timer.",
    placement: "left",
  },
  {
    target: "sidebar-review-filter",
    title: "Review Filter",
    body:  "Show only the cards that are due for review according to your Spaced Repetition schedule.",
    placement: "left",
  },
  {
    target: "sidebar-flagged",
    title: "Flagged Cards",
    body:  "Filter to just the cards you've flagged for extra practice, or clear all your flags at once.",
    placement: "left",
  },
  {
    target: "sidebar-mastered",
    title: "Mastered Cards",
    body:  "Cards you've marked as mastered are hidden from your deck by default. Toggle this to bring them back, or clear your mastered list.",
    placement: "left",
  },
  {
    target: "sidebar-difficulty",
    title: "Difficulty",
    body:  "Focus your session on a specific difficulty level — Easy, Medium, Hard, or Extreme.",
    placement: "left",
  },
];

function getTargetRect(id) {
  if (!id) return null;
  const el = document.querySelector(`[data-tour="${id}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const container = el.closest(".sidebar");
  const bounds = container ? container.getBoundingClientRect() : null;
  return { top: r.top, left: r.left, width: r.width, height: r.height, bounds };
}

const PAD = 10; // spotlight padding

export default function GuidedTour({ onDone, steps = MAIN_TOUR_STEPS }) {
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState(null);

  const current = steps[step];

  // Measure target on each step change + on scroll/resize
  const measure = useCallback(() => {
    setRect(getTargetRect(current.target));
  }, [current.target]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [measure]);
  // Scroll target into view
  useEffect(() => {
    if (!current.target) return;
    const el = document.querySelector(`[data-tour="${current.target}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [current.target]);

  const goNext = () => {
    if (step + 1 >= steps.length) { onDone(); return; }
    setStep(s => s + 1);
  };
  const goPrev = () => { if (step > 0) setStep(s => s - 1); };  // ── Spotlight geometry ──────────────────────────────────────
  const vw = window.innerWidth;

  const EDGE = 4; // keep the spotlight at least this far from the viewport edge
  const vh = window.innerHeight;

  // When the target sits inside a fixed container (e.g. the sidebar), keep
  // the spotlight from bleeding past that container's own edges.
  const minLeft = rect?.bounds ? Math.max(EDGE, rect.bounds.left + EDGE) : EDGE;
  const maxRight = rect?.bounds ? Math.min(vw - EDGE, rect.bounds.right - EDGE) : vw - EDGE;

  const spotTop  = rect ? Math.max(EDGE, rect.top  - PAD) : 0;
  const spotLeft = rect ? Math.max(minLeft, rect.left - PAD) : 0;
  const rawW     = rect ? rect.width  + PAD * 2 : 0;
  const rawH     = rect ? rect.height + PAD * 2 : 0;
  const spotW    = rect ? Math.min(rawW, maxRight - spotLeft) : 0;
  const spotH    = rect ? Math.min(rawH, vh - spotTop - EDGE) : 0;

  // ── Bubble placement ─────────────────────────────────────────
  function bubbleStyle() {
    const BUBBLE_W = current.welcome ? 460 : 310;
    const BUBBLE_H = current.welcome ? 280 : 170;
    const GAP = 14;

    if (!rect || current.placement === "center") {
      return { top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: BUBBLE_W };
    }
    if (current.placement === "bottom") {
      let left = rect.left + rect.width / 2 - BUBBLE_W / 2;
      left = Math.max(12, Math.min(left, vw - BUBBLE_W - 12));
      return { top: spotTop + spotH + GAP, left, width: BUBBLE_W };
    }
    if (current.placement === "top") {
      let left = rect.left + rect.width / 2 - BUBBLE_W / 2;
      left = Math.max(12, Math.min(left, vw - BUBBLE_W - 12));
      return { top: Math.max(12, spotTop - BUBBLE_H - GAP), left, width: BUBBLE_W };
    }
    if (current.placement === "left") {
      const top = rect.top + rect.height / 2 - BUBBLE_H / 2;
      return { top: Math.max(12, top), left: Math.max(12, spotLeft - BUBBLE_W - GAP), width: BUBBLE_W };
    }
    const top = rect.top + rect.height / 2 - BUBBLE_H / 2;
    return { top: Math.max(12, top), left: spotLeft + spotW + GAP, width: BUBBLE_W };
  }

  const isCenter = !rect || current.placement === "center";

  return (
    <div className="tour-overlay" role="dialog" aria-modal="true" aria-label="Guided tour">

      {/* Dark mask — spotlight hole cut out when a target exists */}
      <div
        className="tour-mask"
        style={rect ? {
          clipPath: `polygon(
            0% 0%, 100% 0%, 100% 100%, 0% 100%,
            0% ${spotTop}px,
            ${spotLeft}px ${spotTop}px,
            ${spotLeft}px ${spotTop + spotH}px,
            ${spotLeft + spotW}px ${spotTop + spotH}px,
            ${spotLeft + spotW}px ${spotTop}px,
            0% ${spotTop}px
          )`,
        } : undefined}
      />

      {/* Blue spotlight ring */}
      {rect && (
        <div
          className="tour-spotlight-ring"
          style={{ top: spotTop, left: spotLeft, width: spotW, height: spotH }}
        />
      )}

      {/* Step bubble */}
      <div className={`tour-bubble${isCenter ? " tour-bubble--center" : ""}${current.welcome ? " tour-bubble--welcome" : ""}`} style={bubbleStyle()}>
        <div className="tour-bubble-header">
          <span className="tour-step-counter">Step {step + 1} of {steps.length}</span>
          <button className="tour-skip" onClick={onDone}>✕ Skip</button>
        </div>
        <h3 className="tour-title">{current.title}</h3>
        <div className="tour-body">{current.body}</div>
        <div className="tour-actions">
          {step > 0 && (
            <button className="tour-btn tour-btn--secondary" onClick={goPrev}>← Back</button>
          )}
          <button className="tour-btn tour-btn--primary" onClick={goNext} autoFocus>
            {step + 1 === steps.length ? "Finish" : "Next →"}
          </button>
        </div>
        <div className="tour-dots">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`tour-dot${i === step ? " active" : ""}`}
              onClick={() => setStep(i)}
              title={`Step ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
