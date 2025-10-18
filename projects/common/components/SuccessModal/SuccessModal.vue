<script setup lang="ts">
import { ModalLayout } from "@common/components";

defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <ModalLayout :show-header="false" class="p-3">
    <div class="flex flex-col items-center justify-center py-4 space-y-4">
      <div class="bg-green-100 text-green-600 rounded-full p-6 !mb-0">
        <i class="pi pi-check" style="font-size: 1.8rem" />
      </div>

      <h4>¡Reporte Confirmado!</h4>

      <p class="text-secondary">El reporte se ha cargado correctamente.</p>
    </div>

    <template #footer>
      <Button class="w-full font-semibold" @click="$emit('close')">
        Aceptar
      </Button>
    </template>
  </ModalLayout>
</template>
