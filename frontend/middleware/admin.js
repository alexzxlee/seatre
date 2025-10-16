/**
 * Nuxt 4 admin middleware
 * Uses useCurrentUser composable for SSR/client user state and role check.
 * Redirects non-admins to /dashboard. Centralizes user fetch logic for maintainability.
 */
import { useCurrentUser } from '../composables/useCurrentUser'

export default defineNuxtRouteMiddleware(async (_to) => {
  const { user, fetchUser, error } = useCurrentUser()
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value || !('id' in user.value)) {
    console.log('Admin auth failed:', error.value || 'Not authenticated')
    return navigateTo('/login')
  }
  if (user.value.role !== 'admin') {
    console.log('Admin auth failed: Insufficient permissions')
    return navigateTo('/dashboard')
  }
})