<script setup lang="ts">
defineEmits(["close", "confirm"]);

const props = defineProps<{
  name?: string;
  loading?: boolean;
}>();
</script>

<template>
  <Dialog
    visible
    modal
    header="Confirmación"
    @hide="$emit('close')"
    @update:visible="$emit('close')"
  >
    <div class="dialog-body">
      <span class="pi pi-info-circle" style="font-size: 2.3rem" />
      <span>
        ¿Está seguro que desea eliminar {{ props.name ?? "este elemento" }}?
      </span>
    </div>

    <div class="dialog-footer">
      <Button
        type="button"
        label="Cancelar"
        severity="secondary"
        @click="$emit('close')"
      />

      <Button
        type="button"
        label="Confirmar"
        severity="danger"
        :loading="props.loading"
        @click="$emit('confirm')"
      />
    </div>
  </Dialog>
</template>

<style scoped>
.dialog-body {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.3rem;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
}
</style>
