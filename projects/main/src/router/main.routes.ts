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
    path: '/',
    component: AppLayout,
    redirect: { name: 'dashboard' },
    meta: { requireAuth: true },
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
            path: 'compliance',
            name: 'reports-compliance',
            meta: { requireAuth: true },
            component: Pages.ComplianceReportPage,
          },
          {
            path: 'incidents',
            name: 'reports-incident',
            meta: { requireAuth: true },
            component: Pages.IncidentManagementPage,
          },
          {
            path: 'daily',
            name: 'reports-daily',
            meta: { requireAuth: true },
            component: Pages.DailyReportPage,
          },
          {
            path: 'weekly',
            name: 'reports-weekly',
            meta: { requireAuth: true },
            component: Pages.WeeklyReportPage,
          },
          {
            path: 'resource-center',
            name: 'reports-resource-center',
            meta: { requireAuth: true },
            component: Pages.ResourceCenterPage,
          },
        ],
      },
      {
        path: '/backlog-management',
        children: [
          {
            path: '',
            name: 'backlog-management',
            meta: { requireAuth: true },
            component: Pages.BacklogPage,
          },
        ],
      },
    ],
  },
]

export default routes
