/// <reference types="nuxt" />

interface ImportMeta {
  readonly server?: boolean
  readonly client?: boolean
}

declare global {
  interface Window {
    __csrfToken?: string | null;
  }
}
