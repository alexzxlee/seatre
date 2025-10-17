/**
 * Nuxt CSRF plugin: Fetches CSRF token from backend and stores in useState for global access.
 * Automatically runs on client-side app mount.
 * Usage: Token is injected into all API requests via useApiFetch.
 * To test: Open devtools, check window.__csrfToken, and verify x-csrf-token header in requests.
 */
import { useState } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Only run on client
  if (import.meta.server) return

  const csrfTokenState = useState<string | null>('csrf_token', () => null)

  try {
    // Use the same API base as useApi.ts
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase || 'http://localhost:3001/api'
    const res = await fetch(`${apiBase}/auth/csrf`, {
      credentials: 'include'
    })
    const data = await res.json()
    if (csrfTokenState) {
      csrfTokenState.value = data.csrfToken || null;
      // Expose for debugging
      (window as any).__csrfToken = csrfTokenState.value;
    }
  } catch (e) {
    if (csrfTokenState) {
      csrfTokenState.value = null;
      (window as any).__csrfToken = null;
    }
    // Optionally log error
    // console.warn('CSRF token fetch failed:', e)
  }
})
