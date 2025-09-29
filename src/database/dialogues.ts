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
  /*===============================
    --  Professor Oak BEGIN --
  ===============================*/
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

  /*===============================
    --  Professor Oak END --
  ===============================*/

  /*===============================
    --  May Project BEGIN --
  ===============================*/

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
      FR: 'Je vais vous détailler les différents projets qui sont passé entre nos mains.',
    },
    isAnswer: false,
    next_id: 6,
  },
  {
    id: 6,
    npc_id: 2,
    content: {
      EN: 'none',
      FR: 'Au total, 3 projets ont été achevés "entièrement". Voici les détails concernant le premier projet...',
    },
    isAnswer: false,
    next_id: 7,
  },
  {
    id: 7,
    npc_id: 2,
    content: {
      EN: 'none',
      FR: `"Dofus-Mini" est un projet ayant pour but de recréer un mini dofus (d'où son nom) en simulant une phase de combat contre un bouftou.
      C'est un jeu créé avec des technologies web uniquement : React principalement.
      Souhaitez-vous essayer le jeu ?`,
    },
    isAnswer: true,
    answer_id: 2,
    next_id: 8,
  },
  {
    id: 8,
    npc_id: 2,
    content: {
      EN: 'none',
      FR: `Le second projet est de plus grande envergure !
      "Light-Souls" est un jeu video "Vampire Survivor like".
      C'est un jeu développé avec des technologies web uniquement et plus précisément la stack Laravel - Inertia - Vue.`,
    },
    isAnswer: false,
    next_id: 9,
  },
  {
    id: 9,
    npc_id: 2,
    content: {
      EN: 'none',
      FR: `Le jeu contient
      1) Un site dédié avec un classement se comparer aux autres joueurs
      2) Le jeu en lui même.`,
    },
    isAnswer: false,
    next_id: 10,
  },
  {
    id: 10,
    npc_id: 2,
    content: {
      EN: 'none',
      FR: `Souhaitez-vous visiter le site et potentiellement essayer le jeu ?
      ATTENTION : le chargment du site peut prendre quelques seconde (mise en hibernation du serveur d'hébergement)`,
    },
    isAnswer: true,
    answer_id: 3,
    next_id: 11,
  },
  {
    id: 11,
    npc_id: 2,
    content: {
      EN: 'none',
      FR: `Fin du dialogue...`,
    },
    isAnswer: false,
  },

  /*===============================
    --  May Project END --
  ===============================*/
]
