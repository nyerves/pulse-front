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
    pt:root:class="!border-0"
    pt:mask:class="backdrop-blur-sm"
    @hide="$emit('close')"
    @update:visible="$emit('close')"
  >
    <div class="modal-container">
      <slot></slot>
    </div>

    <div class="dialog-footer">
      <slot name="footer">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="$emit('close')"
        />
        <Button
          type="button"
          label="Save"
          :loading="props.loading"
          :disabled="props.saveDisabled"
          @click="$emit('save')"
        />
      </slot>
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
  padding-top: 0.9rem;
}

.modal-container {
  padding: 1rem 0;
  max-height: 70dvh;
  overflow-y: auto;
}
</style>
