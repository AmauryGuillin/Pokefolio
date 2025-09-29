<script setup lang="ts">
import { getImage, sanitiseContent } from '@/utils/utils'
import { ArrowBigDownDash, ChevronRight, X } from 'lucide-vue-next'
import { onMounted, ref, watch, type Ref } from 'vue'

const props = defineProps<{
  currentNpcModel: string | null
  currentNpcName: string | null
  content: string | null | undefined
  isAnswer?: boolean
  answers?: [string, string] | null
  action?: (a?: string) => void
  fromIntro?: boolean
}>()

const emits = defineEmits<{
  (e: 'close:closeDialog'): void
}>()

const selectedOption = ref<'french' | 'english'>('french')

const content = ref<string | null | undefined>(null)

onMounted(() => {
  if (props.content) {
    content.value = sanitiseContent(props.content)
  }
})

watch(
  () => props.content,
  (newContent) => {
    if (newContent) {
      content.value = sanitiseContent(props.content)
    }
  },
)
</script>

<template>
  <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-[90vw] h-[20vh] z-50">
    <div v-if="!fromIntro" class="fixed -top-44 w-40 h-40 z-20">
      <div
        class="relative w-full h-full rounded-lg overflow-hidden shadow-lg border-4 border-black bg-white"
      >
        <img
          :src="getImage('npcs', currentNpcModel || '')"
          alt=""
          class="object-contain w-full h-full"
        />
      </div>
    </div>
    <div v-if="isAnswer" class="fixed -top-64 right-0 w-60 h-60 z-20">
      <div
        class="relative w-full h-full rounded-lg overflow-hidden shadow-lg border-8 border-gray-500 bg-white"
      >
        <div class="text-black w-full h-full grid grid-cols-2 text-3xl justify-center items-center">
          <div v-if="answers" class="flex flex-col gap-4 items-center justify-center mt-4 ml-10">
            <div
              @click="action?.(answers[0])"
              class="grid grid-cols-2 items-center cursor-pointer w-32"
              @mouseover="selectedOption = 'french'"
            >
              <div class="flex justify-end w-8">
                <ChevronRight v-show="selectedOption === 'french'" />
              </div>
              <span class="font-bold">{{ answers[0] || 'Choice 1' }}</span>
            </div>
            <div
              @click="action?.(answers[1])"
              class="grid grid-cols-2 items-center cursor-pointer w-32"
              @mouseover="selectedOption = 'english'"
            >
              <div class="flex justify-end w-8">
                <ChevronRight v-show="selectedOption === 'english'" />
              </div>
              <span class="font-bold">{{ answers[1] || 'Choice 2' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="relative w-full h-full bg-white border-4 border-gray-800 rounded-lg shadow-2xl overflow-hidden"
    >
      <button
        v-if="!fromIntro"
        @click="emits('close:closeDialog')"
        class="absolute top-2 right-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 border-2 border-gray-800 rounded flex items-center justify-center text-gray-800 font-bold text-sm z-10 transition-colors"
        aria-label="Close dialog"
      >
        <X />
      </button>

      <div
        class="absolute top-0 left-0 bg-gray-800 text-white px-4 py-1 rounded-br-lg border-r-4 border-b-4 border-gray-600"
      >
        <span class="font-bold text-sm">{{ currentNpcName }}</span>
      </div>

      <div class="flex items-center h-full pl-8 pr-12 pb-6">
        <div class="flex">
          <p
            class="text-gray-800 leading-relaxed font-medium whitespace-pre-line sm:pt-6 sm:text-base xl:text-xl text-2xl"
            v-html="content"
          ></p>
          <p v-if="!isAnswer" class="flex items-end ml-5">
            <ArrowBigDownDash class="animate-bounce text-blue-400" />
          </p>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0 h-2 bg-blue-400"></div>

      <div v-if="isAnswer" class="absolute inset-0 z-20" @click.stop></div>
    </div>
  </div>
</template>
