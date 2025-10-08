import { createRouter, createWebHistory } from 'vue-router'
import routes from './main.routes'
import { BeforeEachRoutes } from './BeforeEachRoutes'
// import adminRoutes from 'admin/route'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PREFIX),
  routes: [...routes],
})

router.beforeEach((to, from, next) => {
  if (!router.resolve(to.path).matched.length) {
    return next('/login')
  }

  BeforeEachRoutes(to, from, next)
})

export default router
