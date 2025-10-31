/**
 * Nuxt 4 admin middleware
 * Uses useCurrentUser composable for SSR/client user state and role check.
 * Redirects non-admins to /dashboard. Centralizes user fetch logic for maintainability.
 */

import { useCurrentUser } from '../composables/useCurrentUser'

import { logToFile } from '../utils/logToFile.js'

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