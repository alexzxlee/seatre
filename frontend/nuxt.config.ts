export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || '/api'
    }
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: process.env.BACKEND_URL || 'http://backend:3001',
          changeOrigin: true
        }
      }
    }
  }
})