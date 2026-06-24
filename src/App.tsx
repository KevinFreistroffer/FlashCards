import { useCallback, useMemo, useState } from 'react'
import { FlashCard } from './components/FlashCard'
import aiModelsDeck from './data/ai-models.json'
import claudeDeck from './data/claude.json'
import vocabulary from './data/vocabulary.json'
import { nextCardIndex, prevCardIndex } from './lib/cardNavigation'
import {
  clampBatchIndex,
  DEFAULT_STUDY_SET_SIZE,
  splitIntoBatches,
  STUDY_SET_SIZES,
  type StudySetSize,
} from './lib/chineseBatches'
import { readShowChineseSymbols } from './lib/showChineseSymbols'
import { shuffleArray } from './lib/shuffleArray'
import type { ChineseCard, QuizCard, TopicId } from './types/cards'
import { isQuizTopic, TOPICS } from './types/cards'
import './App.css'

const chineseDeck = vocabulary as ChineseCard[]
const claudeCards = claudeDeck as QuizCard[]
const aiModelCards = aiModelsDeck as QuizCard[]

function deckForTopic(topic: TopicId): readonly (ChineseCard | QuizCard)[] {
  switch (topic) {
    case 'chinese':
      return chineseDeck
    case 'claude':
      return claudeCards
    case 'ai-models':
      return aiModelCards
  }
}

function App() {
  const showChineseSymbols = useMemo(() => readShowChineseSymbols(), [])
  const [topic, setTopic] = useState<TopicId>('chinese')
  const [setSize, setSetSize] = useState<StudySetSize>(DEFAULT_STUDY_SET_SIZE)
  const [batchIndex, setBatchIndex] = useState(0)
  const [cardIndexInBatch, setCardIndexInBatch] = useState(0)
  const [shuffledBatch, setShuffledBatch] = useState<
    readonly (ChineseCard | QuizCard)[] | null
  >(null)
  const [flipped, setFlipped] = useState(false)

  const batches = useMemo(
    () => splitIntoBatches(deckForTopic(topic), setSize),
    [topic, setSize],
  )

  const safeBatchIndex = clampBatchIndex(batchIndex, batches.length)
  const naturalBatch = batches[safeBatchIndex] ?? []
  const activeBatch = shuffledBatch ?? naturalBatch
  const currentEntry = activeBatch[cardIndexInBatch]

  const resetStudyPosition = useCallback(() => {
    setBatchIndex(0)
    setCardIndexInBatch(0)
    setShuffledBatch(null)
    setFlipped(false)
  }, [])

  const onTopicChange = useCallback(
    (next: TopicId) => {
      setTopic(next)
      resetStudyPosition()
    },
    [resetStudyPosition],
  )

  const onSetSizeChange = useCallback(
    (nextSize: StudySetSize) => {
      setSetSize(nextSize)
      resetStudyPosition()
    },
    [resetStudyPosition],
  )

  const onBatchChange = useCallback((nextBatch: number) => {
    setBatchIndex(clampBatchIndex(nextBatch, batches.length))
    setCardIndexInBatch(0)
    setShuffledBatch(null)
    setFlipped(false)
  }, [batches.length])

  const goNext = useCallback(() => {
    setFlipped(false)
    if (activeBatch.length === 0) return
    setCardIndexInBatch((i) => nextCardIndex(i, activeBatch.length))
  }, [activeBatch.length])

  const goPrev = useCallback(() => {
    setFlipped(false)
    if (activeBatch.length === 0) return
    setCardIndexInBatch((i) => prevCardIndex(i, activeBatch.length))
  }, [activeBatch.length])

  const shuffleCurrentSet = useCallback(() => {
    if (naturalBatch.length === 0) return
    setShuffledBatch(shuffleArray(naturalBatch))
    setCardIndexInBatch(0)
    setFlipped(false)
  }, [naturalBatch])

  const batchCount = batches.length
  const batchLabel =
    batchCount > 0
      ? `Set ${safeBatchIndex + 1} of ${batchCount} (${activeBatch.length} cards)`
      : 'No cards'

  const topicLabel = TOPICS.find((t) => t.id === topic)?.label ?? topic
  const isShuffled = shuffledBatch !== null

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

          <label className="app-field">
            <span className="app-label">Cards per set</span>
            <select
              className="app-select"
              value={setSize}
              onChange={(e) =>
                onSetSizeChange(Number(e.target.value) as StudySetSize)
              }
            >
              {STUDY_SET_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size} cards
                </option>
              ))}
            </select>
          </label>

          <label className="app-field">
            <span className="app-label">Study set</span>
            <select
              className="app-select"
              value={safeBatchIndex}
              onChange={(e) => onBatchChange(Number(e.target.value))}
            >
              {batches.map((batch, i) => (
                <option key={i} value={i}>
                  Set {i + 1} ({batch.length} cards)
                </option>
              ))}
            </select>
          </label>
        </div>

        {topic === 'chinese' && currentEntry ? (
          <FlashCard
            topic="chinese"
            entry={currentEntry as ChineseCard}
            showChineseSymbols={showChineseSymbols}
            flipped={flipped}
            onFlip={() => setFlipped((f) => !f)}
          />
        ) : null}

        {isQuizTopic(topic) && currentEntry ? (
          <FlashCard
            topic={topic}
            entry={currentEntry as QuizCard}
            flipped={flipped}
            onFlip={() => setFlipped((f) => !f)}
          />
        ) : null}

        <div className="app-actions">
          <button
            type="button"
            className="app-btn app-btn--secondary"
            onClick={goPrev}
            disabled={activeBatch.length === 0}
          >
            Previous card
          </button>
          <button
            type="button"
            className="app-btn app-btn--secondary"
            onClick={goNext}
            disabled={activeBatch.length === 0}
          >
            Next card
          </button>
          <button
            type="button"
            className="app-btn app-btn--secondary"
            onClick={shuffleCurrentSet}
            disabled={naturalBatch.length === 0}
          >
            {isShuffled ? 'Shuffle again' : 'Shuffle set'}
          </button>
        </div>

        <p className="app-hint" role="status">
          {topicLabel}
          {' · '}
          {batchLabel}
          {' · '}
          Card {activeBatch.length ? cardIndexInBatch + 1 : 0} of{' '}
          {activeBatch.length}
          {topic === 'chinese'
            ? showChineseSymbols
              ? ' · Hanzi on'
              : ' · Pinyin-only front'
            : null}
          {isShuffled ? ' · Shuffled' : null}
        </p>
      </main>
    </div>
  )
}

export default App
