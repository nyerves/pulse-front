<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useLayout } from "@common/composables";
import AppSidebar from "./AppSidebar.vue";
import AppTopbar from "./AppTopbar.vue";

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref<((event: MouseEvent) => void) | null>(null);

const containerClass = computed(() => {
  return {
    "layout-overlay": layoutConfig.menuMode === "overlay",
    "layout-static": layoutConfig.menuMode === "static",
    "layout-static-inactive":
      layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === "static",
    "layout-overlay-active": layoutState.overlayMenuActive,
    "layout-mobile-active": layoutState.staticMenuMobileActive,
  };
});

function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive = false;
        layoutState.staticMenuMobileActive = false;
        layoutState.menuHoverActive = false;
      }
    };
    document.addEventListener("click", outsideClickListener.value);
  }
}
function unbindOutsideClickListener() {
  if (outsideClickListener.value) {
    document.removeEventListener("click", outsideClickListener.value);
    outsideClickListener.value = null;
  }
}
function isOutsideClicked(event: MouseEvent) {
  const sidebarEl = document.querySelector(".layout-sidebar");
  const topBarEl = document.querySelector(".layout-menu-button");

  const target = event.target as Node;

  return !(
    sidebarEl?.isSameNode(target) ||
    sidebarEl?.contains(target) ||
    topBarEl?.isSameNode(target) ||
    topBarEl?.contains(target)
  );
}

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});
</script>

<template>
  <Toast />

  <div class="layout-wrapper" :class="containerClass">
    <AppTopbar></AppTopbar>

    <AppSidebar></AppSidebar>

    <div class="layout-main-container">
      <div class="layout-main">
        <slot></slot>
      </div>
    </div>

    <div class="layout-mask animate-fadein"></div>
  </div>
</template>
