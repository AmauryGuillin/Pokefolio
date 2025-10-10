<script setup lang="ts">
import { calculatePath } from '@/utils/pathFinding'
import { useWindowSize } from '@vueuse/core'
import { ref, computed, onMounted } from 'vue'
import Player from './Player.vue'
import Obstacle from './Obstacle.vue'
import { obstacles } from '@/utils/obstacles'
import { npcs } from '@/utils/npcs'
import { Button } from './ui/button'
import { displayError, getImage } from '@/utils/utils'
import Npc from './Npc.vue'
import DialogBox from './DialogBox.vue'
import { LoaderCircle } from 'lucide-vue-next'
import { dialogues, type Dialogue } from '@/database/dialogues'
import {
  getNPCDialogue,
  getNPCDialogueAnswer,
  getNPCDialogueAsnwerDisplay,
  getNPCNameByLanguage,
  getTextToDisplayByLanguage,
} from '@/utils/language'
import type { NPC } from '@/utils/npc'
import type { Answer } from '@/database/answers'
import { playDialogueSound, playTownMusic } from '@/utils/music'

/*
    Dev tools
*/
const enableDevTools = false
const showObstacles = ref(false)
const showCellNumber = ref(false)
const showPath = ref(false)
const pathing = ref<
  {
    cell: number
    direction: 'left' | 'right' | 'top' | 'bottom' | null
  }[]
>([])

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
    getImage('player', 'player-animated-bottom.gif'),
    getImage('player', 'player-animated-left.gif'),
    getImage('player', 'player-animated-right.gif'),
    getImage('player', 'player-animated-top.gif'),
    getImage('player', 'player-idle-bottom.png'),
    getImage('player', 'player-idle-left.png'),
    getImage('player', 'player-idle-right.png'),
    getImage('player', 'player-idle-top.png'),
    getImage('npcs', 'dofus-mini.gif'),
    getImage('npcs', 'light-souls.gif'),
    getImage('npcs', 'phone.jpg'),
    getImage('npcs', 'spiderman.jpg'),
    getImage('npcs', 'code.gif'),
    getImage('npcs', 'cvgirl.png'),
    getImage('npcs', 'france.png'),
    getImage('npcs', 'gitmaster.png'),
    getImage('npcs', 'mayprojay.png'),
    getImage('npcs', 'neurosciences.jpg'),
    getImage('npcs', 'science.jpg'),
  ]

  npcs.forEach((npc) => {
    urls.push(getImage('npcs', npc.image))
    urls.push(getImage('npcs', npc.model))
  })

  await preloadImages(urls)
  assetsLoaded.value = true
  if (sessionStorage.getItem('Sound') === 'true') playTownMusic()
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
const playerImage = ref('player-idle-bottom.png')

const playerRow = computed(() => Math.floor((playerPosition.value - 1) / numCols))
const playerCol = computed(() => (playerPosition.value - 1) % numCols)

const userLanguage = sessionStorage.getItem('UserLanguage')

