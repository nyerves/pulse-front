<script setup lang="ts">
import { PageLayout } from '@/components'

const cardList = [
  {
    title: 'Incidencias Totales',
    value: '24',
    status: null,
    valueColor: 'text-green-700',
    bgColor: 'bg-blue-100/50',
  },
  {
    title: 'Criticas (> 72 h)',
    value: '15',
    status: 'En Proceso',
    valueColor: 'text-red-500',
    bgColor: 'bg-green-100/50',
  },
  {
    title: 'Antigüedad Alta',
    value: '8',
    status: 'Asignado',
    valueColor: 'text-yellow-500',
    bgColor: 'bg-yellow-100/50',
  },
  {
    title: 'Recientes (< 24 h)',
    value: '120',
    status: 'Nuevo',
    valueColor: 'text-green-700',
    bgColor: 'bg-purple-100/50',
  },
]
</script>

<template>
  <PageLayout
    title="Gestión de Incidencias"
    description-modal="Este módulo centraliza todas las incidencias reportadas. Permite filtrar, ordenar y gestionar cada incidencia para su seguimiento y resolución."
  >
    <div class="card p-3 shadow">
      <div class="flex justify-between mb-5 w-full">
        <h5>Filtros de Incidencias</h5>
        <Button label="Reportar Nueva Incidencia" icon="pi pi-plus-circle" />
      </div>

      <div class="grid md:grid-cols-4 grid-cols-2 gap-4 py-3">
        <div>
          <label for="dateFrom" class="text-sm block mb-2 font-medium">Estado</label>
          <Select
            fluid
            checkmark
            :highlightOnSelect="false"
            class="h-11"
            model-value="all"
            optionLabel="name"
            :options="[
              { name: 'Nuevo', value: 'all' },
              { name: 'Asignado', value: 'daily' },
              { name: 'En Proceso', value: 'weekly' },
              { name: 'Resuelta', value: 'resolved' },
            ]"
          />
        </div>

        <div>
          <label for="dateFrom" class="text-sm block mb-2 font-medium">Categoría</label>
          <Select
            fluid
            checkmark
            :highlightOnSelect="false"
            optionLabel="name"
            class="h-11"
            :options="[
              { name: 'Climatización', value: 'all' },
              { name: 'Comestibles TI', value: 'done' },
              { name: 'Pendiente', value: 'pending' },
              { name: 'Incompleto', value: 'incomplete' },
            ]"
          />
        </div>

        <div>
          <label for="dateFrom" class="text-sm mb-2 block font-medium">Hospital</label>
          <MultiSelect
            filter
            fluid
            display="chip"
            optionLabel="name"
            :maxSelectedLabels="3"
            class="w-full h-11"
            :options="[
              { name: `H.G. O'Horán`, code: 'HA' },
              { name: 'H.G. Valladolid', code: 'HB' },
              { name: 'H.G. Tizimín', code: 'HC' },
              { name: 'H. Materno Infantil', code: 'HD' },
              { name: 'H. de la Amistad', code: 'HE' },
            ]"
          />
        </div>

        <div>
          <label for="dateFrom" class="text-sm block mb-2 font-medium">Antigüedad (horas)</label>
          <Select
            fluid
            checkmark
            :highlightOnSelect="false"
            optionLabel="name"
            class="h-11"
            :options="[
              { name: 'Cualquiera', value: 'all' },
              { name: 'Comestibles TI', value: 'done' },
              { name: 'Pendiente', value: 'pending' },
              { name: 'Incompleto', value: 'incomplete' },
            ]"
          />
        </div>
      </div>

      <div class="border-t border-gray-200 pt-4 flex justify-end gap-2">
        <Button label="Limpiar Filtros" severity="secondary" />
        <Button label="Aplicar Filtros" icon="pi pi-search" />
      </div>
    </div>

    <div class="py-12 grid grid-cols-2 md:grid-cols-4 gap-4">
      <template v-for="card in cardList" :key="card.title">
        <div class="card shadow h-44">
          <h5>{{ card.title }}</h5>

          <p :class="`text-4xl font-bold ${card.valueColor}`">{{ card.value }}</p>

          <div>
            <p class="text-sm">{{ card.status ? `Estatus: ${card.status}` : 'En el Periodo' }}</p>
          </div>
        </div>
      </template>
    </div>
  </PageLayout>
</template>
