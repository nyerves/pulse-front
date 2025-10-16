import type { RouteRecordRaw } from 'vue-router'
import { AppLayout } from '@common/components'
import * as Pages from '@/pages'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Pages.LoginPage,
  },
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { requireAuth: true },
        component: Pages.DashboardPage,
      },
      {
        path: '/admin',
        children: [
          {
            path: 'users',
            name: 'admin-users',
            meta: { requireAuth: true },
            component: Pages.UsersPage,
          },
          {
            path: 'roles',
            name: 'admin-roles',
            meta: { requireAuth: true },
            component: Pages.RolesPage,
          },
        ],
      },
      {
        path: '/reports',
        children: [
          {
            path: 'daily',
            name: 'reports-daily',
            meta: { requireAuth: true },
            component: Pages.DailyReportPage,
          },
        ],
      },
    ],
  },
]

export default routes
