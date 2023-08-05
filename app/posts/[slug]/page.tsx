import SinglePostPage from 'components/post/SinglePostPage'
import PreviewPostPage from 'components/preview/PreviewPostPage'
import { PreviewSuspense } from 'components/preview/PreviewSuspense'
import {
  getAllPostsSlugs,
  getPostAndMorePosts,
  getSettings,
} from 'lib/sanity.client'
import { previewData } from 'next/headers'

export async function generateStaticParams() {
  return await getAllPostsSlugs()
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
    const data = getPostAndMorePosts(params.slug, token)
    return (
      <PreviewSuspense
        fallback={
          <SinglePostPage
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

  const data = getPostAndMorePosts(params.slug)
  return <SinglePostPage data={await data} settings={await settings} />
}

// REMEMBER: don't need "revalidate" because our `/pages/api/revalidate.ts` route + Sanity Webhook will handle revalidation
// export const revalidate = 1
