import BlogMeta from 'components/for-reference/BlogMeta'
import MetaDescription from 'components/for-reference/MetaDescription'
import { getSettings } from 'lib/sanity.client'

export default async function PageHead() {
  const { title, description, ogImage = {} } = await getSettings()
  const ogImageTitle = ogImage?.title

  return (
    <>
      <title>{title}</title>
      <BlogMeta />
      <MetaDescription value={description} />
      <meta
        property="og:image"
        // Because OG images must have a absolute URL, we use the
        // `VERCEL_URL` environment variable to get the deployment’s URL.
        // More info:
        // https://vercel.com/docs/concepts/projects/environment-variables
        content={`${
          process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''
        }/api/og?${new URLSearchParams({ title: ogImageTitle })}`}
      />
    </>
  )
}
