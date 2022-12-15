import PreviewIndexPage from 'components/for-reference/PreviewIndexPage'
import { PreviewSuspense } from 'components/for-reference/PreviewSuspense'
import QuestionsPage from 'components/question/QuestionsPage'
import { getQuestions } from 'lib/sanity.client'
import { previewData } from 'next/headers'

export default async function QuestionsRoute() {
  const questions = await getQuestions()

  if (previewData()) {
    const token = previewData().token || null

    return (
      <PreviewSuspense
        fallback={<QuestionsPage loading preview questions={questions} />}
      >
        <PreviewIndexPage token={token} />
      </PreviewSuspense>
    )
  }

  return <QuestionsPage questions={questions} />
}

// REMEMBER: don't need "revalidate" because our `/pages/api/revalidate.ts` route + Sanity Webhook will handle revalidation
// export const revalidate = 1
