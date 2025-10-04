import { createRouter, createWebHistory } from 'vue-router'
import routes from './admin.routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PREFIX),
  routes,
})

export default router
