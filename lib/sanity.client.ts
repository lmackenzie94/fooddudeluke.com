import 'server-only'

import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  type Post,
  type Question,
  type Settings,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
  questionAndMoreStoriesQuery,
  questionBySlugQuery,
  questionSlugsQuery,
  questionsQuery,
  settingsQuery,
} from 'lib/sanity.queries'
import { createClient } from 'next-sanity'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null

// GET SETTINGS
export async function getSettings(): Promise<Settings> {
  if (client) {
    return (await client.fetch(settingsQuery)) || {}
  }
  return {}
}

// GET POSTS FOR HOME PAGE
export async function getPostsForHome(numOfPosts: number): Promise<Post[]> {
  if (client) {
    return (await client.fetch(postsQuery(numOfPosts))) || []
  }
  return []
}

// GET ALL POSTS
export async function getAllPosts(): Promise<Post[]> {
  if (client) {
    return (await client.fetch(postsQuery())) || []
  }
  return []
}

// GET QUESTIONS FOR HOME PAGE
export async function getQuestionsForHome(
  numOfQuestions: number
): Promise<Question[]> {
  if (client) {
    return (await client.fetch(questionsQuery(numOfQuestions))) || []
  }
  return []
}

// GET ALL QUESTIONS
export async function getAllQuestions(): Promise<Question[]> {
  if (client) {
    return (await client.fetch(questionsQuery())) || []
  }
  return []
}

export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
  if (client) {
    const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
    return slugs.map((slug) => ({ slug }))
  }
  return []
}

export async function getAllQuestionsSlugs(): Promise<
  Pick<Question, 'slug'>[]
> {
  if (client) {
    const slugs = (await client.fetch<string[]>(questionSlugsQuery)) || []
    return slugs.map((slug) => ({ slug }))
  }
  return []
}

export async function getPostBySlug(slug: string): Promise<Post> {
  if (client) {
    return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
  }
  return {} as any
}

export async function getQuestionBySlug(slug: string): Promise<Question> {
  if (client) {
    return (await client.fetch(questionBySlugQuery, { slug })) || ({} as any)
  }
  return {} as any
}

export async function getPostAndMoreStories(
  slug: string,
  token?: string | null
): Promise<{ post: Post; morePosts: Post[] }> {
  if (projectId) {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: token || undefined,
    })
    return await client.fetch(postAndMoreStoriesQuery, { slug })
  }
  return { post: null, morePosts: [] }
}

export async function getQuestionAndMoreStories(
  slug: string,
  token?: string | null
): Promise<{ question: Question; moreQuestions: Question[] }> {
  if (projectId) {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: token || undefined,
    })
    return await client.fetch(questionAndMoreStoriesQuery, { slug })
  }
  return { question: null, moreQuestions: [] }
}
