/** Cards per study set — sized for a focused session without overwhelming length. */
export const CHINESE_BATCH_SIZE = 50

export function splitIntoBatches<T>(items: readonly T[], batchSize: number): T[][] {
  if (batchSize < 1) return items.length ? [items.slice()] : []
  const batches: T[][] = []
  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize) as T[])
  }
  return batches
}

export function clampBatchIndex(index: number, batchCount: number): number {
  if (batchCount <= 0) return 0
  return Math.min(Math.max(0, index), batchCount - 1)
}
