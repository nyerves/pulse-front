<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue'
import { ModalLayout } from '@common/components'
import { Functions } from '@common/helpers'
import type { Permission, PermissionAction, Role } from '@common/models'
import { RoleService } from '@common/services'
import PermissionActionCard from './PermissionActionCard.vue'

const emit = defineEmits(['close', 'saved'])
const props = defineProps<{
  roleSelected?: Role
  permissions: Permission[]
  actions: PermissionAction[]
}>()

const iSaving = ref(false)
const toast = useToast()
const roleForm = ref<Role>({
  id: 0,
  name: '',
  permissions: [],
})

async function onSubmit() {
  try {
    iSaving.value = true

    roleForm.value.permissions = roleForm.value.permissions.filter((x) => x.actionIds.length > 0)

    if (roleForm.value.id) {
      await RoleService.Put(roleForm.value)
    } else {
      await RoleService.Post(roleForm.value)
    }

    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `El rol ha sido ${roleForm.value.id ? 'actualizado' : 'creado'} exitosamente.`,
      life: 3000,
    })

    emit('saved')
    emit('close')
  } catch (error) {
    if (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ha ocurrido un error. Por favor, intente nuevamente.',
        life: 3000,
      })
    }
  } finally {
    iSaving.value = false
  }
}

onMounted(() => {
  if (props.roleSelected) {
    roleForm.value = Functions.GetCopy(props.roleSelected)
  }
})
</script>

<template>
  <ModalLayout
    :loading="iSaving"
    :saveDisabled="!roleForm.name"
    title="Crear Rol"
    @close="$emit('close')"
    @save="onSubmit"
  >
    <form class="flex flex-col">
      <FloatLabel variant="on">
        <InputText id="role-name" class="w-full" label="Nombre del Rol" v-model="roleForm.name" />

        <label for="role-name">Nombre del Rol</label>
      </FloatLabel>

      <div class="mt-6">
        <h6 class="font-semibold mb-4">Permisos y acciones</h6>

        <div class="flex flex-col gap-4 max-h-[45dvh] overflow-y-auto px-3 py-2">
          <template v-for="permission in props.permissions" :key="permission.id">
            <PermissionActionCard
              v-model="roleForm.permissions"
              :permission="permission"
              :actions="props.actions"
            />
          </template>
        </div>
      </div>
    </form>
  </ModalLayout>
</template>
