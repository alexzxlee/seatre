export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/admin')) {
    const role = useCookie('user_role')
    if (role.value !== 'admin') {
      return navigateTo('/')
    }
  }
})
