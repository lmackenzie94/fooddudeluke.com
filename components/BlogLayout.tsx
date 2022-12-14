import AlertBanner from 'components/for-reference/AlertBanner'

import Header from './Header'

export default function BlogLayout({
  preview,
  loading,
  children,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <div className="min-h-screen">
        <AlertBanner preview={preview} loading={loading} />
        <Header />
        <main>{children}</main>
      </div>
    </>
  )
}
