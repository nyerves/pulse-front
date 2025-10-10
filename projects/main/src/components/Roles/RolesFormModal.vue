<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ModalLayout } from '@common/components'
import type { Permission, PermissionAction, Role } from '@common/models'
import PermissionActionCard from './PermissionActionCard.vue'

defineEmits(['close', 'save'])
const props = defineProps<{
  roleSelected?: Role
  permissions: Permission[]
  actions: PermissionAction[]
}>()

const roleForm = ref<Role>({
  id: 0,
  name: '',
  permissions: [],
})

onMounted(() => {
  if (props.roleSelected) {
    roleForm.value = { ...props.roleSelected }
  }
})
</script>

<template>
  <ModalLayout title="Crear Nuevo Rol" @close="$emit('close')" @save="$emit('save')">
    <form class="flex flex-col">
      <InputText
        label="Nombre del Rol"
        placeholder="Ingrese el nombre del rol"
        v-model="roleForm.name"
      />

      <div class="mt-6">
        <h5 class="font-semibold mb-4">Permisos y acciones</h5>

        <div class="flex flex-col gap-4 max-h-[35dvh] overflow-y-auto px-3">
          <template v-for="permission in props.permissions" :key="permission.id">
            <PermissionActionCard :permission="permission" :actions="props.actions" />
          </template>
        </div>
      </div>
    </form>
  </ModalLayout>
</template>
