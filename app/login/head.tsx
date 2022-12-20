import { toPlainText } from '@portabletext/react'
import DefaultMeta from 'components/DefaultMeta'
import { getSettings } from 'lib/sanity.client'

export default async function SlugHead({
  params,
}: {
  params: { slug: string }
}) {
  const { title, description } = await getSettings()

  const metaTitle = `login. | ${title}`

  return (
    <>
      <DefaultMeta title={metaTitle} description={toPlainText(description)} />
    </>
  )
}
