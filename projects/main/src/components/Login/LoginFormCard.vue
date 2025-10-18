<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '@common/services'
import LogoApp from '@common/assets/png/logo_verde.png'

defineEmits(['showRegister'])

const router = useRouter()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
const errors = ref({
  email: '',
  password: '',
  errorLogin: '',
})

const validateForm = () => {
  errors.value = { email: '', password: '', errorLogin: '' }

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
    if (error) {
      errors.value.errorLogin = 'Correo o contraseña incorrectos'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="bg-white max-w-[440px] w-full p-8 rounded-xl shadow-lg flex flex-col items-center gap-4 login-form-card"
  >
    <img :src="LogoApp" alt="Logo Pulse" class="w-[110px] h-auto" />

    <h1 class="text-xl md:text-2xl font-bold !text-gray-900 text-center !mb-1">
      Bienvenido a Pulse
    </h1>

    <p class="text-sm text-gray-500 text-center">
      Ingrese sus credenciales para acceder al sistema de gobernanza de salud.
    </p>

    <form @submit.prevent="handleLogin" class="w-full mt-1 flex flex-col gap-4">
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

      <div class="relative">
        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
          Contraseña
        </label>

        <input
          id="password"
          v-model="password"
          placeholder="Contraseña"
          :type="showPassword ? 'text' : 'password'"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
        />

        <div
          class="absolute right-2 top-8 cursor-pointer rounded-lg bg-white p-2"
          @click="showPassword = !showPassword"
        >
          <i v-if="showPassword" class="pi pi-eye" style="color: slateblue" />
          <i v-else class="pi pi-eye-slash" style="color: slateblue; font-size: 1rem" />
        </div>

        <div v-if="errors.password" class="text-red-500 text-sm mt-1">
          {{ errors.password }}
        </div>
      </div>

      <template v-if="errors.errorLogin">
        <Message
          severity="error"
          icon="pi pi-exclamation-triangle"
          pt:root:class="!text-xs py-1 !outline-hidden"
        >
          {{ errors.errorLogin }}
        </Message>
      </template>

      <Button type="submit" label="Iniciar sesión" :loading="isLoading" />
    </form>

    <a href="#" class="text-sm text-gray-600 mt-3">¿Olvidó su contraseña?</a>
  </div>
</template>
