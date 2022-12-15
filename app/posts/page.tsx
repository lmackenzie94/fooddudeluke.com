import PreviewIndexPage from 'components/for-reference/PreviewIndexPage'
import { PreviewSuspense } from 'components/for-reference/PreviewSuspense'
import PostsPage from 'components/post/PostsPage'
import { getPosts } from 'lib/sanity.client'
import { previewData } from 'next/headers'

export default async function PostsRoute() {
  const posts = await getPosts()

  if (previewData()) {
    const token = previewData().token || null

    return (
      <PreviewSuspense fallback={<PostsPage loading preview posts={posts} />}>
        <PreviewIndexPage token={token} />
      </PreviewSuspense>
    )
  }

  return <PostsPage posts={posts} />
}

// REMEMBER: don't need "revalidate" because our `/pages/api/revalidate.ts` route + Sanity Webhook will handle revalidation
// export const revalidate = 1
