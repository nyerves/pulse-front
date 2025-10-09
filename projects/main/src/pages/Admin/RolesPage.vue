<script setup lang="ts">
import { ref } from 'vue'
import { RolesFormModal } from '@/components'

const showCreateRoleModal = ref(false)
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
  </div>
</template>
