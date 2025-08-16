export default defineNuxtRouteMiddleware(async (to) => {
  // Protect specific paths or use to.meta.requiresAuth
  if (to.path.startsWith('/dashboard')) {
    try {
      await $fetch('/api/auth/me', { credentials: 'include' })
    } catch {
      return navigateTo('/login')
    }
  }
})
