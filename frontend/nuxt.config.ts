// @ts-nocheck
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: false },
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
    preference: 'light', // default preference 'system'
    fallback: 'light', // if system preference cannot be determined
    classSuffix: '' // use 'dark' class instead of 'dark-mode'
  },
  runtimeConfig: {
    public: {
      // Prefer NUXT_PUBLIC_API_BASE when provided, fallback to API_BASE, then '/api'
      apiBase: process.env.NUXT_PUBLIC_API_BASE || process.env.API_BASE || '/api'
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