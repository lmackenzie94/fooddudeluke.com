import Container from 'components/Container'
import PostTitle from 'components/for-reference/PostTitle'
import Layout from 'components/Layout'
import PostBody from 'components/PostBody'
import type { Question, Settings } from 'lib/sanity.queries'
import { formatTitle } from 'lib/utils/formatTitle'
import { notFound } from 'next/navigation'

export default function SingleQuestionPage(props: {
  preview?: boolean
  loading?: boolean
  data: { question: Question; moreQuestions: Question[] }
  settings: Settings
}) {
  const { preview, loading, data, settings } = props
  const { question = {} as any, moreQuestions = [] } = data || {}
  const { title } = settings || {}

  const slug = question?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <Layout preview={preview} loading={loading}>
      <Container>
        {preview && !question ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="prose-sm prose prose-h1:text-2xl prose-h2:text-lg md:prose-base">
              {/* <Head>
              <title>{title}</title>
              {question.socialImageURL && (
                <meta property="og:image" content={question.socialImageURL} />
              )}
            </Head> */}

              <h1
                className="h1"
                dangerouslySetInnerHTML={{
                  __html: formatTitle(question.title),
                }}
              />

              {/* <div className="max-w-2xl mx-auto">
              <div className="mb-6 text-lg">
                <Date dateString={question.date} />
              </div>
            </div> */}

              <PostBody content={question.body} />
            </article>
            {/* <SectionSeparator />
            {moreQuestions?.length > 0 && <MoreStories questions={moreQuestions} />} */}
          </>
        )}
      </Container>
    </Layout>
  )
}
