<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Permission, PermissionAction, RolePermission } from '@common/models'

const rolePermissionModel = defineModel<RolePermission[]>({ default: [] })
const props = defineProps<{
  permission: Permission
  actions: PermissionAction[]
}>()

const showActions = ref(false)

const actionsSelected = computed({
  get() {
    const rolePermission = rolePermissionModel.value?.find(
      (x) => x.permissionId === props.permission.id,
    )
    return rolePermission?.actionIds || []
  },
  set(value: number[]) {
    const rolePermission = rolePermissionModel.value?.find((x) => {
      return x.permissionId === props.permission.id
    })

    if (rolePermission) {
      rolePermission.actionIds = value
    } else {
      rolePermissionModel.value.push({
        parentId: 0,
        actionIds: value,
        permissionId: props.permission.id,
      })
    }
  },
})
</script>

<template>
  <div class="card !mb-0 !p-2 !px-3 border border-gray-200 shadow">
    <div
      class="flex items-center my-1 justify-between cursor-pointer"
      @click="showActions = !showActions"
    >
      <div class="flex flex-col">
        <h6 class="font-medium !mb-1">{{ permission.name }}</h6>
        <p class="text-sm text-gray-500">
          {{ actionsSelected.length }} de {{ props.actions.length }} acciones asignadas
        </p>
      </div>

      <i class="pi" :class="showActions ? 'pi-angle-up' : 'pi-angle-down'" />
    </div>

    <Transition name="layout-submenu">
      <div v-if="showActions" class="flex flex-col gap-3 mt-4 px-4">
        <template v-for="action in props.actions" :key="action.id">
          <div>
            <Checkbox v-model="actionsSelected" :value="action.id" :inputId="action.name" />

            <label :for="action.name" class="ml-2">
              {{ action.name }}
            </label>
          </div>
        </template>
      </div>
    </Transition>
  </div>
</template>
