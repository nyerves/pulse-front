<script setup lang="ts">
import { ref } from 'vue'
import type { Permission, PermissionAction } from '@common/models'

const props = defineProps<{
  permission: Permission
  actions: PermissionAction[]
}>()

const showActions = ref(false)
</script>

<template>
  <div class="card !mb-0 !p-2 !px-3 rounded-lg border border-gray-200">
    <div
      class="flex items-center my-1 justify-between cursor-pointer"
      @click="showActions = !showActions"
    >
      <div class="flex flex-col">
        <h6 class="font-medium !mb-1">{{ permission.name }}</h6>
        <p class="text-sm text-gray-500">0 de {{ props.actions.length }} acciones asignadas</p>
      </div>

      <i class="pi" :class="showActions ? 'pi-angle-up' : 'pi-angle-down'" />
    </div>

    <Transition name="layout-submenu">
      <div v-if="showActions" class="flex flex-col gap-3 mt-4 px-4">
        <template v-for="action in props.actions" :key="action.id">
          <div>
            <Checkbox :id="`${permission.id}-action-${action.id}`" :value="action.id" />
            <label :for="`${permission.id}-action-${action.id}`" class="ml-2">
              {{ action.name }}
            </label>
          </div>
        </template>
      </div>
    </Transition>
  </div>
</template>
