import SinglePostPage from 'components/post/SinglePostPage'
import {
  getAllPostsSlugs,
  getPostAndMorePosts,
  getSettings,
} from 'lib/sanity.client'

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

  const data = getPostAndMorePosts(params.slug)
  return <SinglePostPage data={await data} settings={await settings} />
}

// REMEMBER: don't need "revalidate" because our `/pages/api/revalidate.ts` route + Sanity Webhook will handle revalidation
// export const revalidate = 1
