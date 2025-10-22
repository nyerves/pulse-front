<script setup lang="ts">
import { PageLayout } from '@/components'
</script>

<template>
  <PageLayout
    title="Gestión de Casos de Rezago"
    description="Registra y da seguimiento a pacientes en lista de espera para cirugías, estudios diagnósticos y consultas de especialidad."
  >
    <template #actions>
      <Button label="Registrar Nuevo Caso de Rezago" icon="pi pi-plus" />
    </template>

    <div class="flex flex-col gap-9">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <template v-for="_i in 4" :key="_i">
          <Card class="p-1">
            <template #subtitle>
              <span class="text-sm">Total de Casos Registrados</span>
            </template>

            <template #content>
              <div class="text-4xl font-semibold">150</div>
            </template>
          </Card>
        </template>
      </div>

      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText
          placeholder="Buscar por CURP, Nombre, Diagnóstico, Hospital, etc."
          class="w-full h-14"
        />
      </IconField>
    </div>
  </PageLayout>
</template>
