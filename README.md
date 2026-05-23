# FlashCards

Vite + React + TypeScript flash card app with two topics:

- **Chinese words** — HSK vocabulary (~12,600 cards), studied in **sets of 50** so you can work through a consistent series.
- **Claude** — Claude Certified Architect (Foundations) study cards (exam format, domains, and program facts; sources below).

Tap a card to flip. Use **Next card** to advance (Chinese sets loop within the current set).

## Topics

Use the **Topic** dropdown: **Chinese words** or **Claude**.

For Chinese, pick a **Study set** (Set 1, Set 2, …). Each set has up to 50 cards except the last set, which may be smaller.

## Hanzi on or off (Chinese only)

| `VITE_SHOW_CHINESE_SYMBOLS` | Front of card |
|-----------------------------|----------------|
| unset / `false` | Pinyin only |
| `true` | Hanzi + pinyin |

Copy [`.env.example`](./.env.example) to `.env` to override at build time.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run test:run
npm run build:vocab   # regenerate src/data/vocabulary.json from HSK source
```

## GitHub Pages

Project site: `https://<user>.github.io/FlashCards/` — `base` in [`vite.config.ts`](./vite.config.ts) must match the repo name.

After deploy, remove old PWA shortcuts and reinstall from the full Pages URL if the installed app shows the wrong path.

## Claude deck sources

Cards summarize publicly documented **Claude Certified Architect – Foundations** information (launch **March 12, 2026**; **60** questions; **120** minutes; passing score **720**; **$99** exam fee; proctored; **5** domains; Anthropic Academy / Skilljar). Verify against official materials before relying on them for an exam:

- [Anthropic news & partner program announcements](https://www.anthropic.com/news)
- [Anthropic Academy (Skilljar)](https://anthropic.skilljar.com/)
- Third-party exam guides (e.g. [lowcode.agency CCA overview](https://www.lowcode.agency/blog/how-to-become-claude-certified-architect))

## Preservation branch

The earlier Chinese-only PWA build is preserved on branch `preserve/chinese-flashcards-pwa`.

## License

Application code: your repository license. Chinese vocabulary: [complete-hsk-vocabulary](https://github.com/drkameleon/complete-hsk-vocabulary). Claude content is study notes, not official Anthropic exam items.
