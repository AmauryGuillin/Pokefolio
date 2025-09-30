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
  isIllustration?: boolean | undefined
  illustration?: string | undefined
}

export const dialogues: Dialogue[] = [
  /*===============================
    --  Professor Oak BEGIN --
  ===============================*/
  {
    id: 1,
    npc_id: 1,
    content: {
      EN: `Hi welcome to my little world!
      My name is <b>Amaury</b>, I am a <b>software engineer</b> for a living and a <b>creative developer</b> on the internet.`,
      FR: `Bonjour et bienvenue dans mon petit monde ! 
      Mon prenom est <b>Amaury</b>, je suis <b>ingénieur logiciel</b> dans la vie et <b>développeur créatif</b> sur internet.`,
    },
    isAnswer: false,
    next_id: 2,
  },
  {
    id: 2,
    npc_id: 1,
    content: {
      EN: 'To begin with, what <b>language</b> do you speak?',
      FR: 'Avant toutes choses, quelle <b>langue</b> parlez-vous ?',
    },
    isAnswer: true,
    answer_id: 1,
    next_id: 3,
  },
  {
    id: 3,
    npc_id: 1,
    content: {
      EN: "Let's continue in <b>english</b> then. Have a nice visit!",
      FR: 'Continuons en <b>français</b> alors. Bonne visite !',
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
      FR: 'Bonjour ! Je suis <b>May Projay</b>, gérante de la section projet de la ville.',
    },
    isAnswer: false,
    next_id: 5,
  },
  {
    id: 5,
    npc_id: 2,
    content: {
      EN: 'none',
      FR: 'Je vais vous présenter les différents <b>projets</b> qui sont passé entre mes mains.',
    },
    isAnswer: false,
    next_id: 6,
  },
  {
    id: 6,
    npc_id: 2,
    content: {
      EN: 'none',
      FR: 'Au total, <b>3 projets</b> ont été achevés "entièrement". Voici les détails concernant le <b>premier projet</b>...',
    },
    isAnswer: false,
    next_id: 7,
  },
  {
    id: 7,
    npc_id: 2,
    content: {
      EN: 'none',
      FR: `"<b>Dofus-Mini</b>" est un projet ayant pour but de recréer un mini dofus (d'où son nom) en simulant une phase de combat contre un bouftou.
      C'est un jeu créé avec des technologies web <b>uniquement</b> et plus particulièrement avec <b>React</b>.
      <u>Souhaitez-vous essayer le jeu ?</u>`,
    },
    isAnswer: true,
    answer_id: 2,
    next_id: 8,
    isIllustration: true,
    illustration: 'dofus_mini.gif',
  },
  {
    id: 8,
    npc_id: 2,
    content: {
      EN: 'none',
      FR: `Le second projet est <u>de plus grande envergure</u> !
      "<b>Light-Souls</b>" est un jeu video "Vampire Survivor like".
      C'est un jeu développé avec des technologies web uniquement et plus précisément la stack <b>Laravel - Inertia - Vue</b>.`,
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
      <b>1)</b> Un site dédié avec un classement se comparer aux autres joueurs
      <b>2)</b> Le jeu en lui même.`,
    },
    isAnswer: false,
    next_id: 10,
  },
  {
    id: 10,
    npc_id: 2,
    content: {
      EN: 'none',
      FR: `<u>Souhaitez-vous visiter le site</u> et potentiellement essayer le jeu ?
      <b>ATTENTION</b> : le chargement du site peut prendre quelques seconde (mise en hibernation du serveur d'hébergement)`,
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

  /*===============================
    --  Autres NPC BEGIN--
  ===============================*/

  {
    id: 999,
    npc_id: 3,
    content: {
      EN: 'none',
      FR: `Ce cuisinier semble occupé. Peut-être est-il en train de <b>cook</b> une dinguerie ?`,
    },
    isAnswer: false,
  },
]
