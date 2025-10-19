<script setup lang="ts">
import { computed } from 'vue'
import { PageLayout } from '@/components'
import InformativeCard from '../InformativeCard/InformativeCard.vue'

const tabOptions = computed(() => [
  { label: 'Resumen General', value: '0' },
  { label: 'Capacidad y Ocupación', value: '1' },
  { label: 'Productividad', value: '2' },
  { label: 'Recursos e Infraestructura', value: '3' },
  { label: 'Flujos de Pacientes', value: '4' },
  { label: 'Salud Laboral (RRHH)', value: '5' },
  { label: 'Eficiencia (1er Nivel)', value: '6' },
])
</script>

<template>
  <PageLayout
    title="Dashboard Estratégico"
    description="Consolidado de 11 Hospitales | Octubre 2025"
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
          <InformativeCard title="Ocupación Hospitalaria General" class="xl:col-span-2" />
          <InformativeCard title="Productividad Quirúrgica" />
          <InformativeCard title="Abasto de Medicamentos (Claves en Cero)" />
          <InformativeCard title="Gestión de Incidencias" />
          <InformativeCard title="Tasa de Rotación de Personal" />
        </div>
      </div>
    </div>
  </PageLayout>
</template>
