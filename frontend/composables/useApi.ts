export const useApiBase = (): string => {
  const config = useRuntimeConfig()
  return config.public.apiBase
}

export const useApiFetch = () => {
  const baseURL = useApiBase()
  
  return async <T = any>(path: string, opts: any = {}): Promise<T> => {
    const url = baseURL + (path.startsWith('/') ? '' : '/') + path
    
    const response = await fetch(url, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...opts.headers },
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
