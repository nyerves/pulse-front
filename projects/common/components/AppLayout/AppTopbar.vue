<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLayout } from "@common/composables";
import { AuthService } from "@common/services";
import LogoBlack from "@common/assets/svg/pulse-logo-black.svg";

const router = useRouter();
const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();

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
        command: () => {
          AuthService.Logout();
          router.push("/login");
        },
      },
    ],
  },
]);

const toggle = (event: MouseEvent) => menu.value.toggle(event);
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button
        class="layout-menu-button layout-topbar-action"
        @click="toggleMenu"
      >
        <i class="pi pi-bars"></i>
      </button>

      <div class="layout-topbar-logo">
        <img :src="LogoBlack" alt="Logo black" class="w-10" />
      </div>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button
          type="button"
          class="layout-topbar-action"
          @click="toggleDarkMode"
        >
          <i
            :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"
          />
        </button>

        <div>
          <Button
            rounded
            icon="pi pi-user"
            aria-controls="overlay_menu"
            @click="toggle"
          />

          <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>
      </div>
    </div>
  </div>
</template>
