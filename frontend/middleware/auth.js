import { useCurrentUser } from '../composables/useCurrentUser'

export default defineNuxtRouteMiddleware(async (_to) => {
  const { user, fetchUser, error } = useCurrentUser()
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value || !('id' in user.value)) {
    console.log('Auth middleware failed:', error.value || 'Not authenticated')
    return navigateTo('/login')
  }
})