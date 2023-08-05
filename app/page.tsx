import HomePage from 'components/HomePage'
import PreviewIndexPage from 'components/preview/PreviewIndexPage'
import { PreviewSuspense } from 'components/preview/PreviewSuspense'
import { getPosts, getQuestions, getSettings } from 'lib/sanity.client'
import { previewData } from 'next/headers'

export default async function IndexRoute() {
  // Fetch queries in parallel
  const [settings, posts, questions] = await Promise.all([
    getSettings(),
    getPosts(5),
    getQuestions(5),
  ])

  if (previewData()) {
    const token = previewData().token || null

    return (
      <PreviewSuspense
        fallback={
          <HomePage
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

  return <HomePage posts={posts} questions={questions} settings={settings} />
}

// REMEMBER: don't need "revalidate"
// because our `/pages/api/revalidate.ts` route + Sanity Webhook will handle revalidation
// export const revalidate = 1
