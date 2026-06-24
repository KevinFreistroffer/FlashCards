import { shuffleArray } from './shuffleArray'

describe('shuffleArray', () => {
  it('returns a permutation of the same length', () => {
    const input = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(input)
    expect(shuffled).toHaveLength(input.length)
    expect(shuffled.sort()).toEqual(input.sort())
    expect(input).toEqual([1, 2, 3, 4, 5])
  })

  it('can reorder items', () => {
    const original = Array.from({ length: 20 }, (_, i) => i)
    const shuffled = shuffleArray(original)
    const sameOrder = shuffled.every((value, index) => value === index)
    expect(sameOrder).toBe(false)
  })
})
