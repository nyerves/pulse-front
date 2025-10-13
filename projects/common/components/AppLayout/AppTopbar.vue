<script setup lang="ts">
import { computed, ref } from "vue";
import { useLayout } from "@common/composables";
import { AuthService } from "@common/services";

const { toggleDarkMode, isDarkTheme } = useLayout();

const user = AuthService.GetUserAuth();
const menu = ref();
const items = ref([
  {
    label: "",
    items: [
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
        command: () => AuthService.Logout(),
      },
    ],
  },
]);

const avatarName = computed(() => {
  if (user?.data?.name) {
    return user.data.name
      .split(" ")
      .map((n) => n[0])
      .join("");
  }

  return "U";
});
const toggle = (event: MouseEvent) => menu.value.toggle(event);
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container"></div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button
          v-if="false"
          type="button"
          class="layout-topbar-action"
          @click="toggleDarkMode"
        >
          <i :class="['pi', isDarkTheme ? 'pi-sun' : 'pi-moon']" />
        </button>

        <Button
          icon="pi pi-bell"
          severity="secondary"
          variant="text"
          rounded
          aria-label="Notification"
        />

        <div
          class="flex gap-3 menu-button"
          aria-controls="overlay_menu"
          @click="toggle"
        >
          <Avatar
            :label="avatarName"
            shape="circle"
            size="normal"
            class="avatar-style"
          />
          <Menu ref="menu" id="overlay_menu" :model="items" popup />

          <div class="flex flex-col ml-2">
            <span class="font-semibold text-sm">{{ user?.data?.name }}</span>
            <span class="text-xs opacity-20">{{ user?.data?.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-button {
  cursor: pointer;
  padding: 0.5rem 0.8rem;
  display: flex;
  align-items: center;

  &:hover {
    border-radius: var(--content-border-radius);
    background-color: var(--surface-hover);
  }
}

.avatar-style {
  background-color: #dee9fc !important;
  color: #1a2551;
  font-weight: bold;
  padding: 1.2rem;
  font-size: 0.8rem;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}
</style>
