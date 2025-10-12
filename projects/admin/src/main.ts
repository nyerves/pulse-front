import { CreateVueApp } from '@common/helpers'

import App from './App.vue'
import router from './router'

CreateVueApp({
  htmlId: '#app',
  component: App,
  router,
})
