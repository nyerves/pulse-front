<script setup lang="ts">
import { PageLayout } from '@/components'
import { ReporteDiarioIncidenciasService } from '@common/services'

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

const downloadTemplate = async () => {
  const res = await ReporteDiarioIncidenciasService.DownloadTemplate()

  console.log(res)
}
</script>

<template>
  <PageLayout title="Centro de Recursos">
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
              <Button label="Descargar" icon="pi pi-download" @click="downloadTemplate" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </PageLayout>
</template>
