/**
 * API composable with CSRF protection
 *
 * Usage:
 * - CSRF token is automatically fetched by plugins/csrf.client.ts and injected into all API requests as x-csrf-token.
 * - Use useApiFetch() for all API calls; no manual CSRF handling needed.
 * - SSR and client requests are protected.
 *
 * Testing:
 * 1. Open browser devtools and check window.__csrfToken (should be set after app loads).
 * 2. Make any API request (e.g., login, register) and inspect the request headers for x-csrf-token.
 * 3. If backend CSRF middleware is enabled, requests should succeed only if token is present.
 * 4. If token is missing or invalid, backend should return a 403 error.
 */
export const useApiBase = (): string => {
  const config = useRuntimeConfig()
  return import.meta.server ? config.apiBase : config.public.apiBase
}

export const useApiFetch = () => {
  const baseURL = useApiBase()
  
  return async <T = any>(path: string, opts: any = {}): Promise<T> => {
    const url = baseURL + (path.startsWith('/') ? '' : '/') + path
    // Inject CSRF token from useState (set by plugin)
    let csrfToken: string | null = null
    try {
      csrfToken = useState<string | null>('csrf_token').value || null
    } catch {}
    const headers = {
      'Content-Type': 'application/json',
      ...opts.headers,
      ...(csrfToken ? { 'x-csrf-token': csrfToken } : {})
    }
    const response = await fetch(url, {
      credentials: 'include',
      headers,
      ...opts,
      body: opts.body ? JSON.stringify(opts.body) : undefined
    })
    if (!response.ok) {
      let payload: any = null
      try {
        payload = await response.json()
      } catch {}
      const error: any = new Error(
        payload?.message || payload?.error || `Request failed with status ${response.status}`
      )
      error.status = response.status
      error.data = payload || null
      throw error
    }
    return response.json()
  }
}
