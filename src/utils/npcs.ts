import type { NPC } from './npc'

export const npcs: NPC[] = [
  {
    name: 'Padme Amidala',
    image: 'npc2.png',
    model: 'npc2-model.png',
    position: 75,
    dialog: [
      'Ceci est un dialogue de <b>test</b>',
      'Merci de revenir plus tard pour plus de contenu :D',
    ],
  },
  {
    name: 'Anakin SkyWalker',
    image: 'npc1.png',
    model: 'npc1-model.png',
    position: 210,
    dialog: [
      'Ceci est un dialogue de <b>test</b>',
      'Merci de revenir plus tard pour plus de contenu :D',
    ],
  },
]
