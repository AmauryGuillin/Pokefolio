import { Howl } from 'howler'

let currentMusic: Howl | null = null

export function playDialogueSound() {
  if (!sessionStorage.getItem('Sound')) return
  if (sessionStorage.getItem('Sound') === 'false') return

  const dialogueSound = new Howl({
    src: new URL(`../assets/sounds/dialogue-ping.wav`, import.meta.url).href,
    volume: 0.3,
  })
  dialogueSound.play()
}

export function playTownMusic() {
  if (!sessionStorage.getItem('Sound')) return
  if (sessionStorage.getItem('Sound') === 'false') return

  if (currentMusic) {
    currentMusic.stop()
    currentMusic.unload()
  }

  currentMusic = new Howl({
    src: new URL(`../assets/sounds/town.mp3`, import.meta.url).href,
    volume: 0.3,
    loop: true,
  })

  currentMusic.play()
}

if (typeof window !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (!currentMusic) return

    if (document.visibilityState === 'hidden') {
      currentMusic.pause()
    } else if (document.visibilityState === 'visible') {
      currentMusic.play()
    }
  })
}
