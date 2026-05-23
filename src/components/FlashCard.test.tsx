import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { FlashCard } from './FlashCard'
import type { VocabEntry } from '../types/vocabulary'

const sample: VocabEntry = {
  id: '0',
  hanzi: '你好',
  pinyin: 'nǐ hǎo',
  english: 'hello',
  hskLevel: '1',
}

function ControlledFlashCard({
  showChineseSymbols,
}: {
  showChineseSymbols: boolean
}) {
  const [flipped, setFlipped] = useState(false)
  return (
    <FlashCard
      entry={sample}
      showChineseSymbols={showChineseSymbols}
      flipped={flipped}
      onFlip={() => setFlipped((f) => !f)}
    />
  )
}

describe('FlashCard', () => {
  it('shows pinyin on front and hides hanzi when showChineseSymbols is false', () => {
    render(<ControlledFlashCard showChineseSymbols={false} />)
    expect(screen.getByText('nǐ hǎo')).toBeInTheDocument()
    expect(screen.queryByText('你好')).not.toBeInTheDocument()
  })

  it('shows hanzi on front when showChineseSymbols is true', () => {
    const { container } = render(<ControlledFlashCard showChineseSymbols />)
    const front = container.querySelector('.flash-card-front')
    expect(front).toBeTruthy()
    expect(front).toHaveTextContent('你好')
    expect(front).toHaveTextContent('nǐ hǎo')
  })

  it('reveals English on flip', async () => {
    const user = userEvent.setup()
    const { container } = render(<ControlledFlashCard showChineseSymbols={false} />)
    const back = container.querySelector('.flash-card-back')
    expect(back).toHaveAttribute('aria-hidden', 'true')
    await user.click(screen.getByRole('button', { name: /show english/i }))
    expect(back).toHaveAttribute('aria-hidden', 'false')
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('does not show hanzi on back when showChineseSymbols is false', async () => {
    const user = userEvent.setup()
    render(<ControlledFlashCard showChineseSymbols={false} />)
    await user.click(screen.getByRole('button', { name: /show english/i }))
    expect(screen.queryByText('你好')).not.toBeInTheDocument()
  })
})
