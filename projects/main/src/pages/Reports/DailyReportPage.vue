<script setup lang="ts">
import { LoadReportCard, PageLayout } from '@/components'
</script>

<template>
  <PageLayout title="Carga Reporte Diario">
    <div class="flex justify-center">
      <LoadReportCard title="Reporte Diario" frequency="Diaria" />
    </div>
  </PageLayout>
</template>
