import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Supabase before importing cardLoader
vi.mock('../auth/supabase.js', () => ({
  supabase: {
    from: vi.fn(),
  },
}))

import { supabase } from '../auth/supabase.js'
import { loadExamCardsRemote, loadCardsByCategory, SUPABASE_EXAMS, bustCardCache } from '../cardLoader'

const mockCard = {
  id: 'AZ-900-101',
  exam: 'AZ-900',
  category: 'Cloud Concepts',
  type: 'mcq',
  difficulty: 'easy',
  is_free: true,
  data: { question: 'What is Azure?', choices: ['A cloud', 'A database'], correctAnswer: 0 },
}

function mockSelect(rows) {
  const chain = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockResolvedValue({ data: rows, error: null }),
  }
  supabase.from.mockReturnValue(chain)
  return chain
}

function mockSelectError() {
  const chain = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockResolvedValue({ data: null, error: { message: 'DB error' } }),
  }
  supabase.from.mockReturnValue(chain)
}

beforeEach(() => {
  vi.resetAllMocks()  // clears call records AND mock implementations from prior tests
  bustCardCache()     // clears in-memory Map
})

describe('SUPABASE_EXAMS', () => {
  it('includes all four migrated exams', () => {
    expect(SUPABASE_EXAMS.has('AZ-900')).toBe(true)
    expect(SUPABASE_EXAMS.has('AZ-104')).toBe(true)
    expect(SUPABASE_EXAMS.has('AZ-305')).toBe(true)
    expect(SUPABASE_EXAMS.has('AZ-700')).toBe(true)
  })
})

describe('loadExamCardsRemote', () => {
  it('returns null for an unmigrated exam', async () => {
    const result = await loadExamCardsRemote('AZ-999')
    expect(result).toBeNull()
  })

  it('reconstructs card objects from DB rows', async () => {
    mockSelect([mockCard])
    const cards = await loadExamCardsRemote('AZ-900')
    expect(cards).toHaveLength(1)
    expect(cards[0].id).toBe('AZ-900-101')
    expect(cards[0].question).toBe('What is Azure?')
    expect(cards[0].exam).toBe('AZ-900')
  })

  it('returns null on Supabase error', async () => {
    mockSelectError()
    const result = await loadExamCardsRemote('AZ-900')
    expect(result).toBeNull()
  })

  it('returns empty array when no cards exist for exam', async () => {
    mockSelect([])
    const result = await loadExamCardsRemote('AZ-900')
    expect(result).toEqual([])
  })
})

describe('loadCardsByCategory', () => {
  it('reconstructs cards filtered by category', async () => {
    mockSelect([mockCard])
    const cards = await loadCardsByCategory('Cloud Concepts')
    expect(cards).toHaveLength(1)
    expect(cards[0].category).toBe('Cloud Concepts')
  })

  it('returns null on error', async () => {
    mockSelectError()
    const result = await loadCardsByCategory('Cloud Concepts')
    expect(result).toBeNull()
  })
})
