import { computed, onMounted, reactive } from "vue";
import { StorageKeys } from "@common/utils/StorageKeys";

const layoutConfig = reactive({
  preset: "Aura",
  primary: "emerald",
  surface: null as string | null,
  menuMode: "static" as "static" | "overlay" | "slim",
  darkTheme: isDarkTheme(),
});

const layoutState = reactive({
  staticMenuDesktopInactive: false,
  isExpanded: true,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: null as string | null,
});

export function useLayout() {
  const setActiveMenuItem = (item: any) => {
    layoutState.activeMenuItem = item?.value || item;
  };

  const toggleDarkMode = () => {
    if (!document.startViewTransition) {
      executeDarkModeToggle();

      return;
    }

    document.startViewTransition(() => executeDarkModeToggle());
  };

  const executeDarkModeToggle = () => {
    layoutConfig.darkTheme = !layoutConfig.darkTheme;
    updateTheme(layoutConfig.darkTheme);

    document.documentElement.classList.toggle("app-dark");
  };

  const toggleMenu = () => {
    layoutState.isExpanded = !layoutState.isExpanded;

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive =
        !layoutState.staticMenuDesktopInactive;
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
    }
  };

  const isSidebarActive = computed(() => {
    return layoutState.isExpanded || layoutState.staticMenuMobileActive;
  });

  const isDarkTheme = computed(() => layoutConfig.darkTheme);

  onMounted(() => {
    if (layoutConfig.darkTheme) {
      document.documentElement.classList.toggle("app-dark");
    }
  });

  return {
    layoutConfig,
    layoutState,
    toggleMenu,
    isSidebarActive,
    isDarkTheme,
    setActiveMenuItem,
    toggleDarkMode,
  };
}

function isDarkTheme() {
  return localStorage.getItem(StorageKeys.IS_DARK_MODE) === "true";
}
function updateTheme(value: boolean) {
  localStorage.setItem(StorageKeys.IS_DARK_MODE, String(value));
}
