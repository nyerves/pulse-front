<script setup lang="ts">
import type { Permission, Role } from '@common/models'
import { computed } from 'vue'

const props = defineProps<{
  role: Role
  permissions: Permission[]
}>()

const permissionsSelected = computed(() => {
  const { role, permissions } = props

  const permissionsInRole = role.permissions.map((x) => x.permissionId)
  return permissions.filter((x) => permissionsInRole.includes(x.id))
})
</script>

<template>
  <div class="card h-48 !p-5 shadow-sm">
    <div class="flex items-center mb-4 w-full">
      <h4 class="text-xl font-semibold !mb-0 !mr-auto">
        {{ role.name }}
      </h4>

      <Button icon="pi pi-pencil" variant="text" rounded severity="contrast" />
      <Button icon="pi pi-trash" variant="text" rounded severity="danger" />
    </div>

    <template v-for="(permission, _index) in permissionsSelected" :key="_index">
      <Tag rounded>
        <template #default>
          {{ permission.name }}

          <Badge :value="4" size="small" class="ml-1" />
        </template>
      </Tag>
    </template>
  </div>
</template>
