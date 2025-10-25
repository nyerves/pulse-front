<script setup lang="ts">
import { PageLayout } from '@/components'
import { LoadReportCard } from '@/components'
</script>

<template>
  <PageLayout
    title="Cargar Reporte Semanal"
    description-modal="Utilice la plantilla INT-PULSE-003. La carga corresponde al personal administrativo."
  >
    <div class="flex justify-center">
      <LoadReportCard title="Reporte Semanal" frequency="Semanal" />
    </div>
  </PageLayout>
</template>
