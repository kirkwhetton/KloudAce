// Migration script — AZ-900 cards → Supabase
// Run with: npx vite-node scripts/migrate-az900.js

import { createClient } from "@supabase/supabase-js";
import az900, { meta } from "../src/data/AZ-900/index.js";
import az900FreeIds from "../src/data/AZ-900/az-900-free.js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing env vars. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const freeSet = new Set(az900FreeIds);

const rows = az900.map((card) => {
  const { id, exam, category, type, difficulty, ...rest } = card;
  return {
    id,
    exam,
    category: category || "General",
    type: type || "flashcard",
    difficulty: difficulty || "medium",
    is_free: true, // AZ-900 is fully free
    data: rest,
  };
});

console.log(`Migrating ${rows.length} AZ-900 cards...`);

const { error } = await supabase
  .from("cards")
  .upsert(rows, { onConflict: "id" });

if (error) {
  console.error("Migration failed:", error.message);
  process.exit(1);
}

console.log(`✓ Successfully upserted ${rows.length} AZ-900 cards`);
