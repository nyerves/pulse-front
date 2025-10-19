<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";

const route = useRoute();
const props = defineProps<{ isCollapsed: boolean; item: MenuItem }>();

const collapsedSubMenu = ref(false);

const isGroupActive = computed(() => {
  return getIsGroupActive();
});

const clickMenu = () => {
  collapsedSubMenu.value = !collapsedSubMenu.value;
};
const getIsGroupActive = () => {
  return (props.item.items ?? []).some((item) => isRouteActive(item.to));
};
const isRouteActive = (path: string) => {
  return route.path.startsWith(path);
};

onMounted(() => {
  collapsedSubMenu.value = getIsGroupActive();
});
</script>

<template>
  <li style="margin-bottom: 0.7rem">
    <div
      class="item-route main-item-route"
      :class="{ 'active-route': isGroupActive }"
      :style="{ justifyContent: isCollapsed ? 'center' : 'flex-start' }"
      @click="clickMenu"
    >
      <i class="pi" :class="item.icon" />
      <span v-if="!isCollapsed">{{ item.label }}</span>
    </div>

    <Transition name="layout-submenu">
      <div
        v-if="collapsedSubMenu && item.items && !isCollapsed"
        class="subitem-container"
      >
        <template v-for="subItem in item.items" :key="index">
          <RouterLink :to="subItem.to">
            <div
              class="item-route subitem-route"
              :class="{ 'sub-active-route': isRouteActive(subItem.to) }"
            >
              {{ subItem.label }}
            </div>
          </RouterLink>
        </template>
      </div>
    </Transition>
  </li>
</template>

<style lang="scss" scoped>
.item-route {
  padding: 0.6rem 1rem;
  border-radius: var(--p-content-border-radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.9rem;

  &:not(.active-route):hover {
    background-color: var(--surface-hover);
  }
}

.active-route {
  background-color: var(--menu-active-bg);
  color: var(--primary-color);
}

.main-item-route {
  > i {
    font-size: 1.2rem;
  }

  > span {
    font-weight: 600;
    font-size: 1rem;
  }
}

.subitem-container {
  margin-top: 0.3rem;
  margin-left: 1.4rem;
  border-left: 2px solid var(--surface-border);

  .subitem-route {
    font-size: 0.9rem;
    margin-left: 1.3rem;
    margin-bottom: 0.1rem;

    &:not(.sub-active-route) {
      color: var(--text-color-secondary);
    }
  }

  .sub-active-route {
    font-weight: 600;
    background-color: var(--surface-hover);
  }
}
</style>
