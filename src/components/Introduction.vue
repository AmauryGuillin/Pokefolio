<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import DialogBox from './DialogBox.vue'
import { displayError, getImage } from '@/utils/utils'
import { useRouter } from 'vue-router'
import { npcs } from '@/utils/npcs'
import type { NPC } from '@/utils/npc'
import { dialogues, type Dialogue } from '@/database/dialogues'
import { answers, type Answer } from '@/database/answers'

const router = useRouter()
const npc = ref<NPC>()
const professeurName = ref<string | null>(null)
const professeurImage = ref<string | null>(null)

const currentDialog = ref<Dialogue | null>(null)
const currentAnswer = ref<Answer | null>(null)

function next() {
  if (currentDialog.value?.next_id) {
    const nextDialog = dialogues.find((d) => d.id === currentDialog.value!.next_id)
    currentDialog.value = nextDialog || null
    loadAnswer()
  } else {
    //router.push('/game')
    displayError('fin du dialogue')
  }
}

function loadDialog() {
  currentDialog.value = dialogues.find((d) => d.npc_id === npc.value?.id)!
  loadAnswer()
}

function loadAnswer() {
  if (!currentDialog.value) return
  if (currentDialog.value.isAnswer) {
    currentAnswer.value = answers.find((a) => a.id === currentDialog.value?.answer_id) || null
  }
}

onMounted(() => {
  npc.value = npcs.find((npc) => npc.id === 1)
  if (npc.value) professeurName.value = npc.value.name.english
  professeurImage.value = getImage('introduction', 'professoroak.png')
  loadDialog()
})
</script>

<template>
  <div class="bg-black w-full h-screen text-white relative">
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
        v-if="currentDialog"
        :current-npc-model="null"
        :currentNpcName="professeurName"
        :content="currentDialog.content"
        :isAnswer="currentDialog.isAnswer"
        :answers="currentAnswer?.content"
        :from-intro="true"
        @click="next()"
      />
    </div>
  </div>
</template>
