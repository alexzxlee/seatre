
import { useState } from '#imports'
import { logToFile } from '~/utils/logToFile'
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
    let opts: any = {}
    try {
      // SSR: Forward cookies for auth
      if (import.meta.server) {
        const event = useRequestEvent()
        opts.headers = {
          cookie: event?.node?.req?.headers?.cookie || ''
        }
        logToFile(`fetchUser SSR: Forwarding cookies: ${opts.headers.cookie}`)
      }
      logToFile(`fetchUser: Calling /auth/me with opts: ${JSON.stringify(opts)}`)
      const res = await useApi('/auth/me', opts)
      logToFile(`fetchUser: Response: ${JSON.stringify(res)}`)
      user.value = res?.id ? res : null
    } catch (e: any) {
      user.value = null
      error.value = e?.message || 'Failed to fetch user'
      logToFile(`fetchUser: Error: ${e?.message || e}`)
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
