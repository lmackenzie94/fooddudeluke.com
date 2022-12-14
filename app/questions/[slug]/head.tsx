import BlogMeta from 'components/for-reference/BlogMeta'
import { getQuestionBySlug, getSettings } from 'lib/sanity.client'

export default async function SlugHead({
  params,
}: {
  params: { slug: string }
}) {
  const [{ title }, question] = await Promise.all([
    getSettings(),
    getQuestionBySlug(params.slug),
  ])
  return (
    <>
      <title>{question.title ? `${question.title} | ${title}` : title}</title>
      <BlogMeta />
      {/* {post.coverImage?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(post.coverImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )} */}
    </>
  )
}
