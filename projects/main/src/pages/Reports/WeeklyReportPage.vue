<script setup lang="ts">
import { PageLayout } from '@/components'
import { LoadReportCard } from '@/components'
</script>

<template>
  <PageLayout title="Cargar Reporte Semanal">
    <div class="flex justify-center">
      <LoadReportCard title="Reporte Semanal" frequency="Semanal" />
    </div>
  </PageLayout>
</template>
