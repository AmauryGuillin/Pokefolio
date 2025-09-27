export type Dialogue = {
  id: number
  npc_id: number
  content: string
  isAnswer: boolean
  answer_id?: number
  next_id?: number
}

export const dialogues: Dialogue[] = [
  {
    id: 1,
    npc_id: 1,
    content: 'Hi! Welcome to my litle world!',
    isAnswer: false,
    next_id: 2,
  },
  {
    id: 2,
    npc_id: 1,
    content: 'To begin with, what language do you speak?',
    isAnswer: true,
    answer_id: 1,
  },
]
