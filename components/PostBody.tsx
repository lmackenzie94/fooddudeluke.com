/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import { PortableText } from '@portabletext/react'

let numOfHighlights = 0

const myPortableTextComponents: {
  marks: {
    highlight: ({ children }: { children: React.ReactNode }) => JSX.Element
    // tldr: ({ children }: { children: React.ReactNode }) => JSX.Element
  }
} = {
  marks: {
    highlight: ({ children }) => {
      numOfHighlights++

      const highlightColor =
        numOfHighlights % 4 === 0
          ? 'bg-blue/20'
          : numOfHighlights % 3 === 0
          ? 'bg-yellow/20'
          : numOfHighlights % 2 === 0
          ? 'bg-green/20'
          : 'bg-orange/20'
      return (
        <span className={`p-1 ${highlightColor} text-black`}>{children}</span>
      )
    },
    // tldr: ({ children }) => {
    //   console.log('TLDR', children)
    // },
  },
}
export default function PostBody({ content }) {
  return <PortableText value={content} components={myPortableTextComponents} />
}
