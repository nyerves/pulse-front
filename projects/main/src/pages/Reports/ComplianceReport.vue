<script setup lang="ts">
import { TrendingUp, TrendingDown, List } from 'lucide-vue-next'
import { PageLayout, InformativeCard } from '@/components'

const cardList = [
  { title: 'Reportes en Periodo', value: '784', status: true, prevValue: '+10%' },
  { title: 'Próximos a Vencer', value: '9', status: true, prevValue: '-5%' },
  { title: 'Reportes Incumplidos', value: '147', status: false, prevValue: '+2%' },
]
</script>

<template>
  <PageLayout title="Tablero de Cumplimiento">
    <Card class="p-3">
      <template #title>
        <h5>Filtros de Cumplimiento</h5>
      </template>

      <template #content>
        <div class="grid md:grid-cols-4 grid-cols-2 gap-4 py-3">
          <div>
            <label for="dateFrom" class="text-sm block mb-2 font-medium">Tipo de reporte</label>
            <Select
              fluid
              checkmark
              :highlightOnSelect="false"
              class="h-11"
              model-value="all"
              optionLabel="name"
              :options="[
                { name: 'Todos', value: 'all' },
                { name: 'Diario', value: 'daily' },
                { name: 'Semanal', value: 'weekly' },
              ]"
            />
          </div>

          <div>
            <label for="dateFrom" class="text-sm block mb-2 font-medium">Estado</label>
            <Select
              fluid
              checkmark
              :highlightOnSelect="false"
              optionLabel="name"
              class="h-11"
              :options="[
                { name: 'Todos', value: 'all' },
                { name: 'Completados', value: 'done' },
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
            <label for="dateFrom" class="text-sm block mb-2 font-medium">Fecha Desde</label>
            <DatePicker
              fluid
              class="h-11"
              selectionMode="range"
              :manualInput="false"
              update-model-type="string"
            />
          </div>
        </div>

        <div class="border-t border-gray-200 pt-4 flex justify-end gap-2">
          <Button label="Limpiar Filtros" severity="secondary" />
          <Button label="Aplicar Filtros" icon="pi pi-search" />
        </div>
      </template>
    </Card>

    <div class="grid mt-11 md:grid-cols-5 grid-cols-1 gap-4">
      <InformativeCard title="Nivel de Cumplimiento" class="col-span-2" />

      <template v-for="(data, _index) in cardList" :key="_index">
        <div>
          <Card>
            <template #title>
              <h5 class="!font-semibold">{{ data.title }}</h5>
            </template>

            <template #content>
              <div>
                <h1>{{ data.value }}</h1>

                <div
                  class="mt-2 flex items-center gap-2"
                  :class="data.status ? 'text-green-500' : 'text-red-500'"
                >
                  <component :is="data.status ? TrendingUp : TrendingDown" />
                  <span> {{ data.prevValue }} vs periodo anterior </span>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </template>
    </div>

    <!-- Tabla de Detalle -->
    <div
      class="card !p-2 shadow hover:shadow-md hover:-translate-y-0.5 duration-200 rounded-md cursor-pointer overflow-hidden"
    >
      <div class="p-6 border-b border-gray-200">
        <h5 class="text-lg font-bold text-gray-800">Detalle de Reportes</h5>
      </div>

      <div class="p-4 border-b border-gray-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <List class="w-4 h-4 text-gray-500" />
          <span class="text-sm text-gray-600"><span id="compliance-count">0</span> resultados</span>
        </div>

        <div class="flex items-center gap-2">
          <InputText id="compliance-search" placeholder="Buscar..." class="w-64 h-11" />
        </div>
      </div>

      <div class="overflow-x-auto pb-2">
        <div class="inline-block min-w-full align-middle">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-secondary-theme">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Fecha Reporte
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Hospital
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Director Responsable
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Tipo
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Fecha Límite
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Estado
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    scope="col"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody id="compliance-table-body" class="bg-white divide-y divide-gray-200">
                <!-- Las filas se generarán dinámicamente -->
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">22/10/2025</td>

                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">H.G. Valladolid</td>

                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <div class="flex items-center gap-3">
                      <Avatar
                        image="https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child-thumbnail.png"
                        class="mr-2"
                        size="normal"
                        shape="circle"
                      />
                      <span>B. Castillo</span>
                    </div>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Diario</td>

                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">30/10/2025</td>

                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <Tag
                      pt:root="!font-normal"
                      icon="pi pi-check-circle"
                      severity="success"
                      value="Success"
                      rounded
                    />
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button label="Ver Detalle" icon="pi pi-eye" variant="text" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>
