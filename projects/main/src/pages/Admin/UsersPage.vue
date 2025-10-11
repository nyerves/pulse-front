<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Role, User } from '@common/models'
import { RoleService, UserService } from '@common/services'

const loading = ref(false)
const userList = ref<User[]>([])
const roleList = ref<Role[]>([])

const fetchUsers = async () => {
  try {
    loading.value = true

    userList.value = await UserService.Get()
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
}
const getRoleName = (roleId: number) => {
  const role = roleList.value.find((role) => role.id === roleId)
  return role?.name ?? '-'
}

onMounted(async () => {
  roleList.value = await RoleService.Get()
  fetchUsers()
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div class="max-w-[44rem]">
        <h1 class="text-3xl font-bold mb-2">Gestión de Usuarios</h1>
        <p class="opacity-60 text-wrap">
          Aquí puedes gestionar los usuarios de la plataforma, asignar roles, permisos, y supervisar
          la actividad de los usuarios.
        </p>
      </div>

      <Button
        icon="pi pi-plus"
        label="Crear nuevo Usuario"
        class="bg-teal-600 hover:bg-teal-700 text-white"
      />
    </div>

    <div class="card">
      <DataTable
        paginator
        showGridlines
        :value="userList"
        :rows="10"
        dataKey="id"
        filterDisplay="menu"
        :loading="loading"
      >
        <template #header>
          <div class="flex justify-between">
            <div></div>

            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText placeholder="Keyword Search" />
            </IconField>
          </div>
        </template>

        <template #empty>
          <div class="flex flex-col items-center justify-center h-[10dvh]">
            <span>No hay usuarios encontrados.</span>
          </div>
        </template>

        <template #loading>
          <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        </template>

        <Column field="name" header="Nombre" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.name }}
          </template>
        </Column>

        <Column header="Nombre de usuario" style="min-width: 12rem">
          <template #body="{ data }: { data: User }">
            <div class="flex items-center gap-2">
              <span>{{ data.username }}</span>
            </div>
          </template>
        </Column>

        <Column
          header="Correo"
          filterField="representative"
          :showFilterMatchModes="false"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 14rem"
        >
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <span>{{ data.email }}</span>
            </div>
          </template>
        </Column>

        <Column header="Role" style="min-width: 12rem">
          <template #body="{ data }">
            {{ getRoleName(data.roleId) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
