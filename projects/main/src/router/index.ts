import { createRouter, createWebHistory } from 'vue-router'
import routes from './main.routes'
import adminRoutes from 'admin/route'

console.log(adminRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PREFIX),
  routes: [...routes, ...adminRoutes],
})

export default router
