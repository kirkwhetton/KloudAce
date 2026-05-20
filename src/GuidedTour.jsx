// filepath: src/GuidedTour.jsx
// ─── Guided Tour ──────────────────────────────────────────────────────────────
// Spotlight-style step-by-step walkthrough for first-time users.
// Usage:  <GuidedTour onDone={fn} />
// Expects data-tour="<id>" attributes on the elements you want to highlight.
// Falls back to a centred card if the target element isn't found.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from "react";
import "./GuidedTour.css";

const STEPS = [
  {
    target: null,
    title: "Welcome to KloudAce! 👋",
    body:  "This quick tour shows you the key features. It only takes 30 seconds — or skip any time.",
    placement: "center",
  },
  {
    target: "header-user",
    title: "Your profile",
    body:  "Click your name to edit your account, toggle answer/difficulty visibility, and view your Spaced Repetition stats.",
    placement: "bottom",
  },
  {
    target: "dashboard-btn",
    title: "Readiness Dashboard",
    body:  "Track progress across all exams — SRS maturity, mastered counts, and an overall readiness score.",
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

function getTargetRect(id) {
  if (!id) return null;
  const el = document.querySelector(`[data-tour="${id}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

const PAD = 10; // spotlight padding

export default function GuidedTour({ onDone }) {
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState(null);

  const current = STEPS[step];

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
    if (step + 1 >= STEPS.length) { onDone(); return; }
    setStep(s => s + 1);
  };
  const goPrev = () => { if (step > 0) setStep(s => s - 1); };  // ── Spotlight geometry ──────────────────────────────────────
  const vw = window.innerWidth;

  const spotTop  = rect ? Math.max(0, rect.top  - PAD) : 0;
  const spotLeft = rect ? Math.max(0, rect.left - PAD) : 0;
  const spotW    = rect ? rect.width  + PAD * 2 : 0;
  const spotH    = rect ? rect.height + PAD * 2 : 0;

  // ── Bubble placement ─────────────────────────────────────────
  function bubbleStyle() {
    const BUBBLE_W = 310;
    const BUBBLE_H = 170;
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
      <div className={`tour-bubble${isCenter ? " tour-bubble--center" : ""}`} style={bubbleStyle()}>
        <div className="tour-bubble-header">
          <span className="tour-step-counter">Step {step + 1} of {STEPS.length}</span>
          <button className="tour-skip" onClick={onDone}>✕ Skip</button>
        </div>
        <h3 className="tour-title">{current.title}</h3>
        <p  className="tour-body">{current.body}</p>
        <div className="tour-actions">
          {step > 0 && (
            <button className="tour-btn tour-btn--secondary" onClick={goPrev}>← Back</button>
          )}
          <button className="tour-btn tour-btn--primary" onClick={goNext} autoFocus>
            {step + 1 === STEPS.length ? "Finish 🎉" : "Next →"}
          </button>
        </div>
        <div className="tour-dots">
          {STEPS.map((_, i) => (
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
