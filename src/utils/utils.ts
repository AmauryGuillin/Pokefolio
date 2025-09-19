import { toast } from 'vue-sonner'

export function getImage(folder: string, image: string) {
  return new URL(`../assets/${folder}/${image}`, import.meta.url).href
}

export function displayError(content: string) {
  toast.error(content)
}
