// in Next 13, this file replaces the old _app.js and _document.js files

// import 'tailwindcss/tailwind.css'
import './index.scss'

import { toPlainText } from '@portabletext/react'
import { getSettings } from 'lib/sanity.client'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = await getSettings()

  return {
    title: title,
    description: toPlainText(description),
  }
}

// this layout (and hence the styles ^) applies to the Studio as well...
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">{children}</body>
    </html>
  )
}
