import { toPlainText } from '@portabletext/react'
import DefaultMeta from 'components/DefaultMeta'
import { getQuestionBySlug, getSettings } from 'lib/sanity.client'

export default async function SlugHead({
  params,
}: {
  params: { slug: string }
}) {
  const [{ title, description }, question] = await Promise.all([
    getSettings(),
    getQuestionBySlug(params.slug),
  ])

  const metaTitle = question.title ? `${question.title} | ${title}` : title

  return (
    <>
      <DefaultMeta title={metaTitle} description={toPlainText(description)} />
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
