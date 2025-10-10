<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RoleCard, RolesFormModal } from '@/components'
import { ActionService, PermissionService, RoleService } from '@common/services'
import type { Permission, PermissionAction, Role } from '@common/models'

const showCreateRoleModal = ref(false)
const isLoading = ref(false)
const roles = ref<Role[]>([])
const permissions = ref<Permission[]>([])
const actions = ref<PermissionAction[]>([])

onMounted(async () => {
  try {
    isLoading.value = true

    roles.value = await RoleService.Get({
      with: ['RolePermissionActions.Permission'],
    })

    permissions.value = await PermissionService.Get()
    actions.value = await ActionService.Get()
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <RolesFormModal
      v-if="showCreateRoleModal"
      @close="showCreateRoleModal = false"
      @save="showCreateRoleModal = false"
    />

    <div class="flex items-start justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold mb-2">Gestión de Roles</h1>
        <p class="opacity-60">Configure roles y asigne permisos para el control de acceso</p>
      </div>

      <Button
        icon="pi pi-plus"
        label="Crear nuevo Rol"
        class="bg-teal-600 hover:bg-teal-700 text-white"
        @click="showCreateRoleModal = true"
      />
    </div>

    <div class="grid grid-cols-3 gap-6">
      <template v-for="role in roles" :key="role.id">
        <RoleCard :role :permissions />
      </template>
    </div>
  </div>
</template>
