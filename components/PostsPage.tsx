import Container from 'components/Container'
import Layout from 'components/Layout'
import MoreStories from 'components/MoreStories'
import PostsList from 'components/PostsList'
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
        <h1 className="h1 mb-4 md:mb-6">All Posts.</h1>
        <PostsList posts={posts} />
      </Container>
    </Layout>
  )
}
