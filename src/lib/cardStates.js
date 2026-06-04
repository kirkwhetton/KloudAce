import { supabase } from "../auth/supabase.js";

/**
 * Load flagged and mastered card ID arrays from Supabase.
 * Returns null if no record exists or on error.
 */
export async function loadCardStatesRemote(userId) {
  try {
    const { data, error } = await supabase
      .from("card_states")
      .select("flagged, mastered")
      .eq("user_id", userId)
      .single();
    if (error || !data) return null;
    return { flagged: data.flagged ?? [], mastered: data.mastered ?? [] };
  } catch {
    return null;
  }
}

/**
 * Upsert flagged and mastered arrays to Supabase. Fire-and-forget safe.
 */
export async function saveCardStatesRemote(userId, flagged, mastered) {
  try {
    await supabase
      .from("card_states")
      .upsert(
        {
          user_id: userId,
          flagged: [...flagged],
          mastered: [...mastered],
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );
  } catch {
    // non-fatal — localStorage cache still holds the data
  }
}
