export default defineNuxtRouteMiddleware(async (to) => {
  // Skip auth check during SSR to avoid hydration issues
  if (process.server) return
  
  try {
    const apiBase = useRuntimeConfig().public.apiBase
    
    // Check if user is authenticated
    const user = await $fetch('/auth/me', {
      baseURL: apiBase,
      credentials: 'include'
    })
    
    if (!user || !user.id) {
      throw new Error('Not authenticated')
    }
    
  } catch (error) {
    console.log('Auth middleware failed:', error.message)
    return navigateTo('/login')
  }
})