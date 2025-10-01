import { Howl } from 'howler'

export function playDialogueSound() {
  if (sessionStorage.getItem('Sound') === 'false') return
  const dialogueSound = new Howl({
    src: new URL(`../assets/sounds/dialogue-ping.wav`, import.meta.url).href,
    volume: 0.3,
  })
  dialogueSound.play()
}

export function playTownMusic() {
  if (sessionStorage.getItem('Sound') === 'false') return
  const townMusic = new Howl({
    src: new URL(`../assets/sounds/town.mp3`, import.meta.url).href,
    volume: 0.3,
    loop: true,
  })
  townMusic.play()
}
