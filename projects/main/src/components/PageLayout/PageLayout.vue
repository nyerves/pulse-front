<script setup lang="ts">
import { ref } from 'vue'
import { ModalLayout } from '@common/components'
import { FileText } from 'lucide-vue-next'

defineProps<{
  title: string
  description?: string
  descriptionModal?: string
}>()

const showDescriptionModal = ref(false)

const handleDescriptionModal = () => {
  showDescriptionModal.value = !showDescriptionModal.value
}
</script>

<template>
  <div class="flex flex-col h-full w-full p-9 sm:px-12 overflow-auto">
    <div class="flex items-center justify-between mb-6 gap-3">
      <div class="mr-auto max-w-[65%] overflow-auto">
        <div class="flex items-center gap-1 mb-2">
          <h2 class="font-bold">{{ title }}</h2>

          <Button
            v-if="descriptionModal"
            icon="pi pi-info-circle"
            variant="text"
            rounded
            @click="handleDescriptionModal"
          />

          <template v-if="showDescriptionModal">
            <ModalLayout width="50%" icon hide-save-btn @close="handleDescriptionModal">
              <template #header>
                <div class="flex items-center gap-2">
                  <div class="!p-2 bg-teal-100 rounded-full">
                    <FileText :size="16" class="text-teal-700" />
                  </div>

                  <h5 style="margin: unset">{{ title }}</h5>
                </div>
              </template>

              <p>{{ descriptionModal }}</p>
            </ModalLayout>
          </template>
        </div>

        <template v-if="description">
          <p class="text-secondary">{{ description }}</p>
        </template>
      </div>

      <slot name="actions"></slot>
    </div>

    <div>
      <slot></slot>
    </div>
  </div>
</template>
