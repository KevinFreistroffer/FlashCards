import { isQuizTopic } from '../types/cards'

describe('isQuizTopic', () => {
  it('identifies quiz topics', () => {
    expect(isQuizTopic('claude')).toBe(true)
    expect(isQuizTopic('ai-models')).toBe(true)
    expect(isQuizTopic('chinese')).toBe(false)
  })
})
