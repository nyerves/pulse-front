<script setup lang="ts">
import { ModalLayout } from '@common/components'

defineEmits(['close', 'save'])
</script>

<template>
  <ModalLayout title="Crear Nuevo Rol" @close="$emit('close')" @save="$emit('save')">
    <form class="flex flex-col">
      <InputText label="Nombre del Rol" placeholder="Ingrese el nombre del rol" />

      <div class="flex flex-wrap py-8 gap-4">
        <div class="flex items-center gap-2">
          <Checkbox inputId="ingredient4" name="pizza" value="Onion" />
          <label for="ingredient4"> Ver </label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox inputId="ingredient1" name="pizza" value="Cheese" />
          <label for="ingredient1"> Crear </label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox inputId="ingredient2" name="pizza" value="Mushroom" />
          <label for="ingredient2"> Editar </label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox inputId="ingredient3" name="pizza" value="Pepper" />
          <label for="ingredient3"> Eliminar </label>
        </div>
      </div>
    </form>
  </ModalLayout>
</template>
