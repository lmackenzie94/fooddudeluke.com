import { groq } from 'next-sanity'

// FIELDS --------------------------------------------------------------------------------------------------------------

const postFields = groq`
  _id,
  title,
  "slug": slug.current,
  'categories': categories[]->{title, description, color},
  socialImageURL,
  content,
  body
`

const questionFields = groq`
  _id,
  title,
  "slug": slug.current,
  'categories': categories[]->{title, description, color},
  socialImageURL,
  body
`

// SETTINGS --------------------------------------------------------------------------------------------------------------

export const settingsQuery = groq`*[_type == "settings"][0]`

// POSTS -----------------------------------------------------------------------------------------------------------------

export const postsQuery = (numOfPosts?: number) => {
  const baseQuery = `*[_type == "post"] | order(_updatedAt desc)`

  return groq`
   ${baseQuery} ${numOfPosts ? `[0...${numOfPosts}]` : ''} {
    ${postFields}
  }
  `
}

export const postAndMorePostsQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(_updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

// QUESTIONS --------------------------------------------------------------------------------------------------------------

export const questionsQuery = (numOfQuestions?: number) => {
  const baseQuery = `*[_type == "question"] | order(_updatedAt desc)`

  return groq`
   ${baseQuery} ${numOfQuestions ? `[0...${numOfQuestions}]` : ''} {
    ${questionFields}
  }
  `
}

export const questionAndMoreQuestionsQuery = groq`
{
  "question": *[_type == "question" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${questionFields}
  },
  "moreQuestions": *[_type == "question" && slug.current != $slug] | order(_updatedAt desc) [0...2] {
    content,
    ${questionFields}
  }
}`

export const questionSlugsQuery = groq`
*[_type == "question" && defined(slug.current)][].slug.current
`

export const questionBySlugQuery = groq`
*[_type == "question" && slug.current == $slug][0] {
  ${questionFields}
}
`

export interface Post {
  _id: string
  title?: string
  slug?: string
  content?: any
  body?: any
  socialImageURL?: string
  categories?: Category[]
}

export interface Question {
  _id: string
  title?: string
  slug?: string
  body?: any
  socialImageURL?: string
  categories?: Category[]
}

export interface Category {
  title?: string
  description?: any
  color?: string
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}
