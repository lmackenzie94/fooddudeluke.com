import Layout from 'components/BlogLayout'
import Container from 'components/Container'
import MoreStories from 'components/MoreStories'
import QuestionsList from 'components/QuestionsList'
import type { Question } from 'lib/sanity.queries'

export default function QuestionsPage(props: {
  preview?: boolean
  loading?: boolean
  questions: Question[]
}) {
  const { preview, loading, questions } = props
  // const { title, description } = settings || {}

  return (
    <Layout preview={preview} loading={loading}>
      <Container>
        <h1 className="h1 mb-4 md:mb-6">All Questions.</h1>
        <QuestionsList questions={questions} />
      </Container>
    </Layout>
  )
}
