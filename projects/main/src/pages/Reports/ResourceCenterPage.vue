<script setup lang="ts">
import { PageLayout } from '@/components'
</script>

<template>
  <PageLayout title="Centro de Recursos">
    <div class="flex flex-col">
      <div class="card w-full shadow hover:shadow-md">
        <div class="flex justify-between items-center">
          <div class="flex flex-col gap-1">
            <h5 class="font-semibold">Reporte Diario de Operaciones (INT-PULSE-001)</h5>
            <p class="text-secondary text-sm">
              Reporte diario para el seguimiento de actividades operativas criticas.
            </p>

            <div>
              <Tag rounded value="Diario" class="mr-2" severity="info" />

              <span class="text-secondary text-xs">
                Última Actualización: 15 de Junio de 2024
              </span>
            </div>
          </div>

          <div>
            <Button label="Descargar" icon="pi pi-download" />
          </div>
        </div>
      </div>

      <div class="card w-full shadow hover:shadow-md">
        <div class="flex justify-between items-center">
          <div class="flex flex-col gap-1">
            <h5 class="font-semibold">Reporte Semanal de Rendimiento (INT-PULSE-002)</h5>
            <p class="text-secondary text-sm">
              Reporte semanal para evaluar el rendimiento de los sistemas y procesos.
            </p>

            <div>
              <Tag rounded value="Semanal" class="mr-2" severity="success" />

              <span class="text-secondary text-xs">
                Última Actualización: 10 de Junio de 2024
              </span>
            </div>
          </div>

          <div>
            <Button label="Descargar" icon="pi pi-download" />
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>
