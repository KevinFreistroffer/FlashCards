import {
  clampBatchIndex,
  DEFAULT_STUDY_SET_SIZE,
  splitIntoBatches,
  STUDY_SET_SIZES,
} from './chineseBatches'

describe('splitIntoBatches', () => {
  it('splits into fixed-size chunks with a smaller final chunk', () => {
    const items = Array.from({ length: 55 }, (_, i) => i)
    const batches = splitIntoBatches(items, 20)
    expect(batches).toHaveLength(3)
    expect(batches[0]).toHaveLength(20)
    expect(batches[1]).toHaveLength(20)
    expect(batches[2]).toHaveLength(15)
  })

  it('offers study set sizes of 10, 15, and 20', () => {
    expect(STUDY_SET_SIZES).toEqual([10, 15, 20])
    expect(DEFAULT_STUDY_SET_SIZE).toBe(10)
  })
})

describe('clampBatchIndex', () => {
  it('clamps to valid range', () => {
    expect(clampBatchIndex(-1, 10)).toBe(0)
    expect(clampBatchIndex(99, 10)).toBe(9)
    expect(clampBatchIndex(3, 10)).toBe(3)
  })
})
