import { toast } from 'vue-sonner'

export function getImage(folder: string, image: string) {
  return new URL(`../assets/${folder}/${image}`, import.meta.url).href
}

export function displayError(content: string) {
  toast.error(content)
}

export function sanitiseContent(content: string | null | undefined) {
  if (!content) return

  const allowed = ['b', 'i', 'u', 'br']
  const regex = /<\/?([a-zA-Z0-9]+)(\s[^>]*)?>/g

  return content.replace(regex, (match, tag) => {
    return allowed.includes(tag.toLowerCase()) ? match : ''
  })
}
