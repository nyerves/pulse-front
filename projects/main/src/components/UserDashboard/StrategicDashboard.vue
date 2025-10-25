<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { TrendingUp } from 'lucide-vue-next'
import { PageLayout, InformativeCard } from '@/components'

const percentage = ref(78)
const chartData2 = ref()
const chartOptions2 = ref()

const tabOptions = computed(() => [
  { label: 'Resumen General', value: '0' },
  { label: 'Capacidad y Ocupación', value: '1' },
  { label: 'Productividad', value: '2' },
  { label: 'Recursos e Infraestructura', value: '3' },
  { label: 'Flujos de Pacientes', value: '4' },
  { label: 'Salud Laboral (RRHH)', value: '5' },
  { label: 'Eficiencia (1er Nivel)', value: '6' },
])
const chartData = computed(() => ({
  datasets: [
    {
      data: [percentage.value, 100 - percentage.value],
      backgroundColor: ['#10B981', '#E5E7EB'], // verde y gris claro
      borderWidth: 0,
      cutout: '75%', // tamaño del agujero central
    },
  ],
}))

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body)

  return {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        data: [540, 325, 702],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-500'),
          documentStyle.getPropertyValue('--p-orange-500'),
          documentStyle.getPropertyValue('--p-gray-500'),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-400'),
          documentStyle.getPropertyValue('--p-orange-400'),
          documentStyle.getPropertyValue('--p-gray-400'),
        ],
      },
    ],
  }
}
const setChartOptions = () => {
  return {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  }
}

const chartOptions = {
  rotation: 0, // inicia arriba
  // circumference: 270, // hace un "semicírculo" o 3/4 círculo
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
}

onMounted(() => {
  chartData2.value = setChartData()
  chartOptions2.value = setChartOptions()
})
</script>

<template>
  <PageLayout
    title="Dashboard Estratégico"
    description="Consolidado de 11 Hospitales | Octubre 2025"
    description-modal="Esta vista presenta un consolidado de los Indicadores Clave de Rendimiento (KPIs) de toda la red hospitalaria. Permite analizar el estado de salud del sistema a través de diferentes perspectivas como capacidad, productividad y recursos."
  >
    <template #actions>
      <div class="border border-gray-300 rounded-md">
        <Button
          severity="secondary"
          icon="pi pi-filter"
          label="Filtrar Hospitales"
          variant="text"
        />
      </div>
      <Button icon="pi pi-download" label="Generar Reporte Consolidado" />
    </template>

    <div>
      <Tabs value="0">
        <TabList pt:root="!bg-transparent w-full overflow-x-auto">
          <template v-for="tab in tabOptions" :key="tab.value">
            <Tab pt:root="text-sm !font-normal" :value="tab.value">{{ tab.label }}</Tab>
          </template>
        </TabList>
      </Tabs>

      <div class="pt-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <InformativeCard title="Ocupación Hospitalaria General" class="xl:col-span-2">
            <div class="flex items-center justify-around">
              <div
                class="relative flex items-center justify-center"
                style="width: 150px; height: 150px"
              >
                <Chart
                  type="doughnut"
                  :data="chartData"
                  :options="chartOptions"
                  style="width: 100%; height: 100%"
                />

                <div class="absolute text-4xl font-bold text-gray-800">{{ percentage }}%</div>
              </div>

              <div class="text-xs flex flex-col gap-2">
                <span class="font-semibold">Umbrales (Ocupación):</span>

                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full" />
                  <span>Verde: 50-85%</span>
                </div>

                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span>Amarillo: 85-95%</span>
                </div>

                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 bg-red-500 rounded-full" />
                  <span>Rojo: >95%</span>
                </div>

                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 bg-orange-500 rounded-full" />
                  <span>Alerta: {{ '<' }}50%</span>
                </div>
              </div>
            </div>

            <span class="text-secondary text-xs mt-7 block"> 1,910 / 2,440 camas </span>
          </InformativeCard>

          <InformativeCard title="Productividad Quirúrgica" />

          <InformativeCard title="Medicamentos (Claves en 0)">
            <h3>7%</h3>

            <div class="flex justify-center mb-4">
              <Chart type="pie" :data="chartData2" :options="chartOptions2" class="w-[65%]" />
            </div>

            <span class="text-xs"><b>Umbral:</b> Alerta si > 15%:</span>

            <div class="text-red-600 flex items-center gap-2 text-sm">
              <TrendingUp :size="15" />
              <span>+ 12 claves</span>
            </div>

            <span class="text-secondary text-xs">152 claves de 3,800</span>
          </InformativeCard>

          <InformativeCard title="Gestión de Incidencias" />

          <InformativeCard title="Tasa de Rotación de Personal">
            <h2 class="!mb-4">6.5%</h2>

            <span class="text-xs"><b>Umbral:</b> Alerta si > 7%:</span>

            <div class="text-red-600 flex items-center gap-2 text-sm">
              <TrendingUp :size="15" />
              <span>+ 8.2%</span>
            </div>

            <span class="text-secondary text-xs">Promedio Trimestral</span>
          </InformativeCard>

          <InformativeCard title="Abasto de Medicamentos Esenciales">
            <span class="text-green-500 font-semibold text-3xl mb-3">95%</span>

            <div class="py-5">
              <ProgressBar :value="95" class="!h-3 w-full" :show-value="false" />
            </div>

            <div class="text-xs text-secondary">Nivel de seguridad: >95%</div>
          </InformativeCard>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<style scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
</style>
