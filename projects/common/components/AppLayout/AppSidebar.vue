<script setup lang="ts">
import { ref } from "vue";
import type { AppMenuList } from "@common/models";
import { useLayout } from "@common/composables";
import LogoGreen from "@common/assets/png/logo_verde.png";
import LogoWhite from "@common/assets/svg/pulse-logo.svg";
import AppMenuItemFinal from "./AppMenuItemFinal.vue";

const { isDarkTheme } = useLayout();

const isCollapsed = ref(false);
const appMenuList = ref<AppMenuList[]>([
  {
    label: "Dashboard",
    icon: "pi-objects-column",
    items: [
      {
        label: "Nivel 1: Estratégico",
        to: "/dashboard",
      },
      {
        label: "Nivel 2: Táctico",
        to: "/dashboard-tactic",
      },
    ],
  },
  {
    label: "Reportes",
    icon: "pi-chart-bar",
    items: [
      {
        label: "Cumplimiento",
        to: "/uikit/formlayout",
      },
      {
        label: "Incidencias",
        to: "/uikit/input",
      },
      {
        label: "Diario",
        to: "/reports/daily",
      },
      {
        label: "Semanal",
        to: "/uikit/tree",
      },
      {
        label: "Centro de Recursos",
        to: "/uikit/tree",
      },
    ],
  },
  {
    label: "Gestión de Rezago",
    icon: "pi-clipboard",
    items: [
      {
        label: "Rezago",
        to: "/uikit/rezago",
      },
    ],
  },
  {
    label: "Administración",
    icon: "pi-cog",
    items: [
      {
        label: "Usuarios",
        to: "/admin/users",
      },
      {
        label: "Roles",
        to: "/admin/roles",
      },
      {
        label: "Permisos",
        to: "/admin/permissions",
      },
    ],
  },
]);
</script>

<template>
  <div
    class="layout-sidebar"
    :class="{ 'layout-sidebar-collapsed': !isCollapsed }"
  >
    <div class="layout-logo">
      <img :src="!isDarkTheme ? LogoWhite : LogoGreen" alt="Logo" />
    </div>

    <ul class="layout-menu">
      <template v-for="item in appMenuList" :key="item">
        <AppMenuItemFinal :item="item" :is-collapsed="!isCollapsed" />
      </template>
    </ul>

    <div class="layout-sidebar-footer">
      <Button
        :icon="
          isCollapsed ? 'pi pi-angle-double-left' : 'pi pi-angle-double-right'
        "
        class="p-button-text p-button-plain"
        size="large"
        style="width: 100%"
        @click="isCollapsed = !isCollapsed"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--surface-d);

  img {
    height: 4.3rem;
  }
}

.layout-sidebar-footer {
  margin-top: auto;
  padding: 0.8rem 1rem;
  border-top: 1px solid var(--surface-d);
  text-align: center;
}

.layout-sidebar-collapsed {
  width: 5rem !important;

  .layout-logo img {
    height: 2.5rem;
  }
}
</style>
