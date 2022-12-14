import AlertBanner from 'components/for-reference/AlertBanner'
import Header from 'components/Header'

export default function Layout({
  preview,
  loading,
  children,
  logoTag,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
  logoTag?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <div className="min-h-screen">
      <AlertBanner preview={preview} loading={loading} />
      <Header titleTag={logoTag} />
      <main className="container">{children}</main>
    </div>
  )
}
