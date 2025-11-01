
import { useCurrentUser } from '../composables/useCurrentUser'
import { logToFile } from '~/utils/logToFile'

// Test: logToFile and console.log on every middleware run (SSR or client)
console.log('Test log from middleware: middleware executed')
logToFile('Test log from middleware: middleware executed')

export default defineNuxtRouteMiddleware(async (_to) => {
  // Helper to mask sensitive tokens in cookies
  function maskToken(token) {
    if (!token || token.length < 10) return '***';
    return token.slice(0, 4) + '***' + token.slice(-4);
  }

  // Debug: log cookies on SSR to file (mask sensitive values)
  if (import.meta.server) {
    const event = useRequestEvent()
    const cookies = event?.node?.req?.headers?.cookie || ''
    // Mask auth_token in cookies for logging
    const maskedCookies = cookies.replace(/(auth_token=)([^;]+)/, (m, p1, p2) => p1 + maskToken(p2));
    console.log('SSR cookies:', maskedCookies)
    logToFile(`SSR cookies: ${maskedCookies}`)
  }
  const { user, fetchUser, error } = useCurrentUser()
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value || !('id' in user.value)) {
    const errMsg = error.value || 'Not authenticated'
    console.log('Auth middleware failed:', errMsg)
    logToFile(`Auth middleware failed: ${errMsg}`)
    return navigateTo('/login')
  }
})