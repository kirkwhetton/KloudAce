/**
 * SM-2 Spaced Repetition Algorithm
 * Based on the original SuperMemo SM-2 algorithm.
 *
 * Card SRS record shape:
 * {
 *   id: number,
 *   easeFactor: number,   // starts at 2.5, min 1.3
 *   interval: number,     // days until next review
 *   repetitions: number,  // consecutive correct answers
 *   nextReview: string,   // ISO date string
 *   lastReview: string,   // ISO date string
 * }
 *
 * Quality ratings (shown to user as buttons):
 *   1 = Blackout     — complete blank, didn't know at all
 *   2 = Hard         — wrong but remembered on seeing answer
 *   3 = Good         — correct with some effort
 *   4 = Easy         — correct, instant recall
 */

const MIN_EASE = 1.3;
const DEFAULT_EASE = 2.5;

export function createSrsRecord(id) {
  return {
    id,
    easeFactor: DEFAULT_EASE,
    interval: 0,
    repetitions: 0,
    nextReview: new Date().toISOString(),
    lastReview: null,
  };
}

/**
 * Update an SRS record based on user quality rating.
 * Returns a new record (immutable).
 */
export function updateSrsRecord(record, quality) {
  const r = { ...record };
  const now = new Date();
  r.lastReview = now.toISOString();

  if (quality < 3) {
    // Failed — reset repetitions, short interval
    r.repetitions = 0;
    r.interval = quality === 1 ? 1 : 2; // Blackout=1 day, Hard=2 days
  } else {
    // Passed
    if (r.repetitions === 0) {
      r.interval = 1;
    } else if (r.repetitions === 1) {
      r.interval = 6;
    } else {
      r.interval = Math.round(r.interval * r.easeFactor);
    }
    r.repetitions += 1;
  }

  // Update ease factor
  r.easeFactor = Math.max(
    MIN_EASE,
    r.easeFactor + (0.1 - (4 - quality) * (0.08 + (4 - quality) * 0.02))
  );

  // Cap interval at 365 days
  r.interval = Math.min(r.interval, 365);

  const next = new Date(now);
  next.setDate(next.getDate() + r.interval);
  r.nextReview = next.toISOString();

  return r;
}

/**
 * Returns true if a card is due for review today.
 */
export function isDue(record) {
  if (!record) return true;
  return new Date(record.nextReview) <= new Date();
}

/**
 * Returns days until next review (negative = overdue).
 */
export function daysUntil(record) {
  if (!record) return 0;
  const diff = new Date(record.nextReview) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Load all SRS records for a user+exam from localStorage.
 */
export function loadSrsData(userId, exam) {
  const key = `azfc_srs_${userId}_${exam}`;
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

/**
 * Save all SRS records for a user+exam to localStorage.
 */
export function saveSrsData(userId, exam, data) {
  const key = `azfc_srs_${userId}_${exam}`;
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Clear all SRS records for a specific exam.
 */
export function clearSrsDataForExam(userId, exam) {
  const key = `azfc_srs_${userId}_${exam}`;
  localStorage.removeItem(key);
}

/**
 * Clear SRS records for a specific set of card IDs within an exam.
 * (Used for per-category resets.)
 */
export function clearSrsDataForCards(userId, exam, cardIds) {
  const key = `azfc_srs_${userId}_${exam}`;
  try {
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    const idSet = new Set(cardIds.map(String));
    for (const id of idSet) delete data[id];
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* ignore */ }
}

/**
 * Sort cards so due cards come first, then by how overdue they are.
 */
export function sortBySrs(cards, srsData) {
  return [...cards].sort((a, b) => {
    const ra = srsData[a.id];
    const rb = srsData[b.id];
    const da = ra ? new Date(ra.nextReview) : new Date(0);
    const db = rb ? new Date(rb.nextReview) : new Date(0);
    return da - db;
  });
}

/**
 * Get stats for a set of cards.
 */
export function getSrsStats(cards, srsData) {
  const due = cards.filter(c => isDue(srsData[c.id])).length;
  // Young: seen at least once, interval < 21 days (not yet proven long-term retention)
  const learning = cards.filter(c => {
    const r = srsData[c.id];
    return r && r.repetitions > 0 && r.interval < 21;
  }).length;
  // Mature: interval >= 21 days (Anki-standard threshold for genuine long-term retention)
  const mature = cards.filter(c => {
    const r = srsData[c.id];
    return r && r.interval >= 21;
  }).length;
  return { due, learning, mature, total: cards.length };
}
