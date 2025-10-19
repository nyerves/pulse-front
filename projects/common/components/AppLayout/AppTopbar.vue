<script setup lang="ts">
import { ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import Menu from "primevue/menu";
import { useLayout } from "@common/composables";
import { AuthService } from "@common/services";

const { toggleDarkMode, isDarkTheme } = useLayout();
const user = AuthService.GetUserAuth()?.data;

const menu = ref<InstanceType<typeof Menu>>();
const isActiveMenu = ref(false);
const items = ref<MenuItem[]>([
  {
    label: "Perfil",
    icon: "pi pi-user",
  },
  {
    label: "Configuraciones",
    icon: "pi pi-cog",
  },
]);

const toggle = (event: MouseEvent) => menu.value?.toggle(event);
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container"></div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <Button
          rounded
          variant="text"
          severity="secondary"
          aria-label="theme"
          size="large"
          :icon="`pi ${isDarkTheme ? 'pi-sun' : 'pi-moon'}`"
          @click="toggleDarkMode"
        />

        <OverlayBadge value="2" size="small">
          <Button
            rounded
            size="large"
            variant="text"
            icon="pi pi-bell"
            severity="secondary"
            aria-label="Notification"
          >
          </Button>
        </OverlayBadge>

        <div
          class="flex gap-4 menu-button"
          aria-controls="overlay_menu"
          @click="toggle"
        >
          <Avatar
            image="https://i.pravatar.cc/150?img=68"
            shape="circle"
            class="avatar-style"
            size="normal"
          />

          <div class="flex flex-col">
            <span class="font-semibold !mb-0">{{ user?.name }}</span>
            <span class="text-sm text-secondary">Nivel Estratégico</span>
          </div>

          <span
            class="pi"
            style="font-size: 0.7rem; opacity: 70%"
            :class="isActiveMenu ? 'pi-chevron-up' : 'pi-chevron-down'"
          />

          <Menu
            popup
            ref="menu"
            id="overlay_menu"
            pt:root:style="width: 17rem;"
            :model="items"
            @show="isActiveMenu = true"
            @hide="isActiveMenu = false"
          >
            <template #start>
              <div class="user-info border-b border-solid border-gray-300">
                <p class="text-sm font-semibold !mb-0">{{ user?.name }}</p>
                <p class="text-xs text-secondary">
                  {{ user?.email }}
                </p>
              </div>
            </template>

            <template #end>
              <div
                class="border-t border-gray-200 btn-close-session"
                @click="AuthService.Logout()"
              >
                <i class="pi pi-sign-out" />
                Cerrar sesión
              </div>
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
  padding: 0.8rem 1rem;
  background-color: var(--surface-ground);
}

.btn-close-session {
  padding: 0.6rem 0.9rem;
  font-size: 0.9rem;
  color: rgba(220, 38, 38);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: oklch(97.1% 0.013 17.38);
  }
}
</style>
