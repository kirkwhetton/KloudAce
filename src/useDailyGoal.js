import { useState, useCallback } from "react";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function useDailyGoal(userId) {
  const key = userId ? `azfc_goal_${userId}` : "azfc_goal_guest";

  function load() {
    try { return JSON.parse(localStorage.getItem(key) || "{}"); }
    catch { return {}; }
  }

  const [data, setData] = useState(() => {
    const d = load();
    const today = todayStr();
    return {
      goal:  d.goal  ?? 20,
      count: d.date === today ? (d.count ?? 0) : 0,
      date:  today,
    };
  });

  const increment = useCallback(() => {
    setData((prev) => {
      const today = todayStr();
      const count = (prev.date === today ? prev.count : 0) + 1;
      const next = { goal: prev.goal, count, date: today };
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  }, [key]);

  const setGoal = useCallback((goal) => {
    setData((prev) => {
      const next = { ...prev, goal };
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  }, [key]);

  return { goal: data.goal, count: data.count, increment, setGoal };
}
