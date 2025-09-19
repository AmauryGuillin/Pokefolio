<script setup lang="ts">
import { getImage } from '@/utils/utils'
import { X } from 'lucide-vue-next'
import TypeIt from 'typeit'
import { onMounted, ref, watch, type Ref } from 'vue'

const props = defineProps<{
  currentNpcModel: string | null
  currentNpcName: string | null
  content: string | string[] | undefined
  fromIntro: boolean
}>()

const emits = defineEmits<{
  (e: 'close:closeDialog'): void
}>()

//const text = ref<HTMLElement | null>(null)

// function typeText(content: string | string[]) {
//   if (text.value) {
//     text.value.innerHTML = ''
//     new TypeIt(text.value, {
//       speed: 10,
//       strings: content,
//     }).go()
//   }
// }

onMounted(() => {
  if (props.content) {
    //typeText(props.content)
  }
})

watch(
  () => props.content,
  (newContent) => {
    if (newContent) {
      //typeText(newContent)
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
        <div class="flex-1">
          <p
            ref="text"
            class="text-gray-800 leading-relaxed font-medium whitespace-pre-line sm:pt-6 sm:text-base xl:text-xl text-2xl"
          >
            {{ content }}
          </p>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0 h-2 bg-blue-400"></div>
    </div>
  </div>
</template>
