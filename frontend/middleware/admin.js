/**
 * Nuxt 4 admin middleware
 * Uses useCurrentUser composable for SSR/client user state and role check.
 * Redirects non-admins to /dashboard. Centralizes user fetch logic for maintainability.
 */

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

export default defineNuxtRouteMiddleware(async (_to) => {
  const { user, fetchUser, error } = useCurrentUser()
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value || !('id' in user.value)) {
    const errMsg = error.value || 'Not authenticated'
    console.log('Admin auth failed:', errMsg)
    logToFile(`Admin auth failed: ${errMsg}`)
    return navigateTo('/login')
  }
  if (user.value.role !== 'admin') {
    const errMsg = 'Insufficient permissions'
    console.log('Admin auth failed:', errMsg)
    logToFile(`Admin auth failed: ${errMsg}`)
    return navigateTo('/dashboard')
  }
})