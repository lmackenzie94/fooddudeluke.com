import type { Question } from 'lib/sanity.queries'
import { formatTitle } from 'lib/utils/formatTitle'
import Link from 'next/link'

import styles from './QuestionPreview.module.scss'

export default function QuestionPreview({
  index,
  question,
}: {
  index: number
  question: Question
}) {
  const { title, slug, categories } = question

  return (
    <Link
      href={`/questions/${slug}`}
      data-test="item-preview"
      className={`${styles.questionLink} mb-2 flex items-center justify-between border-x-4 bg-white-full px-3 py-2 md:px-4`}
    >
      <article className="flex w-full items-center justify-between">
        <h3
          className="text-sm leading-snug md:text-base"
          data-test="item-preview-title"
          dangerouslySetInnerHTML={{
            __html: formatTitle(title, categories),
          }}
        />
        {categories?.map((category) => (
          <span
            key={category.title}
            data-test="item-preview-category"
            style={{ borderColor: category.color, color: category.color }}
            className={`ml-2 whitespace-nowrap rounded-xl border-2 bg-white px-2 pt-[0.1rem] pb-[.09rem] text-[.6rem] font-bold uppercase tracking-tight text-black`}
          >
            {category.title}
          </span>
        ))}
      </article>
    </Link>
  )
}
