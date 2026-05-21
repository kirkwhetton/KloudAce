// Migration script — AZ-305 cards → Supabase
// Run with: npx vite-node scripts/migrate-az305.js

import { createClient } from "@supabase/supabase-js";
import az305, { meta } from "../src/data/AZ-305/index.js";
import az305FreeIds from "../src/data/AZ-305/az-305-free.js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing env vars. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const freeSet = new Set(az305FreeIds);

const rows = az305.map((card) => {
  const { id, exam, category, type, difficulty, ...rest } = card;
  return {
    id,
    exam,
    category: category || "General",
    type: type || "flashcard",
    difficulty: difficulty || "medium",
    is_free: freeSet.has(id),
    data: rest,
  };
});

console.log(`Migrating ${rows.length} AZ-305 cards...`);

const { error } = await supabase
  .from("cards")
  .upsert(rows, { onConflict: "id" });

if (error) {
  console.error("Migration failed:", error.message);
  process.exit(1);
}

console.log(`✓ Successfully upserted ${rows.length} AZ-305 cards`);
