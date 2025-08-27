import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui'
  ],
  // Minimal @nuxt/ui config (colors can be customized via CSS variables or tailwind theme if needed)
  ui: {},
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || '/api'
    }
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: process.env.BACKEND_URL || 'http://backend:3001',
          changeOrigin: true
        }
      }
    }
  },
  css: ['~/assets/css/main.css']
})