import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

vi.mock('../flashcards', () => ({
  default: [],
  EXAM_META: {
    'AZ-900': { exam: 'AZ-900', fullName: 'Azure Fundamentals' },
    'AZ-104': { exam: 'AZ-104', fullName: 'Azure Administrator Associate' },
  },
  FREE_CARD_IDS: new Set(),
}))

vi.mock('../cardLoader', () => ({
  loadAllTopics:       vi.fn().mockResolvedValue([]),
  loadExamCardCounts:  vi.fn().mockResolvedValue({}),
  loadPortalCards:     vi.fn().mockResolvedValue([
    { id: 'AZ-900-PS-001', exam: 'AZ-900', difficulty: 'easy', is_free: true,  task: 'Free lab: Create a resource group' },
    { id: 'AZ-700-PS-001', exam: 'AZ-700', difficulty: 'easy', is_free: false, task: 'Premium lab: Create a virtual network' },
  ]),
  SUPABASE_EXAMS: new Set(['AZ-900', 'AZ-104', 'AZ-305', 'AZ-700']),
}))

import ExamSelect from '../ExamSelect'

const BASE_USER = { id: 'user-1', name: 'Kirk' }

function buildProps(overrides = {}) {
  return {
    user:               BASE_USER,
    isGuest:            false,
    isPremium:          true,
    onSelect:           vi.fn(),
    onLogout:           vi.fn(),
    onOpenDecks:        vi.fn(),
    onSelectByTopic:    vi.fn(),
    onSelectCustomDeck: vi.fn(),
    loadingExam:        null,
    cardLoadError:      null,
    ...overrides,
  }
}

// Start directly in the labs view so we bypass requestAnimationFrame in navigateTo
function startInLabsView(user = BASE_USER) {
  localStorage.setItem(
    `azfc_settings_${user.id}`,
    JSON.stringify({ preferredStudyMode: 'labs' })
  )
}

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  localStorage.clear()
})

// ── Guest — Labs chooser button ─────────────────────────────────
describe('guest user — Labs chooser button', () => {
  it('shows the "Account required" modal instead of navigating', () => {
    render(<ExamSelect {...buildProps({ isGuest: true, isPremium: false })} />)

    // Click the Labs choice card (click bubbles from child to button)
    fireEvent.click(screen.getByText(/open labs/i))

    expect(screen.getByText('Account required')).toBeInTheDocument()
    expect(screen.getByText(/create a free account/i)).toBeInTheDocument()
  })

  it('does not show the Labs list to guests', () => {
    render(<ExamSelect {...buildProps({ isGuest: true, isPremium: false })} />)
    fireEvent.click(screen.getByText(/open labs/i))
    // Modal is shown, not the labs grid
    expect(screen.queryByText('Free lab: Create a resource group')).toBeNull()
  })

  it('dismisses the guest modal when "Maybe later" is clicked', () => {
    render(<ExamSelect {...buildProps({ isGuest: true, isPremium: false })} />)
    fireEvent.click(screen.getByText(/open labs/i))
    fireEvent.click(screen.getByRole('button', { name: /maybe later/i }))
    expect(screen.queryByText('Account required')).toBeNull()
  })
})

