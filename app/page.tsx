import { toPlainText } from '@portabletext/react'
import HomePage from 'components/HomePage'
import { getPosts, getQuestions, getSettings } from 'lib/sanity.client'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const { title } = await getSettings()

  return {
    title: `Home | ${title}`,
  }
}

export default async function IndexRoute() {
  // Fetch queries in parallel
  const [posts, questions] = await Promise.all([getPosts(5), getQuestions(5)])

  return <HomePage posts={posts} questions={questions} />
}

// REMEMBER: don't need "revalidate"
// because our `/pages/api/revalidate.ts` route + Sanity Webhook will handle revalidation
// export const revalidate = 1
