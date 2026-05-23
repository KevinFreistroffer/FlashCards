export function pickRandomIndex(length: number, avoid?: number): number {
  if (length <= 0) return 0
  if (length === 1) return 0
  if (avoid === undefined) {
    return Math.floor(Math.random() * length)
  }
  let next = avoid
  let guard = 0
  while (next === avoid && guard++ < 100) {
    next = Math.floor(Math.random() * length)
  }
  return next
}
