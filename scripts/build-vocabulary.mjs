import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sourcePath = path.join(__dirname, 'complete-hsk-source.json')
const outPath = path.join(__dirname, '..', 'src', 'data', 'vocabulary.json')

if (!fs.existsSync(sourcePath)) {
  console.error(
    'Missing scripts/complete-hsk-source.json — download complete.min.json from\n' +
      'https://github.com/drkameleon/complete-hsk-vocabulary (same filename).',
  )
  process.exit(1)
}

const raw = JSON.parse(fs.readFileSync(sourcePath, 'utf8'))
if (!Array.isArray(raw)) {
  console.error('Expected array in source JSON')
  process.exit(1)
}

/** @type {Array<{ id: string; hanzi: string; pinyin: string; english: string; hskLevel?: string }>} */
const out = []
let seq = 0

for (const entry of raw) {
  const hskLevel = entry.l?.length ? entry.l.join(',') : undefined
  for (const form of entry.f ?? []) {
    const pinyin = form.i?.y || form.i?.n || ''
    const english = (form.m ?? []).join('; ')
    if (!english) continue
    /** @type {typeof out[0]} */
    const row = {
      id: String(seq++),
      hanzi: entry.s,
      pinyin,
      english,
    }
    if (hskLevel) row.hskLevel = hskLevel
    out.push(row)
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(out))
console.log(`Wrote ${out.length} entries → ${outPath}`)
