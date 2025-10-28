
import { useState } from '#imports'
import { useApiFetch } from './useApi'
import fs from 'fs'
import path from 'path'

function logToFile(message: string) {
  try {
    const logPath = path.resolve('/tmp/nuxt-debug.log')
    const timestamp = new Date().toISOString()
    fs.appendFileSync(logPath, `[${timestamp}] [useCurrentUser] ${message}\n`)
  } catch (e) {
    // Fails silently if cannot write
  }
}

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
