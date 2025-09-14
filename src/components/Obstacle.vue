<script setup lang="ts">
defineProps<{
  showObstacles: boolean
  cellWidth: number
  cellHeight: number
}>()
</script>

<template>
  <div
    class="absolute bg-contain bg-no-repeat bg-center cursor-default"
    :style="{
      backgroundColor: `${showObstacles ? 'red' : ''}`,
      width: `${cellWidth}px`,
      height: `${cellHeight}px`,
    }"
  >
    <!-- {{ cell }} -->
  </div>
</template>
