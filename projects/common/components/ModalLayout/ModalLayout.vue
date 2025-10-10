<script setup lang="ts">
defineEmits(["close", "save"]);
const props = defineProps<{
  title?: string;
  width?: string;
  loading?: boolean;
  saveDisabled?: boolean;
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

    <div class="dialog-footer">
      <Button type="button" label="Cancel" severity="secondary" @click="$emit('close')" />
      <Button
        type="button"
        label="Save"
        @click="$emit('save')"
        :loading="props.loading"
        :disabled="props.saveDisabled"
      />
    </div>
  </Dialog>
</template>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
  border-top: 1px solid #eee;
  padding-top: 0.5rem;
}
</style>
