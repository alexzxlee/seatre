export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware on server-side during build
  if (process.server && process.env.NODE_ENV === 'production') return
  
  try {
    const apiBase = useRuntimeConfig().public.apiBase
    
    // First verify user is authenticated and get their role from server
    const user = await $fetch('/auth/me', {
      baseURL: apiBase,
      credentials: 'include',
      headers: useRequestHeaders(['cookie'])
    })
    
    if (!user || !user.id) {
      throw new Error('Not authenticated')
    }
    
    // Check if user has admin role (server-verified, not cookie)
    if (user.role !== 'admin') {
      throw new Error('Insufficient permissions')
    }
    
  } catch (error) {
    console.log('Admin auth failed:', error.message)
    // Redirect non-admin users to dashboard or home
    return navigateTo('/dashboard')
  }
})