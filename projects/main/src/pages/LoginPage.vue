<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'primevue'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()

// Form data
const email = ref('')
const password = ref('')
const isLoading = ref(false)

// Form validation
const errors = ref({
  email: '',
  password: '',
})

const validateForm = () => {
  errors.value = { email: '', password: '' }

  if (!email.value) {
    errors.value.email = 'El email es requerido'
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    // errors.value.email = 'El email no es válido'
  }

  // if (!password.value) {
  //   errors.value.password = 'La contraseña es requerida'
  // } else if (password.value.length < 6) {
  //   errors.value.password = 'La contraseña debe tener al menos 6 caracteres'
  // }

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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

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
  <div
    class="min-h-screen bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-400 flex items-center justify-center p-4 relative overflow-hidden"
  >
    <Toast />

    <!-- Decorative background shapes - matching original design -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Large diagonal stripe top-left -->
      <div
        class="absolute -top-1/4 -left-1/4 w-1/2 h-full bg-teal-700 opacity-40 transform -rotate-12"
      ></div>

      <!-- Medium diagonal stripe left side -->
      <div
        class="absolute top-0 left-0 w-1/3 h-full bg-teal-600 opacity-30 transform -rotate-12"
      ></div>

      <!-- Diagonal stripe bottom-right -->
      <div
        class="absolute -bottom-1/4 -right-1/4 w-1/2 h-3/4 bg-cyan-600 opacity-25 transform rotate-12"
      ></div>

      <!-- Additional accent stripes -->
      <div
        class="absolute top-1/4 -left-20 w-1/4 h-1/2 bg-teal-800 opacity-20 transform -rotate-12"
      ></div>
      <div
        class="absolute bottom-0 right-1/4 w-1/3 h-1/2 bg-teal-500 opacity-15 transform rotate-12"
      ></div>
    </div>

    <!-- Patient button -->
    <button
      class="absolute top-8 right-8 bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-lg z-10"
    >
      Soy paciente
    </button>

    <div class="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center relative z-10">
      <!-- Login Form Card -->
      <div class="bg-white rounded-3xl shadow-2xl p-10 md:p-12">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">INICIO DE SESIÓN</h1>
        <p class="text-gray-600 mb-8">Llene los campos para iniciar sesión</p>

        <div class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Correo Electrónico"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
            />
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
          </div>

          <Button
            label="Iniciar sesión"
            class="w-full bg-teal-900 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-md"
            :loading="isLoading"
            @click="handleLogin"
          />
        </div>

        <div class="mt-8 text-center flex gap-3">
          <button class="text-gray-700 hover:text-teal-600 transition-colors font-medium">
            Regístrate
          </button>
          <div class="text-gray-400">|</div>
          <button class="text-gray-700 hover:text-teal-600 transition-colors font-medium">
            Recuperar contraseña
          </button>
        </div>
      </div>

      <!-- Branding Section -->
      <div class="text-white text-center md:text-left">
        <div class="flex justify-center md:justify-start mb-8">
          <div class="relative">
            <div
              class="w-48 h-48 rounded-full border-8 border-white flex items-center justify-center"
            >
              <div
                class="w-44 h-44 rounded-full border-4 border-white flex items-center justify-center"
              >
                <div
                  class="w-40 h-40 rounded-full border-4 border-white flex items-center justify-center"
                >
                  <span class="text-4xl font-bold tracking-wider">PULSE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 class="text-5xl md:text-6xl font-bold mb-6">¿ERES PULSE?</h2>

        <p class="text-xl md:text-2xl leading-relaxed">
          Únete a la comunidad de profesionales<br />
          de la salud pulse es tu hospital en línea
        </p>
      </div>
    </div>
  </div>
</template>
