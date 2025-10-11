import { defineAsyncComponent } from 'vue'
import LoginFormCard from './Login/LoginFormCard.vue'
import LogoAnimated from './Login/LogoAnimated.vue'
import RegisterFormCard from './Login/RegisterFormCard.vue'

import RolesFormModal from './Roles/RolesFormModal.vue'
import RoleCard from './Roles/RoleCard.vue'
const UsersFormModal = defineAsyncComponent(() => import('./Users/UsersFormModal.vue'))

export { LoginFormCard, LogoAnimated, RegisterFormCard, RolesFormModal, RoleCard, UsersFormModal }
