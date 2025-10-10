<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import { useWindowSize } from '@vueuse/core'
import { ref, watch } from 'vue'

const { width, height } = useWindowSize()
const isScreenLargeEnough = ref<boolean>(true)

const minWidth = 900
const minHeight = 600

watch(
  [width, height],
  () => {
    isScreenLargeEnough.value = width.value >= minWidth && height.value >= minHeight
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="isScreenLargeEnough">
    <Toaster position="top-center" richColors />
    <RouterView />
  </div>
  <div v-else class="flex justify-center items-center h-screen bg-gray-800">
    <p class="bg-black/75 text-white font-bold p-2">
      For an optimal experience, please use a bigger screen.
    </p>
  </div>
</template>
