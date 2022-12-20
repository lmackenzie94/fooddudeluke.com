// should return a React fragment, not a wrapping <head> tag.
import { toPlainText } from '@portabletext/react'
import DefaultMeta from 'components/DefaultMeta'
import { getSettings } from 'lib/sanity.client'

// TODO: make this better
export default async function PageHead() {
  const { title, description, ogImage = {} } = await getSettings()
  const ogImageTitle = ogImage?.title

  return (
    <>
      <DefaultMeta title={title} description={toPlainText(description)} />
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
