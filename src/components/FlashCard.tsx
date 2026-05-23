import type { VocabEntry } from '../types/vocabulary'
import './FlashCard.css'

export interface FlashCardProps {
  entry: VocabEntry
  showChineseSymbols: boolean
  flipped: boolean
  onFlip: () => void
}

export function FlashCard({
  entry,
  showChineseSymbols,
  flipped,
  onFlip,
}: FlashCardProps) {
  return (
    <button
      type="button"
      className="flash-card-scene"
      onClick={onFlip}
      aria-pressed={flipped}
      aria-label={flipped ? 'Show question' : 'Show English answer'}
    >
      <div className={`flash-card-inner${flipped ? ' flash-card-inner--flipped' : ''}`}>
        <div
          className="flash-card-face flash-card-front"
          aria-hidden={flipped}
        >
          {showChineseSymbols ? (
            <>
              <span className="flash-card-hanzi" lang="zh-Hans">
                {entry.hanzi}
              </span>
              <span className="flash-card-pinyin">{entry.pinyin}</span>
            </>
          ) : (
            <span className="flash-card-pinyin flash-card-pinyin--solo">
              {entry.pinyin}
            </span>
          )}
          {entry.hskLevel ? (
            <span className="flash-card-meta">HSK: {entry.hskLevel}</span>
          ) : null}
        </div>
        <div
          className="flash-card-face flash-card-back"
          lang="en"
          aria-hidden={!flipped}
        >
          <span className="flash-card-english">{entry.english}</span>
          {showChineseSymbols ? (
            <span className="flash-card-back-extra" lang="zh-Hans">
              {entry.hanzi}
              <span className="flash-card-pinyin flash-card-pinyin--small">
                {entry.pinyin}
              </span>
            </span>
          ) : null}
        </div>
      </div>
    </button>
  )
}
