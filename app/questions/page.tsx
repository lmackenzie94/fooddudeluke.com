import QuestionsPage from 'components/question/QuestionsPage'
import { getQuestions, getSettings } from 'lib/sanity.client'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const { title } = await getSettings()

  return {
    title: `Questions | ${title}`,
  }
}

export default async function QuestionsRoute() {
  const questions = await getQuestions()

  return <QuestionsPage questions={questions} />
}

// REMEMBER: don't need "revalidate" because our `/pages/api/revalidate.ts` route + Sanity Webhook will handle revalidation
// export const revalidate = 1
