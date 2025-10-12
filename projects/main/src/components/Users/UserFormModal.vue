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
const formErrors = ref({
  name: '',
  email: '',
  username: '',
  roleId: '',
  password: '',
  confirmPass: '',
})

const validForm = (): boolean => {
  let isValid = true

  formErrors.value = {
    name: '',
    email: '',
    username: '',
    roleId: '',
    password: '',
    confirmPass: '',
  }

  if (!userForm.value.name) {
    formErrors.value.name = 'El nombre es requerido'
    isValid = false
  }

  if (!userForm.value.username) {
    formErrors.value.username = 'El nombre de usuario es requerido'
    isValid = false
  }

  if (!userForm.value.email) {
    formErrors.value.email = 'El correo electrónico es requerido'
    isValid = false
  } else if (!Functions.IsValidEmail(userForm.value.email)) {
    formErrors.value.email = 'El correo electrónico no es válido'
    isValid = false
  }

  if (!userForm.value.roleId) {
    formErrors.value.roleId = 'El rol es requerido'
    isValid = false
  }

  if (props.user) {
    // Editing user
    if (userForm.value.password) {
      if (userForm.value.password.length < 12) {
        formErrors.value.password = 'La contraseña debe tener al menos 12 caracteres'
        isValid = false
      }
    }
  } else {
    // Creating user
    if (!userForm.value.password) {
      formErrors.value.password = 'La contraseña es requerida'
      isValid = false
    } else if (userForm.value.password.length < 12) {
      formErrors.value.password = 'La contraseña debe tener al menos 12 caracteres'
      isValid = false
    }

    if (userForm.value.password !== confirmPass.value) {
      formErrors.value.confirmPass = 'Las contraseñas no coinciden'
      isValid = false
    }
  }

  return isValid
}
const onFormSubmit = async () => {
  if (!validForm()) return

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
      <div class="flex flex-col">
        <FloatLabel variant="on">
          <InputText
            id="value3"
            v-model="userForm.name"
            class="w-full"
            autocomplete="off"
            :class="{ 'p-invalid': formErrors.name }"
          />
          <label for="value3">Nombre</label>
        </FloatLabel>

        <Message v-if="formErrors.name" severity="error" class="mt-1 text-xs" variant="simple">
          {{ formErrors.name }}
        </Message>
      </div>

      <div class="flex flex-col">
        <FloatLabel variant="on">
          <InputText
            id="value3"
            v-model="userForm.username"
            class="w-full"
            :class="{ 'p-invalid': formErrors.username }"
          />
          <label for="value3">Nombre de Usuario</label>
        </FloatLabel>

        <Message v-if="formErrors.username" severity="error" class="mt-1 text-xs" variant="simple">
          {{ formErrors.username }}
        </Message>
      </div>

      <div class="flex flex-col">
        <FloatLabel variant="on">
          <InputText
            id="value4"
            v-model="userForm.email"
            class="w-full"
            :class="{ 'p-invalid': formErrors.email }"
          />
          <label for="value4">Correo Electrónico</label>
        </FloatLabel>

        <Message v-if="formErrors.email" severity="error" class="mt-1 text-xs" variant="simple">
          {{ formErrors.email }}
        </Message>
      </div>

      <div class="flex flex-col">
        <FloatLabel variant="on">
          <Dropdown
            id="value5"
            v-model="userForm.roleId"
            :options="props.roles"
            optionLabel="name"
            optionValue="id"
            class="w-full"
            :class="{ 'p-invalid': formErrors.roleId }"
          />
          <label for="value5">Rol</label>
        </FloatLabel>

        <Message v-if="formErrors.roleId" severity="error" class="mt-1 text-xs" variant="simple">
          {{ formErrors.roleId }}
        </Message>
      </div>

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
        <div class="flex flex-col">
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
              :class="{ 'p-invalid': formErrors.password }"
            >
              <template #footer>
                <Divider />
                <ul class="pl-2 my-0 leading-normal text-sm">
                  <li>Mínimo 12 caracteres</li>
                  <li>Al menos una mayúscula</li>
                  <li>Al menos un número</li>
                  <li>Caracteres especiales permitidos: !@#$%^&*()-+</li>
                </ul>
              </template>
            </Password>

            <label for="value6">Contraseña</label>
          </FloatLabel>

          <Message
            v-if="formErrors.password"
            severity="error"
            class="mt-1 text-xs"
            variant="simple"
          >
            {{ formErrors.password }}
          </Message>
        </div>

        <div class="flex flex-col">
          <FloatLabel variant="on">
            <InputText
              id="value7"
              v-model="confirmPass"
              type="password"
              class="w-full"
              autocomplete="confirm-password"
              :class="{ 'p-invalid': formErrors.confirmPass }"
            />
            <label for="value7">Confirmar contraseña</label>
          </FloatLabel>

          <Message
            v-if="formErrors.confirmPass"
            severity="error"
            class="mt-1 text-xs"
            variant="simple"
          >
            {{ formErrors.confirmPass }}
          </Message>
        </div>
      </template>
    </div>
  </ModalLayout>
</template>
