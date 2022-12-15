import Container from 'components/Container'
import Layout from 'components/Layout'
import PostsList from 'components/post/PostsList'
import type { Post } from 'lib/sanity.queries'

export default function PostsPage(props: {
  preview?: boolean
  loading?: boolean
  posts: Post[]
}) {
  const { preview, loading, posts } = props
  // const { title, description } = settings || {}

  return (
    <Layout preview={preview} loading={loading}>
      <Container>
        <h1 className="mb-4 h1 md:mb-6">All Posts.</h1>
        <PostsList posts={posts} />
      </Container>
    </Layout>
  )
}
