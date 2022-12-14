import { groq } from 'next-sanity'

// queries

const postFields = groq`
  _id,
  title,
  date,
  // coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
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

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

// get 5 most recent Posts
export const postsQuery = (numOfPosts?: number) => {
  const baseQuery = `*[_type == "post"] | order(date desc, _updatedAt desc)`

  return groq`
   ${baseQuery} ${numOfPosts ? `[0...${numOfPosts}]` : ''} {
    ${postFields}
  }
  `
}

// get 5 most recent Questions
export const questionsQuery = (numOfQuestions?: number) => {
  const baseQuery = `*[_type == "question"] | order(date desc, _updatedAt desc)`

  return groq`
   ${baseQuery} ${numOfQuestions ? `[0...${numOfQuestions}]` : ''} {
    ${questionFields}
  }
  `
}

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const questionAndMoreStoriesQuery = groq`
{
  "question": *[_type == "question" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${questionFields}
  },
  "moreQuestions": *[_type == "question" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${questionFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const questionSlugsQuery = groq`
*[_type == "question" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export const questionBySlugQuery = groq`
*[_type == "question" && slug.current == $slug][0] {
  ${questionFields}
}
`

// interfaces

export interface Author {
  name?: string
  picture?: any
}

export interface Post {
  _id: string
  title?: string
  // coverImage?: any
  date?: string
  author?: Author
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
