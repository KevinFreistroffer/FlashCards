import { useCallback, useMemo, useState } from 'react'
import { FlashCard } from './components/FlashCard'
import vocabulary from './data/vocabulary.json'
import { pickRandomIndex } from './lib/pickCardIndex'
import { readShowChineseSymbols } from './lib/showChineseSymbols'
import type { VocabEntry } from './types/vocabulary'
import './App.css'

const deck = vocabulary as VocabEntry[]

function App() {
  const showChineseSymbols = useMemo(() => readShowChineseSymbols(), [])
  const [cardIndex, setCardIndex] = useState(() =>
    pickRandomIndex(deck.length),
  )
  const [flipped, setFlipped] = useState(false)

  const entry = deck[cardIndex]!

  const goNext = useCallback(() => {
    setFlipped(false)
    setCardIndex((i) => pickRandomIndex(deck.length, i))
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Chinese FlashCards</h1>
        <p className="app-sub">
          Tap the card to reveal English. Use &ldquo;Next&rdquo; for another
          word.
        </p>
      </header>

      <main className="app-main">
        <FlashCard
          entry={entry}
          showChineseSymbols={showChineseSymbols}
          flipped={flipped}
          onFlip={() => setFlipped((f) => !f)}
        />

        <div className="app-actions">
          <button type="button" className="app-btn app-btn--secondary" onClick={goNext}>
            Next card
          </button>
        </div>

        <p className="app-hint" role="status">
          Deck: {deck.length.toLocaleString()} cards
          {showChineseSymbols ? ' · Hanzi on' : ' · Pinyin-only front'}
        </p>
      </main>
    </div>
  )
}

export default App
