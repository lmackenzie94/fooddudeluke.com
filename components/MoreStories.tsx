import PostPreview from 'components/for-reference/PostPreview'
import type { Question } from 'lib/sanity.queries'

export default function MoreStories({ questions }: { questions: Question[] }) {

  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        Recent Questions
      </h2>
      <div className="grid grid-cols-1 mb-32 lg:gap-x-32 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32">
        {questions.map((post) => (
          <PostPreview
            key={post._id}
            title={post.title}
            slug={post.slug}
            // coverImage={post.coverImage}
            // date={post.date}
            // author={post.author}
            // excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
