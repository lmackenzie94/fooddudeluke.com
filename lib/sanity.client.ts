import 'server-only'

import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  type Post,
  type Question,
  type Settings,
  postAndMorePostsQuery,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
  questionAndMoreQuestionsQuery,
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

// SETTINGS --------------------------------------------------------------------------------------------------------------
export async function getSettings(): Promise<Settings> {
  if (client) {
    return (await client.fetch(settingsQuery)) || {}
  }
  return {}
}

// POSTS ------------------------------------------------------------------------------------------------------------------

export async function getPosts(numOfPosts?: number): Promise<Post[]> {
  if (client) {
    return (await client.fetch(postsQuery(numOfPosts))) || []
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

export async function getPostBySlug(slug: string): Promise<Post> {
  if (client) {
    return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
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
    return await client.fetch(postAndMorePostsQuery, { slug })
  }
  return { post: null, morePosts: [] }
}

// QUESTIONS ----------------------------------------------------------------------------------------------------------------

export async function getQuestions(
  numOfQuestions?: number
): Promise<Question[]> {
  if (client) {
    return (await client.fetch(questionsQuery(numOfQuestions))) || []
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

export async function getQuestionBySlug(slug: string): Promise<Question> {
  if (client) {
    return (await client.fetch(questionBySlugQuery, { slug })) || ({} as any)
  }
  return {} as any
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
    return await client.fetch(questionAndMoreQuestionsQuery, { slug })
  }
  return { question: null, moreQuestions: [] }
}
