<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div
    class="card !p-4 shadow hover:shadow-md hover:-translate-y-0.5 duration-200 rounded-md cursor-pointer"
  >
    <div class="flex gap-2 items-center mb-4">
      <p class="text-secondary !mr-auto !mb-0 text-xs font-semibold">
        {{ title }}
      </p>

      <span class="pi pi-exclamation-circle" />

      <div class="bg-secondary-theme py-1 px-2 text-xs rounded text-secondary">CAP-01</div>
    </div>

    <div>
      <slot></slot>
    </div>
  </div>
</template>
