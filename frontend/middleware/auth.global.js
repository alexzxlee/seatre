export default defineNuxtRouteMiddleware(async (to) => {
  // Protect specific paths or use to.meta.requiresAuth
  if (to.path.startsWith('/dashboard')) {
    try {
      const apiFetch = useApiFetch()
      await apiFetch('/auth/me')
    } catch {
      return navigateTo('/login')
    }
  }
})
