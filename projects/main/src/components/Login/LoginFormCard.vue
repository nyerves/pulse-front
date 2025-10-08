<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue'
import { AuthService } from '@common/services'

defineEmits(['showRegister'])

const router = useRouter()
const toast = useToast()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errors = ref({
  email: '',
  password: '',
})

const validateForm = () => {
  errors.value = { email: '', password: '' }

  if (!email.value) {
    errors.value.email = 'El email es requerido'
  }
  // else if (!/\S+@\S+\.\S+/.test(email.value)) {
  //   errors.value.email = 'El email no es válido'
  // }

  if (!password.value) {
    errors.value.password = 'La contraseña es requerida'
  } else if (password.value.length < 6) {
    errors.value.password = 'La contraseña debe tener al menos 6 caracteres'
  }

  return !errors.value.email && !errors.value.password
}
const handleLogin = async () => {
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
    await AuthService.Login(email.value, password.value)

    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Inicio de sesión exitoso',
      life: 3000,
    })

    router.push('/dashboard')
  } catch (error) {
    console.error('Login error:', error)

    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al iniciar sesión',
      life: 3000,
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="bg-white rounded-3xl shadow-xl p-10 md:p-12">
    <h1 class="text-3xl font-bold !text-gray-700">INICIO DE SESIÓN</h1>
    <p class="text-gray-600">Llene los campos para iniciar sesión</p>

    <form @submit.prevent="handleLogin" class="space-y-6 pb-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Correo Electrónico
        </label>
        <input
          id="email"
          v-model="email"
          placeholder="Correo Electrónico"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
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
          v-model="password"
          placeholder="Contraseña"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
        />
        <div v-if="errors.password" class="text-red-500 text-sm mt-1">
          {{ errors.password }}
        </div>
      </div>

      <Button
        type="submit"
        label="Iniciar sesión"
        class="w-full bg-teal-900 !text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-md"
        :loading="isLoading"
      />
    </form>

    <div class="mt-8 text-center flex gap-3">
      <button
        class="text-gray-700 hover:text-teal-600 transition-colors font-medium cursor-pointer"
        @click="$emit('showRegister')"
      >
        Regístrate
      </button>

      <div class="text-gray-400">|</div>

      <button
        class="text-gray-700 hover:text-teal-600 transition-colors font-medium cursor-pointer"
      >
        Recuperar contraseña
      </button>
    </div>
  </div>
</template>
