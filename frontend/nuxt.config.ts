import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@nuxt/icon'
  ],
  icon: {
    // auto loads installed @iconify-json packages
    size: '1em'
  },
  // Minimal @nuxt/ui config (colors can be customized via CSS variables or tailwind theme if needed)
  colorMode: {
    preference: 'system', // default preference
    fallback: 'light', // if system preference cannot be determined
    classSuffix: '' // use 'dark' class instead of 'dark-mode'
  },
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
      },
      hmr: {
        timeout: 30000 // 30 seconds instead of 10s (500 Sever Error: Request timeout after 10000ms for type: module)
      }
    }
  },
  css: [
    '~/assets/css/main.css'
  ]
})