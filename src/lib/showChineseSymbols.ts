/** True only when env is explicitly set to "true" (case-insensitive). */
export function parseShowChineseSymbols(
  value: string | undefined,
): boolean {
  if (value == null || value === '') return false
  return String(value).trim().toLowerCase() === 'true'
}

export function readShowChineseSymbols(): boolean {
  return parseShowChineseSymbols(import.meta.env.VITE_SHOW_CHINESE_SYMBOLS)
}
