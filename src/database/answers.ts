import { displayError } from '@/utils/utils'

export type Answer = {
  id: number
  npc_id: number
  dialogue_id: number
  content: {
    EN?: [string, string]
    FR?: [string, string]
  }
  action: (a?: string) => void
}

export const answers: Answer[] = [
  {
    id: 1,
    npc_id: 1,
    dialogue_id: 2,
    content: {
      EN: ['French', 'English'],
      FR: ['Français', 'Anglais'],
    },
    action: (language?: string) => selectUserLanguage(language),
  },
  {
    id: 2,
    npc_id: 2,
    dialogue_id: 5,
    content: {
      EN: ['Yes', 'No'],
      FR: ['Oui', 'Non'],
    },
    action: (choice?: string) => continueToDofusMini(choice),
  },
  {
    id: 3,
    npc_id: 2,
    dialogue_id: 10,
    content: {
      EN: ['Yes', 'No'],
      FR: ['Oui', 'Non'],
    },
    action: (choice?: string) => continueToDLightSouls(choice),
  },
]

function selectUserLanguage(language: string | undefined) {
  if (!language) return
  if (language === 'Anglais') language = 'English'
  if (language === 'Français') language = 'French'
  sessionStorage.setItem('UserLanguage', language)
}

function continueToDofusMini(choice: string | undefined) {
  if (!choice) return
  if (choice === 'Yes' || choice === 'Oui') {
    window.open('https://dofus-mini.vercel.app/')
  }
}

function continueToDLightSouls(choice: string | undefined) {
  if (!choice) return
  if (choice === 'Yes' || choice === 'Oui') {
    window.open('https://light-souls.laravel.cloud/')
  }
}
