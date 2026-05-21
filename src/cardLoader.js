import { supabase } from "./auth/supabase.js";

// Exams that have been migrated to Supabase
const SUPABASE_EXAMS = new Set(["AZ-900", "AZ-305", "AZ-700", "AZ-104"]);

/**
 * Load cards for an exam from Supabase.
 * Returns null if the exam hasn't been migrated or on error.
 */
export async function loadExamCardsRemote(exam) {
  if (!SUPABASE_EXAMS.has(exam)) return null;
  try {
    const { data, error } = await supabase
      .from("cards")
      .select("id, exam, category, type, difficulty, is_free, data")
      .eq("exam", exam);
    if (error || !data) return null;
    // Reconstruct card objects: spread data fields back alongside top-level fields
    return data.map(({ id, exam, category, type, difficulty, is_free, data: rest }) => ({
      id,
      exam,
      category,
      type,
      difficulty,
      ...rest,
    }));
  } catch {
    return null;
  }
}

export { SUPABASE_EXAMS };
