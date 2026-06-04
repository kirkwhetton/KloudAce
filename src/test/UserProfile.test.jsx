import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import UserProfile from '../auth/UserProfile'

vi.mock('../auth/AuthProvider', () => ({
  useAuthContext: vi.fn(),
}))

vi.mock('../hooks/useTheme', () => ({
  useTheme: () => ({ theme: 'default', setTheme: vi.fn() }),
  THEMES: [{ value: 'default', label: 'Default' }],
}))

vi.mock('../flashcards', () => ({ default: [] }))

vi.mock('../lib/spacedRepetition', () => ({
  clearSrsDataForExam: vi.fn(),
  clearSrsDataForCards: vi.fn(),
}))

import { useAuthContext } from '../auth/AuthProvider'

const TEST_USER = { id: 'user-1', name: 'Test User', email: 'test@example.com', isPremium: false }

function renderPasswordTab() {
  render(<UserProfile onClose={vi.fn()} />)
  fireEvent.click(screen.getByRole('button', { name: /password/i }))
}

beforeEach(() => {
  vi.clearAllMocks()
  useAuthContext.mockReturnValue({
    user: TEST_USER,
    updateProfile: vi.fn(),
    changePassword: vi.fn(),
    error: null,
    setError: vi.fn(),
  })
})

describe('UserProfile — password tab validation', () => {
  it('shows an error when any field is empty', () => {
    renderPasswordTab()
    fireEvent.click(screen.getByText('Change password'))
    expect(screen.getByText('All fields are required.')).toBeTruthy()
  })

  it('shows an error when new password is under 10 characters', () => {
    renderPasswordTab()
    fireEvent.change(screen.getByLabelText(/current password/i), { target: { value: 'currentpass' } })
    fireEvent.change(screen.getByLabelText(/^new password/i),     { target: { value: 'short' } })
    fireEvent.change(screen.getByLabelText(/confirm new password/i), { target: { value: 'short' } })
    fireEvent.click(screen.getByText('Change password'))
    expect(screen.getByText('New password must be at least 10 characters.')).toBeTruthy()
  })

  it('shows an error when new passwords do not match', () => {
    renderPasswordTab()
    fireEvent.change(screen.getByLabelText(/current password/i),     { target: { value: 'currentpass' } })
    fireEvent.change(screen.getByLabelText(/^new password/i),         { target: { value: 'validpassword1' } })
    fireEvent.change(screen.getByLabelText(/confirm new password/i),  { target: { value: 'differentpass1' } })
    fireEvent.click(screen.getByText('Change password'))
    expect(screen.getByText('New passwords do not match.')).toBeTruthy()
  })

  it('calls changePassword when all fields are valid', () => {
    const changePassword = vi.fn().mockResolvedValue(true)
    useAuthContext.mockReturnValue({
      user: TEST_USER,
      updateProfile: vi.fn(),
      changePassword,
      error: null,
      setError: vi.fn(),
    })
    renderPasswordTab()
    fireEvent.change(screen.getByLabelText(/current password/i),     { target: { value: 'currentpass' } })
    fireEvent.change(screen.getByLabelText(/^new password/i),         { target: { value: 'validpassword1' } })
    fireEvent.change(screen.getByLabelText(/confirm new password/i),  { target: { value: 'validpassword1' } })
    fireEvent.click(screen.getByText('Change password'))
    expect(changePassword).toHaveBeenCalledWith({ currentPassword: 'currentpass', newPassword: 'validpassword1' })
  })
})
