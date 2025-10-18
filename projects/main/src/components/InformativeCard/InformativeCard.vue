<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{ title: string }>()

const chartData = ref()
const chartOptions = ref()

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
const getChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor,
        },
      },
    },
  }
}

onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = getChartOptions()
})
</script>

<template>
  <div
    class="card !p-4 shadow hover:shadow-md hover:-translate-y-0.5 duration-200 rounded-md cursor-pointer"
  >
    <div class="flex gap-2 items-center mb-4">
      <p class="text-secondary !mr-auto !mb-0 text-xs font-semibold">
        {{ title }}
      </p>

      <span class="pi pi-exclamation-circle" />

      <div class="bg-secondary-theme py-1 px-2 text-xs rounded text-secondary">CAP-01</div>
    </div>

    <div>
      <!-- <slot></slot> -->
      <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full max-w-[20rem]" />
    </div>
  </div>
</template>
