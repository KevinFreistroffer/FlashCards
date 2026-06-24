/** Chinese vocabulary card (HSK deck). */
export interface ChineseCard {
  id: string
  hanzi: string
  pinyin: string
  english: string
  hskLevel?: string
}

/** Question-and-answer flashcard (Claude cert, AI models, etc.). */
export interface QuizCard {
  id: string
  question: string
  answer: string
}

/** @deprecated Use QuizCard — kept for existing imports. */
export type ClaudeCard = QuizCard

export type TopicId = 'chinese' | 'claude' | 'ai-models'

export const TOPICS: { id: TopicId; label: string }[] = [
  { id: 'chinese', label: 'Chinese words' },
  { id: 'claude', label: 'Claude certification' },
  { id: 'ai-models', label: 'AI models & benchmarks' },
]

export function isQuizTopic(topic: TopicId): topic is 'claude' | 'ai-models' {
  return topic === 'claude' || topic === 'ai-models'
}
