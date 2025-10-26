import { useCurrentUser } from '../composables/useCurrentUser'

export default defineNuxtRouteMiddleware(async (_to) => {
  // Debug: log cookies on SSR
  if (import.meta.server) {
    const event = useRequestEvent()
    // Use event.node.req as recommended in Nuxt 3/4
    console.log('SSR cookies:', event?.node?.req?.headers?.cookie)
  }
  const { user, fetchUser, error } = useCurrentUser()
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value || !('id' in user.value)) {
    console.log('Auth middleware failed:', error.value || 'Not authenticated')
    return navigateTo('/login')
  }
})