import { describe, it, expect } from 'vitest'

// Replicate the examDeck free-tier filter from App.jsx so it can be tested in isolation.
// If this logic ever changes in App.jsx, update it here too.
function applyFreeTierFilter(cards, { isPremium, freeCardIds, selectedExam }) {
  return cards.filter((c) =>
    isPremium ||
    c.exam === 'AZ-900' ||
    freeCardIds.has(c.id) ||
    selectedExam?.startsWith('CUSTOM:')
  )
}

const FREE_IDS = new Set(['AZ-104-001', 'AZ-104-002', 'AZ-700-101'])

const cards = [
  { id: 'AZ-900-201', exam: 'AZ-900', type: 'mcq' },
  { id: 'AZ-104-001', exam: 'AZ-104', type: 'mcq' },   // free
  { id: 'AZ-104-002', exam: 'AZ-104', type: 'mcq' },   // free
  { id: 'AZ-104-099', exam: 'AZ-104', type: 'mcq' },   // premium-only
  { id: 'AZ-700-101', exam: 'AZ-700', type: 'mcq' },   // free
  { id: 'AZ-700-199', exam: 'AZ-700', type: 'mcq' },   // premium-only
]

describe('Free-tier card filter', () => {
  it('premium users see all cards', () => {
    const result = applyFreeTierFilter(cards, { isPremium: true, freeCardIds: FREE_IDS, selectedExam: 'AZ-104' })
    expect(result).toHaveLength(cards.length)
  })

  it('free users always see all AZ-900 cards', () => {
    const result = applyFreeTierFilter(cards, { isPremium: false, freeCardIds: FREE_IDS, selectedExam: 'AZ-900' })
    const az900 = result.filter(c => c.exam === 'AZ-900')
    expect(az900).toHaveLength(1)
  })

  it('free users see only free-tier cards for paid exams', () => {
    const result = applyFreeTierFilter(cards, { isPremium: false, freeCardIds: FREE_IDS, selectedExam: 'AZ-104' })
    const az104 = result.filter(c => c.exam === 'AZ-104')
    expect(az104).toHaveLength(2) // AZ-104-001 and AZ-104-002
    expect(az104.map(c => c.id)).not.toContain('AZ-104-099')
  })

  it('free users cannot see premium-only AZ-700 cards', () => {
    const result = applyFreeTierFilter(cards, { isPremium: false, freeCardIds: FREE_IDS, selectedExam: 'AZ-700' })
    expect(result.map(c => c.id)).not.toContain('AZ-700-199')
  })

  it('custom deck cards always show regardless of premium status', () => {
    const customCards = [{ id: 'custom-1', exam: 'CUSTOM:my-deck', type: 'flashcard' }]
    const result = applyFreeTierFilter(customCards, { isPremium: false, freeCardIds: FREE_IDS, selectedExam: 'CUSTOM:my-deck' })
    expect(result).toHaveLength(1)
  })

  it('free user with empty free set sees only AZ-900 cards', () => {
    const result = applyFreeTierFilter(cards, { isPremium: false, freeCardIds: new Set(), selectedExam: 'AZ-104' })
    expect(result.every(c => c.exam === 'AZ-900')).toBe(true)
  })
})
