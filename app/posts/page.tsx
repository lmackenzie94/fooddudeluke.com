import PostsPage from 'components/post/PostsPage'
import { getPosts, getSettings } from 'lib/sanity.client'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const { title } = await getSettings()

  return {
    title: `Posts | ${title}`,
  }
}

export default async function PostsRoute() {
  const posts = await getPosts()

  return <PostsPage posts={posts} />
}

// REMEMBER: don't need "revalidate" because our `/pages/api/revalidate.ts` route + Sanity Webhook will handle revalidation
// export const revalidate = 1
