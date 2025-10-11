<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue'
import { ModalLayout } from '@common/components'
import type { Role, User } from '@common/models'
import { Functions } from '@common/helpers'
import { UserService } from '@common/services'

const toast = useToast()
const emit = defineEmits(['close', 'save'])
const props = defineProps<{ user?: User; roles: Role[] }>()

const isSaving = ref(false)
const confirmPass = ref('')
const userForm = ref<User>({
  id: null!,
  name: '',
  email: '',
  username: '',
  roleId: null!,
})

const onFormSubmit = async () => {
  try {
    isSaving.value = true

    if (props.user) {
      await UserService.Put(userForm.value)
    } else {
      await UserService.Post(userForm.value)
    }

    emit('save')
    emit('close')
  } catch (error) {
    if (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: (error as Error).message,
        life: 3000,
      })
    }
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  if (props.user) {
    userForm.value = Functions.GetCopy(props.user)
    userForm.value.password = ''
  }
})
</script>

<template>
  <ModalLayout
    :loading="isSaving"
    :title="props.user ? 'Editar Usuario' : 'Crear Usuario'"
    @close="$emit('close')"
    @save="onFormSubmit"
  >
    <div class="grid grid-cols-2 gap-3 w-full">
      <FloatLabel variant="on">
        <InputText id="value3" v-model="userForm.name" class="w-full" />
        <label for="value3">Nombre</label>
      </FloatLabel>

      <FloatLabel variant="on">
        <InputText id="value3" v-model="userForm.username" class="w-full" />
        <label for="value3">Nombre de Usuario</label>
      </FloatLabel>

      <FloatLabel variant="on">
        <InputText id="value4" v-model="userForm.email" class="w-full" />
        <label for="value4">Correo Electrónico</label>
      </FloatLabel>

      <FloatLabel variant="on">
        <Dropdown
          id="value5"
          v-model="userForm.roleId"
          :options="props.roles"
          optionLabel="name"
          optionValue="id"
          class="w-full"
        />
        <label for="value5">Rol</label>
      </FloatLabel>

      <div class="col-span-2 border-b border-gray-200"></div>

      <template v-if="props.user">
        <FloatLabel variant="on" class="col-span-2">
          <InputText
            id="value6"
            v-model="userForm.password"
            type="password"
            class="w-full"
            autocomplete="new-password"
          />
          <label for="value6">Nueva Contraseña</label>
        </FloatLabel>
      </template>

      <template v-else>
        <FloatLabel variant="on">
          <Password
            id="value6"
            toggleMask
            class="w-full"
            v-model="userForm.password"
            autocomplete="off"
            promptLabel="Piensa en una contraseña segura"
            weakLabel="Demasiado simple"
            mediumLabel="Complejidad media"
            strongLabel="Contraseña compleja"
          />

          <label for="value6">Contraseña</label>
        </FloatLabel>

        <FloatLabel variant="on">
          <InputText
            id="value7"
            v-model="confirmPass"
            type="password"
            class="w-full"
            autocomplete="confirm-password"
          />
          <label for="value7">Confirmar contraseña</label>
        </FloatLabel>
      </template>
    </div>
  </ModalLayout>
</template>
