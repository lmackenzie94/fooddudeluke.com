import SingleQuestionPage from 'components/question/SingleQuestionPage'
import {
  getAllQuestionsSlugs,
  getQuestionAndMoreQuestions,
  getQuestionBySlug,
  getSettings,
} from 'lib/sanity.client'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return await getAllQuestionsSlugs()
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { title } = await getSettings()
  const { title: questionTitle } = await getQuestionBySlug(params.slug)

  // remove any asterisks from the title
  const formattedQuestionTitle = questionTitle?.replaceAll('*', '')

  return {
    title: `${formattedQuestionTitle} | ${title}`,
  }
}

export default async function SlugRoute({
  params,
}: {
  params: { slug: string }
}) {
  // Start fetching settings early, so it runs in parallel with the post query
  const settings = getSettings()

  const data = getQuestionAndMoreQuestions(params.slug)
  return <SingleQuestionPage data={await data} settings={await settings} />
}

// REMEMBER: don't need "revalidate" because our `/pages/api/revalidate.ts` route + Sanity Webhook will handle revalidation
// export const revalidate = 1
