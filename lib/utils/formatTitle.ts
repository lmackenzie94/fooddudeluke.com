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

  if (categories?.some((category) => category.title === 'Cooking Guide')) {
    formattedTitle = `Cooking: <span>${title}</span>`
  }

  if (categories?.some((category) => category.title === 'Buying Guide')) {
    formattedTitle = `Buying: <span>${title}</span>`
  }

  return formattedTitle
}
