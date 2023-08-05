import PostsPage from 'components/post/PostsPage'
import { getPosts } from 'lib/sanity.client'

export default async function PostsRoute() {
  const posts = await getPosts()

  return <PostsPage posts={posts} />
}

// REMEMBER: don't need "revalidate" because our `/pages/api/revalidate.ts` route + Sanity Webhook will handle revalidation
// export const revalidate = 1
