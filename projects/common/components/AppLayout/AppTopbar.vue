<script setup lang="ts">
import { computed, ref } from "vue";
import { useLayout } from "@common/composables";
import { AuthService } from "@common/services";

const { toggleDarkMode, isDarkTheme } = useLayout();

const user = AuthService.GetUserAuth();
const menu = ref();
const items = ref([
  {
    label: "Options",
    items: [
      {
        label: "Profile",
        icon: "pi pi-user",
      },
      {
        label: "Settings",
        icon: "pi pi-cog",
      },
      {
        label: "Logout",
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
      .map((n: string) => n[0])
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
        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
          <i :class="['pi', isDarkTheme ? 'pi-sun' : 'pi-moon']" />
        </button>

        <div class="flex gap-3 menu-button" aria-controls="overlay_menu" @click="toggle">
          <Avatar :label="avatarName" shape="circle" size="normal" />
          <Menu ref="menu" id="overlay_menu" :model="items" popup />

          <div class="flex flex-col ml-2">
            <span class="font-bold">{{ user?.data?.name }}</span>
            <span class="text-sm">{{ user?.data?.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-button {
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    border-radius: 0.25rem;
    background-color: var(--surface-hover);
  }
}
</style>
