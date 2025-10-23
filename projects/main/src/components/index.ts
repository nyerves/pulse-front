import { defineAsyncComponent } from 'vue'
import LoginFormCard from './Login/LoginFormCard.vue'
import LogoAnimated from './Login/LogoAnimated.vue'

const RegisterFormCard = defineAsyncComponent(() => import('./Login/RegisterFormCard.vue'))
const RolesFormModal = defineAsyncComponent(() => import('./Roles/RolesFormModal.vue'))
const RoleCard = defineAsyncComponent(() => import('./Roles/RoleCard.vue'))
const UserFormModal = defineAsyncComponent(() => import('./Users/UserFormModal.vue'))
const PageLayout = defineAsyncComponent(() => import('./PageLayout/PageLayout.vue'))
const FigmaDashboard = defineAsyncComponent(() => import('./UserDashboard/FigmaDashboard.vue'))
const StrategicDashboard = defineAsyncComponent(
  () => import('./UserDashboard/StrategicDashboard.vue'),
)
const LoadReportCard = defineAsyncComponent(() => import('./LoadReportCard/LoadReportCard.vue'))
const InformativeCard = defineAsyncComponent(() => import('./InformativeCard/InformativeCard.vue'))

export {
  LoginFormCard,
  InformativeCard,
  LogoAnimated,
  RegisterFormCard,
  RolesFormModal,
  RoleCard,
  FigmaDashboard,
  StrategicDashboard,
  UserFormModal,
  PageLayout,
  LoadReportCard,
}
