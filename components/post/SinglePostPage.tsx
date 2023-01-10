import Container from 'components/Container'
import PostTitle from 'components/for-reference/PostTitle'
import Layout from 'components/Layout'
import PostBody from 'components/PostBody'
import type { Post, Settings } from 'lib/sanity.queries'
import { formatTitle } from 'lib/utils/formatTitle'
import { notFound } from 'next/navigation'

export default function SinglePostPage(props: {
  preview?: boolean
  loading?: boolean
  data: { post: Post; morePosts: Post[] }
  settings: Settings
}) {
  const { preview, loading, data, settings } = props
  const { post = {} as any, morePosts = [] } = data || {}
  const { title } = settings || {}

  const slug = post?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <Layout preview={preview} loading={loading}>
      <Container>
        {preview && !post ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="prose-sm prose prose-h1:text-2xl prose-h2:text-lg md:prose-base">
              {/* <Head>
              <title>{title}</title>
              {post.socialImageURL && (
                <meta property="og:image" content={post.socialImageURL} />
              )}
            </Head> */}

              <h1
                className="h1"
                dangerouslySetInnerHTML={{
                  __html: formatTitle(post.title),
                }}
              />

              <PostBody content={post.body} />
            </article>
            {/* <SectionSeparator />
            {morePosts?.length > 0 && <MoreStories questions={morePosts} />} */}
          </>
        )}
      </Container>
    </Layout>
  )
}
