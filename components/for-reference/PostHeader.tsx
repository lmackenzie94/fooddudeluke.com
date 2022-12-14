import Avatar from 'components/for-reference/AuthorAvatar'
import CoverImage from 'components/for-reference/CoverImage'
import Date from 'components/for-reference/PostDate'
import PostTitle from 'components/for-reference/PostTitle'
import type { Post } from 'lib/sanity.queries'

export default function PostHeader(
  props: Pick<Post, 'title' | 'date' | 'author' | 'slug'>
) {
  const { title, date, author, slug } = props
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:mb-12 md:block">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div>
      {/* <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </div> */}
      <div className="max-w-2xl mx-auto">
        <div className="block mb-6 md:hidden">
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  )
}
