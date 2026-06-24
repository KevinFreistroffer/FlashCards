import { nextCardIndex, prevCardIndex } from './cardNavigation'

describe('cardNavigation', () => {
  it('wraps forward and backward within a set', () => {
    expect(nextCardIndex(0, 10)).toBe(1)
    expect(nextCardIndex(9, 10)).toBe(0)
    expect(prevCardIndex(0, 10)).toBe(9)
    expect(prevCardIndex(3, 10)).toBe(2)
  })

  it('returns 0 for empty sets', () => {
    expect(nextCardIndex(0, 0)).toBe(0)
    expect(prevCardIndex(5, 0)).toBe(0)
  })
})
