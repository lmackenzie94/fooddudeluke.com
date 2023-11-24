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
}) {
  const { preview, loading, posts, questions } = props

  return (
    <Layout preview={preview} loading={loading} logoTag="h1">
      <Container>
        {/* Recent Posts */}
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
  children,
}: {
  heading: string
  type: 'posts' | 'questions' | 'food'
  btnColor: string
  children?: React.ReactNode
}) => (
  <div className="mb-4 flex items-center justify-between md:mb-6">
    <h2 className="h1 flex-1">{heading}</h2>
    <Link
      href={`/${type}`}
      className={`button ml-4 inline-block text-xs text-white ${btnColor}`}
    >
      see all.
    </Link>
    {children}
  </div>
)
