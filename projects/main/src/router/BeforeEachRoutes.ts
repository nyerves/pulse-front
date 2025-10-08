import { AuthService } from '@common/services'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function BeforeEachRoutes(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  if (to.meta.requireAuth) {
    return handleAuthRedirect(to, next)
  }

  if (to.path === '/login' && AuthService.GetUserAuth()) {
    return next('/dashboard')
  }

  return next()
}

function handleAuthRedirect(to: RouteLocationNormalized, next: NavigationGuardNext) {
  const isAuth = AuthService.GetUserAuth() !== null
  return isAuth ? next() : next('/login')
}
