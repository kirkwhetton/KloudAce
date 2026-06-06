import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PremiumLockedCard from '../components/PremiumLockedCard'

const CARD = {
  id: 'AZ-104-042',
  exam: 'AZ-104',
  category: 'Networking',
  question: 'What is the default outbound rule in an NSG?',
}

describe('PremiumLockedCard', () => {
  it('renders the card category', () => {
    render(<PremiumLockedCard card={CARD} onUpgrade={vi.fn()} />)
    expect(screen.getByText('Networking')).toBeInTheDocument()
  })

  it('renders the exam badge', () => {
    render(<PremiumLockedCard card={CARD} onUpgrade={vi.fn()} />)
    expect(screen.getByText('AZ-104')).toBeInTheDocument()
  })

  it('renders a blurred preview of the question', () => {
    render(<PremiumLockedCard card={CARD} onUpgrade={vi.fn()} />)
    expect(screen.getByText(CARD.question)).toBeInTheDocument()
  })

  it('shows the Premium lock label', () => {
    render(<PremiumLockedCard card={CARD} onUpgrade={vi.fn()} />)
    expect(screen.getByText('Premium Content')).toBeInTheDocument()
  })

  it('calls onUpgrade when the upgrade button is clicked', () => {
    const onUpgrade = vi.fn()
    render(<PremiumLockedCard card={CARD} onUpgrade={onUpgrade} />)
    fireEvent.click(screen.getByRole('button', { name: /upgrade to premium/i }))
    expect(onUpgrade).toHaveBeenCalledOnce()
  })

  it('renders without an exam badge when exam is not provided', () => {
    const cardNoExam = { ...CARD, exam: undefined }
    render(<PremiumLockedCard card={cardNoExam} onUpgrade={vi.fn()} />)
    expect(screen.queryByText('AZ-104')).toBeNull()
  })
})
