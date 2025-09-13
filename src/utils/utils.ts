export function getImage(folder: string, image: string) {
  return new URL(`../assets/${folder}/${image}`, import.meta.url).href
}
