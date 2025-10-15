export default defineNuxtRouteMiddleware(async (_to) => {
  try {
    const config = useRuntimeConfig()
    const apiBase = import.meta.server ? config.apiBase : config.public.apiBase

    // Shared user state to avoid duplicate fetches across pages
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
  } catch (error) {
    console.log('Auth middleware failed:', error && error.message ? error.message : error)
    return navigateTo('/login')
  }
})