<script setup lang="ts">
import { computed } from 'vue'
import { useConfirm } from 'primevue'
import type { Permission, Role } from '@common/models'

const emit = defineEmits(['edit', 'delete'])
const props = defineProps<{
  role: Role
  permissions: Permission[]
}>()

const confirm = useConfirm()

const permissionsSelected = computed(() => {
  const { role, permissions } = props

  return role.permissions.map((x) => ({
    name: permissions.find((p) => p.id === x.permissionId)?.name || '',
    actions: x.actionIds.length,
  }))
})

function showConfirm() {
  confirm.require({
    message: 'Seguro que desea eliminar este rol?',
    header: 'Confirmación',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancelar',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Eliminar',
      severity: 'danger',
    },
    accept: () => {
      emit('delete', props.role)
    },
  })
}
</script>

<template>
  <ConfirmDialog />

  <div class="card h-48 !p-5 shadow-sm">
    <div class="flex items-center mb-4 w-full">
      <h4 class="text-xl font-semibold !mb-0 !mr-auto">
        {{ role.name }}
      </h4>

      <Button
        icon="pi pi-pencil"
        variant="text"
        rounded
        severity="contrast"
        @click="$emit('edit')"
      />
      <Button icon="pi pi-trash" variant="text" rounded severity="danger" @click="showConfirm" />
    </div>

    <div class="flex flex-wrap gap-2 overflow-y-auto h-[60%]">
      <template v-for="(permission, _index) in permissionsSelected" :key="_index">
        <div>
          <Tag rounded>
            <template #default>
              {{ permission.name }}

              <Badge :value="permission.actions" size="small" class="ml-1" />
            </template>
          </Tag>
        </div>
      </template>
    </div>
  </div>
</template>
