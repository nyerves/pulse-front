import { ref, onMounted, onUnmounted, computed } from "vue";

export const useDimension = () => {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  const handleResize = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  const isScreenMobile = computed(() => {
    return width.value < 1100;
  });

  onMounted(() => window.addEventListener("resize", handleResize));
  onUnmounted(() => window.removeEventListener("resize", handleResize));

  return { width, height, isScreenMobile };
};
