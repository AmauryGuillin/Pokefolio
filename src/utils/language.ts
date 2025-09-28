import { dialogues, type Dialogue } from '@/database/dialogues'
import type { NPC } from './npc'
import { answers } from '@/database/answers'

export function getNPCNameByLanguage(npc: NPC | undefined): string | null {
  //console.log(npc)
  if (!npc) return ''

  const userLanguage = sessionStorage.getItem('UserLanguage')

  if (userLanguage === 'French') return npc.name.french
  if (userLanguage === 'English') return npc.name.english

  return npc.name.english
}

export function getTextToDisplayByLanguage(currentDialogue: Dialogue | null) {
  if (!currentDialogue) return

  const userLanguage = sessionStorage.getItem('UserLanguage')

  if (userLanguage === 'French') return currentDialogue.content.FR
  if (userLanguage === 'English') return currentDialogue.content.EN

  return currentDialogue.content.EN
}

export function getNPCDialogue(npc: NPC | undefined): Dialogue | null {
  if (!npc) return null
  return dialogues.find((d) => d.npc_id === npc.id)!
}

export function getNPCDialogueAnswer(currentDialogue: Dialogue | null) {
  if (!currentDialogue || !currentDialogue.isAnswer) return null
  return answers.find((a) => a.id === currentDialogue.answer_id) || null
}
