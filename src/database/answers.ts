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
    action: (choice?: string) => continueToLightSouls(choice),
  },
  {
    id: 4,
    npc_id: 2,
    dialogue_id: 10,
    content: {
      EN: ['I hang up', 'No thanks'],
      FR: ['Je décroche', 'Non merci'],
    },
    action: (choice?: string) => continueToPhone(choice),
  },
  {
    id: 5,
    npc_id: 1,
    dialogue_id: 3,
    content: {
      EN: ['Yes', 'No'],
      FR: ['Oui', 'Non'],
    },
    action: (choice?: string) => selectSoundChoice(choice),
  },
  {
    id: 6,
    npc_id: 3,
    dialogue_id: 31,
    content: {
      EN: ['Yes', 'No'],
      FR: ['Oui', 'Non'],
    },
    action: (choice?: string) => continueToGitHub(choice),
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

function continueToLightSouls(choice: string | undefined) {
  if (!choice) return
  if (choice === 'Yes' || choice === 'Oui') {
    window.open('https://light-souls.laravel.cloud/')
  }
}

function continueToPhone(choice: string | undefined) {
  if (!choice) return
  if (choice === 'I hang up' || choice === 'Je décroche') {
    window.open('https://phone-ring.vercel.app/')
  }
}

function selectSoundChoice(choice: string | undefined) {
  if (!choice) return
  if (choice === 'Oui' || choice === 'Yes') sessionStorage.setItem('Sound', 'true')
  if (choice === 'Non' || choice === 'No') sessionStorage.setItem('Sound', 'false')
}

function continueToGitHub(choice: string | undefined) {
  if (!choice) return
  if (choice === 'Yes' || choice === 'Oui') {
    window.open('https://github.com/AmauryGuillin/')
  }
}
