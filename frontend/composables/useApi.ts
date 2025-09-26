export const useApiBase = (): string => {
  const config = useRuntimeConfig()
  return config.public.apiBase
}

// Returns a helper bound to the configured apiBase
export const useApiFetch = () => {
  const baseURL = useApiBase()
  const { $fetch } = useNuxtApp()
  return async <T = any>(path: string, opts: any = {}): Promise<T> => {
    return $fetch<T>(path, {
      baseURL,
      credentials: 'include', // sensible default for cookie-based auth
      ...opts
    })
  }
}
