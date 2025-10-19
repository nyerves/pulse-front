<script setup lang="ts">
import { ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { useLayout } from "@common/composables";
import LogoGreen from "@common/assets/png/logo_verde.png";
import LogoWhite from "@common/assets/svg/pulse-logo.svg";
import AppMenuItemFinal from "./AppMenuItemFinal.vue";

const { isDarkTheme, layoutState, toggleMenu } = useLayout();

const menu = ref();
const menuOpt = ref<MenuItem[]>([]);
const appMenuList = ref<MenuItem[]>([
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
    icon: "pi-file-excel",
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
        to: "/reports/resource-center",
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

const openMenu = (event: PointerEvent, list: MenuItem) => {
  if (!layoutState.isExpanded) {
    menuOpt.value = [list];
    menu.value?.toggle(event);
  }
};
</script>

<template>
  <aside class="layout-sidebar">
    <div class="layout-logo" :class="{ 'small-logo': !layoutState.isExpanded }">
      <img :src="!isDarkTheme ? LogoWhite : LogoGreen" alt="Logo" />
    </div>

    <ul class="layout-menu">
      <template v-for="item in appMenuList" :key="item">
        <AppMenuItemFinal
          :item="item"
          :is-expanded="layoutState.isExpanded"
          aria-controls="overlay_menu_sidebar"
          @click="openMenu($event, item)"
        />
      </template>
    </ul>

    <Menu popup ref="menu" id="overlay_menu_sidebar" :model="menuOpt">
      <template #item="{ item, props }">
        <RouterLink :to="item.to">
          <div v-ripple class="flex items-center" v-bind="props.action">
            <span class="ml-2 !text-sm text-secondary">{{ item.label }}</span>
          </div>
        </RouterLink>
      </template>
    </Menu>

    <div class="layout-sidebar-footer">
      <Button
        :icon="
          layoutState.isExpanded
            ? 'pi pi-angle-double-left'
            : 'pi pi-angle-double-right'
        "
        class="p-button-text p-button-plain"
        size="large"
        style="width: 100%"
        @click="toggleMenu"
      />
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.layout-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 0.5rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--surface-d);

  img {
    height: 5rem;
  }
}

.small-logo {
  img {
    height: 3rem;
  }
}

.layout-sidebar-footer {
  margin-top: auto;
  padding: 0.8rem 1rem;
  border-top: 1px solid var(--surface-d);
  text-align: center;
}
</style>
