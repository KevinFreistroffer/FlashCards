/** Supported cards-per-set options for focused study sessions. */
export const STUDY_SET_SIZES = [10, 15, 20] as const

export type StudySetSize = (typeof STUDY_SET_SIZES)[number]

export const DEFAULT_STUDY_SET_SIZE: StudySetSize = 10

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
