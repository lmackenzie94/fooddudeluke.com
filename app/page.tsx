import PreviewIndexPage from 'components/for-reference/PreviewIndexPage'
import { PreviewSuspense } from 'components/for-reference/PreviewSuspense'
import HomePage from 'components/HomePage'
import { getPosts, getQuestions, getSettings } from 'lib/sanity.client'
import { previewData } from 'next/headers'

import type { FoodImage } from '../lib/my-food/cloudinary'
import { mapImageResources, search } from '../lib/my-food/cloudinary'

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

const getFood = async (numOfImages: number): Promise<FoodImage[]> => {
  const results = await search({
    folder: 'food-dude-luke',
    // max_results: numOfImages,
    max_results: 500,
    // TODO: sort newest first without having to fetch all images
    // sort_by: 'context.uploadTimestamp',
  })

  const { resources } = results

  const images = mapImageResources(resources)

  const sortedImages = images.sort((a, b) => {
    return b.instaUploadTimestamp - a.instaUploadTimestamp
  })

  return sortedImages.slice(0, numOfImages)
}

// REMEMBER: don't need "revalidate" because our `/pages/api/revalidate.ts` route + Sanity Webhook will handle revalidation
// export const revalidate = 1
