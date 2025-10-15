<script setup lang="ts">
import { computed } from 'vue'
import { PageLayout } from '@/components'

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
      <Button severity="secondary" raised icon="pi pi-filter" label="Filtrar Hospitales" />
      <Button raised icon="pi pi-download" label="Generar Reporte Consolidado" />
    </template>

    <div>
      <Tabs value="0">
        <TabList pt:root="!bg-transparent">
          <template v-for="tab in tabOptions" :key="tab.value">
            <Tab pt:root="text-sm !font-normal" :value="tab.value">{{ tab.label }}</Tab>
          </template>
        </TabList>

        <TabPanels pt:root="!bg-transparent">
          <TabPanel value="0">
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </TabPanel>
          <TabPanel value="1">
            <p class="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
              sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
              modi.
            </p>
          </TabPanel>
          <TabPanel value="2">
            <p class="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
              voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
              occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
              mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
              expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
              nihil impedit quo minus.
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </PageLayout>
</template>
