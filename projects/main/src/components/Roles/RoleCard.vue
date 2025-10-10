<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Permission, Role } from '@common/models'
import { ConfirmationModal } from '@common/components'
import { RoleService } from '@common/services'

const emit = defineEmits(['edit', 'delete'])
const props = defineProps<{
  role: Role
  permissions: Permission[]
}>()

const showConfirm = ref(false)
const isDeleting = ref(false)

const permissionsSelected = computed(() => {
  const { role, permissions } = props

  return role.permissions.map((x) => ({
    name: permissions.find((p) => p.id === x.permissionId)?.name || '',
    actions: x.actionIds.length,
  }))
})

async function onDelete() {
  try {
    isDeleting.value = true

    await RoleService.Delete(props.role.id)

    emit('delete')
    showConfirm.value = false
  } finally {
    isDeleting.value = false
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
