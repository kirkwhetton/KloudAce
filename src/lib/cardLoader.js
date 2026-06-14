import { supabase } from "../auth/supabase.js";

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

// Supabase default page size is 1000 rows — override with a safe upper bound
// so the deck never silently truncates as content grows.
const ALL_ROWS = { from: 0, to: 9999 };

// PostgREST caps each response at its server-side max-rows setting (1000 by
// default) regardless of the requested range, so queries spanning more than
// that many rows must be paginated in batches.
const PAGE_SIZE = 1000;

async function selectAllRows(buildQuery) {
  const rows = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await buildQuery().range(from, from + PAGE_SIZE - 1);
    if (error) return { data: null, error };
    rows.push(...data);
    if (data.length < PAGE_SIZE) break;
  }
  return { data: rows, error: null };
}

// ─── Wake ping ───────────────────────────────────────────────────
// Retries with backoff so a cold-start Supabase instance is warmed
// before the first real card load arrives.
export function wakeSupabase() {
  (async () => {
    for (let i = 0; i < 5; i++) {
      try {
        await supabase.from("cards").select("id", { count: "exact", head: true });
        return; // success — instance is awake
      } catch {
        await new Promise(r => setTimeout(r, 4_000 * (i + 1))); // 4s 8s 12s 16s 20s
      }
    }
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
    .eq("exam", exam)
    .range(ALL_ROWS.from, ALL_ROWS.to);
  if (error || !data) { console.error("[cardLoader]", error?.message ?? "no data"); return null; }
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
    .eq("category", category)
    .range(ALL_ROWS.from, ALL_ROWS.to);
  if (error || !data) { console.error("[cardLoader]", error?.message ?? "no data"); return null; }
  const cards = data.map(reconstruct);
  setCached(key, cards);
  return cards;
}

export async function loadAllTopics() {
  const cached = getCached("__topics__");
  if (cached) return cached;
  const { data, error } = await selectAllRows(() =>
    supabase.from("cards").select("category")
  );
  if (error || !data) { console.error("[cardLoader]", error?.message ?? "no data"); return null; }
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
  if (error || !data) { console.error("[cardLoader]", error?.message ?? "no data"); return null; }
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
  if (error || !data) { console.error("[cardLoader]", error?.message ?? "no data"); return null; }
  const cards = data.map(reconstruct);
  setCached(key, cards);
  return cards;
}

export async function loadWordSearchCards() {
  const key = "__wordsearch__";
  const cached = getCached(key);
  if (cached) return cached;
  const { data, error } = await supabase
    .from("cards")
    .select("id, exam, category, type, difficulty, is_free, created_at, data")
    .eq("type", "wordsearch");
  if (error || !data) { console.error("[cardLoader]", error?.message ?? "no data"); return null; }
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
  if (error || !data) { console.error("[cardLoader]", error?.message ?? "no data"); return null; }
  const cards = data.map(reconstruct);
  setCached(key, cards);
  return cards;
}

export async function loadTerraformLabCards() {
  const key = "__terraform__";
  const cached = getCached(key);
  if (cached) return cached;
  const { data, error } = await supabase
    .from("cards")
    .select("id, exam, category, type, difficulty, is_free, created_at, data")
    .eq("type", "terraform-lab")
    .order("id");
  if (error || !data) { console.error("[cardLoader]", error?.message ?? "no data"); return null; }
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
  if (error || !data) { console.error("[cardLoader]", error?.message ?? "no data"); return null; }
  const cards = data.map(reconstruct);
  setCached(key, cards);
  return cards;
}

// Card types excluded from the main study deck (App.jsx examDeck filter) —
// games, labs, and portal sims are studied via their own dedicated decks.
const NON_DECK_TYPES = new Set(["connections", "crossword", "portal", "wordle", "wordsearch", "terraform-lab"]);

export async function loadExamCardCounts() {
  const cached = getCached("__exam_counts__");
  if (cached) return cached;
  const { data, error } = await selectAllRows(() =>
    supabase.from("cards").select("exam, type")
  );
  if (error || !data) { console.error("[cardLoader]", error?.message ?? "no data"); return null; }
  const counts = {};
  for (const { exam, type } of data) {
    if (NON_DECK_TYPES.has(type)) continue;
    counts[exam] = (counts[exam] || 0) + 1;
  }
  setCached("__exam_counts__", counts);
  return counts;
}

export { SUPABASE_EXAMS };
