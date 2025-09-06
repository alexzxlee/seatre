/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    'node_modules/@nuxt/ui/dist/runtime/**/*.{mjs,js}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-brand)',
          foreground: 'var(--color-brand-foreground)'
        },
        background: 'var(--color-bg)',
        foreground: 'var(--color-fg)'
      }
    }
  },
  plugins: []
}
