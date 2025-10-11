<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Role, User } from '@common/models'
import { RoleService, UserService } from '@common/services'
import { UsersFormModal } from '@/components'
import { ConfirmationModal } from '@common/components'

const loading = ref(false)
const isDeleting = ref(false)
const showConfirmationModal = ref(false)
const showUserFormModal = ref(false)
const userSelected = ref<User>()
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
const getAvatarLabel = (name: string) => {
  if (name) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
  }

  return 'U'
}
const getRoleName = (roleId: number) => {
  const role = roleList.value.find((role) => role.id === roleId)
  return role?.name ?? '-'
}
const onSelectUser = (user?: User) => {
  userSelected.value = user
  showUserFormModal.value = true
}
const onDeleteUser = async () => {
  if (!userSelected.value) return

  try {
    isDeleting.value = true
    await UserService.Delete(userSelected.value.id)

    closeModal()
    fetchUsers()
  } catch (error) {
    console.error('Error deleting user:', error)
  } finally {
    isDeleting.value = false
  }
}
const openConfirmationModal = (user: User) => {
  showConfirmationModal.value = true
  userSelected.value = user
}
const closeModal = () => {
  showConfirmationModal.value = false
  showUserFormModal.value = false
  userSelected.value = undefined
}

onMounted(async () => {
  roleList.value = await RoleService.Get()
  fetchUsers()
})
</script>

<template>
  <ConfirmationModal v-if="showConfirmationModal" @close="closeModal" @confirm="onDeleteUser" />

  <UsersFormModal
    v-if="showUserFormModal"
    :user="userSelected"
    :roles="roleList"
    @close="closeModal"
    @save="fetchUsers"
  />

  <div>
    <div class="flex items-center justify-between mb-8">
      <div class="max-w-[44rem]">
        <h1 class="text-3xl font-bold mb-2">Gestión de Usuarios</h1>
        <p class="opacity-60 text-wrap">
          Aquí puedes gestionar los usuarios de la plataforma, asignar roles, permisos, y supervisar
          la actividad de los usuarios.
        </p>
      </div>

      <Button icon="pi pi-plus" label="Crear nuevo Usuario" @click="onSelectUser()" />
    </div>

    <div class="card">
      <DataTable :rows="10" paginator dataKey="id" :value="userList" :loading="loading">
        <template #header>
          <div class="flex justify-between">
            <div></div>

            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText placeholder="Buscar usuario" />
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
            <Avatar :label="getAvatarLabel(data.name)" shape="circle" />

            <span class="ml-2">{{ data.name }}</span>
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

        <Column header="Acciones" style="min-width: 8rem">
          <template #body="{ data }">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-text p-button-plain"
              @click="onSelectUser(data)"
            />

            <Button
              v-if="data.roleId !== 1"
              icon="pi pi-trash"
              class="p-button-rounded p-button-text p-button-danger"
              @click="openConfirmationModal(data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
