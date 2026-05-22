import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MultipleChoice from '../multichoice'

const card = {
  id: 'AZ-900-101',
  exam: 'AZ-900',
  question: 'What does IaaS stand for?',
  choices: ['Infrastructure as a Service', 'Internet as a Service', 'Integration as a Service', 'Interface as a Service'],
  correctAnswer: 0,
  answer: 'Infrastructure as a Service',
  explanation: 'IaaS provides virtualised computing resources over the internet.',
}

function renderCard(overrides = {}) {
  const props = {
    card,
    onKnow: vi.fn(),
    onAnswer: vi.fn(),
    onExamAnswer: vi.fn(),
    examMode: false,
    hideAnswers: false,
    ...overrides,
  }
  render(<MultipleChoice {...props} />)
  return props
}

// "Correct!" is split across a <span> and text node — match on container text
const getCorrectFeedback = () => screen.getByText((_, el) => el?.textContent?.includes('Correct!') && el?.className?.includes('feedback-text'))

describe('MultipleChoice — rendering', () => {
  it('shows the question', () => {
    renderCard()
    expect(screen.getByText('What does IaaS stand for?')).toBeInTheDocument()
  })

  it('renders all four choices', () => {
    renderCard()
    expect(screen.getAllByRole('button').filter(b => b.className.includes('choice-btn'))).toHaveLength(4)
  })

  it('does not show feedback before an answer is selected', () => {
    renderCard()
    expect(screen.queryByText('Correct!')).toBeNull()
    expect(screen.queryByText(/Not quite/)).toBeNull()
  })
})

describe('MultipleChoice — correct answer', () => {
  it('calls onAnswer(true) immediately when the correct choice is clicked', () => {
    const { onAnswer } = renderCard()
    const buttons = screen.getAllByRole('button').filter(b => b.className.includes('choice-btn'))
    const correctBtn = buttons.find(b => b.textContent.includes('Infrastructure as a Service'))
    fireEvent.click(correctBtn)
    expect(onAnswer).toHaveBeenCalledWith(true)
  })

  it('shows "Correct!" feedback', () => {
    renderCard()
    const buttons = screen.getAllByRole('button').filter(b => b.className.includes('choice-btn'))
    const correctBtn = buttons.find(b => b.textContent.includes('Infrastructure as a Service'))
    fireEvent.click(correctBtn)
    expect(getCorrectFeedback()).toBeInTheDocument()
  })

  it('shows feedback with correct class', () => {
    renderCard()
    const buttons = screen.getAllByRole('button').filter(b => b.className.includes('choice-btn'))
    const correctBtn = buttons.find(b => b.textContent.includes('Infrastructure as a Service'))
    fireEvent.click(correctBtn)
    expect(document.querySelector('.feedback-correct')).not.toBeNull()
  })

  it('calls onKnow when Next Card is clicked after correct answer', () => {
    const { onKnow } = renderCard()
    const buttons = screen.getAllByRole('button').filter(b => b.className.includes('choice-btn'))
    fireEvent.click(buttons.find(b => b.textContent.includes('Infrastructure as a Service')))
    fireEvent.click(screen.getByText('Next Card', { exact: false }))
    expect(onKnow).toHaveBeenCalled()
  })
})

describe('MultipleChoice — wrong answer', () => {
  it('calls onAnswer(false) when a wrong choice is clicked', () => {
    const { onAnswer } = renderCard()
    const buttons = screen.getAllByRole('button').filter(b => b.className.includes('choice-btn'))
    const wrongBtn = buttons.find(b => b.textContent.includes('Internet as a Service'))
    fireEvent.click(wrongBtn)
    expect(onAnswer).toHaveBeenCalledWith(false)
  })

  it('shows "Not quite" feedback', () => {
    renderCard()
    const buttons = screen.getAllByRole('button').filter(b => b.className.includes('choice-btn'))
    fireEvent.click(buttons.find(b => b.textContent.includes('Internet as a Service')))
    expect(screen.getByText(/Not quite/)).toBeInTheDocument()
  })

  it('shows feedback with wrong class', () => {
    renderCard()
    const buttons = screen.getAllByRole('button').filter(b => b.className.includes('choice-btn'))
    fireEvent.click(buttons.find(b => b.textContent.includes('Internet as a Service')))
    expect(document.querySelector('.feedback-wrong')).not.toBeNull()
  })

  it('does not allow changing answer after selecting', () => {
    const { onAnswer } = renderCard()
    const buttons = screen.getAllByRole('button').filter(b => b.className.includes('choice-btn'))
    fireEvent.click(buttons.find(b => b.textContent.includes('Internet as a Service')))
    fireEvent.click(buttons.find(b => b.textContent.includes('Infrastructure as a Service')))
    expect(onAnswer).toHaveBeenCalledTimes(1)
  })
})

describe('MultipleChoice — exam mode', () => {
  it('does not show feedback panel in exam mode', () => {
    renderCard({ examMode: true })
    const buttons = screen.getAllByRole('button').filter(b => b.className.includes('choice-btn'))
    fireEvent.click(buttons[0])
    expect(screen.queryByText('Correct!')).toBeNull()
    expect(screen.queryByText(/Not quite/)).toBeNull()
  })

  it('calls onExamAnswer with correct result in exam mode', () => {
    const onExamAnswer = vi.fn()
    render(<MultipleChoice card={card} onKnow={vi.fn()} onAnswer={vi.fn()} examMode onExamAnswer={onExamAnswer} />)
    const buttons = screen.getAllByRole('button').filter(b => b.className.includes('choice-btn'))
    const correctBtn = buttons.find(b => b.textContent.includes('Infrastructure as a Service'))
    fireEvent.click(correctBtn)
    expect(onExamAnswer).toHaveBeenCalledWith(expect.objectContaining({ correct: true }))
  })
})
