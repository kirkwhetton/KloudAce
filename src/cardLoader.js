import { supabase } from "./auth/supabase.js";

const SUPABASE_EXAMS = new Set(["AZ-900", "AZ-305", "AZ-700", "AZ-104"]);

const reconstruct = ({ id, exam, category, type, difficulty, is_free, data: rest }) => ({
  id, exam, category, type, difficulty, is_free, ...rest,
});

export async function loadExamCardsRemote(exam) {
  if (!SUPABASE_EXAMS.has(exam)) return null;
  try {
    const { data, error } = await supabase
      .from("cards")
      .select("id, exam, category, type, difficulty, is_free, data")
      .eq("exam", exam);
    if (error || !data) return null;
    return data.map(reconstruct);
  } catch {
    return null;
  }
}

export async function loadCardsByCategory(category) {
  try {
    const { data, error } = await supabase
      .from("cards")
      .select("id, exam, category, type, difficulty, is_free, data")
      .eq("category", category);
    if (error || !data) return null;
    return data.map(reconstruct);
  } catch {
    return null;
  }
}

export async function loadAllTopics() {
  try {
    const { data, error } = await supabase.from("cards").select("category");
    if (error || !data) return null;
    const topicMap = {};
    for (const { category } of data) {
      const t = (category || "Uncategorised").trim();
      topicMap[t] = (topicMap[t] || 0) + 1;
    }
    return Object.entries(topicMap).sort((a, b) => b[1] - a[1]);
  } catch {
    return null;
  }
}

export async function loadExamCardCounts() {
  try {
    const { data, error } = await supabase.from("cards").select("exam");
    if (error || !data) return null;
    const counts = {};
    for (const { exam } of data) counts[exam] = (counts[exam] || 0) + 1;
    return counts;
  } catch {
    return null;
  }
}

export async function loadAllCards() {
  try {
    const { data, error } = await supabase
      .from("cards")
      .select("id, exam, category, type, difficulty, is_free, data");
    if (error || !data) return null;
    return data.map(reconstruct);
  } catch {
    return null;
  }
}

export { SUPABASE_EXAMS };
