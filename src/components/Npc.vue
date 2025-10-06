<script setup lang="ts">
import type { NPC } from '@/utils/npc'
import { getImage } from '@/utils/utils'
import { ref } from 'vue'

const props = defineProps<{
  npc: NPC
  cell: number
  cellWidth: number
  cellHeight: number
}>()

const hover = ref(false)
</script>

<template>
  <div
    v-if="npc.position === cell"
    @mouseenter="hover = !hover"
    @mouseleave="hover = !hover"
    class="bg-contain bg-no-repeat bg-center cursor-pointer relative"
    :style="{
      backgroundImage: `url(${getImage('npcs', npc.image || '')})`,
      width: `${cellWidth}px`,
      height: `${cellHeight}px`,
    }"
  >
    <div
      v-if="hover"
      class="absolute -top-7 bg-black/70 font-bold p-2 whitespace-nowrap overflow-visible z-10"
    >
      {{ npc.name.french }}
    </div>
  </div>
</template>
