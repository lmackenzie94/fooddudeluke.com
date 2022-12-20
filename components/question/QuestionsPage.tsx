import Container from 'components/Container'
import Layout from 'components/Layout'
import QuestionsList from 'components/question/QuestionsList'
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
        <h1 className="h1 with-mb">All Questions.</h1>
        <QuestionsList questions={questions} />
      </Container>
    </Layout>
  )
}
