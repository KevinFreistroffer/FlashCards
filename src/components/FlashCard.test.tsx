import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { FlashCard } from './FlashCard'
import type { ChineseCard, ClaudeCard } from '../types/cards'

const chineseSample: ChineseCard = {
  id: '0',
  hanzi: '你好',
  pinyin: 'nǐ hǎo',
  english: 'hello',
  hskLevel: '1',
}

const claudeSample: ClaudeCard = {
  id: 'cca-1',
  question: 'When was CCA Foundations launched?',
  answer: 'March 12, 2026',
}

function ControlledChineseCard({
  showChineseSymbols,
}: {
  showChineseSymbols: boolean
}) {
  const [flipped, setFlipped] = useState(false)
  return (
    <FlashCard
      topic="chinese"
      entry={chineseSample}
      showChineseSymbols={showChineseSymbols}
      flipped={flipped}
      onFlip={() => setFlipped((f) => !f)}
    />
  )
}

function ControlledClaudeCard() {
  const [flipped, setFlipped] = useState(false)
  return (
    <FlashCard
      topic="claude"
      entry={claudeSample}
      flipped={flipped}
      onFlip={() => setFlipped((f) => !f)}
    />
  )
}

describe('FlashCard chinese', () => {
  it('shows pinyin on front and hides hanzi when showChineseSymbols is false', () => {
    render(<ControlledChineseCard showChineseSymbols={false} />)
    expect(screen.getByText('nǐ hǎo')).toBeInTheDocument()
    expect(screen.queryByText('你好')).not.toBeInTheDocument()
  })

  it('shows hanzi on front when showChineseSymbols is true', () => {
    const { container } = render(<ControlledChineseCard showChineseSymbols />)
    const front = container.querySelector('.flash-card-front')
    expect(front).toHaveTextContent('你好')
    expect(front).toHaveTextContent('nǐ hǎo')
  })

  it('reveals English on flip', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <ControlledChineseCard showChineseSymbols={false} />,
    )
    const back = container.querySelector('.flash-card-back')
    expect(back).toHaveAttribute('aria-hidden', 'true')
    await user.click(screen.getByRole('button', { name: /show english/i }))
    expect(back).toHaveAttribute('aria-hidden', 'false')
    expect(screen.getByText('hello')).toBeInTheDocument()
  })
})

describe('FlashCard claude', () => {
  it('shows question on front and answer after flip', async () => {
    const user = userEvent.setup()
    const { container } = render(<ControlledClaudeCard />)
    expect(screen.getByText(/When was CCA/i)).toBeInTheDocument()
    const back = container.querySelector('.flash-card-back')
    expect(back).toHaveAttribute('aria-hidden', 'true')
    await user.click(screen.getByRole('button', { name: /show answer/i }))
    expect(screen.getByText('March 12, 2026')).toBeInTheDocument()
  })
})
