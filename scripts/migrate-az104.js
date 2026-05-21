// Migration script — AZ-104 cards → Supabase
// Skips hotspot and image cards (JSX components — handled separately)
// Run with: npx vite-node scripts/migrate-az104.js

import { createClient } from "@supabase/supabase-js";
import az104, { meta } from "../src/data/AZ-104/index.jsx";
import az104FreeIds from "../src/data/AZ-104/az-104-free.js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing env vars. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const freeSet = new Set(az104FreeIds);

const migratable = az104.filter(c => c.type !== "hotspot" && c.type !== "image");
const skipped = az104.length - migratable.length;

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

// Deduplicate by ID just in case
const deduped = Object.values(Object.fromEntries(rows.map(r => [r.id, r])));
if (deduped.length !== rows.length) console.log(`Removed ${rows.length - deduped.length} duplicate ID(s)`);

console.log(`Migrating ${deduped.length} AZ-104 cards (skipping ${skipped} hotspot/image)...`);

const { error } = await supabase
  .from("cards")
  .upsert(deduped, { onConflict: "id" });

if (error) {
  console.error("Migration failed:", error.message);
  process.exit(1);
}

console.log(`✓ Successfully upserted ${deduped.length} AZ-104 cards`);
