import {
  CHINESE_BATCH_SIZE,
  clampBatchIndex,
  splitIntoBatches,
} from './chineseBatches'

describe('splitIntoBatches', () => {
  it('splits into fixed-size chunks with a smaller final chunk', () => {
    const items = Array.from({ length: 55 }, (_, i) => i)
    const batches = splitIntoBatches(items, 50)
    expect(batches).toHaveLength(2)
    expect(batches[0]).toHaveLength(50)
    expect(batches[1]).toHaveLength(5)
  })

  it('uses CHINESE_BATCH_SIZE of 50', () => {
    expect(CHINESE_BATCH_SIZE).toBe(50)
  })
})

describe('clampBatchIndex', () => {
  it('clamps to valid range', () => {
    expect(clampBatchIndex(-1, 10)).toBe(0)
    expect(clampBatchIndex(99, 10)).toBe(9)
    expect(clampBatchIndex(3, 10)).toBe(3)
  })
})
