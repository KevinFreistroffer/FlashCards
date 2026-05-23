/** Chinese vocabulary card (HSK deck). */
export interface ChineseCard {
  id: string
  hanzi: string
  pinyin: string
  english: string
  hskLevel?: string
}

/** Claude certification / product knowledge card. */
export interface ClaudeCard {
  id: string
  question: string
  answer: string
}

export type TopicId = 'chinese' | 'claude'

export const TOPICS: { id: TopicId; label: string }[] = [
  { id: 'chinese', label: 'Chinese words' },
  { id: 'claude', label: 'Claude' },
]
