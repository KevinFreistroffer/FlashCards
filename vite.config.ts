import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitest/config'

/** Must match the GitHub repo name for project Pages (https://user.github.io/FlashCards/). */
const base = '/FlashCards/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'FlashCards',
        short_name: 'FlashCards',
        description: 'FlashCards — Chinese vocabulary and Claude certification study',
        theme_color: '#16171d',
        background_color: '#16171d',
        display: 'standalone',
        orientation: 'any',
        // Do not use start_url: '/' — that opens the site root and 404s on GitHub Pages.
        start_url: base,
        scope: base,
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: `${base}index.html`,
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
