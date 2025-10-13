<script setup lang="ts">
import { ref, watch } from "vue";
import { useLayout } from "@common/composables";
import AppSidebar from "./AppSidebar.vue";
import AppTopbar from "./AppTopbar.vue";

const { layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref<((event: MouseEvent) => void) | null>(null);

function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive = false;
        layoutState.staticMenuMobileActive = false;
        layoutState.menuHoverActive = false;
      }
    };
    // document.addEventListener("click", outsideClickListener.value);
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

  <div class="new-layout-container">
    <AppSidebar />

    <div class="layout-wrapper flex-1">
      <AppTopbar />

      <div class="layout-main-container">
        <div class="layout-main">
          <RouterView />
        </div>
      </div>

      <div class="layout-mask animate-fadein"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.new-layout-container {
  display: flex;
  position: relative;
  min-height: 100vh;
}

.layout-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
