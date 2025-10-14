<script setup lang="ts">
import { ref } from "vue";
import { useLayout } from "@common/composables";
import { AuthService } from "@common/services";

const { toggleDarkMode, isDarkTheme } = useLayout();
const user = AuthService.GetUserAuth()?.data;

const menu = ref();
const isActiveMenu = ref(false);
const items = ref([
  {
    label: "Perfil",
    icon: "pi pi-user",
  },
  {
    label: "Configuraciones",
    icon: "pi pi-cog",
  },
  {
    label: "Cerrar sesión",
    icon: "pi pi-sign-out",
    class: "!text-red-600 bg-red-50 hover:!bg-red-100",
    command: () => AuthService.Logout(),
  },
]);

const toggle = (event: MouseEvent) => menu.value.toggle(event);
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container"></div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button v-if="false" type="button" class="layout-topbar-action" @click="toggleDarkMode">
          <i :class="['pi', isDarkTheme ? 'pi-sun' : 'pi-moon']" />
        </button>

        <Button
          icon="pi pi-bell"
          severity="secondary"
          variant="text"
          rounded
          aria-label="Notification"
        />

        <div class="flex gap-4 menu-button" aria-controls="overlay_menu" @click="toggle">
          <Avatar
            image="https://i.pravatar.cc/150?img=68"
            shape="circle"
            class="avatar-style"
            size="large"
          />

          <div class="flex flex-col">
            <h6 class="font-bold !mb-0">{{ user?.name }}</h6>
            <p class="text-xs opacity-20">{{ user?.email }}</p>
          </div>

          <span
            class="pi"
            style="font-size: 0.8rem"
            :class="isActiveMenu ? 'pi-chevron-up' : 'pi-chevron-down'"
          />

          <Menu
            popup
            ref="menu"
            id="overlay_menu"
            :model="items"
            @show="isActiveMenu = true"
            @hide="isActiveMenu = false"
          >
            <template #start>
              <div class="user-info border-b border-solid border-gray-300">
                <h6 class="font-bold !mb-1">{{ user?.name }}</h6>
                <p class="text-xs opacity-20">{{ user?.email }}</p>
              </div>
            </template>

            <template #item="{ item, props }">
              <a v-ripple class="flex items-center py-2" v-bind="props.action">
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
              </a>
            </template>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-button {
  cursor: pointer;
  padding: 0.7rem 0.8rem;
  display: flex;
  align-items: center;

  &:hover {
    border-radius: var(--content-border-radius);
    background-color: var(--surface-hover);
  }
}

.avatar-style {
  border: 2px solid var(--primary-color);
}

.user-info {
  padding: 0.8rem 1.5rem;
  background-color: var(--surface-ground);
}
</style>
