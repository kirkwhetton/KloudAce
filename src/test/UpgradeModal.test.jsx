import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

const CHECKOUT_URL = 'https://kloudace.lemonsqueezy.com/checkout/buy/test-id'

// ── Helpers ──────────────────────────────────────────────────────

async function importModal() {
  const mod = await import('../components/UpgradeModal')
  return mod.default
}

// ── No checkout URL configured ───────────────────────────────────

describe('UpgradeModal — no checkout URL', () => {
  let UpgradeModal

  beforeAll(async () => {
    vi.stubEnv('VITE_LEMON_SQUEEZY_CHECKOUT_URL', '')
    vi.resetModules()
    UpgradeModal = await importModal()
  })

  afterAll(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('renders the upgrade header', () => {
    render(<UpgradeModal onClose={vi.fn()} />)
    expect(screen.getByText('Upgrade to Premium')).toBeInTheDocument()
  })

  it('shows a disabled "Coming soon" button when URL is not configured', () => {
    render(<UpgradeModal onClose={vi.fn()} />)
    const btn = screen.getByRole('button', { name: /coming soon/i })
    expect(btn).toBeDisabled()
  })

  it('renders all premium feature items', () => {
    render(<UpgradeModal onClose={vi.fn()} />)
    expect(screen.getByText(/1,000\+ questions/i)).toBeInTheDocument()
    expect(screen.getByText(/terraform labs/i)).toBeInTheDocument()
    expect(screen.getByText(/readiness dashboard/i)).toBeInTheDocument()
  })

  it('calls onClose when the ✕ button is clicked', () => {
    const onClose = vi.fn()
    render(<UpgradeModal onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when the overlay is clicked', () => {
    const onClose = vi.fn()
    const { container } = render(<UpgradeModal onClose={onClose} />)
    fireEvent.click(container.querySelector('.upgrade-overlay'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not close when the modal card itself is clicked', () => {
    const onClose = vi.fn()
    const { container } = render(<UpgradeModal onClose={onClose} />)
    fireEvent.click(container.querySelector('.upgrade-modal'))
    expect(onClose).not.toHaveBeenCalled()
  })
})

// ── Checkout URL configured ───────────────────────────────────────

describe('UpgradeModal — checkout URL configured', () => {
  let UpgradeModal

  beforeAll(async () => {
    vi.stubEnv('VITE_LEMON_SQUEEZY_CHECKOUT_URL', CHECKOUT_URL)
    vi.resetModules()
    UpgradeModal = await importModal()
  })

  afterAll(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => null)
  })

  it('shows an enabled "Get Premium" button', () => {
    render(<UpgradeModal onClose={vi.fn()} />)
    expect(screen.getByRole('button', { name: /get premium/i })).toBeEnabled()
  })

  it('opens checkout URL in a new tab when clicked', () => {
    render(<UpgradeModal onClose={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /get premium/i }))
    expect(window.open).toHaveBeenCalledWith(CHECKOUT_URL, '_blank', 'noopener,noreferrer')
  })

  it('pre-fills user email in the checkout URL', () => {
    render(<UpgradeModal onClose={vi.fn()} userEmail="kirk@example.com" />)
    fireEvent.click(screen.getByRole('button', { name: /get premium/i }))
    expect(window.open).toHaveBeenCalledWith(
      `${CHECKOUT_URL}?checkout[email]=kirk%40example.com`,
      '_blank',
      'noopener,noreferrer'
    )
  })

  it('uses plain checkout URL when no email is provided', () => {
    render(<UpgradeModal onClose={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /get premium/i }))
    expect(window.open).toHaveBeenCalledWith(CHECKOUT_URL, '_blank', 'noopener,noreferrer')
  })
})
