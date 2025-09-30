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
      EN: "Hello! I am <b>May Projay</b>, manager of the city's project department.",
      FR: 'Bonjour ! Je suis <b>May Projay</b>, gérante de la section projet de la ville.',
    },
    isAnswer: false,
    next_id: 5,
  },
  {
    id: 5,
    npc_id: 2,
    content: {
      EN: 'I will present to you the different <b>projects</b> that have passed through my hands.',
      FR: 'Je vais vous présenter les différents <b>projets</b> qui sont passé entre mes mains.',
    },
    isAnswer: false,
    next_id: 6,
  },
  {
    id: 6,
    npc_id: 2,
    content: {
      EN: 'In total, <b>4 projects</b> have been completed "entirely". Here are the details of the <b>first project</b>...',
      FR: 'Au total, <b>4 projets</b> ont été achevés "entièrement". Voici les détails concernant le <b>premier projet</b>...',
    },
    isAnswer: false,
    next_id: 7,
  },
  {
    id: 7,
    npc_id: 2,
    content: {
      EN: '"<b>Dofus-Mini</b>" is a project aimed at recreating a mini version of Dofus (hence its name) by simulating a battle phase against a Gobball. It is a game created using <b>web technologies only</b>, and more specifically <b>React</b>.',
      FR: `"<b>Dofus-Mini</b>" est un projet ayant pour but de recréer un mini dofus (d'où son nom) en simulant une phase de combat contre un bouftou.
      C'est un jeu créé avec des technologies web <b>uniquement</b> et plus particulièrement avec <b>React</b>.`,
    },
    isAnswer: false,
    next_id: 8,
    isIllustration: true,
    illustration: 'dofus-mini.gif',
  },
  {
    id: 8,
    npc_id: 2,
    content: {
      EN: 'Would you like to try the game?',
      FR: `Souhaitez-vous essayer le jeu ?`,
    },
    isAnswer: true,
    answer_id: 2,
    next_id: 9,
  },
  {
    id: 9,
    npc_id: 2,
    content: {
      EN: 'The second project is <u>on a larger scale</u>!',
      FR: `Le second projet est <u>de plus grande envergure</u> !`,
    },
    isAnswer: false,
    next_id: 10,
  },
  {
    id: 10,
    npc_id: 2,
    content: {
      EN: '"<b>Light-Souls</b>" is a "Vampire Survivor-like" video game. It was developed using <b>web technologies only</b>, specifically the <b>Laravel - Inertia - Vue</b> stack.',
      FR: `"<b>Light-Souls</b>" est un jeu video "Vampire Survivor like".
      C'est un jeu développé avec des technologies web uniquement et plus précisément la stack <b>Laravel - Inertia - Vue</b>.`,
    },
    isAnswer: false,
    next_id: 11,
    isIllustration: true,
    illustration: 'light-souls.gif',
  },
  {
    id: 11,
    npc_id: 2,
    content: {
      EN: 'The game includes: <br><b>1)</b> A dedicated website with a leaderboard to compare yourself with other players <br><b>2)</b> The game itself.',
      FR: `Le jeu contient
      <b>1)</b> Un site dédié avec un classement se comparer aux autres joueurs
      <b>2)</b> Le jeu en lui même.`,
    },
    isAnswer: false,
    next_id: 12,
    isIllustration: true,
    illustration: 'light-souls.gif',
  },
  {
    id: 12,
    npc_id: 2,
    content: {
      EN: 'Would you like to visit the website and maybe try the game? <br><b>WARNING</b>: the site may take a few seconds to load (server hibernation).',
      FR: `Souhaitez-vous visiter le site et potentiellement essayer le jeu ?
      <b>ATTENTION</b> : le chargement du site peut prendre quelques seconde (mise en hibernation du serveur d'hébergement)`,
    },
    isAnswer: true,
    answer_id: 3,
    next_id: 13,
  },
  {
    id: 13,
    npc_id: 2,
    content: {
      EN: "The third project is simple: it's a phone call. Will you take the risk of picking up?",
      FR: `Le troisième projet est simple, c'est un appel téléphonique. Allez vous prendre le risque de décrocher ?`,
    },
    isAnswer: true,
    answer_id: 4,
    next_id: 14,
    isIllustration: true,
    illustration: 'phone.jpg',
  },
  {
    id: 14,
    npc_id: 2,
    content: {
      EN: 'The fourth project...',
      FR: `Le quatrième projet...`,
    },
    isAnswer: false,
    next_id: 15,
  },
  {
    id: 15,
    npc_id: 2,
    content: {
      EN: 'Well, you are currently playing with it!',
      FR: `Et bien, vous êtes actuellement en train de jouer avec !`,
    },
    isAnswer: false,
    next_id: 16,
    isIllustration: true,
    illustration: 'spiderman.jpg',
  },
  {
    id: 16,
    npc_id: 2,
    content: {
      EN: 'I created an interactive portfolio using <b>Vue</b> only. Everything is handmade, no third-party libraries, and I am particularly proud of my <b>custom dialogue system</b>!',
      FR: `J'ai créé un portfilio interactif avec <b>Vue</b> uniquement.
      Tout est fait à la main, pas de librairie tiers et je suis particulièrement fier de mon système de dialogue <b>fait maison</b> !`,
    },
    isAnswer: false,
    next_id: 17,
  },
  {
    id: 17,
    npc_id: 2,
    content: {
      EN: 'Well... We have gone through all the projects!',
      FR: `Eh bien... Nous avons fait le tour de tous les projets !`,
    },
    isAnswer: false,
    next_id: 18,
  },
  {
    id: 18,
    npc_id: 2,
    content: {
      EN: 'Continue your visit around the city, there are surely more things to discover! See you soon.',
      FR: `Continuer votre visite de la ville, il vous reste sûrement d'autres choses à découvrir !
      A bientôt.`,
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
      EN: 'This cook seems busy. he is surely trying to <b>cook</b> something wonderful.',
      FR: `Ce cuisinier semble occupé. Peut-être est-il en train de <b>cook</b> quelque chose de bon ?`,
    },
    isAnswer: false,
  },
]
