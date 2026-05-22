import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDailyGoal } from '../useDailyGoal'

beforeEach(() => {
  localStorage.clear()
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-05-22T12:00:00Z'))
})

afterEach(() => {
  vi.useRealTimers()
})

describe('useDailyGoal', () => {
  it('starts with default goal of 20 and count of 0', () => {
    const { result } = renderHook(() => useDailyGoal('user-1'))
    expect(result.current.goal).toBe(20)
    expect(result.current.count).toBe(0)
  })

  it('increment increases count by 1', () => {
    const { result } = renderHook(() => useDailyGoal('user-1'))
    act(() => result.current.increment())
    expect(result.current.count).toBe(1)
    act(() => result.current.increment())
    expect(result.current.count).toBe(2)
  })

  it('setGoal updates the goal', () => {
    const { result } = renderHook(() => useDailyGoal('user-1'))
    act(() => result.current.setGoal(30))
    expect(result.current.goal).toBe(30)
  })

  it('persists count to localStorage', () => {
    const { result } = renderHook(() => useDailyGoal('user-1'))
    act(() => result.current.increment())
    const stored = JSON.parse(localStorage.getItem('azfc_goal_user-1'))
    expect(stored.count).toBe(1)
    expect(stored.date).toBe('2026-05-22')
  })

  it('resets count when date changes', () => {
    localStorage.setItem('azfc_goal_user-1', JSON.stringify({ goal: 20, count: 15, date: '2026-05-21' }))
    const { result } = renderHook(() => useDailyGoal('user-1'))
    expect(result.current.count).toBe(0) // new day, reset
  })

  it('preserves goal across day reset', () => {
    localStorage.setItem('azfc_goal_user-1', JSON.stringify({ goal: 30, count: 15, date: '2026-05-21' }))
    const { result } = renderHook(() => useDailyGoal('user-1'))
    expect(result.current.goal).toBe(30)
    expect(result.current.count).toBe(0)
  })
})
