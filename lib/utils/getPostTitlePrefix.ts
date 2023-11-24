import { Category } from 'lib/sanity.queries'

export const getPostTitlePrefix = (categories: Category[]): string => {
  let prefix = ''

  if (categories?.some((category) => category.title === 'Cooking Guide')) {
    prefix = 'Cooking'
  }

  if (categories?.some((category) => category.title === 'Buying Guide')) {
    prefix = 'Buying'
  }

  return prefix
}
