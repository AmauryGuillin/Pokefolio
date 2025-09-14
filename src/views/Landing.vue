<script setup lang="ts">
import GameSceneGrid from '@/components/GameSceneGrid.vue'
import { useMouse } from '@vueuse/core'
import { Toaster } from 'vue-sonner'

const { x, y } = useMouse()
</script>

<template>
  <div class="bg-black w-full h-screen text-white relative">
    <GameSceneGrid />
  </div>
</template>
