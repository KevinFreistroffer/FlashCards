import { parseShowChineseSymbols } from './showChineseSymbols'

describe('parseShowChineseSymbols', () => {
  it('is false for unset-like values', () => {
    expect(parseShowChineseSymbols(undefined)).toBe(false)
    expect(parseShowChineseSymbols('')).toBe(false)
    expect(parseShowChineseSymbols('false')).toBe(false)
    expect(parseShowChineseSymbols(' no ')).toBe(false)
  })

  it('is true only for explicit true', () => {
    expect(parseShowChineseSymbols('true')).toBe(true)
    expect(parseShowChineseSymbols('TRUE')).toBe(true)
    expect(parseShowChineseSymbols(' true ')).toBe(true)
  })
})
