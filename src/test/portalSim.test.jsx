import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

// ── Stub every blade so we control what gets submitted ──────────
vi.mock('../labs/PortalSim/blades/ResourceGroupList', () => ({
  default: ({ onOpen, onSubmit, completed }) => (
    <div data-testid="blade-rg-list">
      <button data-testid="btn-open-create" onClick={() => onOpen('rg-create')}>Open create</button>
      <button data-testid="btn-submit-correct" disabled={completed}
        onClick={() => onSubmit({ name: 'rg-prod', region: 'East US 2' })}>Submit correct</button>
      <button data-testid="btn-submit-wrong" disabled={completed}
        onClick={() => onSubmit({ name: 'wrong', region: 'wrong' })}>Submit wrong</button>
    </div>
  ),
}))
vi.mock('../labs/PortalSim/blades/ResourceGroupCreate', () => ({
  default: ({ onClose }) => (
    <div data-testid="blade-rg-create">
      <button data-testid="btn-close-create" onClick={onClose}>Close</button>
    </div>
  ),
}))
vi.mock('../labs/PortalSim/blades/VNetList',      () => ({ default: () => <div data-testid="blade-vnet-list" /> }))
vi.mock('../labs/PortalSim/blades/VNetCreate',    () => ({ default: () => <div /> }))
vi.mock('../labs/PortalSim/blades/VNetSubnetAdd', () => ({ default: () => <div /> }))

import PortalSim from '../labs/PortalSim'

const BASE_CARD = {
  initialBlade: 'rg-list',
  task: 'Create a resource group named rg-prod in East US 2.',
  solution: { name: 'rg-prod', region: 'East US 2' },
}

function renderSim(cardOverrides = {}) {
  const onKnow    = vi.fn()
  const onSrsRate = vi.fn()
  render(
    <PortalSim
      card={{ ...BASE_CARD, ...cardOverrides }}
      onKnow={onKnow}
      onSrsRate={onSrsRate}
    />
  )
  return { onKnow, onSrsRate }
}

// ── Solution checking algorithm ─────────────────────────────────
// Tests mirror the pure logic inside PortalSim's checkSolution callback.
describe('solution comparison logic', () => {
  function check(solution, formData) {
    return Object.keys(solution).every(key => {
      const expected = String(solution[key]).toLowerCase().trim()
      const actual   = String(formData[key] ?? '').toLowerCase().trim()
      return expected === actual
    })
  }

  it('passes when every field matches exactly', () => {
    expect(check({ name: 'rg-prod', region: 'East US 2' }, { name: 'rg-prod', region: 'East US 2' })).toBe(true)
  })

  it('is case-insensitive', () => {
    expect(check({ name: 'RG-PROD', region: 'East US 2' }, { name: 'rg-prod', region: 'east us 2' })).toBe(true)
  })

  it('trims whitespace from both expected and actual', () => {
    expect(check({ name: 'rg-prod' }, { name: '  rg-prod  ' })).toBe(true)
  })

  it('fails when a required field is missing', () => {
    expect(check({ name: 'rg-prod', region: 'East US 2' }, { name: 'rg-prod' })).toBe(false)
  })

  it('fails when any field value is wrong', () => {
    expect(check({ name: 'rg-prod', region: 'East US 2' }, { name: 'rg-prod', region: 'West US' })).toBe(false)
  })

  it('treats missing solution fields as an empty match (empty solution always passes)', () => {
    expect(check({}, { name: 'anything' })).toBe(true)
  })
})

// ── Notification bar after submission ───────────────────────────
describe('result notification', () => {
  it('shows no notification before submission', () => {
    renderSim()
    expect(screen.queryByText(/Deployment succeeded/)).toBeNull()
    expect(screen.queryByText(/Deployment failed/)).toBeNull()
  })

  it('shows "Deployment succeeded" when form data matches the solution', () => {
    renderSim()
    fireEvent.click(screen.getByTestId('btn-submit-correct'))
    expect(screen.getByText(/Deployment succeeded/)).toBeInTheDocument()
  })

  it('shows "Deployment failed" when form data does not match the solution', () => {
    renderSim()
    fireEvent.click(screen.getByTestId('btn-submit-wrong'))
    expect(screen.getByText(/Deployment failed/)).toBeInTheDocument()
  })

  it('disables submit button after completion', () => {
    renderSim()
    fireEvent.click(screen.getByTestId('btn-submit-correct'))
    expect(screen.getByTestId('btn-submit-correct')).toBeDisabled()
  })
})

// ── Retry ───────────────────────────────────────────────────────
describe('retry', () => {
  it('clears the notification and re-enables submission', () => {
    renderSim()
    fireEvent.click(screen.getByTestId('btn-submit-wrong'))
    expect(screen.getByText(/Deployment failed/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /retry/i }))

    expect(screen.queryByText(/Deployment failed/)).toBeNull()
    expect(screen.queryByText(/Deployment succeeded/)).toBeNull()
    expect(screen.getByTestId('btn-submit-correct')).not.toBeDisabled()
  })

  it('retry is not shown after a correct submission', () => {
    renderSim()
    fireEvent.click(screen.getByTestId('btn-submit-correct'))
    expect(screen.queryByRole('button', { name: /retry/i })).toBeNull()
  })
})

