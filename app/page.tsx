import PreviewIndexPage from 'components/for-reference/PreviewIndexPage'
import { PreviewSuspense } from 'components/for-reference/PreviewSuspense'
import HomePage from 'components/HomePage'
import { getFood } from 'lib/my-food/getFood'
import { getPosts, getQuestions, getSettings } from 'lib/sanity.client'
import { previewData } from 'next/headers'

export default async function IndexRoute() {
  // Fetch queries in parallel
  const [settings, posts, questions, food] = await Promise.all([
    getSettings(),
    getPosts(5),
    getQuestions(5),
    getFood(8),
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
            food={food}
            settings={settings}
          />
        }
      >
        <PreviewIndexPage token={token} />
      </PreviewSuspense>
    )
  }

  return (
    <HomePage
      posts={posts}
      questions={questions}
      food={food}
      settings={settings}
    />
  )
}

// REMEMBER: don't need "revalidate" because our `/pages/api/revalidate.ts` route + Sanity Webhook will handle revalidation
// export const revalidate = 1
