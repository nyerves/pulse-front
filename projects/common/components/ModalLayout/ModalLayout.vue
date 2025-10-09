<script setup lang="ts">
defineEmits(["close", "save"]);
const props = defineProps<{
  title?: string;
  width?: string;
}>();
</script>

<template>
  <Dialog
    visible
    modal
    :header="props.title"
    :style="{ width: props.width || '40rem' }"
    @hide="$emit('close')"
    @update:visible="$emit('close')"
  >
    <div class="max-h-[60dvh] overflow-y-auto mb-4">
      <slot></slot>
    </div>

    <div class="flex gap-2" style="justify-content: flex-end">
      <Button type="button" label="Cancel" severity="secondary" @click="$emit('close')"></Button>
      <Button type="button" label="Save" @click="$emit('save')"></Button>
    </div>
  </Dialog>
</template>
