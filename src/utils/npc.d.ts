export type NPC = {
  id: number
  name: {
    french: string | null
    english: string | null
  }
  image: string
  model: string
  position: number
  dialog: string | null
}
