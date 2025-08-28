<script setup lang="ts">
defineProps<{
  playerImage: string
  playerRow: number
  playerCol: number
  cellHeight: number
  cellWidth: number
}>()
</script>

<template>
  <div
    class="absolute transition-all duration-300 ease-in-out z-10 bg-contain bg-no-repeat bg-center"
    :style="{
      backgroundImage: `url(src/assets/player/${playerImage})`,
      top: `${playerRow * cellHeight}px`,
      left: `${playerCol * cellWidth}px`,
      width: `${cellWidth}px`,
      height: `${cellHeight}px`,
    }"
  />
</template>
