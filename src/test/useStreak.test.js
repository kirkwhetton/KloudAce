import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStreak } from '../hooks/useStreak'

beforeEach(() => {
  localStorage.clear()
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

const TODAY = '2026-05-22'
const YESTERDAY = '2026-05-21'
const TWO_DAYS_AGO = '2026-05-20'

function setDate(dateStr) {
  vi.setSystemTime(new Date(dateStr + 'T12:00:00Z'))
}

describe('useStreak', () => {
  it('starts with streak 0 for a new user', () => {
    setDate(TODAY)
    const { result } = renderHook(() => useStreak('user-1'))
    expect(result.current.streak).toBe(0)
  })

  it('recordActivity sets streak to 1 on first ever activity', () => {
    setDate(TODAY)
    const { result } = renderHook(() => useStreak('user-1'))
    act(() => result.current.recordActivity())
    expect(result.current.streak).toBe(1)
  })

  it('calling recordActivity twice on the same day keeps streak at 1', () => {
    setDate(TODAY)
    const { result } = renderHook(() => useStreak('user-1'))
    act(() => result.current.recordActivity())
    act(() => result.current.recordActivity())
    expect(result.current.streak).toBe(1)
  })

  it('consecutive day extends streak', () => {
    setDate(YESTERDAY)
    const { result } = renderHook(() => useStreak('user-1'))
    act(() => result.current.recordActivity())
    expect(result.current.streak).toBe(1)

    setDate(TODAY)
    act(() => result.current.recordActivity())
    expect(result.current.streak).toBe(2)
  })

  it('skipping a day resets streak to 1', () => {
    setDate(TWO_DAYS_AGO)
    const { result } = renderHook(() => useStreak('user-1'))
    act(() => result.current.recordActivity())

    setDate(TODAY) // skipped YESTERDAY
    act(() => result.current.recordActivity())
    expect(result.current.streak).toBe(1)
  })

  it('tracks longestStreak correctly', () => {
    setDate(TWO_DAYS_AGO)
    const { result } = renderHook(() => useStreak('user-1'))
    act(() => result.current.recordActivity())

    setDate(YESTERDAY)
    act(() => result.current.recordActivity())
    expect(result.current.longestStreak).toBe(2)

    setDate(TODAY) // skip — breaks streak
    // simulate gap of 2 days: set last to TWO_DAYS_AGO manually
    localStorage.setItem('azfc_streak_user-1', JSON.stringify({ streak: 1, lastDate: TWO_DAYS_AGO, longestStreak: 2, activeDates: [] }))

    const { result: result2 } = renderHook(() => useStreak('user-1'))
    act(() => result2.current.recordActivity()) // resets to 1
    expect(result2.current.streak).toBe(1)
    expect(result2.current.longestStreak).toBe(2) // preserved
  })

  it('persists activeDates for today', () => {
    setDate(TODAY)
    const { result } = renderHook(() => useStreak('user-1'))
    act(() => result.current.recordActivity())
    expect(result.current.activeDates).toContain(TODAY)
  })
})
