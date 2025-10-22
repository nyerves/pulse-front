<script setup lang="ts">
import { ref } from 'vue'
import { PageLayout } from '@/components'
import InformativeCard from '@/components/InformativeCard/InformativeCard.vue'

const dates = ref()

const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
])
</script>

<template>
  <PageLayout title="Tablero de Cumplimiento">
    <Card class="p-4">
      <template #title>
        <h4>Filtros de Cumplimiento</h4>
      </template>

      <template #content>
        <div class="grid md:grid-cols-4 grid-cols-2 gap-4">
          <div>
            <label for="dateFrom" class="block mb-2 font-medium">Fecha Desde</label>
            <Select
              fluid
              :options="cities"
              optionLabel="name"
              placeholder="Select a City"
              class="h-11"
            />
          </div>

          <div>
            <label for="dateFrom" class="block mb-2 font-medium">Fecha Desde</label>
            <Select
              :options="cities"
              optionLabel="name"
              placeholder="Select a City"
              fluid
              class="h-11"
            />
          </div>

          <div>
            <label for="dateFrom" class="block mb-2 font-medium">Fecha Desde</label>
            <Select
              :options="cities"
              optionLabel="name"
              placeholder="Select a City"
              fluid
              class="h-11"
            />
          </div>

          <div>
            <label for="dateFrom" class="block mb-2 font-medium">Fecha Desde</label>
            <DatePicker
              v-model="dates"
              fluid
              class="h-11"
              selectionMode="range"
              :manualInput="false"
              update-model-type="string"
            />
          </div>
        </div>

        <div class="mt-7 flex justify-end gap-2">
          <Button label="Limpiar Filtros" severity="secondary" />
          <Button label="Aplicar Filtros" icon="pi pi-search" />
        </div>
      </template>
    </Card>

    <div class="grid mt-6 md:grid-cols-5 grid-cols-1 gap-4">
      <InformativeCard title="Nivel de Cumplimiento" class="col-span-2" />
      <InformativeCard title="Nivel de Cumplimiento" />
      <InformativeCard title="Nivel de Cumplimiento" />
      <InformativeCard title="Nivel de Cumplimiento" />
    </div>
  </PageLayout>
</template>
