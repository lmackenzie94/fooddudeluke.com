import type { Category } from 'lib/sanity.queries'

export const formatTitle = (title: string, categories?: Category[]): string => {
  let formattedTitle = title
  // // if title contains asterisks...
  if (formattedTitle.includes('*')) {
    const regex = /\*(.*?)\*/g

    formattedTitle = formattedTitle.replace(regex, `<span>$1</span>`)
  }

  // // if title includes a colon...
  // if (formattedTitle.includes(':')) {
  //   const regex = /:(.*)/g
  //   formattedTitle = formattedTitle.replace(regex, `:<span>$1</span>`)
  // }

  // if 'Cooking Guide' is one of the categories, add "How To Cook: " to the title
  if (categories?.some((category) => category.title === 'Cooking Guide')) {
    formattedTitle = `How To Cook: <span>${title}</span>`
  }

  // if 'Buying Guide' is one of the categories, add "Buying: " to the title
  if (categories?.some((category) => category.title === 'Buying Guide')) {
    formattedTitle = `How To Buy: <span>${title}</span>`
  }

  return formattedTitle
}
