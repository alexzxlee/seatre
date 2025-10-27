
import { useCurrentUser } from '../composables/useCurrentUser'
import fs from 'fs'
import path from 'path'

function logToFile(message) {
  try {
    const logPath = path.resolve('/tmp/nuxt-debug.log')
    const timestamp = new Date().toISOString()
    fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`)
  } catch (e) {
    // Fails silently if cannot write
  }
}

// Test: log to file on every middleware run (SSR or client)
logToFile('Test log from middleware: middleware executed')

export default defineNuxtRouteMiddleware(async (_to) => {
  // Debug: log cookies on SSR to file
  if (import.meta.server) {
    const event = useRequestEvent()
    const cookies = event?.node?.req?.headers?.cookie || ''
    logToFile(`SSR cookies: ${cookies}`)
  }
  const { user, fetchUser, error } = useCurrentUser()
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value || !('id' in user.value)) {
    const errMsg = error.value || 'Not authenticated'
    logToFile(`Auth middleware failed: ${errMsg}`)
    return navigateTo('/login')
  }
})