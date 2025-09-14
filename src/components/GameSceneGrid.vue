<script setup lang="ts">
import { calculatePath } from '@/utils/pathFinding'
import { useWindowSize } from '@vueuse/core'
import { ref, computed, nextTick } from 'vue'
import Player from './Player.vue'
import Obstacle from './Obstacle.vue'
import TypeIt from 'typeit'
import { obstacles } from '@/utils/obstacles'
import { npcs } from '@/utils/npcs'
import type { NPC } from '@/utils/npc'
import { Button } from './ui/button'
import { getImage } from '@/utils/utils'
import Npc from './Npc.vue'

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

const showObstacles = ref(false)

function displayObstaclesToggle() {
  if (showObstacles.value) {
    showObstacles.value = false
  } else {
    showObstacles.value = true
  }
}

/*
    Player management
*/
const playerPosition = ref(110) //ref(Math.floor(cells.value.length / 2))
const playerImage = ref('player-front.png')

const playerRow = computed(() => Math.floor((playerPosition.value - 1) / numCols))
const playerCol = computed(() => (playerPosition.value - 1) % numCols)

//const npcs = ref([55])

async function changePlayerPosition(targetPosition: number) {
  let npcSelected = false
  if (obstacles.includes(targetPosition)) return
  if (npcs.find((n) => n.position === targetPosition)) {
    targetPosition--
    npcSelected = true
  }
  if (targetPosition === playerPosition.value) {
    if (npcSelected) {
      launchDialog(targetPosition)
    }
    return
  }
  const path = await calculatePath(
    playerPosition.value,
    targetPosition,
    numRows,
    numCols,
    obstacles,
  )
  playerImage.value = 'output-onlinegiftools.gif'
  for (const cell of path) {
    playerPosition.value = cell
    await new Promise((resolve) => setTimeout(resolve, 150))
  }
  if (npcSelected) {
    launchDialog(targetPosition)
  }
  playerImage.value = 'player-front.png'
}

/*
    NPC dialog management
*/
const inDialog = ref(false)
const text = ref<HTMLElement | null>(null)
const curretNpcName = ref<string | null>(null)

function closeNpcDialogBox() {
  inDialog.value = false
  curretNpcName.value = null
}

async function launchDialog(targetPosition: number) {
  inDialog.value = true
  let currentNpc = npcs.find((n) => n.position === targetPosition + 1)
  if (currentNpc) {
    curretNpcName.value = currentNpc.name
    await nextTick()
    typeText(currentNpc.dialog)
  } else {
    await nextTick()
    typeText("Je n'ai rien à vous dire.")
  }
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
    class="h-screen w-full relative grid bg-[url(../assets/maps/DefaultMap.png)] bg-no-repeat bg-center bg-cover"
    :style="`grid-template-rows: repeat(${gridSize.rows}, ${cellHeight}px); grid-template-columns: repeat(${gridSize.cols}, ${cellWidth}px);`"
  >
    <div class="w-full z-50 absolute">
      <Button @click="displayObstaclesToggle">Display obstacles</Button>
    </div>
    <div
      v-for="cell in cells"
      :key="cell"
      class="transition-all flex items-center justify-center text-xs cursor-default hover:bg-slate-400/50 hover:rounded-full"
      :style="{
        width: `${cellWidth}px`,
        height: `${cellHeight}px`,
      }"
      @click="changePlayerPosition(cell)"
    >
      <!-- <div class="absolute">{{ cell }}</div> -->

      <!-- NPCs -->
      <div v-for="(npc, index) in npcs" :key="index" class="flex justify-center items-center">
        <Npc :npc="npc" :cell="cell" :cell-height="cellHeight" :cell-width="cellWidth" />
      </div>

      <!-- Obstacles -->
      <Obstacle
        v-if="obstacles.includes(cell)"
        :showObstacles="showObstacles"
        :cell-height="cellHeight"
        :cell-width="cellWidth"
      />
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
        <p class="text-2xl font-bold">{{ curretNpcName }}</p>
        <p ref="text" class="text-2xl"></p>
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
