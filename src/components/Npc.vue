<script setup lang="ts">
import type { NPC } from '@/utils/npc'
import { getImage } from '@/utils/utils'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  npc: NPC
  cell: number
  cellWidth: number
  cellHeight: number
  mayorDone: boolean
}>()

const hover = ref(false)
const npcName =
  sessionStorage.getItem('UserLanguage') === 'French'
    ? props.npc.name.french
    : props.npc.name.english
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
      class="absolute -top-7 left-[50%] translate-x-[-50%] bg-black/70 font-bold p-2 whitespace-nowrap overflow-visible z-20"
    >
      {{ npcName }}
    </div>
    <div
      v-if="npc.id === 4 && !mayorDone"
      class="absolute -top-10 left-[53%] translate-x-[-50%] p-2 z-10 text-[#fbff00] animate-bounce xl:text-xl 2xl:text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
    >
      <span>!</span>
    </div>
  </div>
</template>
