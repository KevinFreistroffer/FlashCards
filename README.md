# Chinese Flash Cards

Vite + React + TypeScript app for studying HSK-oriented vocabulary. Tap a card to flip it and reveal the English meaning. Works in the browser and installs as a **PWA** on phones and desktops.

## Hanzi on or off

By default the **front** of the card shows **pinyin only** (no Chinese characters). Set an environment variable when building or developing:

| Value | Front of card |
|--------|----------------|
| unset / empty / `false` | Pinyin only |
| `true` | Hanzi + pinyin |

Copy [`.env.example`](./.env.example) to `.env` and adjust:

```bash
VITE_SHOW_CHINESE_SYMBOLS=true
```

With hanzi off, the **back** shows **English only**. With hanzi on, the back also repeats the hanzi and pinyin under the English gloss.

## Scripts

```bash
npm install
npm run dev          # local dev server
npm run build        # production build (outputs dist/)
npm run preview      # preview production build
npm test             # Vitest (watch)
npm run test:run     # Vitest once (e.g. CI)
```

### Regenerating vocabulary

The bundled deck is generated from [complete-hsk-vocabulary](https://github.com/drkameleon/complete-hsk-vocabulary) (`complete.min.json`). To refresh:

1. Download `complete.min.json` into `scripts/complete-hsk-source.json`.
2. Run `npm run build:vocab` to write `src/data/vocabulary.json`.

## Install as an app (PWA)

Serve the built site over **HTTPS** (e.g. Netlify, Vercel, GitHub Pages with HTTPS).

- **Android (Chrome):** open the site → menu → **Install app** / **Add to Home screen**.
- **iOS (Safari):** Share → **Add to Home Screen**.
- **Desktop Chrome/Edge:** install icon in the address bar, if shown.

On GitHub Pages, open the app from **`https://<user>.github.io/ChineseFlashCards/`** (with trailing path), not the root `github.io` URL. If you installed an older build and the shortcut opens a blank or “not found” page, remove the home-screen icon and install again after a fresh deploy.

## Tech

- React 19, Vite 8, TypeScript
- [`vite-plugin-pwa`](https://vite-pwa-org.netlify.app/) for manifest + offline caching
- Vocabulary derived from open-source HSK data (see link above)

## License

Application code: follow your repository license. Vocabulary source: see [drkameleon/complete-hsk-vocabulary](https://github.com/drkameleon/complete-hsk-vocabulary) for its license and attribution.
