<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div>
    <div
      class="card shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200 rounded-md cursor-pointer overflow-hidden"
    >
      <div class="flex gap-2 items-center mb-4">
        <h5 class="!mr-auto !mb-0 text-xs !font-semibold pt-5">
          {{ title }}
        </h5>

        <div class="absolute top-3 -right-1 flex items-center gap-2 font-mono">
          <span class="pi pi-exclamation-circle opacity-65" />

          <div
            class="bg-secondary-theme border border-gray-200 py-1 px-2 text-xs rounded text-secondary"
          >
            CAP-01
          </div>
        </div>
      </div>

      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
