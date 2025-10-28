
import { useCurrentUser } from '../composables/useCurrentUser'

import fs from 'fs'
import path from 'path'

/**
 * Server-side logging guidance:
 * - console.log in server-side middleware will NOT appear in the browser console and usually won’t show up in production logs on cPanel/Passenger.
 * - logToFile writes to a file you can check via SSH, making it reliable for production debugging.
 * - For production debugging on cPanel/Passenger, always prefer logToFile or another file-based logging method.
 * - You can keep console.log for local development, where it will show in your terminal.
 */

function logToFile(message) {
  try {
    const logPath = path.resolve('/tmp/nuxt-debug.log')
    const timestamp = new Date().toISOString()
    fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`)
  } catch (e) {
    // Fails silently if cannot write
  }
}

// Test: log to file and console on every middleware run (SSR or client)
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