// ── Non-premium user — Labs list ────────────────────────────────
describe('standard (non-premium) user — Labs list', () => {
  beforeEach(() => startInLabsView())

  it('can launch a free lab', async () => {
    const props = buildProps({ isPremium: false })
    render(<ExamSelect {...props} />)

    await waitFor(() => screen.getByText('Free lab: Create a resource group'))
    fireEvent.click(screen.getByText('Free lab: Create a resource group').closest('button'))

    expect(props.onSelect).toHaveBeenCalledWith('LAB:AZ-900-PS-001')
  })

  it('shows the upgrade modal instead of launching a premium lab', async () => {
    render(<ExamSelect {...buildProps({ isPremium: false })} />)

    await waitFor(() => screen.getByText('Premium lab: Create a virtual network'))
    fireEvent.click(screen.getByText('Premium lab: Create a virtual network').closest('button'))

    expect(screen.getByText('Premium lab')).toBeInTheDocument()
    expect(screen.getByText(/requires a Premium subscription/i)).toBeInTheDocument()
  })

  it('does not call onSelect when a locked lab is clicked', async () => {
    const props = buildProps({ isPremium: false })
    render(<ExamSelect {...props} />)

    await waitFor(() => screen.getByText('Premium lab: Create a virtual network'))
    fireEvent.click(screen.getByText('Premium lab: Create a virtual network').closest('button'))

    expect(props.onSelect).not.toHaveBeenCalled()
  })

  it('applies the locked CSS class only to premium labs', async () => {
    const { container } = render(<ExamSelect {...buildProps({ isPremium: false })} />)

    await waitFor(() => screen.getByText('Free lab: Create a resource group'))

    const cards = container.querySelectorAll('.splash-lab-card')
    const freeLab    = [...cards].find(c => c.textContent.includes('Free lab'))
    const premiumLab = [...cards].find(c => c.textContent.includes('Premium lab'))

    expect(freeLab?.classList.contains('splash-lab-card--locked')).toBe(false)
    expect(premiumLab?.classList.contains('splash-lab-card--locked')).toBe(true)
  })

  it('dismisses the upgrade modal with "Got it"', async () => {
    render(<ExamSelect {...buildProps({ isPremium: false })} />)

    await waitFor(() => screen.getByText('Premium lab: Create a virtual network'))
    fireEvent.click(screen.getByText('Premium lab: Create a virtual network').closest('button'))

    expect(screen.getByText('Premium lab')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /got it/i }))
    expect(screen.queryByText('Premium lab')).toBeNull()
  })
})

// ── Premium user — Labs list ────────────────────────────────────
describe('premium user — Labs list', () => {
  beforeEach(() => startInLabsView())

  it('can launch a free lab', async () => {
    const props = buildProps({ isPremium: true })
    render(<ExamSelect {...props} />)

    await waitFor(() => screen.getByText('Free lab: Create a resource group'))
    fireEvent.click(screen.getByText('Free lab: Create a resource group').closest('button'))

    expect(props.onSelect).toHaveBeenCalledWith('LAB:AZ-900-PS-001')
  })

  it('can launch a premium lab directly', async () => {
    const props = buildProps({ isPremium: true })
    render(<ExamSelect {...props} />)

    await waitFor(() => screen.getByText('Premium lab: Create a virtual network'))
    fireEvent.click(screen.getByText('Premium lab: Create a virtual network').closest('button'))

    expect(props.onSelect).toHaveBeenCalledWith('LAB:AZ-700-PS-001')
  })

  it('applies no locked class to any lab', async () => {
    const { container } = render(<ExamSelect {...buildProps({ isPremium: true })} />)

    await waitFor(() => screen.getByText('Premium lab: Create a virtual network'))

    const locked = container.querySelectorAll('.splash-lab-card--locked')
    expect(locked).toHaveLength(0)
  })

  it('shows no upgrade modal when clicking a premium lab', async () => {
    render(<ExamSelect {...buildProps({ isPremium: true })} />)

    await waitFor(() => screen.getByText('Premium lab: Create a virtual network'))
    fireEvent.click(screen.getByText('Premium lab: Create a virtual network').closest('button'))

    expect(screen.queryByText('Premium lab')).toBeNull()
  })
})

// ── Exam filter pills in labs view ──────────────────────────────
describe('exam filter pills', () => {
  beforeEach(() => startInLabsView())

  it('shows all labs when "All exams" is selected', async () => {
    render(<ExamSelect {...buildProps()} />)

    await waitFor(() => screen.getByText('Free lab: Create a resource group'))
    expect(screen.getByText('Premium lab: Create a virtual network')).toBeInTheDocument()
  })

  it('filters to AZ-900 labs only when AZ-900 pill is clicked', async () => {
    render(<ExamSelect {...buildProps()} />)

    await waitFor(() => screen.getByText('Free lab: Create a resource group'))
    fireEvent.click(screen.getByRole('button', { name: 'AZ-900' }))

    expect(screen.getByText('Free lab: Create a resource group')).toBeInTheDocument()
    expect(screen.queryByText('Premium lab: Create a virtual network')).toBeNull()
  })

  it('filters to AZ-700 labs only when AZ-700 pill is clicked', async () => {
    render(<ExamSelect {...buildProps()} />)

    await waitFor(() => screen.getByText('Premium lab: Create a virtual network'))
    fireEvent.click(screen.getByRole('button', { name: 'AZ-700' }))

    expect(screen.queryByText('Free lab: Create a resource group')).toBeNull()
    expect(screen.getByText('Premium lab: Create a virtual network')).toBeInTheDocument()
  })
})
