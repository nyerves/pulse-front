import type { RouteRecordRaw } from 'vue-router'
import * as Pages from '@/pages'

export const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: Pages.HomePage,
  },
]
