<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLayout } from "@common/composables";
import { AuthService } from "@common/services";
import LogoBlack from "@common/assets/svg/pulse-logo-black.svg";
import LogoWhite from "@common/assets/svg/pulse-logo.svg";

const router = useRouter();
const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();

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
        <img
          :src="!isDarkTheme ? LogoWhite : LogoBlack"
          alt="Logo"
          class="w-10"
        />
      </div>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button
          type="button"
          class="layout-topbar-action"
          @click="toggleDarkMode"
        >
          <i :class="['pi', isDarkTheme ? 'pi-sun' : 'pi-moon']" />
        </button>

        <div
          class="flex gap-3 hover:bg-gradient-to-bl p-1"
          aria-controls="overlay_menu"
          @click="toggle"
        >
          <Button rounded icon="pi pi-user" />
          <Menu ref="menu" id="overlay_menu" :model="items" popup />

          <div v-if="false" class="flex flex-col ml-2">
            <span class="font-bold">{{ user?.data?.name }}</span>
            <span class="text-sm">{{ user?.data?.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
