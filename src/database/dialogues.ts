export type Dialogue = {
  id: number
  npc_id: number
  content: {
    EN?: string | null | undefined
    FR?: string | null | undefined
  }
  isAnswer: boolean
  answer_id?: number
  next_id?: number
}

export const dialogues: Dialogue[] = [
  {
    id: 1,
    npc_id: 1,
    content: {
      EN: 'Hi! Welcome to my litle world!',
      FR: 'Bonjour ! Bienvenue dans mon petit monde !',
    },
    isAnswer: false,
    next_id: 2,
  },
  {
    id: 2,
    npc_id: 1,
    content: {
      EN: 'To begin with, what language do you speak?',
      FR: 'Pour commencer, quel langue parlez-vous ?',
    },
    isAnswer: true,
    answer_id: 1,
    next_id: 3,
  },
  {
    id: 3,
    npc_id: 1,
    content: {
      EN: "Let's continue in english then! Have a nice visit!",
      FR: 'Continuons en français alors ! Bonne visite à vous !',
    },
    isAnswer: false,
  },
  {
    id: 4,
    npc_id: 2,
    content: {
      EN: 'none',
      FR: 'Bonjour ! Je suis May Projay, gérante de la secton projet de la ville.',
    },
    isAnswer: false,
    next_id: 5,
  },
  {
    id: 5,
    npc_id: 2,
    content: {
      EN: 'none',
      FR: 'Voulez-vous que je vous explique les différents projets que la ville ait connu ?',
    },
    isAnswer: true,
    answer_id: 2,
  },
]
