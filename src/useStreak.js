// src/useStreak.js
// Manages daily study streak per user.
// A "study day" is recorded the first time the user answers a card each calendar day.
// The streak resets to 1 if they skip a day (gap > 1 day between last activity and today).

import { useState, useCallback } from "react";

function todayStr() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function daysBetween(dateStrA, dateStrB) {
  const a = new Date(dateStrA);
  const b = new Date(dateStrB);
  return Math.round((b - a) / 86_400_000);
}

export function useStreak(userId) {
  const key = userId ? `azfc_streak_${userId}` : "azfc_streak_guest";

  function load() {
    try {
      return JSON.parse(localStorage.getItem(key) || "{}");
    } catch {
      return {};
    }
  }

  // { streak: number, lastDate: "YYYY-MM-DD", longestStreak: number }
  const [streakData, setStreakData] = useState(() => {
    const d = load();    return {
      streak: d.streak ?? 0,
      lastDate: d.lastDate ?? null,
      longestStreak: d.longestStreak ?? 0,
    };
  });

  // Call this once per session when the user answers their first card.
  const recordActivity = useCallback(() => {
    setStreakData((prev) => {
      const today = todayStr();
      if (prev.lastDate === today) return prev;

      let newStreak;
      if (!prev.lastDate) {
        newStreak = 1;
      } else {
        const gap = daysBetween(prev.lastDate, today);
        newStreak = gap === 1 ? prev.streak + 1 : 1;
      }

      // Keep rolling 90-day history of active dates
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 90);
      const cutoffStr = cutoff.toISOString().slice(0, 10);
      const activeDates = [
        ...((prev.activeDates || []).filter(d => d >= cutoffStr && d !== today)),
        today,
      ];

      const next = {
        streak: newStreak,
        lastDate: today,
        longestStreak: Math.max(newStreak, prev.longestStreak ?? 0),
        activeDates,
      };

      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { ...streakData, recordActivity };
}
