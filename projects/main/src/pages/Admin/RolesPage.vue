<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RoleCard, RolesFormModal } from '@/components'
import { ActionService, PermissionService, RoleService } from '@common/services'
import type { Permission, PermissionAction, Role } from '@common/models'

const showCreateRoleModal = ref(false)
const isLoading = ref(false)
const roles = ref<Role[]>([])
const roleSelected = ref<Role>()
const permissions = ref<Permission[]>([])
const actions = ref<PermissionAction[]>([])

async function fetchRoles() {
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
}
function handleEdit(role: Role) {
  showCreateRoleModal.value = true
  roleSelected.value = role
}
function closeModal() {
  showCreateRoleModal.value = false
  roleSelected.value = undefined
}

onMounted(() => fetchRoles())
</script>

<template>
  <div>
    <RolesFormModal
      v-if="showCreateRoleModal"
      :actions="actions"
      :permissions="permissions"
      :roleSelected="roleSelected"
      @saved="fetchRoles"
      @close="closeModal"
    />

    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="font-bold !mb-1">Gestión de Roles</h2>
        <p class="opacity-60">Configure roles y asigne permisos para el control de acceso</p>
      </div>

      <Button
        raised
        icon="pi pi-plus"
        label="Crear nuevo Rol"
        class="bg-teal-600 hover:bg-teal-700 text-white"
        @click="showCreateRoleModal = true"
      />
    </div>

    <div class="flex justify-end mb-6">
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText placeholder="Buscar rol" />
      </IconField>
    </div>

    <template v-if="isLoading">
      <div class="flex justify-center items-center h-[30dvh]">
        <ProgressSpinner />
      </div>
    </template>

    <div v-else class="grid grid-cols-3 gap-6">
      <template v-for="role in roles" :key="role.id">
        <RoleCard
          :role="role"
          :permissions="permissions"
          @delete="fetchRoles"
          @edit="handleEdit(role)"
        />
      </template>
    </div>
  </div>
</template>
