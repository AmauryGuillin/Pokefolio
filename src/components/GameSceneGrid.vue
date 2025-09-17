<script setup lang="ts">
import { calculatePath } from '@/utils/pathFinding'
import { useWindowSize } from '@vueuse/core'
import { ref, computed, onMounted } from 'vue'
import Player from './Player.vue'
import Obstacle from './Obstacle.vue'
import TypeIt from 'typeit'
import { obstacles } from '@/utils/obstacles'
import { npcs } from '@/utils/npcs'
import type { NPC } from '@/utils/npc'
import { Button } from './ui/button'
import { getImage } from '@/utils/utils'
import Npc from './Npc.vue'
import DialogBox from './DialogBox.vue'
import { toast } from 'vue-sonner'
import { LoaderCircle } from 'lucide-vue-next'

/*
    Dev tools
*/
const showObstacles = ref(false)
const showCellNumber = ref(false)
const showPath = ref(false)
const pathing = ref<number[]>([])

/*
    Assets loading
*/

const assetsLoaded = ref(false)

function preloadImages(urls: string[]) {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise((resolve) => {
          const img = new window.Image()
          img.src = url
          img.onload = () => resolve(true)
          img.onerror = () => resolve(false)
        }),
    ),
  )
}

onMounted(async () => {
  const urls = [
    getImage('player', playerImage.value),
    getImage('player', 'output-onlinegiftools.gif'),
    ...npcs.map((npc) => getImage('npc', npc.image)),
    ...npcs.map((npc) => getImage('npc', npc.model)),
  ]
  await preloadImages(urls)
  assetsLoaded.value = true
})

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
const playerPosition = ref(110)
const playerImage = ref('player-front.png')

const playerRow = computed(() => Math.floor((playerPosition.value - 1) / numCols))
const playerCol = computed(() => (playerPosition.value - 1) % numCols)

async function changePlayerPosition(targetPosition: number) {
  if (inDialog.value) {
    displayError('Vous ne pouvez pas bouger lorsque vous êtes en dialogue avec un PNJ.')
    return
  }

  let npcSelected = false

  if (obstacles.includes(targetPosition)) {
    displayError('Vous ne pouvez pas aller ici.')
    return
  }

  if (npcs.find((n) => n.position === targetPosition)) {
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
    npcSelected,
  )
  pathing.value = path
  playerImage.value = 'output-onlinegiftools.gif'
  for (const cell of path) {
    playerPosition.value = cell
    await new Promise((resolve) => setTimeout(resolve, 150))
  }
  if (npcSelected) {
    launchDialog(targetPosition)
  }
  playerImage.value = 'player-front.png'
  pathing.value = []
}

/*
    NPC dialog management
*/
const inDialog = ref(false)
const curretNpcName = ref<string | null>(null)
const currentNpcModel = ref<string | null>(null)
const currentNpcDialog = ref<string | string[]>("Je n'ai rien à vous dire pour le moment.")

function closeNpcDialogBox() {
  inDialog.value = false
  curretNpcName.value = null
  currentNpcModel.value = null
  currentNpcDialog.value = "Je n'ai rien à vous dire pour le moment."
}

async function launchDialog(targetPosition: number) {
  let currentNpc = npcs.find((n) => n.position === targetPosition)
  if (currentNpc) {
    curretNpcName.value = currentNpc.name
    currentNpcModel.value = currentNpc.model
    currentNpcDialog.value = currentNpc.dialog
    inDialog.value = true
  }
}

function displayError(content: string) {
  toast.error(content)
}
</script>

<template>
  <div v-if="!assetsLoaded" class="flex items-center justify-center flex-col gap-5 h-screen">
    <div>Chargement...</div>
    <LoaderCircle class="animate-spin" />
  </div>
  <div
    v-else
    ref="el"
    class="h-screen w-full relative grid bg-[url(../assets/maps/DefaultMap.png)] bg-no-repeat bg-center bg-cover"
    :style="`grid-template-rows: repeat(${gridSize.rows}, ${cellHeight}px); grid-template-columns: repeat(${gridSize.cols}, ${cellWidth}px);`"
  >
    <div class="w-full z-50 absolute flex gap-2">
      <Button @click="showObstacles = !showObstacles">Display obstacles</Button>
      <Button @click="showCellNumber = !showCellNumber">Display cell number</Button>
      <Button @click="showPath = !showPath">Display pathing</Button>
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
      <div v-if="showCellNumber" class="absolute">{{ cell }}</div>

      <!-- NPCs -->
      <div v-for="(npc, index) in npcs" :key="index" class="flex justify-center items-center">
        <Npc :npc="npc" :cell="cell" :cell-height="cellHeight" :cell-width="cellWidth" />
      </div>

      <!-- Obstacles -->
      <Obstacle
        v-if="obstacles.includes(cell)"
        :cell="cell"
        :showObstacles="showObstacles"
        :show-cell-number="showCellNumber"
        :cell-height="cellHeight"
        :cell-width="cellWidth"
      />

      <!-- Pathing -->
      <div v-if="showPath" class="flex justify-center items-center">
        <div
          v-if="pathing.includes(cell)"
          class="absolute bg-contain bg-no-repeat bg-center cursor-default flex justify-center items-center bg-green-500/50"
          :style="{
            width: `${cellWidth}px`,
            height: `${cellHeight}px`,
          }"
        ></div>
      </div>
    </div>

    <!-- NPC Dialog -->
    <DialogBox
      v-if="inDialog"
      :current-npc-model="currentNpcModel"
      :curret-npc-name="curretNpcName"
      @close:close-dialog="closeNpcDialogBox()"
      :content="currentNpcDialog"
    />

    <!-- Player -->
    <Player
      :player-image="playerImage"
      :player-row="playerRow"
      :player-col="playerCol"
      :cell-height="cellHeight"
      :cell-width="cellWidth"
    />
  </div>
</template>
