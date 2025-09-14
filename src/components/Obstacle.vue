<script setup lang="ts">
defineProps<{
  cell: number
  showObstacles: boolean
  showCellNumber: boolean
  cellWidth: number
  cellHeight: number
}>()
</script>

<template>
  <div
    class="absolute bg-contain bg-no-repeat bg-center cursor-default flex justify-center items-center"
    :style="{
      backgroundColor: `${showObstacles ? 'red' : ''}`,
      width: `${cellWidth}px`,
      height: `${cellHeight}px`,
    }"
  >
    <div v-if="showCellNumber">{{ cell }}</div>
  </div>
</template>
