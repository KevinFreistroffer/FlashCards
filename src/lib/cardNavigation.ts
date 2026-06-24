export function nextCardIndex(current: number, length: number): number {
  if (length <= 0) return 0
  return (current + 1) % length
}

export function prevCardIndex(current: number, length: number): number {
  if (length <= 0) return 0
  return (current - 1 + length) % length
}
