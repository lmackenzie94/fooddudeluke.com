import QuestionPreview from 'components/question/QuestionPreview'
import type { Question } from 'lib/sanity.queries'

export default function QuestionsList({
  questions,
}: {
  questions: Question[]
}) {
  return (
    <section className="mb-14 md:mb-20" data-test="questions-list">
      {questions.map((question, i) => (
        <QuestionPreview key={question.slug} index={i} question={question} />
      ))}
    </section>
  )
}
