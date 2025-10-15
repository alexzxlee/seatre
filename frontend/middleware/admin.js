export default defineNuxtRouteMiddleware(async (_to) => {
  try {
    const config = useRuntimeConfig()
    const apiBase = import.meta.server ? config.apiBase : config.public.apiBase

    // Reuse user from shared state if available, otherwise fetch
    const userState = useState('user', () => null)
    if (!userState.value) {
      const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined
      const user = await $fetch('/auth/me', {
        baseURL: apiBase,
        credentials: 'include',
        headers
      })
      userState.value = user
    }

    if (!userState.value || !('id' in userState.value)) {
      throw new Error('Not authenticated')
    }

    // Check if user has admin role (server-verified)
    if (userState.value.role !== 'admin') {
      throw new Error('Insufficient permissions')
    }
  } catch (error) {
    console.log('Admin auth failed:', error && error.message ? error.message : error)
    // Redirect non-admin users to dashboard or home
    return navigateTo('/dashboard')
  }
})