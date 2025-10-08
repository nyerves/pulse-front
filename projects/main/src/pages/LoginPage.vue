<script setup lang="ts">
import { ref } from 'vue'
import LogoSvg from '@/assets/svg/pulse-logo.svg'

const showRegister = ref(false)
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
        class="absolute -top-1/4 -left-1/4 w-1/2 h-full bg-teal-700 opacity-40 transform -rotate-12 rounded-lg"
      ></div>

      <!-- Medium diagonal stripe left side -->
      <div
        class="absolute top-0 left-0 w-1/3 h-full bg-teal-600 opacity-30 transform -rotate-12 rounded-lg"
      ></div>

      <!-- Diagonal stripe bottom-right -->
      <div
        class="absolute -bottom-1/4 -right-1/4 w-1/2 h-3/4 bg-cyan-600 opacity-25 transform rotate-12 rounded-lg"
      ></div>

      <!-- Additional accent stripes -->
      <div
        class="absolute top-1/4 -left-20 w-1/4 h-1/2 bg-teal-800 opacity-20 transform -rotate-15 rounded-lg"
      ></div>

      <div
        class="absolute bottom-0 right-1/4 w-1/3 h-1/2 bg-teal-500 opacity-15 transform rotate-12 rounded-lg"
      ></div>
    </div>

    <!-- Patient button -->
    <div class="absolute top-8 right-7 z-10 hover:shadow-lg">
      <button
        class="bg-white cursor-pointer text-gray-800 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
      >
        Soy paciente
      </button>
    </div>

    <div class="w-full max-w-7xl grid md:grid-cols-2 gap-10 items-center relative z-10">
      <!-- Login Form Card -->
      <LoginFormCard v-if="!showRegister" @showRegister="showRegister = true" />

      <RegisterFormCard v-else @showLogin="showRegister = false" />

      <!-- Branding Section -->
      <div class="text-white flex flex-col justify-center items-center gap-4">
        <div class="flex justify-center">
          <div class="relative">
            <img :src="LogoSvg" alt="Logo Pulse" class="w-48 h-48 md:w-56 md:h-56" />
          </div>
        </div>

        <span class="text-4xl md:text-5xl font-bold">¿ERES PULSE?</span>

        <p class="text-xl md:text-2xl leading-relaxed">
          Únete a la comunidad de profesionales<br />
          de la salud pulse es tu hospital en línea
        </p>
      </div>
    </div>
  </div>
</template>
