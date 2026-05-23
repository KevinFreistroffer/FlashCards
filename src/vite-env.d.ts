/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_SHOW_CHINESE_SYMBOLS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
