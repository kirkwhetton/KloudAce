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

export function bustCardCache(key) {
  if (key) _cache.delete(key);
  else _cache.clear();
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
  const cached = getCached(exam);
  if (cached) return cached;
  const { data, error } = await supabase
    .from("cards")
    .select("id, exam, category, type, difficulty, is_free, created_at, data")
    .eq("exam", exam);
  if (error || !data) return null;
  const cards = data.map(reconstruct);
  setCached(exam, cards);
  return cards;
}

export async function loadCardsByCategory(category) {
  const key = `TOPIC:${category}`;
  const cached = getCached(key);
  if (cached) return cached;
  const { data, error } = await supabase
    .from("cards")
    .select("id, exam, category, type, difficulty, is_free, created_at, data")
    .eq("category", category);
  if (error || !data) return null;
  const cards = data.map(reconstruct);
  setCached(key, cards);
  return cards;
}

export async function loadAllTopics() {
  const cached = getCached("__topics__");
  if (cached) return cached;
  const { data, error } = await supabase.from("cards").select("category");
  if (error || !data) return null;
  const topicMap = {};
  for (const { category } of data) {
    const t = (category || "Uncategorised").trim();
    topicMap[t] = (topicMap[t] || 0) + 1;
  }
  const result = Object.entries(topicMap).sort((a, b) => b[1] - a[1]);
  setCached("__topics__", result);
  return result;
}

export async function loadConnectionsCards() {
  const key = "__connections__";
  const cached = getCached(key);
  if (cached) return cached;
  const { data, error } = await supabase
    .from("cards")
    .select("id, exam, category, type, difficulty, is_free, created_at, data")
    .eq("type", "connections");
  if (error || !data) return null;
  const cards = data.map(reconstruct);
  setCached(key, cards);
  return cards;
}

export async function loadCrosswordCards() {
  const key = "__crossword__";
  const cached = getCached(key);
  if (cached) return cached;
  const { data, error } = await supabase
    .from("cards")
    .select("id, exam, category, type, difficulty, is_free, created_at, data")
    .eq("type", "crossword");
  if (error || !data) return null;
  const cards = data.map(reconstruct);
  setCached(key, cards);
  return cards;
}

export async function loadWordleCards() {
  const key = "__wordle__";
  const cached = getCached(key);
  if (cached) return cached;
  const { data, error } = await supabase
    .from("cards")
    .select("id, exam, category, type, difficulty, is_free, created_at, data")
    .eq("type", "wordle");
  if (error || !data) return null;
  const cards = data.map(reconstruct);
  setCached(key, cards);
  return cards;
}

export async function loadPortalCards() {
  const key = "__portal__";
  const cached = getCached(key);
  if (cached) return cached;
  const { data, error } = await supabase
    .from("cards")
    .select("id, exam, category, type, difficulty, is_free, created_at, data")
    .eq("type", "portal")
    .order("id");
  if (error || !data) return null;
  const cards = data.map(reconstruct);
  setCached(key, cards);
  return cards;
}

export async function loadExamCardCounts() {
  const cached = getCached("__exam_counts__");
  if (cached) return cached;
  const { data, error } = await supabase.from("cards").select("exam");
  if (error || !data) return null;
  const counts = {};
  for (const { exam } of data) counts[exam] = (counts[exam] || 0) + 1;
  setCached("__exam_counts__", counts);
  return counts;
}

export { SUPABASE_EXAMS };
