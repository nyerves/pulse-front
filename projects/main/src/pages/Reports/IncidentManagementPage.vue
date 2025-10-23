<script setup lang="ts">
import { PageLayout } from '@/components'
</script>

<template>
  <PageLayout title="Gestión de Incidencias">
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
  </PageLayout>
</template>
