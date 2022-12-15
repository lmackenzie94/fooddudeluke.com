import Container from 'components/Container'
import Layout from 'components/Layout'
import PostsList from 'components/post/PostsList'
import QuestionsList from 'components/question/QuestionsList'
import type { Post, Question, Settings } from 'lib/sanity.queries'
import Link from 'next/link'

export default function HomePage(props: {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  questions: Question[]
  settings: Settings
}) {
  const { preview, loading, posts, questions, settings } = props
  // const { title, description } = settings || {}

  return (
    <Layout preview={preview} loading={loading}>
      <Container>
        {/* <BlogHeader title={title} description={description} level={1} /> */}

        <ListHeader heading="Recent Posts." type="posts" btnColor="bg-blue" />
        <PostsList posts={posts} />

        {/* Recent Questions */}
        <ListHeader
          heading="Recent Questions."
          type="questions"
          btnColor="bg-green"
        />
        <QuestionsList questions={questions} />
      </Container>
    </Layout>
  )
}

const ListHeader = ({
  heading,
  type,
  btnColor,
}: {
  heading: string
  type: 'posts' | 'questions'
  btnColor: string
}) => (
  <div className="flex items-center justify-between mb-4 md:mb-6">
    <h2 className="h1">{heading}</h2>
    <Link
      href={`/${type}`}
      className={`button ml-4 inline-block text-xs text-white ${btnColor}`}
    >
      see all.
    </Link>
  </div>
)
