import type { RouteRecordRaw } from 'vue-router'
import * as Pages from '@/pages'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: Pages.HomePage,
  },
]

export default routes
