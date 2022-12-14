import PreviewIndexPage from 'components/for-reference/PreviewIndexPage'
import { PreviewSuspense } from 'components/for-reference/PreviewSuspense'
import QuestionsPage from 'components/QuestionsPage'
import { getAllQuestions } from 'lib/sanity.client'
import { previewData } from 'next/headers'

export default async function QuestionsRoute() {
  const questions = await getAllQuestions()

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

// FIXME: remove the `revalidate` export below once you've followed the instructions in `/pages/api/revalidate.ts`
export const revalidate = 1
