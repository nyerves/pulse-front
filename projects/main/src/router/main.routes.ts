import type { RouteRecordRaw } from 'vue-router'
import * as Pages from '@/pages'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Pages.LoginPage,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Pages.DashboardPage,
  },
]

export default routes
