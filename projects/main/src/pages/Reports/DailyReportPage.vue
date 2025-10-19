<script setup lang="ts">
import { ref } from 'vue'
import { PageLayout } from '@/components'
import { SuccessModal } from '@common/components'

const fileXlsx = ref<File>()
const showSuccessModal = ref(false)
const loadFileProcess = ref(0)
const reportStep = ref<'file-loaded' | 'progress' | 'loaded'>('file-loaded')

const onChangeFile = (event: Event) => {
  const target = event.target as HTMLInputElement

  if (target.files && target.files.length > 0) {
    fileXlsx.value = target.files[0]
    reportStep.value = 'file-loaded'
  }
}
const onLoadReport = () => {
  if (fileXlsx.value) {
    reportStep.value = 'progress'

    const simulateLoading = setInterval(() => {
      loadFileProcess.value += 10

      if (loadFileProcess.value >= 100) {
        clearInterval(simulateLoading)

        setTimeout(() => {
          reportStep.value = 'loaded'
          loadFileProcess.value = 0
        }, 1000)
      }
    }, 300)
  }
}
</script>

<template>
  <template v-if="showSuccessModal">
    <SuccessModal width="34rem" @close="showSuccessModal = false" />
  </template>

  <PageLayout title="Carga Reporte Diario">
    <div class="flex justify-center">
      <div class="card shadow-md border border-gray-200 w-[44rem]">
        <div>
          <h4 class="text-center !text-bold">
            {{ reportStep === 'loaded' ? 'Carga de' : 'Resumen' }} Reporte Diario
          </h4>
        </div>

        <div class="space-y-6">
          <!-- Contenedor de vistas que cambian -->
          <div id="view-container">
            <!-- Vista 1: Dropzone (inicial) -->
            <div v-if="!fileXlsx">
              <label
                for="file-input"
                id="drop-zone"
                class="relative block border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer transition-colors hover:border-teal-500 hover:bg-teal-50/50"
              >
                <div class="flex flex-col items-center justify-center space-y-4">
                  <i class="text-gray-400 pi pi-cloud-upload" style="font-size: 3.7rem" />
                  <p class="text-lg font-medium">Arrastra y suelta tu archivo aquí</p>
                  <p class="text-sm">o</p>

                  <span
                    class="px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
                  >
                    Seleccionar Archivo
                  </span>
                </div>

                <input
                  id="file-input"
                  type="file"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  @change="onChangeFile"
                />
              </label>

              <p class="text-center text-xs text-secondary !mt-4">Solo se aceptan archivos .xlsx</p>
            </div>

            <div v-else>
              <!-- Resumen del Reporte -->
              <div id="report-header-card" class="mb-8">
                <!-- Plantilla para Reporte Diario -->
                <div
                  id="daily-header-card"
                  class="bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  <dl class="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm">
                    <div>
                      <dt class="text-xs text-gray-500">Identificador</dt>
                      <dd class="font-semibold text-gray-800 font-mono">INT-PULSE-001</dd>
                    </div>
                    <div>
                      <dt class="text-xs text-gray-500">Responsable</dt>
                      <dd class="font-semibold text-gray-800">Director de Hospital</dd>
                    </div>
                    <div>
                      <dt class="text-xs text-gray-500">Frecuencia</dt>
                      <dd class="font-semibold text-gray-800">Diaria</dd>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <dt class="text-xs text-gray-500">Hospital</dt>
                      <dd id="header-hospital-daily" class="font-semibold text-gray-800">
                        H.G. O'Horán
                      </dd>
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                      <dt class="text-xs text-gray-500">Fecha de Reporte</dt>
                      <dd id="header-date-daily" class="font-semibold text-gray-800">--</dd>
                    </div>
                    <div class="col-span-2 sm:col-span-3">
                      <dt class="text-xs text-gray-500">Contenido</dt>
                      <dd class="text-gray-700">Ocupación, Productividad, Abasto, Incidencias.</dd>
                    </div>
                  </dl>
                </div>

                <!-- Plantilla para Reporte Semanal -->
                <div
                  id="weekly-header-card"
                  class="hidden bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  <dl class="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm">
                    <div>
                      <dt class="text-xs text-gray-500">Identificador</dt>
                      <dd class="font-semibold text-gray-800 font-mono">INT-PULSE-003</dd>
                    </div>
                    <div>
                      <dt class="text-xs text-gray-500">Responsable</dt>
                      <dd class="font-semibold text-gray-800">Administrativo</dd>
                    </div>
                    <div>
                      <dt class="text-xs text-gray-500">Frecuencia</dt>
                      <dd class="font-semibold text-gray-800">Semanal</dd>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <dt class="text-xs text-gray-500">Hospital</dt>
                      <dd id="header-hospital-weekly" class="font-semibold text-gray-800">
                        H.G. O'Horán
                      </dd>
                    </div>
                    <div class="col-span-2 sm:col-span-2">
                      <dt class="text-xs text-gray-500">Periodo del Reporte</dt>
                      <dd id="header-date-weekly" class="font-semibold text-gray-800">--</dd>
                    </div>
                    <div class="col-span-2 sm:col-span-3">
                      <dt class="text-xs text-gray-500">Contenido</dt>
                      <dd class="text-gray-700">Salud Laboral (RRHH), Eficiencia 1er Nivel.</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <!-- Vista 1: Archivo cargado correctamente -->
              <div
                v-if="reportStep === 'file-loaded'"
                class="relative border-2 border-dashed border-green-500 rounded-lg p-6 bg-green-50"
              >
                <div class="flex items-center gap-4">
                  <div class="flex-shrink-0 bg-green-100 p-2 rounded-full">
                    <i class="text-green-600 pi pi-check-circle"></i>
                  </div>

                  <p id="filename-loaded" class="font-semibold text-secondary text-left truncate">
                    {{ fileXlsx?.name }}
                  </p>
                </div>
              </div>

              <!-- Vista 2: Progreso y Validación -->
              <div v-else-if="reportStep === 'progress'">
                <div class="flex items-center gap-4 mb-4">
                  <i class="pi pi-file-excel text-teal-600 flex-shrink-0" />
                  <p id="filename-progress" class="font-semibold text-gray-700 truncate">
                    {{ fileXlsx?.name ?? 'Excel file.xlsx' }}
                  </p>
                </div>

                <div class="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                  <ProgressBar :value="loadFileProcess" :show-value="false" class="!h-3.5" />
                </div>

                <ul id="validation-steps" class="space-y-3 text-sm">
                  <!-- Los pasos de validación se insertarán aquí dinámicamente -->
                </ul>
              </div>

              <!-- Vista 3: Resultados (Éxito o Error) -->
              <div v-else-if="reportStep === 'loaded'" class="text-center">
                <!-- Mensaje de Éxito -->
                <div id="success-message">
                  <div
                    class="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4"
                  >
                    <i class="pi pi-check text-green-600 !font-bold" style="font-size: 1.5rem" />
                  </div>

                  <h5 class="font-bold">Validación Exitosa</h5>
                  <p class="mt-2 text-secondary text-sm">
                    El archivo ha sido procesado. Revisa el resumen antes de confirmar.
                  </p>
                </div>

                <!-- Mensaje de Error -->
                <div id="error-message" class="hidden">
                  <div
                    class="mx-auto w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mb-4"
                  >
                    <i data-lucide="alert-triangle" class="w-10 h-10 text-red-600"></i>
                  </div>
                  <h3 class="text-xl font-bold text-gray-800">Error en la Validación</h3>
                  <p
                    id="error-details"
                    class="mt-2 text-gray-600 bg-red-50 p-3 rounded-md border border-red-200"
                  >
                    No se pudo procesar el archivo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            id="action-buttons"
            class="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100"
          >
            <template v-if="reportStep === 'loaded'">
              <Button class="w-full font-semibold !text-sm" @click="showSuccessModal = true">
                Confirmar y Finalizar carga
              </Button>
            </template>

            <template v-else>
              <Button severity="secondary" variant="outlined"> Cancelar </Button>

              <Button :disabled="!fileXlsx" class="font-semibold" @click="onLoadReport">
                Subir Reporte
              </Button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>
