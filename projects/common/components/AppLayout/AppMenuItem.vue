<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useLayout } from "@common/composables";
import type { AppMenuItem } from "@common/models";

const route = useRoute();
const { layoutState, setActiveMenuItem, toggleMenu, isSidebarActive } =
  useLayout();

const props = defineProps({
  item: {
    type: Object as () => AppMenuItem,
    default: () => ({}),
  },
  index: {
    type: Number,
    default: 0,
  },
  root: {
    type: Boolean,
    default: true,
  },
  parentItemKey: {
    type: String as () => string | null,
    default: null,
  },
});

const isActiveMenu = ref(false);
const itemKey = ref<string | null>(null);

watch(
  () => layoutState.activeMenuItem,
  (newVal) => {
    const key = itemKey.value;
    isActiveMenu.value = Boolean(
      newVal === key || newVal?.startsWith(key + "-")
    );
  }
);

function itemClick(event: MouseEvent, item: AppMenuItem) {
  if (item.disabled) {
    event.preventDefault();
    return;
  }

  if (
    (item.to || item.url) &&
    (layoutState.staticMenuMobileActive || layoutState.overlayMenuActive)
  ) {
    // toggleMenu();
  }

  if (item.command) {
    item.command({ originalEvent: event, item: item });
  }

  const foundItemKey = item.items
    ? isActiveMenu.value
      ? props.parentItemKey
      : itemKey
    : itemKey.value;

  setActiveMenuItem(foundItemKey);
}
function checkActiveRoute(_path: string) {
  return route.path === _path;
}

onBeforeMount(() => {
  itemKey.value = props.parentItemKey
    ? props.parentItemKey + "-" + props.index
    : String(props.index);

  const activeItem = layoutState.activeMenuItem;

  isActiveMenu.value =
    activeItem === itemKey.value || activeItem
      ? activeItem?.startsWith(itemKey.value + "-")
      : false;
});
</script>

<template>
  <li
    style="margin-bottom: 0.3rem"
    :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }"
  >
    <a
      v-if="(!item.to || item.items) && item.visible !== false"
      :href="item.url"
      @click="itemClick($event, item)"
      :class="item.class"
      :target="item.target"
      tabindex="0"
    >
      <i :class="item.icon" class="layout-menuitem-icon"></i>
      <span class="layout-menuitem-text">{{ item.label }}</span>
      <i
        class="pi pi-fw pi-angle-down layout-submenu-toggler"
        v-if="item.items"
      ></i>
    </a>

    <RouterLink
      v-if="item.to && !item.items && item.visible !== false"
      tabindex="0"
      :to="item.to"
      :class="[item.class, { 'active-route': checkActiveRoute(item.to) }]"
      @click="itemClick($event, item)"
    >
      <i :class="item.icon" class="layout-menuitem-icon"></i>

      <span v-if="isSidebarActive" class="layout-menuitem-text">{{
        item.label
      }}</span>

      <i
        class="pi pi-fw pi-angle-down layout-submenu-toggler"
        v-if="item.items"
      />
    </RouterLink>

    <Transition
      v-if="item.items && item.visible !== false"
      name="layout-submenu"
    >
      <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
        <AppMenuItem
          v-for="(child, i) in item.items"
          :key="i"
          :index="i"
          :item="child"
          :parentItemKey="itemKey"
          :root="false"
        />
      </ul>
    </Transition>
  </li>
</template>
