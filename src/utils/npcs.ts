import type { NPC } from './npc'

export const npcs: NPC[] = [
  {
    id: 1,
    name: {
      french: 'Professeur Chêne',
      english: 'Professor Oak',
    },
    image: 'npc2.png',
    model: 'npc2-model.png',
    position: 9999,
    dialog: 'Je suis occupé.',
  },
  {
    id: 2,
    name: {
      french: 'May Projay',
      english: 'May Project',
    },
    image: 'npc2.png',
    model: 'npc2-model.png',
    position: 75,
    dialog: 'Je suis occupé.',
  },
  {
    id: 3,
    name: {
      french: 'Anakin SkyWalker',
      english: 'Anakin SkyWalker',
    },
    image: 'npc1.png',
    model: 'npc1-model.png',
    position: 210,
    dialog: 'Je suis occupé.',
  },
]
