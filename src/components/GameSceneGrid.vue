<script setup lang="ts">
import { calculatePath } from '@/utils/pathFinding'
import { useWindowSize } from '@vueuse/core'
import { ref, computed, nextTick } from 'vue'
import Player from './Player.vue'
import TypeIt from 'typeit'

/*
    Grid management
*/
const { width, height } = useWindowSize()
const numRows = 15
const numCols = 20

const cellHeight = computed(() => Math.floor(height.value / numRows))
const cellWidth = computed(() => Math.floor(width.value / numCols))

const gridSize = computed(() => ({
  rows: numRows,
  cols: numCols,
}))

const cells = computed(() => {
  return Array.from({ length: gridSize.value.rows * gridSize.value.cols }, (_, i) => i + 1)
})

/*
    Player management
*/
const playerPosition = ref(Math.floor(cells.value.length / 2))
const playerImage = ref('player-front.png')

const playerRow = computed(() => Math.floor((playerPosition.value - 1) / numCols))
const playerCol = computed(() => (playerPosition.value - 1) % numCols)

const npcs = ref([95])

async function changePlayerPosition(targetPosition: number) {
  let npcSelected = false
  if (npcs.value.includes(targetPosition)) {
    targetPosition--
    npcSelected = true
  }
  if (targetPosition === playerPosition.value) {
    if (npcSelected) {
      inDialog.value = true
      await nextTick()
      typeText('Hello, I am a NPC in this little world!')
    }
    return
  }
  const path = await calculatePath(playerPosition.value, targetPosition, numRows, numCols)
  playerImage.value = 'output-onlinegiftools.gif'
  for (const cell of path) {
    playerPosition.value = cell
    await new Promise((resolve) => setTimeout(resolve, 150))
  }
  if (npcSelected) {
    inDialog.value = true
    await nextTick()
    typeText('Hello, I am a NPC in this little world!')
  }
  playerImage.value = 'player-front.png'
}

/*
    NPC dialog management
*/
const inDialog = ref(false)
const text = ref<HTMLElement | null>(null)

function closeNpcDialogBox() {
  inDialog.value = false
}

function typeText(content: string | string[]) {
  if (text.value) {
    new TypeIt(text.value, {
      speed: 10,
      strings: content,
    }).go()
  }
}
</script>

<template>
  <div
    ref="el"
    class="h-screen w-full relative grid"
    :style="`grid-template-rows: repeat(${gridSize.rows}, ${cellHeight}px); grid-template-columns: repeat(${gridSize.cols}, ${cellWidth}px);`"
  >
    <div
      v-for="cell in cells"
      :key="cell"
      class="transition-all flex items-center justify-center text-xs cursor-default hover:bg-slate-800 hover:rounded-full"
      :style="{
        width: `${cellWidth}px`,
        height: `${cellHeight}px`,
      }"
      @click="changePlayerPosition(cell)"
    >
      <!-- <div class="self-start w-full">{{ cell }}</div> -->
      <!-- <div>{{ cell }}</div> -->
      <div
        v-if="npcs.includes(cell)"
        class="absolute bg-red-500 bg-contain bg-no-repeat bg-center cursor-pointer"
        :style="{
          width: `${cellWidth}px`,
          height: `${cellHeight}px`,
        }"
      >
        PNJ
      </div>
    </div>
    <div
      v-if="inDialog"
      class="absolute top-[87%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-4/5 h-1/5 border-4 border-gray-500 bg-white rounded-2xl text-black"
    >
      <div class="w-full h-full relative p-2">
        <div
          class="absolute top-[7%] left-[99%] translate-y-[-50%] translate-x-[-50%] text-xl font-bold hover:cursor-pointer hover:scale-110"
          @click="closeNpcDialogBox"
        >
          X
        </div>
        <p ref="text" class="text-xl"></p>
      </div>
    </div>
    <Player
      :player-image="playerImage"
      :player-row="playerRow"
      :player-col="playerCol"
      :cell-height="cellHeight"
      :cell-width="cellWidth"
    />
  </div>
</template>
