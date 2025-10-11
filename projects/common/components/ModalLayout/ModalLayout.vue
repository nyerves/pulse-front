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
    <div class="modal-container">
      <slot></slot>
    </div>

    <div class="dialog-footer">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="$emit('close')"
      />
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

.modal-container {
  padding: 1rem 0;
  max-height: 70dvh;
  overflow-y: auto;
}
</style>
