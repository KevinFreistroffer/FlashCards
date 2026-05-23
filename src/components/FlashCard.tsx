import type { ChineseCard, ClaudeCard } from '../types/cards'
import './FlashCard.css'

export type FlashCardProps =
  | {
      topic: 'chinese'
      entry: ChineseCard
      showChineseSymbols: boolean
      flipped: boolean
      onFlip: () => void
    }
  | {
      topic: 'claude'
      entry: ClaudeCard
      flipped: boolean
      onFlip: () => void
    }

export function FlashCard(props: FlashCardProps) {
  const { flipped, onFlip } = props
  const backLabel =
    props.topic === 'chinese' ? 'Show English answer' : 'Show answer'

  return (
    <button
      type="button"
      className="flash-card-scene"
      onClick={onFlip}
      aria-pressed={flipped}
      aria-label={flipped ? 'Show question' : backLabel}
    >
      <div
        className={`flash-card-inner${flipped ? ' flash-card-inner--flipped' : ''}`}
      >
        {props.topic === 'chinese' ? (
          <>
            <div
              className="flash-card-face flash-card-front"
              aria-hidden={flipped}
            >
              {props.showChineseSymbols ? (
                <>
                  <span className="flash-card-hanzi" lang="zh-Hans">
                    {props.entry.hanzi}
                  </span>
                  <span className="flash-card-pinyin">{props.entry.pinyin}</span>
                </>
              ) : (
                <span className="flash-card-pinyin flash-card-pinyin--solo">
                  {props.entry.pinyin}
                </span>
              )}
              {props.entry.hskLevel ? (
                <span className="flash-card-meta">
                  HSK: {props.entry.hskLevel}
                </span>
              ) : null}
            </div>
            <div
              className="flash-card-face flash-card-back"
              lang="en"
              aria-hidden={!flipped}
            >
              <span className="flash-card-english">{props.entry.english}</span>
              {props.showChineseSymbols ? (
                <span className="flash-card-back-extra" lang="zh-Hans">
                  {props.entry.hanzi}
                  <span className="flash-card-pinyin flash-card-pinyin--small">
                    {props.entry.pinyin}
                  </span>
                </span>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <div
              className="flash-card-face flash-card-front flash-card-front--text"
              aria-hidden={flipped}
            >
              <span className="flash-card-prompt">{props.entry.question}</span>
            </div>
            <div
              className="flash-card-face flash-card-back flash-card-back--text"
              lang="en"
              aria-hidden={!flipped}
            >
              <span className="flash-card-english flash-card-english--answer">
                {props.entry.answer}
              </span>
            </div>
          </>
        )}
      </div>
    </button>
  )
}
