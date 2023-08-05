import QuestionsPage from 'components/question/QuestionsPage'
import { getQuestions } from 'lib/sanity.client'

export default async function QuestionsRoute() {
  const questions = await getQuestions()

  return <QuestionsPage questions={questions} />
}

// REMEMBER: don't need "revalidate" because our `/pages/api/revalidate.ts` route + Sanity Webhook will handle revalidation
// export const revalidate = 1