async function changePlayerPosition(targetPosition: number) {
  if (inDialog.value) {
    if (userLanguage === 'French')
      displayError('Vous ne pouvez pas bouger lorsque vous êtes en dialogue avec un PNJ.')
    if (userLanguage === 'English') displayError('You cannot move when in dialog with an NPC.')
    return
  }

  let npcSelected = false

  if (obstacles.includes(targetPosition)) {
    if (userLanguage === 'French') displayError('Vous ne pouvez pas aller ici.')
    if (userLanguage === 'English') displayError('You cannot go there.')
    return
  }

  if (npcs.find((n) => n.position === targetPosition)) {
    npcSelected = true
  }

  if (targetPosition === playerPosition.value) {
    if (npcSelected) launchDialog(targetPosition)
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
  let previousDirection: 'left' | 'right' | 'top' | 'bottom' | null = null
  for (const cell of path) {
    if (cell.direction !== previousDirection && cell.direction != null) {
      playerImage.value = `player-animated-${cell.direction}.gif`
      previousDirection = cell.direction
    }
    playerPosition.value = cell.cell
    await new Promise((resolve) => setTimeout(resolve, 150))
  }
  if (npcSelected) {
    launchDialog(targetPosition)
    if (playerImage.value.includes('animated')) {
      let tmp = playerImage.value.replace('animated', 'idle')
      playerImage.value = tmp.replace('.gif', '.png')
    }
    return
  }
  playerImage.value = `player-idle-${previousDirection}.png`
  pathing.value = []
}

/*
    NPC dialog management
*/
const inDialog = ref(false)
const curretNpcName = ref<string | null>(null)
const currentNpcModel = ref<string | null>(null)
const currentDialogue = ref<Dialogue | null>(null)
const currentDisplay = ref<string | null | undefined>(null)
const currentAnswer = ref<Answer | null>(null)
const currentDisplayAnswer = ref<[string, string] | null | undefined>(null)
const mayorDialogueDone = ref<boolean>(false)

function closeNpcDialogBox() {
  inDialog.value = false
  curretNpcName.value = null
  currentNpcModel.value = null
}

async function launchDialog(targetPosition: number) {
  let currentNpc = npcs.find((n) => n.position === targetPosition)
  if (currentNpc) {
    if (currentNpc.id === 4 && !mayorDialogueDone.value) {
      mayorDialogueDone.value = true
    }
    playDialogueSound()
    inDialog.value = true
    curretNpcName.value = getNPCNameByLanguage(currentNpc)
    currentNpcModel.value = currentNpc.model
    loadDialog(currentNpc)
  }
}

function loadDialog(npc: NPC) {
  currentDialogue.value = getNPCDialogue(npc) || null
  if (!currentDialogue.value) {
    if (userLanguage === 'French') displayError('Pas de dialogue disponible.')
    if (userLanguage === 'English') displayError('No dialog available.')
    closeNpcDialogBox()
    return
  }
  currentDisplay.value = getTextToDisplayByLanguage(currentDialogue.value)
  currentAnswer.value = getNPCDialogueAnswer(currentDialogue.value)
}

function next() {
  if (currentDialogue.value?.next_id) {
    const nextDialog = dialogues.find((d) => d.id === currentDialogue.value!.next_id)
    currentDialogue.value = nextDialog || null
    currentDisplay.value = getTextToDisplayByLanguage(currentDialogue.value)
    currentAnswer.value = getNPCDialogueAnswer(currentDialogue.value)
    currentDisplayAnswer.value = getNPCDialogueAsnwerDisplay(currentAnswer.value)
    playDialogueSound()
  } else {
    playDialogueSound()
    closeNpcDialogBox()
  }
}
</script>

<template>
  <div
    v-if="!assetsLoaded"
    class="flex items-center justify-center flex-col gap-5 h-screen bg-[url(../assets/loading/loading_screen2.jpg)] bg-no-repeat bg-center bg-cover"
  >
    <div
      class="bg-black/50 font-bold text-2xl flex justify-center items-center gap-3 flex-col rounded-sm p-2"
    >
      <span>Assets Loading...</span> <LoaderCircle class="animate-spin" />
    </div>
  </div>
  <div
    v-else
    ref="el"
    class="h-screen w-full relative grid bg-[url(../assets/maps/DefaultMap.png)] bg-no-repeat bg-center bg-cover font-(family-name:--font-game)"
    :style="`grid-template-rows: repeat(${gridSize.rows}, ${cellHeight}px); grid-template-columns: repeat(${gridSize.cols}, ${cellWidth}px);`"
  >
    <div v-if="enableDevTools" class="w-full z-50 absolute flex gap-2">
      <Button @click="showObstacles = !showObstacles">Display obstacles</Button>
      <Button @click="showCellNumber = !showCellNumber">Display cell number</Button>
      <Button @click="showPath = !showPath">Display pathing</Button>
    </div>
    <div
      v-for="cell in cells"
      :key="cell"
      class="transition-all flex items-center justify-center text-xs cursor-default hover:bg-white/30 hover:rounded-full"
      :style="{
        width: `${cellWidth}px`,
        height: `${cellHeight}px`,
      }"
      @click="changePlayerPosition(cell)"
    >
      <div v-if="showCellNumber" class="absolute">{{ cell }}</div>

      <!-- NPCs -->
      <div v-for="(npc, index) in npcs" :key="index" class="flex justify-center items-center">
        <Npc
          :npc="npc"
          :cell="cell"
          :cell-height="cellHeight"
          :cell-width="cellWidth"
          :mayor-done="mayorDialogueDone"
        />
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
          v-if="pathing.some((p) => p.cell === cell)"
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
      v-if="inDialog && currentDialogue"
      :current-npc-model="currentNpcModel"
      :currentNpcName="curretNpcName"
      @close:close-dialog="closeNpcDialogBox()"
      :content="currentDisplay"
      :isAnswer="currentDialogue.isAnswer"
      :answers="currentDisplayAnswer"
      :action="currentAnswer?.action"
      :from-intro="false"
      :is-illustration="currentDialogue.isIllustration"
      :illustration="currentDialogue.illustration"
      @click="next()"
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
