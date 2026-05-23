import { pickRandomIndex } from './pickCardIndex'

describe('pickRandomIndex', () => {
  it('returns 0 for empty or single deck', () => {
    expect(pickRandomIndex(0)).toBe(0)
    expect(pickRandomIndex(1)).toBe(0)
    expect(pickRandomIndex(1, 0)).toBe(0)
  })

  it('returns a valid index when no avoid', () => {
    for (let i = 0; i < 20; i++) {
      const n = pickRandomIndex(10)
      expect(n).toBeGreaterThanOrEqual(0)
      expect(n).toBeLessThan(10)
    }
  })

  it('usually differs from avoid for multi-card deck', () => {
    const seen = new Set<number>()
    for (let i = 0; i < 80; i++) {
      seen.add(pickRandomIndex(5, 2))
    }
    expect(seen.size).toBeGreaterThan(1)
    expect(seen.has(2)).toBe(false)
  })
})
