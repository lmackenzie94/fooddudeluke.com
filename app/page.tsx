import PreviewIndexPage from 'components/for-reference/PreviewIndexPage'
import { PreviewSuspense } from 'components/for-reference/PreviewSuspense'
import IndexPage from 'components/IndexPage'
import {
  getPostsForHome,
  getQuestionsForHome,
  getSettings,
} from 'lib/sanity.client'
import { previewData } from 'next/headers'

export default async function IndexRoute() {
  // Fetch queries in parallel
  const [settings, posts, questions] = await Promise.all([
    getSettings(),
    getPostsForHome(5),
    getQuestionsForHome(5),
  ])

  if (previewData()) {
    const token = previewData().token || null

    return (
      <PreviewSuspense
        fallback={
          <IndexPage
            loading
            preview
            posts={posts}
            questions={questions}
            settings={settings}
          />
        }
      >
        <PreviewIndexPage token={token} />
      </PreviewSuspense>
    )
  }

  return <IndexPage posts={posts} questions={questions} settings={settings} />
}

// FIXME: remove the `revalidate` export below once you've followed the instructions in `/pages/api/revalidate.ts`
export const revalidate = 1
