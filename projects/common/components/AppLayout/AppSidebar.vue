<script setup lang="ts">
import { ref } from "vue";
import type { AppMenuList } from "@common/models";
import { useLayout } from "@common/composables";
import LogoBlack from "@common/assets/png/logo_verde.png";
import LogoWhite from "@common/assets/svg/pulse-logo.svg";
import AppMenuItem from "./AppMenuItem.vue";

const { isDarkTheme, toggleMenu, isSidebarActive } = useLayout();

const appMenuList = ref<AppMenuList[]>([
  {
    label: "Home",
    items: [
      {
        label: "Dashboard",
        icon: "pi pi-fw pi-objects-column",
        to: "/dashboard",
      },
    ],
  },
  {
    label: "Catálogos especiales",
    items: [
      {
        label: "CIE-I0",
        icon: "pi pi-fw pi-id-card",
        to: "/uikit/formlayout",
      },
      {
        label: "Procedimientos",
        icon: "pi pi-fw pi-check-square",
        to: "/uikit/input",
      },
      { label: "Medicamentos", icon: "pi pi-fw pi-table", to: "/uikit/table" },
      { label: "CAUSES", icon: "pi pi-fw pi-list", to: "/uikit/list" },
      {
        label: "Bienes Terapéuticos",
        icon: "pi pi-fw pi-share-alt",
        to: "/uikit/tree",
      },
      { label: "Patologías", icon: "pi pi-fw pi-tablet", to: "/uikit/panel" },
    ],
  },
  {
    label: "Administración",
    items: [
      {
        label: "Usuarios",
        icon: "pi pi-fw pi-user-edit",
        to: "/admin/users",
      },
      {
        label: "Roles",
        icon: "pi pi-fw pi-users",
        to: "/admin/roles",
      },
      {
        label: "Permisos",
        icon: "pi pi-fw pi-shield",
        to: "/admin/permissions",
      },
    ],
  },
]);
</script>

<template>
  <div
    class="layout-sidebar"
    :class="{ 'layout-sidebar-collapsed': !isSidebarActive }"
  >
    <div class="layout-logo">
      <img :src="!isDarkTheme ? LogoWhite : LogoBlack" alt="Logo" />
    </div>

    <ul class="layout-menu">
      <template v-for="(item, i) in appMenuList" :key="item">
        <AppMenuItem :item="item" :index="i" />
      </template>
    </ul>

    <div class="layout-sidebar-footer">
      <Button
        :icon="
          isSidebarActive
            ? 'pi pi-angle-double-left'
            : 'pi pi-angle-double-right'
        "
        class="p-button-text p-button-plain"
        size="large"
        style="width: 100%"
        @click="toggleMenu"
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

  .layout-menu {
    li {
      .layout-menuitem-text {
        display: none;
      }

      .layout-menuitem-root-text {
        display: none;
      }

      .layout-menuitem-icon {
        font-size: 1.5rem;
        margin-right: 0;
        text-align: center;
        width: 100%;
      }
    }
  }
}
</style>
