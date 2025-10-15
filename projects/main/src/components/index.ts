import { defineAsyncComponent } from 'vue'
import LoginFormCard from './Login/LoginFormCard.vue'
import LogoAnimated from './Login/LogoAnimated.vue'

const RegisterFormCard = defineAsyncComponent(() => import('./Login/RegisterFormCard.vue'))
const RolesFormModal = defineAsyncComponent(() => import('./Roles/RolesFormModal.vue'))
const RoleCard = defineAsyncComponent(() => import('./Roles/RoleCard.vue'))
const UserFormModal = defineAsyncComponent(() => import('./Users/UserFormModal.vue'))
const PageLayout = defineAsyncComponent(() => import('./Core/PageLayout/PageLayout.vue'))

export {
  LoginFormCard,
  LogoAnimated,
  RegisterFormCard,
  RolesFormModal,
  RoleCard,
  UserFormModal,
  PageLayout,
}
