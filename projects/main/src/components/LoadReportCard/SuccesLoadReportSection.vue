<script setup lang="ts">
import { computed, ref } from 'vue'
import { BabyIcon, HeartPulse, Syringe, Stethoscope, ShieldAlert } from 'lucide-vue-next'

const percentage = ref(72)
const productsLoaded = [
  { name: 'Cirugías Totales', quantity: 28, icon: Syringe },
  { name: 'Consultas Otorgadas', quantity: 107, icon: Stethoscope },
  { name: 'Nacimientos', quantity: 9, icon: BabyIcon },
  { name: 'Defunciones', quantity: 1, icon: HeartPulse },
]
const chartData = computed(() => ({
  datasets: [
    {
      data: [percentage.value, 100 - percentage.value],
      backgroundColor: ['#3B82F6', '#E5E7EB'], // verde y gris claro
      borderWidth: 0,
      cutout: '75%', // tamaño del agujero central
    },
  ],
}))

const chartOptions = {
  rotation: 0, // inicia arriba
  // circumference: 270, // hace un "semicírculo" o 3/4 círculo
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
}
</script>

<template>
  <div id="success-message" class="flex flex-col gap-6">
    <div>
      <div
        class="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4"
      >
        <i class="pi pi-check text-green-600 !font-bold" style="font-size: 1.5rem" />
      </div>

      <h5 class="font-bold">Validación Exitosa</h5>

      <p class="mt-2 text-secondary text-sm">
        El archivo ha sido procesado. Revisa el resumen antes de confirmar.
      </p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h5 class="text-start">Productividad Del Día</h5>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <div class="relative flex items-center justify-center">
            <Chart
              type="doughnut"
              :data="chartData"
              :options="chartOptions"
              style="width: 100%; height: 100%"
            />

            <div class="absolute text-3xl top-1/4 font-bold text-gray-800">{{ percentage }}%</div>
          </div>

          <div id="summary-ocupacion-legend" class="space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-blue-500"></div>
              <div>
                <span class="text-sm font-medium text-gray-800">Ocupadas</span>
                <p class="text-xs text-gray-600">192 Camas</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
              <div>
                <span class="text-sm font-medium text-gray-800">Disponibles</span>
                <p class="text-xs text-gray-600">74 Camas</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-gray-400"></div>
              <div>
                <span class="text-sm font-medium text-gray-800">Bloqueadas</span>
                <p class="text-xs text-gray-600">0 Camas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h5 class="text-start">Productividad Del Día</h5>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <template v-for="product in productsLoaded" :key="product.name">
            <div class="flex items-center gap-3">
              <component :is="product.icon" :size="29" class="text-teal-500" />

              <div class="flex flex-col text-start">
                <span class="font-bold text-2xl">{{ product.quantity }}</span>
                <p class="text-xs text-secondary">{{ product.name }}</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div id="summary-abasto-alert" class="bg-yellow-50 border border-yellow-300 p-6 rounded-xl">
      <div class="flex items-start gap-4">
        <ShieldAlert class="w-8 h-8 text-yellow-600 mt-1"></ShieldAlert>

        <div class="text-start">
          <h3 class="!text-lg font-bold !text-yellow-900 !mb-0">¡Alerta de Abasto!</h3>
          <p class="text-4xl font-extrabold text-yellow-700 !my-2" id="summary-abasto-total">25</p>
          <p class="text-sm text-yellow-800 mb-4">Claves de medicamentos en cero.</p>

          <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div class="flex items-center gap-1">
              <span class="font-semibold text-yellow-900">15</span>
              <span id="summary-abasto-keys">Medicamento Base</span>
            </div>

            <div class="flex items-center gap-1">
              <span class="font-semibold text-yellow-900">7</span>
              <span id="summary-abasto-keys">Material de Curación</span>
            </div>

            <div class="flex items-center gap-1">
              <span class="font-semibold text-yellow-900">3</span>
              <span id="summary-abasto-keys">Alta Especialidad</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 p-6 rounded-xl text-start border border-gray-200">
      <h3 class="!text-lg font-bold !mb-4">Nuevas Incidencias Reportadas</h3>

      <ul id="summary-incidencias-list" class="space-y-4">
        <li class="border-l-4 border-teal-500/50 pl-4">
          <p class="font-semibold text-gray-800">Falla en aire acondicionado QF3</p>
          <p class="text-sm text-secondary">Asignado a: Ing. Juan Pérez</p>
        </li>
        <li class="border-l-4 border-teal-500/50 pl-4">
          <p class="font-semibold text-gray-800">Caída de paciente en piso 3</p>
          <p class="text-sm text-secondary">Asignado a: Dra. Ana Ramírez</p>
        </li>
      </ul>
    </div>
  </div>
</template>
