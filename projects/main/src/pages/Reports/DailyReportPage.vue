<script setup lang="ts">
import { LoadReportCard, PageLayout } from '@/components'
</script>

<template>
  <PageLayout
    title="Carga Reporte Diario"
    description-modal="Utilice la plantilla INT-PULSE-001. La carga es responsabilidad del Director del Hospital."
  >
    <div class="flex justify-center">
      <LoadReportCard title="Reporte Diario" frequency="Diaria" />
    </div>
  </PageLayout>
</template>
