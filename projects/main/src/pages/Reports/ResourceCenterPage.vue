<script setup lang="ts">
import { ref } from 'vue'
import { PageLayout } from '@/components'
import { DailyReportService } from '@common/services/DailyReportService'

const indexLoading = ref(-1)
const resourcesList = [
  {
    title: 'Reporte Diario de Operaciones (INT-PULSE-001)',
    description: 'Reporte diario para el seguimiento de actividades operativas criticas.',
    frequency: 'Diario',
    lastUpdated: '15 de Junio de 2024',
    severity: 'info',
    fileName: 'reporte_diario_operaciones_INT-PULSE-001.pdf',
  },
  {
    title: 'Reporte Semanal de Rendimiento (INT-PULSE-002)',
    description: 'Reporte semanal para evaluar el rendimiento de los sistemas y procesos.',
    frequency: 'Semanal',
    lastUpdated: '10 de Junio de 2024',
    severity: 'success',
    fileName: 'reporte_semanal_rendimiento_INT-PULSE-002.pdf',
  },
]

const downloadTemplate = async (index: number) => {
  try {
    indexLoading.value = index
    const res = await DailyReportService.DownloadAllTemplates()
    console.log(res)

    const blob = new Blob([res])

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = resourcesList[index]!.fileName + '.xlsx'
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  } finally {
    indexLoading.value = -1
  }
}
</script>

<template>
  <PageLayout
    title="Centro de Recursos"
    description-modal="Desde aquí puede descargar las últimas versiones de las plantillas oficiales (.xlsx) necesarias para la carga de reportes. Es crucial utilizar siempre la versión más reciente para evitar errores de validación."
  >
    <div class="flex flex-col">
      <template v-for="(resource, _index) in resourcesList" :key="_index">
        <div class="card w-full shadow hover:shadow-md">
          <div class="flex justify-between items-center">
            <div class="flex flex-col gap-2">
              <h5 class="!font-semibold">{{ resource.title }}</h5>
              <p class="text-secondary text-sm !mb-0">
                {{ resource.description }}
              </p>

              <div>
                <Tag
                  pt:root="!font-semibold !text-xs"
                  rounded
                  :value="resource.frequency"
                  class="mr-2"
                  :severity="resource.severity"
                />

                <span class="text-secondary text-xs">
                  Última Actualización: {{ resource.lastUpdated }}
                </span>
              </div>
            </div>

            <div>
              <Button
                :loading="indexLoading === _index"
                :disabled="indexLoading !== -1"
                label="Descargar"
                icon="pi pi-download"
                @click="downloadTemplate(_index)"
              />
            </div>
          </div>
        </div>
      </template>
    </div>
  </PageLayout>
</template>
