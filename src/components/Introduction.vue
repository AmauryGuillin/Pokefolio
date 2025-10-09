<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DialogBox from './DialogBox.vue'
import { displayError, getImage } from '@/utils/utils'
import { useRouter } from 'vue-router'
import { npcs } from '@/utils/npcs'
import type { NPC } from '@/utils/npc'
import { dialogues, type Dialogue } from '@/database/dialogues'
import { type Answer } from '@/database/answers'
import {
  getNPCDialogue,
  getNPCDialogueAnswer,
  getNPCDialogueAsnwerDisplay,
  getNPCNameByLanguage,
  getTextToDisplayByLanguage,
} from '@/utils/language'
import { playDialogueSound } from '@/utils/music'

const router = useRouter()
const npc = ref<NPC>()
const professeurName = ref<string | null>(null)
const professeurImage = ref<string | null>(null)

const currentDialogue = ref<Dialogue | null>(null)
const currentAnswer = ref<Answer | null>(null)
const currentDisplay = ref<string | null | undefined>(null)
const currentDisplayAnswer = ref<[string, string] | null | undefined>(null)

function next() {
  if (currentDialogue.value?.next_id) {
    const nextDialog = dialogues.find((d) => d.id === currentDialogue.value!.next_id)
    currentDialogue.value = nextDialog || null
    professeurName.value = getNPCNameByLanguage(npc.value)
    currentDisplay.value = getTextToDisplayByLanguage(currentDialogue.value)
    currentAnswer.value = getNPCDialogueAnswer(currentDialogue.value)
    currentDisplayAnswer.value = getNPCDialogueAsnwerDisplay(currentAnswer.value)
    playDialogueSound()
  } else {
    playDialogueSound()
    router.push('/game')
    //displayError('fin du dialogue')
  }
}

function loadDialog() {
  currentDialogue.value = getNPCDialogue(npc.value)
  currentDisplay.value = getTextToDisplayByLanguage(currentDialogue.value)
  currentAnswer.value = getNPCDialogueAnswer(currentDialogue.value)
}

onMounted(() => {
  npc.value = npcs.find((npc) => npc.id === 1)
  professeurImage.value = getImage('introduction', 'professoroak.png')
  professeurName.value = getNPCNameByLanguage(npc.value)
  loadDialog()
})
</script>

<template>
  <div class="bg-black w-full h-screen text-white relative font-(family-name:--font-game)">
    <div class="relative flex justify-center items-center w-full h-full">
      <img
        v-if="professeurImage"
        :src="professeurImage"
        alt=""
        class="absolute -translate-x-[50%] -translate-y-[50%] top-[42%] left-[50%] z-50 w-28"
      />
      <div
        class="flex justify-center items-center border-8 border-[#534E26] w-[500px] h-[500px] rounded-full bg-[#534E26] -translate-z-8 rotate-x-75 rotate-z-45 shadow-inner shadow-[#534E26]"
      >
        <div class="w-[450px] h-[450px] rounded-full bg-[#F6F098]"></div>
      </div>
    </div>
    <div>
      <DialogBox
        v-if="currentDialogue"
        :current-npc-model="null"
        :currentNpcName="professeurName"
        :content="currentDisplay"
        :isAnswer="currentDialogue.isAnswer"
        :answers="currentDisplayAnswer"
        :action="currentAnswer?.action"
        :from-intro="true"
        @click="next()"
      />
    </div>
  </div>
</template>
