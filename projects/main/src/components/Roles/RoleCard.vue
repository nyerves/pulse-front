<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useToast } from 'primevue'
import type { Permission, PermissionAction, Role } from '@common/models'
import { ConfirmationModal } from '@common/components'
import { RoleService } from '@common/services'

const emit = defineEmits(['edit', 'delete'])
const props = defineProps<{
  role: Role
  permissions: Permission[]
  actions: PermissionAction[]
}>()

const toast = useToast()
const op = ref()
const showConfirm = ref(false)
const isDeleting = ref(false)
const selectedActions = ref<number[]>([])

const permissionsSelected = computed(() => {
  const { role, permissions } = props

  return role.permissions.map((x) => ({
    id: x.permissionId,
    name: permissions.find((p) => p.id === x.permissionId)?.name || '',
    actions: x.actionIds,
  }))
})
const selectedActionsNames = computed(() => {
  const { actions } = props

  return selectedActions.value
    .map((id) => actions.find((a) => a.id === id)?.name || '')
    .filter((name) => name !== '')
})

const onDelete = async () => {
  try {
    isDeleting.value = true

    await RoleService.Delete(props.role.id)

    emit('delete')
    showConfirm.value = false
  } catch (error) {
    if (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al eliminar el rol',
        life: 3000,
      })
    }
  } finally {
    isDeleting.value = false
  }
}
const displayActions = (event: PointerEvent, actions: number[]) => {
  op.value.hide()

  if (selectedActions.value === actions) {
    selectedActions.value = []
  } else {
    selectedActions.value = actions
    nextTick(() => op.value.show(event))
  }
}
</script>

<template>
  <ConfirmationModal
    v-if="showConfirm"
    :loading="isDeleting"
    :name="props.role.name"
    @close="showConfirm = false"
    @confirm="onDelete"
  />

  <div class="card h-48 !p-5 shadow-md">
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
      <Button
        icon="pi pi-trash"
        variant="text"
        rounded
        severity="danger"
        @click="showConfirm = true"
      />
    </div>

    <div class="flex flex-wrap gap-2 overflow-y-auto h-[60%]">
      <template v-for="(permission, _index) in permissionsSelected" :key="_index">
        <div>
          <Tag
            rounded
            severity="secondary"
            class="cursor-pointer"
            @click="displayActions($event, permission.actions)"
          >
            <template #default>
              {{ permission.name }}
              <Badge :value="permission.actions.length" size="small" class="ml-1" />
            </template>
          </Tag>
        </div>
      </template>

      <Popover ref="op">
        <div class="p-1 max-w-xs">
          <p class="mb-2 font-semibold">Acciones:</p>
          <ul>
            <li
              v-for="(action, index) in selectedActionsNames"
              :key="index"
              class="flex items-center gap-2"
            >
              <span>{{ action }}</span>
            </li>
          </ul>
        </div>
      </Popover>
    </div>
  </div>
</template>
