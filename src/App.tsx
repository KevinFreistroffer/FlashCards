import { useCallback, useMemo, useState } from 'react'
import { FlashCard } from './components/FlashCard'
import claudeDeck from './data/claude.json'
import vocabulary from './data/vocabulary.json'
import {
  CHINESE_BATCH_SIZE,
  clampBatchIndex,
  splitIntoBatches,
} from './lib/chineseBatches'
import { pickRandomIndex } from './lib/pickCardIndex'
import { readShowChineseSymbols } from './lib/showChineseSymbols'
import type { ChineseCard, ClaudeCard, TopicId } from './types/cards'
import { TOPICS } from './types/cards'
import './App.css'

const chineseDeck = vocabulary as ChineseCard[]
const claudeCards = claudeDeck as ClaudeCard[]

const chineseBatches = splitIntoBatches(chineseDeck, CHINESE_BATCH_SIZE)

function App() {
  const showChineseSymbols = useMemo(() => readShowChineseSymbols(), [])
  const [topic, setTopic] = useState<TopicId>('chinese')
  const [batchIndex, setBatchIndex] = useState(0)
  const [cardIndexInBatch, setCardIndexInBatch] = useState(0)
  const [claudeCardIndex, setClaudeCardIndex] = useState(() =>
    pickRandomIndex(claudeCards.length),
  )
  const [flipped, setFlipped] = useState(false)

  const activeChineseBatch = chineseBatches[clampBatchIndex(batchIndex, chineseBatches.length)] ?? []
  const chineseEntry = activeChineseBatch[cardIndexInBatch]
  const claudeEntry = claudeCards[claudeCardIndex]

  const onTopicChange = useCallback((next: TopicId) => {
    setTopic(next)
    setFlipped(false)
    setBatchIndex(0)
    setCardIndexInBatch(0)
    setClaudeCardIndex(pickRandomIndex(claudeCards.length))
  }, [])

  const onBatchChange = useCallback((nextBatch: number) => {
    setBatchIndex(clampBatchIndex(nextBatch, chineseBatches.length))
    setCardIndexInBatch(0)
    setFlipped(false)
  }, [])

  const goNext = useCallback(() => {
    setFlipped(false)
    if (topic === 'chinese') {
      if (activeChineseBatch.length === 0) return
      setCardIndexInBatch((i) => {
        if (i + 1 < activeChineseBatch.length) return i + 1
        return 0
      })
    } else {
      setClaudeCardIndex((i) => pickRandomIndex(claudeCards.length, i))
    }
  }, [topic, activeChineseBatch.length])

  const batchCount = chineseBatches.length
  const batchLabel =
    batchCount > 0
      ? `Set ${batchIndex + 1} of ${batchCount} (${activeChineseBatch.length} cards)`
      : 'No cards'

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">FlashCards</h1>
        <p className="app-sub">
          Choose a topic, then tap the card to reveal the answer.
        </p>
      </header>

      <main className="app-main">
        <div className="app-controls">
          <label className="app-field">
            <span className="app-label">Topic</span>
            <select
              className="app-select"
              value={topic}
              onChange={(e) => onTopicChange(e.target.value as TopicId)}
            >
              {TOPICS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>

          {topic === 'chinese' ? (
            <label className="app-field">
              <span className="app-label">Study set</span>
              <select
                className="app-select"
                value={batchIndex}
                onChange={(e) => onBatchChange(Number(e.target.value))}
              >
                {chineseBatches.map((batch, i) => (
                  <option key={i} value={i}>
                    Set {i + 1} ({batch.length} cards)
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>

        {topic === 'chinese' && chineseEntry ? (
          <FlashCard
            topic="chinese"
            entry={chineseEntry}
            showChineseSymbols={showChineseSymbols}
            flipped={flipped}
            onFlip={() => setFlipped((f) => !f)}
          />
        ) : null}

        {topic === 'claude' && claudeEntry ? (
          <FlashCard
            topic="claude"
            entry={claudeEntry}
            flipped={flipped}
            onFlip={() => setFlipped((f) => !f)}
          />
        ) : null}

        <div className="app-actions">
          <button
            type="button"
            className="app-btn app-btn--secondary"
            onClick={goNext}
          >
            Next card
          </button>
        </div>

        <p className="app-hint" role="status">
          {topic === 'chinese' ? (
            <>
              {batchLabel}
              {' · '}
              Card {cardIndexInBatch + 1} of {activeChineseBatch.length}
              {showChineseSymbols ? ' · Hanzi on' : ' · Pinyin-only front'}
            </>
          ) : (
            <>Claude certification deck · {claudeCards.length} cards</>
          )}
        </p>
      </main>
    </div>
  )
}

export default App
