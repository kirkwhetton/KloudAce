// ─── Flashcard aggregator ────────────────────────────────────────
// Add new exam files here and they will automatically appear in the app.
// Each file exports an array of cards with a unique id range so cards
// never clash:  AZ-104 → 1–99 │ AZ-700 → 101–199 │ AZ-900 → 201–299
// ─────────────────────────────────────────────────────────────────
import az104, { meta as meta104 } from "./data/AZ-104/index.jsx";
import az700, { meta as meta700 } from "./data/AZ-700/index.js";
import az900, { meta as meta900 } from "./data/AZ-900/index.jsx";
import az305, { meta as meta305 } from "./data/AZ-305/index.js";

import az104FreeIds from "./data/AZ-104/az-104-free.js";
import az700FreeIds from "./data/AZ-700/az-700-free.js";
import az900FreeIds from "./data/AZ-900/az-900-free.js";
import az305FreeIds from "./data/AZ-305/az-305-free.js";

const flashcards = [...az104, ...az700, ...az900, ...az305];

// Keyed by exam code — e.g. EXAM_META["AZ-104"].fullName
export const EXAM_META = {
  [meta104.exam]: meta104,
  [meta700.exam]: meta700,
  [meta900.exam]: meta900,
  [meta305.exam]: meta305,
};

// Set of card IDs available to free (non-premium) users
export const FREE_CARD_IDS = new Set([
  ...az104FreeIds,
  ...az700FreeIds,
  ...az900FreeIds,
  ...az305FreeIds,
]);

export default flashcards;
