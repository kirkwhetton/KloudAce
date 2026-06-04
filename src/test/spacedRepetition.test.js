import { describe, it, expect } from 'vitest'
import { createSrsRecord, updateSrsRecord, isDue } from '../lib/spacedRepetition'

describe('createSrsRecord', () => {
  it('creates a record with default ease and zero repetitions', () => {
    const r = createSrsRecord('card-1')
    expect(r.easeFactor).toBe(2.5)
    expect(r.repetitions).toBe(0)
    expect(r.interval).toBe(0)
    expect(r.id).toBe('card-1')
  })
})

describe('updateSrsRecord — passing (quality >= 3)', () => {
  it('first correct answer sets interval to 1', () => {
    const r = updateSrsRecord(createSrsRecord('x'), 3)
    expect(r.repetitions).toBe(1)
    expect(r.interval).toBe(1)
  })

  it('second correct answer sets interval to 6', () => {
    const r1 = updateSrsRecord(createSrsRecord('x'), 3)
    const r2 = updateSrsRecord(r1, 3)
    expect(r2.repetitions).toBe(2)
    expect(r2.interval).toBe(6)
  })

  it('third correct answer multiplies interval by ease factor', () => {
    const r1 = updateSrsRecord(createSrsRecord('x'), 3)
    const r2 = updateSrsRecord(r1, 3)
    const r3 = updateSrsRecord(r2, 3)
    expect(r3.interval).toBe(Math.round(6 * r2.easeFactor))
    expect(r3.repetitions).toBe(3)
  })

  it('easy answer (quality 4) increases ease factor', () => {
    const before = createSrsRecord('x')
    const after = updateSrsRecord(before, 4)
    expect(after.easeFactor).toBeGreaterThan(before.easeFactor)
  })

  it('caps interval at 365 days', () => {
    let r = createSrsRecord('x')
    r = { ...r, interval: 360, repetitions: 5 }
    const next = updateSrsRecord(r, 4)
    expect(next.interval).toBeLessThanOrEqual(365)
  })
})

describe('updateSrsRecord — failing (quality < 3)', () => {
  it('blackout (quality 1) resets repetitions and sets interval to 1', () => {
    let r = updateSrsRecord(createSrsRecord('x'), 3)
    r = updateSrsRecord(r, 3) // build up streak
    const fail = updateSrsRecord(r, 1)
    expect(fail.repetitions).toBe(0)
    expect(fail.interval).toBe(1)
  })

  it('hard (quality 2) resets repetitions and sets interval to 2', () => {
    const fail = updateSrsRecord(createSrsRecord('x'), 2)
    expect(fail.repetitions).toBe(0)
    expect(fail.interval).toBe(2)
  })

  it('never drops ease below minimum 1.3', () => {
    let r = createSrsRecord('x')
    for (let i = 0; i < 20; i++) r = updateSrsRecord(r, 1)
    expect(r.easeFactor).toBeGreaterThanOrEqual(1.3)
  })
})

describe('isDue', () => {
  it('returns true for a null record (never reviewed)', () => {
    expect(isDue(null)).toBe(true)
    expect(isDue(undefined)).toBe(true)
  })

  it('returns true when nextReview is in the past', () => {
    const r = { nextReview: new Date(Date.now() - 86_400_000).toISOString() }
    expect(isDue(r)).toBe(true)
  })

  it('returns false when nextReview is in the future', () => {
    const r = { nextReview: new Date(Date.now() + 86_400_000).toISOString() }
    expect(isDue(r)).toBe(false)
  })
})
