import { supabase } from "./auth/supabase.js";

const SUPABASE_EXAMS = new Set(["AZ-900", "AZ-305", "AZ-700", "AZ-104"]);

const reconstruct = ({ id, exam, category, type, difficulty, is_free, created_at, data: rest }) => ({
  id, exam, category, type, difficulty, is_free, created_at, ...rest,
});

// ─── In-memory cache (fast, cleared on page reload) ─────────────
const _cache = new Map();
const MEM_TTL = 5 * 60 * 1000; // 5 minutes

function getCached(key) {
  const entry = _cache.get(key);
  if (entry && Date.now() - entry.ts < MEM_TTL) return entry.cards;
  return null;
}
function setCached(key, cards) {
  _cache.set(key, { cards, ts: Date.now() });
}

// ─── localStorage cache (survives page reload, 24-hour TTL) ─────
const LS_PREFIX = "azfc_cards_";
const LS_TTL = 24 * 60 * 60 * 1000;

function lsGet(key) {
  try {
    const raw = localStorage.getItem(LS_PREFIX + key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    return { data, stale: Date.now() - ts > LS_TTL };
  } catch { return null; }
}
function lsSet(key, data) {
  try {
    localStorage.setItem(LS_PREFIX + key, JSON.stringify({ data, ts: Date.now() }));
  } catch {} // quota exceeded — ignore silently
}
function lsDel(key) {
  try { localStorage.removeItem(LS_PREFIX + key); } catch {}
}
function lsClear() {
  try {
    Object.keys(localStorage)
      .filter(k => k.startsWith(LS_PREFIX))
      .forEach(k => localStorage.removeItem(k));
  } catch {}
}

export function bustCardCache(key) {
  if (key) { _cache.delete(key); lsDel(key); }
  else { _cache.clear(); lsClear(); }
}

// ─── Stale-while-revalidate ──────────────────────────────────────
// 1. Return in-memory hit immediately (always fresh within MEM_TTL).
// 2. Return localStorage hit immediately; if stale, refresh in background.
// 3. Fall back to a blocking Supabase fetch on cold first visit.
async function swr(key, fetcher) {
  const mem = getCached(key);
  if (mem) return mem;

  const ls = lsGet(key);
  if (ls) {
    setCached(key, ls.data);
    if (ls.stale) {
      fetcher().then(fresh => {
        if (fresh) { setCached(key, fresh); lsSet(key, fresh); }
      }).catch(() => {});
    }
    return ls.data;
  }

  const fresh = await fetcher();
  if (fresh) { setCached(key, fresh); lsSet(key, fresh); }
  return fresh;
}

// ─── Wake ping ───────────────────────────────────────────────────
// Call once on app mount to open a connection and wake the Supabase
// instance before the user tries to load an exam.
export function wakeSupabase() {
  (async () => {
    try { await supabase.from("cards").select("id", { count: "exact", head: true }); } catch {}
  })();
}

// ─── Public loaders ──────────────────────────────────────────────
export async function loadExamCardsRemote(exam) {
  if (!SUPABASE_EXAMS.has(exam)) return null;
  return swr(exam, async () => {
    const { data, error } = await supabase
      .from("cards")
      .select("id, exam, category, type, difficulty, is_free, created_at, data")
      .eq("exam", exam);
    if (error || !data) return null;
    return data.map(reconstruct);
  });
}

export async function loadCardsByCategory(category) {
  const key = `TOPIC:${category}`;
  return swr(key, async () => {
    const { data, error } = await supabase
      .from("cards")
      .select("id, exam, category, type, difficulty, is_free, created_at, data")
      .eq("category", category);
    if (error || !data) return null;
    return data.map(reconstruct);
  });
}

export async function loadAllTopics() {
  return swr("__topics__", async () => {
    const { data, error } = await supabase.from("cards").select("category");
    if (error || !data) return null;
    const topicMap = {};
    for (const { category } of data) {
      const t = (category || "Uncategorised").trim();
      topicMap[t] = (topicMap[t] || 0) + 1;
    }
    return Object.entries(topicMap).sort((a, b) => b[1] - a[1]);
  });
}

export async function loadExamCardCounts() {
  return swr("__exam_counts__", async () => {
    const { data, error } = await supabase.from("cards").select("exam");
    if (error || !data) return null;
    const counts = {};
    for (const { exam } of data) counts[exam] = (counts[exam] || 0) + 1;
    return counts;
  });
}

export { SUPABASE_EXAMS };
