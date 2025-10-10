<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import { useWindowSize } from '@vueuse/core'
import { ref, watch } from 'vue'
import SmallScreens from './components/SmallScreens.vue'

const { width, height } = useWindowSize()
const isScreenLargeEnough = ref<boolean>(true)
const isScreenTooLarge = ref<boolean>(false)

const minWidth = 1080
const minHeight = 650
const maxWidth = 3840
const maxHeight = 2160

watch(
  [width, height],
  () => {
    isScreenLargeEnough.value = width.value >= minWidth && height.value >= minHeight
    isScreenTooLarge.value = width.value > maxWidth || height.value > maxHeight
    console.log('isScreenLargeEnough', isScreenLargeEnough.value)
    console.log('isScreenTooLarge', isScreenTooLarge.value)
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="isScreenLargeEnough && !isScreenTooLarge">
    <Toaster position="top-center" richColors />
    <RouterView />
  </div>
  <div v-else>
    <SmallScreens />
  </div>
</template>
