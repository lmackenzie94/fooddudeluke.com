export const formatTitle = (title: string): string => {
  // if title contains asterisks...
  if (title.includes('*')) {
    const regex = /\*(.*?)\*/g
    return title.replace(regex, `<span>$1</span>`)
  }
  // if title includes a colon...
  if (title.includes(':')) {
    const regex = /:(.*)/g
    return title.replace(regex, `:<span>$1</span>`)
  }

  return title
}