// ── SRS scoring ─────────────────────────────────────────────────
describe('SRS scoring via onSrsRate', () => {
  it('calls onSrsRate(4) after a correct submission with no hint used', () => {
    const { onSrsRate } = renderSim()
    fireEvent.click(screen.getByTestId('btn-submit-correct'))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(onSrsRate).toHaveBeenCalledWith(4)
  })

  it('calls onSrsRate(1) after an incorrect submission', () => {
    const { onSrsRate } = renderSim()
    fireEvent.click(screen.getByTestId('btn-submit-wrong'))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(onSrsRate).toHaveBeenCalledWith(1)
  })

  it('calls onSrsRate(3) when the hint was revealed before a correct submission', () => {
    const { onSrsRate } = renderSim({ hint: 'Try East US 2.' })
    fireEvent.click(screen.getByRole('button', { name: /show hint/i }))
    fireEvent.click(screen.getByTestId('btn-submit-correct'))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(onSrsRate).toHaveBeenCalledWith(3)
  })

  it('falls back to onKnow when onSrsRate is not provided', () => {
    const onKnow = vi.fn()
    render(<PortalSim card={BASE_CARD} onKnow={onKnow} />)
    fireEvent.click(screen.getByTestId('btn-submit-correct'))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(onKnow).toHaveBeenCalled()
  })
})

// ── Blade stack ─────────────────────────────────────────────────
describe('blade stack', () => {
  it('renders the initial blade on mount', () => {
    renderSim()
    expect(screen.getByTestId('blade-rg-list')).toBeInTheDocument()
  })

  it('pushes a new blade when onOpen is called', () => {
    renderSim()
    expect(screen.queryByTestId('blade-rg-create')).toBeNull()
    fireEvent.click(screen.getByTestId('btn-open-create'))
    expect(screen.getByTestId('blade-rg-create')).toBeInTheDocument()
  })

  it('both blades are visible simultaneously in the stack', () => {
    renderSim()
    fireEvent.click(screen.getByTestId('btn-open-create'))
    expect(screen.getByTestId('blade-rg-list')).toBeInTheDocument()
    expect(screen.getByTestId('blade-rg-create')).toBeInTheDocument()
  })

  it('removes a blade when its onClose is called', () => {
    renderSim()
    fireEvent.click(screen.getByTestId('btn-open-create'))
    fireEvent.click(screen.getByTestId('btn-close-create'))
    expect(screen.queryByTestId('blade-rg-create')).toBeNull()
    expect(screen.getByTestId('blade-rg-list')).toBeInTheDocument()
  })

  it('uses vnet-list as the initial blade when card.initialBlade is vnet-list', () => {
    renderSim({ initialBlade: 'vnet-list', solution: {} })
    expect(screen.getByTestId('blade-vnet-list')).toBeInTheDocument()
    expect(screen.queryByTestId('blade-rg-list')).toBeNull()
  })
})

// ── Instructions panel ──────────────────────────────────────────
describe('instructions panel', () => {
  it('renders the overall task description', () => {
    renderSim({ task: 'Complete this specific lab task.' })
    expect(screen.getByText('Complete this specific lab task.')).toBeInTheDocument()
  })

  it('renders guide section titles and step text', () => {
    renderSim({
      guide: [
        { title: 'Configure basics', steps: ['Set the name field', 'Choose a region'] },
      ],
    })
    expect(screen.getByText('Configure basics')).toBeInTheDocument()
    expect(screen.getByText('Set the name field')).toBeInTheDocument()
    expect(screen.getByText('Choose a region')).toBeInTheDocument()
  })

  it('renders **bold** markers as <strong> elements', () => {
    const { container } = render(
      <PortalSim
        card={{ ...BASE_CARD, guide: [{ title: 'T', steps: ['Click **+ Create**'] }] }}
        onKnow={vi.fn()}
        onSrsRate={vi.fn()}
      />
    )
    const strong = container.querySelector('strong')
    expect(strong?.textContent).toBe('+ Create')
  })

  it('renders `backtick` markers as <code> elements with psim-step-code class', () => {
    const { container } = render(
      <PortalSim
        card={{ ...BASE_CARD, guide: [{ title: 'T', steps: ['Enter `rg-prod`'] }] }}
        onKnow={vi.fn()}
        onSrsRate={vi.fn()}
      />
    )
    const code = container.querySelector('code.psim-step-code')
    expect(code?.textContent).toBe('rg-prod')
  })

  it('shows plain task text when guide is not provided', () => {
    const { guide: _g, ...cardNoGuide } = { ...BASE_CARD, task: 'Simple task only.' }
    render(<PortalSim card={cardNoGuide} onKnow={vi.fn()} onSrsRate={vi.fn()} />)
    expect(screen.getByText('Simple task only.')).toBeInTheDocument()
  })

  it('hides the hint text until the hint button is clicked', () => {
    renderSim({ hint: 'Use East US 2 not East US.' })
    expect(screen.queryByText('Use East US 2 not East US.')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /show hint/i }))
    expect(screen.getByText('Use East US 2 not East US.')).toBeInTheDocument()
  })

  it('toggles hint visibility on repeated clicks', () => {
    renderSim({ hint: 'Toggle me.' })
    fireEvent.click(screen.getByRole('button', { name: /show hint/i }))
    expect(screen.getByText('Toggle me.')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /hide hint/i }))
    expect(screen.queryByText('Toggle me.')).toBeNull()
  })

  it('shows a result indicator in the header after completion', () => {
    const { container } = render(
      <PortalSim card={BASE_CARD} onKnow={vi.fn()} onSrsRate={vi.fn()} />
    )
    expect(container.querySelector('.psim-instructions-status')).toBeNull()
    fireEvent.click(screen.getByTestId('btn-submit-correct'))
    expect(container.querySelector('.psim-instructions-status--correct')).toBeInTheDocument()
  })
})
