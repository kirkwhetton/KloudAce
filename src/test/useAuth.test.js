import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'

vi.mock('../auth/supabase.js', () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(),
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      updateUser: vi.fn(),
      verifyOtp: vi.fn(),
    },
    from: vi.fn(),
  },
}))

import { supabase } from '../auth/supabase.js'
import { useAuth } from '../auth/useAuth.js'

const TEST_USER = { id: 'user-1', email: 'test@example.com', user_metadata: { name: 'Test User' } }
const TEST_PROFILE = { name: 'Test User', email: 'test@example.com', is_premium: false, is_developer: false }

function mockProfileFetch(data = TEST_PROFILE) {
  const chain = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data }),
  }
  supabase.from.mockReturnValue(chain)
}

// Fire onAuthStateChange with the given session (or null) on the next microtask
function mockAuthState(session = null) {
  supabase.auth.onAuthStateChange.mockImplementation((cb) => {
    Promise.resolve().then(() => cb('INITIAL_SESSION', session))
    return { data: { subscription: { unsubscribe: vi.fn() } } }
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  mockAuthState(null) // default: no session
  supabase.auth.signOut.mockResolvedValue({})
})

async function renderAuth() {
  const hook = renderHook(() => useAuth())
  await waitFor(() => expect(hook.result.current.loading).toBe(false))
  return hook
}

describe('initial state', () => {
  it('starts loading with no user', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.loading).toBe(true)
    expect(result.current.user).toBeNull()
  })

  it('resolves to unauthenticated when there is no session', async () => {
    const { result } = await renderAuth()
    expect(result.current.loading).toBe(false)
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })
})

describe('session restoration', () => {
  it('restores user from an existing Supabase session', async () => {
    mockAuthState({ user: TEST_USER })
    mockProfileFetch()
    const { result } = await renderAuth()
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user).toMatchObject({ id: 'user-1', email: 'test@example.com', isPremium: false })
  })
})

describe('login', () => {
  it('returns true on success', async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({ error: null })
    const { result } = await renderAuth()
    let success
    await act(async () => {
      success = await result.current.login({ email: 'test@example.com', password: 'pass123' })
    })
    expect(success).toBe(true)
    expect(result.current.error).toBeNull()
  })

  it('returns false and sets a friendly error on invalid credentials', async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({ error: { message: 'Invalid login credentials' } })
    const { result } = await renderAuth()
    let success
    await act(async () => {
      success = await result.current.login({ email: 'bad@example.com', password: 'wrong' })
    })
    expect(success).toBe(false)
    expect(result.current.error).toBe('Incorrect email or password.')
  })

  it('maps rate limit errors to a friendly message', async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({ error: { message: 'email rate limit exceeded' } })
    const { result } = await renderAuth()
    await act(async () => {
      await result.current.login({ email: 'x@example.com', password: 'pass' })
    })
    expect(result.current.error).toMatch(/too many/i)
  })

  it('maps unconfirmed email errors to a friendly message', async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({ error: { message: 'Email not confirmed' } })
    const { result } = await renderAuth()
    await act(async () => {
      await result.current.login({ email: 'unverified@example.com', password: 'pass' })
    })
    expect(result.current.error).toMatch(/confirm your email/i)
  })

  it('maps weak password errors to a 10-character message', async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({ error: { message: 'Password should be at least 6 characters' } })
    const { result } = await renderAuth()
    await act(async () => {
      await result.current.login({ email: 'x@example.com', password: 'short' })
    })
    expect(result.current.error).toBe('Password must be at least 10 characters.')
  })
})

