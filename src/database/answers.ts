export type Answer = {
  id: number
  npc_id: number
  dialogue_id: number
  content: [string, string]
}

export const answers: Answer[] = [
  {
    id: 1,
    npc_id: 1,
    dialogue_id: 2,
    content: ['French', 'English'],
  },
]
