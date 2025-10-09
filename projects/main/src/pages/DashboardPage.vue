<script setup lang="ts">
import { AppLayout } from '@common/components'

const menuItems = [
  {
    icon: 'pi-heart-fill',
    label: 'Consultas',
    color: 'from-blue-500 to-blue-600',
    shadowColor: 'shadow-blue-500/20',
  },
  {
    icon: 'pi-clipboard',
    label: 'Diagnóstico',
    color: 'from-red-500 to-pink-600',
    shadowColor: 'shadow-red-500/20',
  },
  {
    icon: 'pi-wave-pulse',
    label: 'Tratamiento',
    color: 'from-green-500 to-emerald-600',
    shadowColor: 'shadow-green-500/20',
  },
  {
    icon: 'pi-book',
    label: 'Estudios',
    color: 'from-purple-500 to-purple-600',
    shadowColor: 'shadow-purple-500/20',
  },
  {
    icon: 'pi-folder',
    label: 'Catálogos',
    color: 'from-violet-500 to-violet-600',
    shadowColor: 'shadow-violet-500/20',
  },
  {
    icon: 'pi-clock',
    label: 'Horarios',
    color: 'from-cyan-500 to-blue-600',
    shadowColor: 'shadow-cyan-500/20',
  },
  {
    icon: 'pi-calendar',
    label: 'Agenda',
    color: 'from-amber-500 to-orange-600',
    shadowColor: 'shadow-amber-500/20',
  },
  {
    icon: 'pi-file',
    label: 'Documentos',
    color: 'from-teal-500 to-teal-600',
    shadowColor: 'shadow-teal-500/20',
  },
  {
    icon: 'pi-dollar',
    label: 'Receta',
    color: 'from-rose-500 to-pink-600',
    shadowColor: 'shadow-rose-500/20',
  },
]
</script>

<template>
  <AppLayout>
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <template v-for="(item, _index) in menuItems" :key="_index">
          <button
            :class="`group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl ${item.shadowColor} transition-all duration-300 hover:scale-105 hover:-translate-y-2`"
          >
            <div :class="`absolute inset-0 bg-gradient-to-br ${item.color} opacity-100`"></div>

            <div class="absolute inset-0 opacity-10">
              <div class="absolute -right-8 -top-8 w-32 h-32 bg-white rounded-full"></div>
              <div class="absolute -left-4 -bottom-4 w-24 h-24 bg-white rounded-full"></div>
            </div>

            <div class="relative p-6 flex flex-col items-center justify-center min-h-[160px]">
              <div
                class="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
              >
                <span class="pi text-white" :class="item.icon" />
              </div>

              <h3 class="text-xl font-bold !text-white text-center">{{ item.label }}</h3>
            </div>

            <div
              class="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-white/0 group-hover:to-white/10 transition-all duration-300"
            ></div>
          </button>
        </template>
      </div>
    </div>
  </AppLayout>
</template>
