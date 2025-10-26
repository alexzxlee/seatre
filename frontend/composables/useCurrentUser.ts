import { useState } from '#imports'
import { useApiFetch } from './useApi'

interface User {
  id: number
  email: string
  role: string
}

export function useCurrentUser() {
  const user = useState<User | null>('user', () => null)
  const isLoading = useState<boolean>('user_loading', () => false)
  const error = useState<string | null>('user_error', () => null)

  const useApi = useApiFetch()
  async function fetchUser() {
    isLoading.value = true
    error.value = null
    try {
      // SSR: Forward cookies for auth
      const opts: any = {}
      if (import.meta.server) {
        const event = useRequestEvent()
        opts.headers = {
          // Use event.node.req as recommended for Nuxt 3/4
          cookie: event?.node?.req?.headers?.cookie || ''
        }
      }
  const res = await useApi('/auth/me', opts)
      user.value = res?.id ? res : null
    } catch (e: any) {
      user.value = null
      error.value = e?.message || 'Failed to fetch user'
    } finally {
      isLoading.value = false
    }
  }

  function clearUser() {
    user.value = null
    error.value = null
  }

  return {
    user,
    isLoading,
    error,
    fetchUser,
    clearUser
  }
}
