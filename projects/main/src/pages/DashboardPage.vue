<script setup lang="ts">
import { useToast } from 'primevue'
import { AppLayout } from '@common/components'

const toast = useToast()

function showSuccess() {
  toast.add({
    summary: 'Success Message',
    detail: 'Message Detail',
    life: 3000,
  })
}
</script>

<template>
  <AppLayout>
    <p>Component</p>

    <Button @click="showSuccess()" label="Success" severity="success" />

    <h6>
      adsadasdas das Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae voluptatem
      voluptate nihil sed, omnis quaerat molestias veritatis fugiat dicta magni laudantium adipisci
      et beatae consequuntur quidem voluptatum! Laboriosam, exercitationem fugit!
    </h6>
  </AppLayout>
</template>
