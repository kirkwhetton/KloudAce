// Migration script — AZ-700 cards → Supabase
// Skips hotspot and image cards (JSX components — handled separately)
// Run with: npx vite-node scripts/migrate-az700.js

import { createClient } from "@supabase/supabase-js";
import az700, { meta } from "../src/data/AZ-700/index.js";
import az700FreeIds from "../src/data/AZ-700/az-700-free.js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing env vars. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const freeSet = new Set(az700FreeIds);

// Skip hotspot and image cards — they contain JSX components
const migratable = az700.filter(c => c.type !== "hotspot" && c.type !== "image");
const skipped = az700.length - migratable.length;

const rows = migratable.map((card) => {
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

console.log(`Migrating ${rows.length} AZ-700 cards (skipping ${skipped} hotspot/image)...`);

const { error } = await supabase
  .from("cards")
  .upsert(rows, { onConflict: "id" });

if (error) {
  console.error("Migration failed:", error.message);
  process.exit(1);
}

console.log(`✓ Successfully upserted ${rows.length} AZ-700 cards`);
