<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col h-full w-full px-14 pt-10">
    <div class="flex items-center justify-between mb-8 gap-3">
      <div class="mr-auto max-w-[65%]">
        <h3 class="font-bold">{{ title }}</h3>

        <template v-if="description">
          <p class="text-secondary text-sm">{{ description }}</p>
        </template>
      </div>

      <slot name="actions"></slot>
    </div>

    <div>
      <slot></slot>
    </div>
  </div>
</template>
