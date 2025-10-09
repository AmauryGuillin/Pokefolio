import type { NPC } from './npc'

export const npcs: NPC[] = [
  {
    id: 1,
    name: {
      french: 'Professeur Chen',
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
      french: 'Bibi Hothèque',
      english: 'Bibi Hothèque', //TODO
    },
    image: 'npc1.png',
    model: 'npc1-model.png',
    position: 210,
    dialog: 'Je suis occupé.',
  },
  {
    id: 4,
    name: {
      french: 'Amaury Guillin',
      english: 'Amaury Guillin',
    },
    image: 'presentation.png',
    model: 'presentation-model.png',
    position: 88,
    dialog: 'Je suis occupé.',
  },
  {
    id: 5,
    name: {
      french: "Curicu lom'vitae",
      english: "Curicu lom'vitae",
    },
    image: 'cv.png',
    model: 'cv-model.png',
    position: 184,
    dialog: 'Je suis occupé.',
  },
]
