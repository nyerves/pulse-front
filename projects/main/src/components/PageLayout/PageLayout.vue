<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col h-full w-full p-9 sm:px-16 overflow-auto">
    <div class="flex items-center justify-between mb-8 gap-3">
      <div class="mr-auto max-w-[65%] overflow-auto">
        <h2 class="font-bold">{{ title }}</h2>

        <template v-if="description">
          <p class="text-secondary">{{ description }}</p>
        </template>
      </div>

      <slot name="actions"></slot>
    </div>

    <div>
      <slot></slot>
    </div>
  </div>
</template>