describe('register', () => {
  it('returns success with needsConfirmation false when a session is returned', async () => {
    supabase.auth.signUp.mockResolvedValue({ data: { session: { user: TEST_USER } }, error: null })
    const { result } = await renderAuth()
    let res
    await act(async () => {
      res = await result.current.register({ name: 'Test', email: 'test@example.com', password: 'pass123' })
    })
    expect(res).toEqual({ success: true, needsConfirmation: false })
  })

  it('returns needsConfirmation true when email confirmation is required', async () => {
    supabase.auth.signUp.mockResolvedValue({ data: { session: null }, error: null })
    const { result } = await renderAuth()
    let res
    await act(async () => {
      res = await result.current.register({ name: 'Test', email: 'test@example.com', password: 'pass123' })
    })
    expect(res).toEqual({ success: true, needsConfirmation: true })
  })

  it('returns { success: false } and sets error when registration fails', async () => {
    supabase.auth.signUp.mockResolvedValue({ data: null, error: { message: 'User already registered' } })
    const { result } = await renderAuth()
    let res
    await act(async () => {
      res = await result.current.register({ name: 'Test', email: 'existing@example.com', password: 'pass123' })
    })
    expect(res).toEqual({ success: false })
    expect(result.current.error).toMatch(/already exists/i)
  })
})

describe('verifyOtp', () => {
  it('returns true on a valid OTP', async () => {
    supabase.auth.verifyOtp.mockResolvedValue({ error: null })
    const { result } = await renderAuth()
    let res
    await act(async () => {
      res = await result.current.verifyOtp({ email: 'test@example.com', token: '123456' })
    })
    expect(res).toBe(true)
  })

  it('returns false and sets error on an invalid or expired OTP', async () => {
    supabase.auth.verifyOtp.mockResolvedValue({ error: { message: 'Token expired' } })
    const { result } = await renderAuth()
    let res
    await act(async () => {
      res = await result.current.verifyOtp({ email: 'test@example.com', token: '000000' })
    })
    expect(res).toBe(false)
    expect(result.current.error).toMatch(/invalid or expired/i)
  })
})

describe('logout', () => {
  it('clears the user immediately and calls signOut', async () => {
    mockAuthState({ user: TEST_USER })
    mockProfileFetch()
    const { result } = await renderAuth()
    expect(result.current.isAuthenticated).toBe(true)

    act(() => result.current.logout())

    expect(result.current.user).toBeNull()
    expect(supabase.auth.signOut).toHaveBeenCalled()
  })
})

describe('updateProfile', () => {
  it('updates local user state and returns true on success', async () => {
    mockAuthState({ user: TEST_USER })
    mockProfileFetch()
    const { result } = await renderAuth()

    supabase.auth.updateUser.mockResolvedValue({ error: null })
    supabase.from.mockReturnValue({
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ error: null }),
    })

    let res
    await act(async () => {
      res = await result.current.updateProfile({ name: 'New Name', email: 'new@example.com' })
    })
    expect(res).toBe(true)
    expect(result.current.user).toMatchObject({ name: 'New Name', email: 'new@example.com' })
  })

  it('returns false and sets error when the auth update fails', async () => {
    mockAuthState({ user: TEST_USER })
    mockProfileFetch()
    supabase.auth.updateUser.mockResolvedValue({ error: { message: 'Update failed' } })

    const { result } = await renderAuth()
    let res
    await act(async () => {
      res = await result.current.updateProfile({ name: 'New Name', email: 'new@example.com' })
    })
    expect(res).toBe(false)
    expect(result.current.error).toBe('Update failed')
  })
})

describe('changePassword', () => {
  it('returns false and sets error when current password is wrong', async () => {
    mockAuthState({ user: TEST_USER })
    mockProfileFetch()
    supabase.auth.signInWithPassword.mockResolvedValue({ error: { message: 'Invalid login credentials' } })

    const { result } = await renderAuth()
    let res
    await act(async () => {
      res = await result.current.changePassword({ currentPassword: 'wrong', newPassword: 'newpass123' })
    })
    expect(res).toBe(false)
    expect(result.current.error).toBe('Current password is incorrect.')
  })

  it('returns true when the password is successfully changed', async () => {
    mockAuthState({ user: TEST_USER })
    mockProfileFetch()
    supabase.auth.signInWithPassword.mockResolvedValue({ error: null })
    supabase.auth.updateUser.mockResolvedValue({ error: null })

    const { result } = await renderAuth()
    let res
    await act(async () => {
      res = await result.current.changePassword({ currentPassword: 'correct', newPassword: 'newpass123' })
    })
    expect(res).toBe(true)
  })
})
