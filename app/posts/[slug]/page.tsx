import SinglePostPage from 'components/post/SinglePostPage'
import {
  getAllPostsSlugs,
  getPostAndMorePosts,
  getPostBySlug,
  getSettings,
} from 'lib/sanity.client'
import { getPostTitlePrefix } from 'lib/utils/getPostTitlePrefix'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return await getAllPostsSlugs()
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { title } = await getSettings()
  const { title: postTitle, categories } = await getPostBySlug(params.slug)

  const postTitlePrefix = getPostTitlePrefix(categories)
  const fullPostTitle = `${postTitlePrefix}: ${postTitle}`

  return {
    title: `${fullPostTitle} | ${title}`,
  }
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
