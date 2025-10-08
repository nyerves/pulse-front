<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue'
import { AuthService } from '@common/services'

defineEmits(['showLogin'])

const router = useRouter()
const toast = useToast()

const isLoading = ref(false)
const formRegister = ref({
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const errors = ref({
  email: '',
  password: '',
  name: '',
  confirmPassword: '',
})

const validateForm = () => {
  errors.value = { email: '', password: '', name: '', confirmPassword: '' }

  if (!formRegister.value.email) {
    errors.value.email = 'El email es requerido'
  } else if (!/\S+@\S+\.\S+/.test(formRegister.value.email)) {
    errors.value.email = 'El email no es válido'
  }

  if (!formRegister.value.password) {
    errors.value.password = 'La contraseña es requerida'
  } else if (formRegister.value.password.length < 6) {
    errors.value.password = 'La contraseña debe tener al menos 6 caracteres'
  }

  if (!formRegister.value.name) {
    errors.value.name = 'El nombre es requerido'
  }

  if (!formRegister.value.confirmPassword) {
    errors.value.confirmPassword = 'La confirmación de la contraseña es requerida'
  } else if (formRegister.value.password !== formRegister.value.confirmPassword) {
    errors.value.confirmPassword = 'Las contraseñas no coinciden'
  }

  if (!formRegister.value.username) {
    formRegister.value.username = formRegister.value.email
  }

  return (
    !errors.value.email &&
    !errors.value.password &&
    !errors.value.name &&
    !errors.value.confirmPassword
  )
}
const handleRegister = async () => {
  if (!validateForm()) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Por favor corrige los errores en el formulario',
      life: 3000,
    })

    return
  }

  isLoading.value = true

  try {
    await AuthService.Register(formRegister.value)

    router.push('/dashboard')
  } catch (error) {
    console.error('Login error:', error)

    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al crear la cuenta',
      life: 3000,
    })
  } finally {
    isLoading.value = false
  }
}

const inputClasses =
  'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition'
</script>

<template>
  <div class="bg-white rounded-3xl shadow-xl p-10 md:p-12">
    <h1 class="text-3xl font-bold !text-gray-700">Registrarse</h1>
    <p class="text-gray-600">Llene los campos para registrarse</p>

    <form @submit.prevent="handleRegister" class="space-y-6 pb-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
          Nombre Completo
        </label>

        <input
          id="name"
          v-model="formRegister.name"
          placeholder="Nombre Completo"
          :class="inputClasses"
        />

        <div v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Correo Electrónico
        </label>

        <input
          id="email"
          v-model="formRegister.email"
          placeholder="Correo Electrónico"
          :class="inputClasses"
        />

        <div v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
          Contraseña
        </label>

        <input
          type="password"
          id="password"
          v-model="formRegister.password"
          placeholder="Contraseña"
          :class="inputClasses"
        />
        <div v-if="errors.password" class="text-red-500 text-sm mt-1">
          {{ errors.password }}
        </div>
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
          Confirmar Contraseña
        </label>

        <input
          type="password"
          id="confirmPassword"
          v-model="formRegister.confirmPassword"
          placeholder="Confirmar Contraseña"
          :class="inputClasses"
        />
        <div v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">
          {{ errors.confirmPassword }}
        </div>
      </div>

      <Button
        type="submit"
        label="Registrarse"
        class="w-full bg-teal-900 !text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-md"
        :loading="isLoading"
      />
    </form>

    <div class="mt-8 text-center flex gap-3">
      <button
        class="text-gray-700 hover:text-teal-600 transition-colors font-medium cursor-pointer"
        @click="$emit('showLogin')"
      >
        Ya tengo una cuenta
      </button>
    </div>
  </div>
</template>
