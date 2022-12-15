import PostPreview from 'components/post/PostPreview'
import type { Post } from 'lib/sanity.queries'

export default function PostsList({ posts }: { posts: Post[] }) {
  return (
    <section className="mb-14 md:mb-20" data-test="posts-list">
      {posts.map((post, i) => (
        <PostPreview key={post.slug} index={i} post={post} />
      ))}
    </section>
  )
}
