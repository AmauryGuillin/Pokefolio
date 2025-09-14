<script setup lang="ts">
import type { NPC } from '@/utils/npc'
import { getImage } from '@/utils/utils'

defineProps<{
  npc: NPC
  cell: number
  cellWidth: number
  cellHeight: number
}>()
</script>

<template>
  <div
    v-if="npc.position === cell"
    class="absolute bg-contain bg-no-repeat bg-center cursor-pointer"
    :style="{
      backgroundImage: `url(${getImage('npcs', npc.image || '')})`,
      width: `${cellWidth}px`,
      height: `${cellHeight}px`,
    }"
  ></div>
</template>
