import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TrueFalse from '../TrueFalse'

const cardTrue  = { id: 'tf-1', exam: 'AZ-900', question: 'Azure is a cloud platform.', answer: true,  explanation: 'Yes it is.' }
const cardFalse = { id: 'tf-2', exam: 'AZ-900', question: 'Azure is a database engine.', answer: false, explanation: 'No it is not.' }

function renderTF(card, overrides = {}) {
  const props = { card, onKnow: vi.fn(), onAnswer: vi.fn(), onExamAnswer: vi.fn(), examMode: false, hideAnswers: false, ...overrides }
  render(<TrueFalse {...props} />)
  return props
}

const getCorrectFeedback = () => screen.getByText((_, el) => el?.textContent?.includes('Correct!') && el?.className?.includes('feedback-text'))

describe('TrueFalse — rendering', () => {
  it('shows the question', () => {
    renderTF(cardTrue)
    expect(screen.getByText('Azure is a cloud platform.')).toBeInTheDocument()
  })

  it('renders True and False buttons', () => {
    renderTF(cardTrue)
    expect(screen.getByText(/True/)).toBeInTheDocument()
    expect(screen.getByText(/False/)).toBeInTheDocument()
  })
})

describe('TrueFalse — correct answer', () => {
  it('calls onAnswer(true) when user picks the correct answer', () => {
    const { onAnswer } = renderTF(cardTrue)
    fireEvent.click(screen.getByText(/True/))
    expect(onAnswer).toHaveBeenCalledWith(true)
  })

  it('shows Correct feedback', () => {
    renderTF(cardTrue)
    fireEvent.click(screen.getByText(/True/))
    expect(getCorrectFeedback()).toBeInTheDocument()
  })
})

describe('TrueFalse — wrong answer', () => {
  it('calls onAnswer(false) when user picks the wrong answer', () => {
    const { onAnswer } = renderTF(cardTrue)
    fireEvent.click(screen.getByText(/False/))
    expect(onAnswer).toHaveBeenCalledWith(false)
  })

  it('shows wrong feedback with correct answer revealed', () => {
    renderTF(cardTrue)
    fireEvent.click(screen.getByText(/False/))
    expect(document.querySelector('.feedback-wrong')).not.toBeNull()
    expect(screen.getByText(/The answer is True/)).toBeInTheDocument()
  })

  it('works when the correct answer is False', () => {
    const { onAnswer } = renderTF(cardFalse)
    fireEvent.click(screen.getByText(/False/))
    expect(onAnswer).toHaveBeenCalledWith(true)
    expect(getCorrectFeedback()).toBeInTheDocument()
  })
})

describe('TrueFalse — exam mode', () => {
  it('does not show feedback in exam mode', () => {
    renderTF(cardTrue, { examMode: true })
    fireEvent.click(screen.getByText(/True/))
    expect(screen.queryByText('Correct!')).toBeNull()
  })

  it('calls onExamAnswer in exam mode', () => {
    const onExamAnswer = vi.fn()
    renderTF(cardTrue, { examMode: true, onExamAnswer })
    fireEvent.click(screen.getByText(/True/))
    expect(onExamAnswer).toHaveBeenCalledWith(expect.objectContaining({ correct: true }))
  })
})
