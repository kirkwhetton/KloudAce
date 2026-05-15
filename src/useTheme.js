// src/useTheme.js
// Persists the user's chosen theme in localStorage and applies
// a data-theme attribute on <body>. Also handles system dark-mode
// preference as the default when no explicit choice has been stored.

import { useState, useEffect } from "react";

export const THEMES = [
  { value: "light",        label: "☀️ Light" },
  { value: "dark",         label: "🌙 Dark" },
  { value: "protanopia",   label: "👁 Protanopia" },
  { value: "deuteranopia", label: "👁 Deuteranopia" },
  { value: "tritanopia",   label: "👁 Tritanopia" },
];

function getStoredTheme(userId) {
  try {
    return localStorage.getItem(`azfc_theme_${userId ?? "guest"}`) || null;
  } catch {
    return null;
  }
}

function systemPrefersDark() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches;
}

export function useTheme(userId) {
  const key = `azfc_theme_${userId ?? "guest"}`;

  const [theme, setThemeState] = useState(() => {
    const stored = getStoredTheme(userId);
    if (stored) return stored;
    return systemPrefersDark() ? "dark" : "light";
  });

  // Apply to <body> whenever theme changes
  useEffect(() => {
    if (theme === "light") {
      document.body.removeAttribute("data-theme");
    } else {
      document.body.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const setTheme = (t) => {
    try { localStorage.setItem(key, t); } catch { /* ignore */ }
    setThemeState(t);
  };

  return { theme, setTheme };
}
