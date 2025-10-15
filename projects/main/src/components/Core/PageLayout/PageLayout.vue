<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex items-center justify-between mb-8 gap-2">
      <div class="mr-auto max-w-[65%]">
        <h2 class="font-bold !mb-1">{{ title }}</h2>

        <template v-if="description">
          <p class="opacity-60">{{ description }}</p>
        </template>
      </div>

      <slot name="actions"></slot>
    </div>

    <div>
      <slot></slot>
    </div>
  </div>
</template>
