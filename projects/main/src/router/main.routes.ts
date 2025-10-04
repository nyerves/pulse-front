import type { RouteRecordRaw } from 'vue-router'
import * as Pages from '@/pages'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Pages.LoginPage,
  },
]
