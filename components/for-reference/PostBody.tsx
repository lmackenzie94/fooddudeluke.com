import { PortableText } from '@portabletext/react'

import styles from './PostBody.module.css'

export default function PostBody({ content }) {
  return (
    <div className={`mx-auto max-w-2xl ${styles.portableText}`}>
      <PortableText value={content} />
    </div>
  )
}
