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
      EN: 'Do you want some music during your journey?',
      FR: 'Souhaitez-vous séjourner en musique ?',
    },
    isAnswer: true,
    answer_id: 5,
    next_id: 19,
  },
  {
    id: 19,
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
      EN: `"<b>Dofus-Mini</b>" is a project aimed at recreating a mini version of Dofus (hence its name) by simulating a battle phase against a Gobball.
      It is a game created using <b>web technologies only</b>, and more specifically <b>React</b>.`,
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
      EN: `"<b>Light-Souls</b>" is a "Vampire Survivor-like" video game.
      It was developed using <b>web technologies only</b>, specifically the <b>Laravel - Inertia - Vue</b> stack.`,
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
      EN: `The game includes: 
      <b>1)</b> A dedicated website with a leaderboard to compare yourself with other players
      <b>2)</b> The game itself.`,
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
      EN: `Would you like to visit the website and maybe try the game? 
      <b>WARNING</b>: the site may take a few seconds to load (server hibernation).`,
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
      EN: `I created an interactive portfolio using <b>Vue</b> only.
      Everything is handmade, no third-party libraries, and I am particularly proud of my <b>custom dialogue system</b>!`,
      FR: `J'ai créé un portfolio interactif avec <b>Vue</b> uniquement.
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
    --  Presentation BEGIN --
  ===============================*/

  {
    id: 20,
    npc_id: 4,
    content: {
      EN: `none`,
      FR: `Bonjour ! je m'appelle <b>Amaury</b>, je suis le maire de la ville. Laissez moi me présenter !`,
    },
    isAnswer: false,
    next_id: 21,
  },
  {
    id: 21,
    npc_id: 4,
    content: {
      EN: `none`,
      FR: `Je suis <b>français</b> et basé en <b>île-de-france</b>, dans le sud de l'Essonne.`,
    },
    isAnswer: false,
    isIllustration: true,
    illustration: 'france.png',
    next_id: 22,
  },
  {
    id: 22,
    npc_id: 4,
    content: {
      EN: `none`,
      FR: `J'ai 27 ans et je travaille en tant qu'ingénieur logiciel pour Capgemini le jour...
      et suis un développeur créatif la nuit !`,
    },
    isAnswer: false,
    isIllustration: true,
    illustration: 'code.gif',
    next_id: 23,
  },
  {
    id: 23,
    npc_id: 4,
    content: {
      EN: `none`,
      FR: `Comme vous pouvre peux le voir, j'adore créer des petits mondes comme celui-ci, je trouve que ça donne vie à mon code.
      ... en plus de démontrer un certain savoir faire avec les technologies web !`,
    },
    isAnswer: false,
    next_id: 24,
  },
  {
    id: 24,
    npc_id: 4,
    content: {
      EN: `none`,
      FR: `Si vous voulez en savoir plus sur mon travail, je vous laisse aller parler à <b>NPJ CV</b>, elle se trouve près de l'espace recrutement.
      C'est facile à reconnaitre, il y a une étoile sur le batiment !`,
    },
    isAnswer: false,
    isIllustration: true,
    illustration: 'cvgirl.png',
    next_id: 25,
  },
  {
    id: 25,
    npc_id: 4,
    content: {
      EN: `none`,
      FR: `Sinon, avant d'être développeur je faisait de la recherche fondamentale en physiologie et médecine (neurosciences et pneumologie) à l'INSERM. Ce sont d'ailleurs mes études primaires.`,
    },
    isAnswer: false,
    isIllustration: true,
    illustration: 'neurosciences.jpg',
    next_id: 26,
  },
  {
    id: 26,
    npc_id: 4,
    content: {
      EN: `none`,
      FR: `Je serai d'ailleurs ravi de discuter avec vous de sujets médicaux ou en lien avec la physiologie humaine, et pourquoi pas vous expliquer ce souhait que j'ai eu d'acquiérir une double compétence en développement informatique.`,
    },
    isAnswer: false,
    isIllustration: true,
    illustration: 'science.jpg',
    next_id: 27,
  },
  {
    id: 27,
    npc_id: 4,
    content: {
      EN: `none`,
      FR: `Mais revenons-en au code !
      Si vous voulez en savoir plus sur mes projets créatifs, allez discuter avec <b>May Projay</b> ! Elle sera ravie de vous les expliquer en détails.`,
    },
    isAnswer: false,
    isIllustration: true,
    illustration: 'mayprojey.png',
    next_id: 28,
  },
  {
    id: 28,
    npc_id: 4,
    content: {
      EN: `none`,
      FR: `Enfin, si vous voulez accéder à ma bibliothèque personnelle... il vous suffit d'aller discuter avec <b>PNJ GIT</b>.`,
    },
    isAnswer: false,
    isIllustration: true,
    illustration: 'gitmaster.png',
    next_id: 29,
  },
  {
    id: 29,
    npc_id: 4,
    content: {
      EN: `none`,
      FR: `Je vous souhaite une agréable visite dans mon monde !`,
    },
    isAnswer: false,
  },

  /*===============================
    --  Presentation END --
  ===============================*/

  /*===============================
    --  Bibi Hothèque BEGIN --
  ===============================*/

  {
    id: 30,
    npc_id: 3,
    content: {
      EN: 'none',
      FR: `Bonjour, je suis Bibi Hothèque, responsable de la bibliothèque personnelle du maire.`,
    },
    isAnswer: false,
    next_id: 31,
  },
  {
    id: 31,
    npc_id: 3,
    content: {
      EN: 'none',
      FR: `Voulez-vous consulter la bibliothèque ?`,
    },
    isAnswer: true,
    answer_id: 6,
    next_id: 32,
  },
  {
    id: 32,
    npc_id: 3,
    content: {
      EN: 'none',
      FR: `Bon séjour parmis nous !
      N'hésitez pas à aller discuter avec les autres membres de la villes !`,
    },
    isAnswer: false,
  },

  /*===============================
    --  Bibi Hothèque END --
  ===============================*/

  /*===============================
    --  Autres NPC BEGIN --
  ===============================*/

  {
    id: 99999,
    npc_id: 5,
    content: {
      EN: `I'm building my CV right now ! Do not disturb me please.`,
      FR: `Je suis en train d'écrire mon CV pour le moment. Ne me dérange pas s'il te plaît.`,
    },
    isAnswer: false,
  },
]
