import PreviewPostPage from 'components/for-reference/PreviewPostPage'
import { PreviewSuspense } from 'components/for-reference/PreviewSuspense'
import QuestionPage from 'components/QuestionPage'
import {
  getAllQuestionsSlugs,
  getQuestionAndMoreStories,
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
    const data = getQuestionAndMoreStories(params.slug, token)
    return (
      <PreviewSuspense
        fallback={
          <QuestionPage
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

  const data = getQuestionAndMoreStories(params.slug)
  return <QuestionPage data={await data} settings={await settings} />
}

// FIXME: remove the `revalidate` export below once you've followed the instructions in `/pages/api/revalidate.ts`
export const revalidate = 1
