import type { Post } from 'lib/sanity.queries'
import { formatTitle } from 'lib/utils/formatTitle'
import Link from 'next/link'

import styles from './PostPreview.module.scss'

export default function PostPreview({
  index,
  post,
}: {
  index: number
  post: Post
}) {
  const { title, slug, categories } = post

  return (
    <Link
      href={`/posts/${slug}`}
      data-test="item-preview"
      className={`${styles.postLink} glassmorphism mb-2 flex items-center justify-between border-x-4 px-3 py-2 md:px-4`}
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
