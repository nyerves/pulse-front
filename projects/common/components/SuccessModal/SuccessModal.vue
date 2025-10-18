<script setup lang="ts">
import { ModalLayout } from "@common/components";
</script>

<template>
  <ModalLayout>
    <div class="flex flex-col items-center justify-center py-4 space-y-4">
      <h3>¡Éxito!</h3>
      <p class="text-secondary">El archivo se ha cargado correctamente.</p>
    </div>

    <template #footer>
      <Button class="w-full">Aceptar</Button>
    </template>
  </ModalLayout>
</template>
