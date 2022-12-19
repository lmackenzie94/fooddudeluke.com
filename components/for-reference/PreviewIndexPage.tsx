'use client'

import HomePage from 'components/HomePage'
import { usePreview } from 'lib/sanity.preview'
import {
  type Post,
  type Question,
  type Settings,
  postsQuery,
  questionsQuery,
  settingsQuery,
} from 'lib/sanity.queries'

export default function PreviewIndexPage({ token }: { token: null | string }) {
  const posts: Post[] = usePreview(token, postsQuery()) || []
  const questions: Question[] = usePreview(token, questionsQuery()) || []
  const settings: Settings = usePreview(token, settingsQuery) || {}

  return (
    <HomePage
      preview
      posts={posts}
      questions={questions}
      food={[]}
      settings={settings}
    />
  )
}
