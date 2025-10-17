<script setup lang="ts">
import { ModalLayout } from "@common/components";
</script>

<template>
  <ModalLayout>
    <div>
      <p>Component</p>
    </div>

    <template #footer>
      <Button class="w-full">Ir ahora</Button>
    </template>
  </ModalLayout>
</template>
