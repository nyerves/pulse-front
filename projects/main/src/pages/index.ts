const LoginPage = () => import('./LoginPage.vue')
const DashboardPage = () => import('./DashboardPage.vue')

const RolesPage = () => import('./Admin/RolesPage.vue')
const UsersPage = () => import('./Admin/UsersPage.vue')

const ComplianceReportPage = () => import('./Reports/ComplianceReportPage.vue')
const IncidentManagementPage = () => import('./Reports/IncidentManagementPage.vue')
const DailyReportPage = () => import('./Reports/DailyReportPage.vue')
const WeeklyReportPage = () => import('./Reports/WeeklyReportPage.vue')
const ResourceCenterPage = () => import('./Reports/ResourceCenterPage.vue')

const BacklogPage = () => import('./BacklogManagement/BacklogPage.vue')

export {
  LoginPage,
  DashboardPage,
  RolesPage,
  UsersPage,
  DailyReportPage,
  IncidentManagementPage,
  WeeklyReportPage,
  ResourceCenterPage,
  BacklogPage,
  ComplianceReportPage,
}
