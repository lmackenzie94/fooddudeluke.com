import { toPlainText } from '@portabletext/react'
import DefaultMeta from 'components/DefaultMeta'
import { getPostBySlug, getSettings } from 'lib/sanity.client'
import { urlForImage } from 'lib/sanity.image'

export default async function SlugHead({
  params,
}: {
  params: { slug: string }
}) {
  const [{ title, description }, post] = await Promise.all([
    getSettings(),
    getPostBySlug(params.slug),
  ])

  const metaTitle = post.title ? `${post.title} | ${title}` : title

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
