import PreviewPostPage from 'components/for-reference/PreviewPostPage'
import { PreviewSuspense } from 'components/for-reference/PreviewSuspense'
import SingleQuestionPage from 'components/question/SingleQuestionPage'
import {
  getAllQuestionsSlugs,
  getQuestionAndMoreQuestions,
  getSettings,
} from 'lib/sanity.client'
import { previewData } from 'next/headers'

export async function generateStaticParams() {
  return await getAllQuestionsSlugs()
}

export default async function SlugRoute({
  params,
}: {
  params: { slug: string }
}) {
  // Start fetching settings early, so it runs in parallel with the post query
  const settings = getSettings()

  if (previewData()) {
    const token = previewData().token || null
    const data = getQuestionAndMoreQuestions(params.slug, token)
    return (
      <PreviewSuspense
        fallback={
          <SingleQuestionPage
            loading
            preview
            data={await data}
            settings={await settings}
          />
        }
      >
        <PreviewPostPage token={token} slug={params.slug} />
      </PreviewSuspense>
    )
  }

  const data = getQuestionAndMoreQuestions(params.slug)
  return <SingleQuestionPage data={await data} settings={await settings} />
}

// REMEMBER: don't need "revalidate" because our `/pages/api/revalidate.ts` route + Sanity Webhook will handle revalidation
// export const revalidate = 1
