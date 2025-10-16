<script setup lang="ts">
import { PageLayout } from '@/components'
</script>

<template>
  <PageLayout title="Carga Reporte Diario">
    <div class="flex justify-center">
      <div class="card shadow-md border border-gray-200 w-[38rem]">
        <div>
          <h4 class="text-center !text-bold">Cargar Reporte Diario</h4>
        </div>

        <div class="space-y-6">
          <!-- Contenedor de vistas que cambian -->
          <div id="view-container">
            <!-- Vista 1: Dropzone (inicial) -->
            <div id="dropzone-view">
              <label
                for="file-input"
                id="drop-zone"
                class="relative block border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer transition-colors hover:border-teal-500 hover:bg-teal-50/50"
              >
                <div class="flex flex-col items-center justify-center space-y-4">
                  <i class="text-gray-400 pi pi-cloud-upload" style="font-size: 3.7rem" />
                  <p class="text-lg font-medium text-gray-700">Arrastra y suelta tu archivo aquí</p>
                  <p class="text-sm text-gray-500">o</p>
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
                />
              </label>
              <p class="text-center text-xs text-gray-400 mt-4">Solo se aceptan archivos .xlsx</p>
            </div>

            <!-- Vista 2: Archivo cargado (esperando subida) -->
            <div
              id="file-loaded-view"
              class="hidden relative border-2 border-dashed border-green-500 rounded-lg p-6 bg-green-50"
            >
              <div class="flex items-center gap-4">
                <div class="flex-shrink-0 bg-green-100 p-2 rounded-full">
                  <i data-lucide="check-circle-2" class="w-6 h-6 text-green-600"></i>
                </div>
                <p id="filename-loaded" class="font-semibold text-gray-700 text-left truncate">
                  Archivo_simulado.xlsx
                </p>
              </div>
            </div>

            <!-- Vista 3: Progreso y Validación -->
            <div id="progress-view" class="hidden">
              <div class="flex items-center gap-4 mb-4">
                <i data-lucide="file-spreadsheet" class="w-8 h-8 text-teal-600 flex-shrink-0"></i>
                <p id="filename-progress" class="font-semibold text-gray-700 truncate">
                  nombre_del_archivo.xlsx
                </p>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div
                  id="progress-bar"
                  class="bg-teal-500 h-2.5 rounded-full transition-all duration-500"
                  style="width: 0%"
                ></div>
              </div>
              <ul id="validation-steps" class="space-y-3 text-sm">
                <!-- Los pasos de validación se insertarán aquí dinámicamente -->
              </ul>
            </div>

            <!-- Vista 4: Resultados (Éxito o Error) -->
            <div id="results-view" class="hidden text-center">
              <!-- Mensaje de Éxito -->
              <div id="success-message" class="hidden">
                <div
                  class="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4"
                >
                  <i data-lucide="check" class="w-10 h-10 text-green-600"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-800">Validación Exitosa</h3>
                <p class="mt-2 text-gray-600">
                  El archivo ha sido procesado. Revisa el resumen antes de confirmar.
                </p>

                <!-- Contenedor para los resúmenes dinámicos -->
                <div id="summary-container" class="mt-6 text-left font-sans">
                  <!-- Plantilla para Resumen de Reporte Diario -->
                  <div id="daily-summary-template" class="hidden space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 class="text-lg font-bold text-gray-900 mb-4">Resumen de Ocupación</h3>
                        <div class="flex items-center justify-center gap-6">
                          <div class="relative w-40 h-40">
                            <canvas id="summary-chart-ocupacion"></canvas>
                          </div>
                          <div id="summary-ocupacion-legend" class="space-y-3">
                            <!-- Leyenda se genera dinámicamente -->
                          </div>
                        </div>
                      </div>
                      <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 class="text-lg font-bold text-gray-900 mb-4">Productividad del Día</h3>
                        <div
                          id="summary-productividad-grid"
                          class="grid grid-cols-2 gap-y-4 gap-x-2"
                        >
                          <!-- KPIs de productividad se generan dinámicamente -->
                        </div>
                      </div>
                    </div>
                    <div
                      id="summary-abasto-alert"
                      class="bg-yellow-50 border border-yellow-300 p-6 rounded-xl hidden"
                    >
                      <div class="flex items-start gap-4">
                        <i data-lucide="shield-alert" class="w-8 h-8 text-yellow-600 mt-1"></i>
                        <div>
                          <h3 class="text-lg font-bold text-yellow-900">¡Alerta de Abasto!</h3>
                          <p
                            class="text-4xl font-extrabold text-yellow-700 my-2"
                            id="summary-abasto-total"
                          >
                            0
                          </p>
                          <p class="text-sm text-yellow-800 mb-4">
                            Claves de medicamentos en cero.
                          </p>
                          <div
                            id="summary-abasto-breakdown"
                            class="flex flex-wrap gap-x-6 gap-y-2 text-sm"
                          >
                            <!-- Desglose de abasto se genera dinámicamente -->
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <h3 class="text-lg font-bold text-gray-900 mb-4">
                        Nuevas Incidencias Reportadas
                      </h3>
                      <ul id="summary-incidencias-list" class="space-y-4">
                        <!-- Incidencias se generan dinámicamente -->
                      </ul>
                    </div>
                  </div>

                  <!-- Plantilla para Resumen de Reporte Semanal -->
                  <div id="weekly-summary-template" class="hidden space-y-6">
                    <div>
                      <h3 class="text-xl font-bold text-gray-900 mb-4">
                        KPI de Salud Laboral (RRHH)
                      </h3>
                      <div id="summary-rrhh-grid" class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <!-- KPIs de RRHH se generan dinámicamente -->
                      </div>
                    </div>
                    <div>
                      <h3 class="text-xl font-bold text-gray-900 mb-4">
                        KPI de Eficiencia de Primer Nivel
                      </h3>
                      <div
                        id="summary-eficiencia-grid"
                        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                      >
                        <!-- KPIs de Eficiencia se generan dinámicamente -->
                      </div>
                    </div>
                  </div>
                </div>
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

          <!-- Botones de Acción (siempre visibles, pero su estado cambia) -->
          <div
            id="action-buttons"
            class="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100"
          >
            <button
              id="cancel-btn"
              class="px-6 py-2 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              id="submit-btn"
              class="px-6 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 disabled:bg-teal-300 disabled:cursor-not-allowed"
            >
              Subir Reporte
            </button>
            <!-- El botón de confirmación final reemplazará a los otros cuando sea necesario -->
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>
