<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '@common/services'
import LogoApp from '@common/assets/png/logo_verde.png'

defineEmits(['showRegister'])

const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
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

  if (!password.value) {
    errors.value.password = 'La contraseña es requerida'
  } else if (password.value.length < 6) {
    errors.value.password = 'La contraseña debe tener al menos 6 caracteres'
  }

  return !errors.value.email && !errors.value.password
}
const handleLogin = async () => {
  if (!validateForm()) return

  isLoading.value = true

  try {
    await AuthService.Login(email.value, password.value)

    router.push('/dashboard')
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="bg-white max-w-[450px] w-full p-8 rounded-xl shadow-lg flex flex-col items-center gap-4 login-form-card"
  >
    <img :src="LogoApp" alt="Logo Pulse" class="w-[120px] h-auto" />
    <h1 class="text-2xl md:text-3xl font-bold !text-gray-900 text-center">Bienvenido a Pulse</h1>
    <p class="text-sm text-gray-500 text-center">
      Ingrese sus credenciales para acceder al sistema de gobernanza de salud.
    </p>

    <form @submit.prevent="handleLogin" class="w-full mt-4 flex flex-col gap-4">
      <div class="relative w-full">
        <label for="email" class="sr-only">Correo Electrónico</label>
        <input
          id="email"
          v-model="email"
          placeholder="Correo Electrónico"
          class="w-full px-4 py-3 !bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200"
        />

        <div v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</div>
      </div>

      <div class="relative w-full">
        <label for="password" class="sr-only">Contraseña</label>

        <input
          id="password"
          v-model="password"
          placeholder="Contraseña"
          :type="showPassword ? 'text' : 'password'"
          class="w-full px-4 py-3 !bg-white border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-200 pr-10"
        />

        <div
          class="absolute right-3 top-3 text-gray-500 cursor-pointer"
          @click="showPassword = !showPassword"
          aria-hidden
        >
          <i v-if="showPassword" class="pi pi-eye" />
          <i v-else class="pi pi-eye-slash" />
        </div>

        <div v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</div>
      </div>

      <Button type="submit" label="Iniciar sesión" :loading="isLoading" />
    </form>

    <a href="#" class="text-sm text-gray-600 mt-3">¿Olvidó su contraseña?</a>
  </div>
</template>
