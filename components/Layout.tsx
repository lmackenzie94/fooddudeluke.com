import AlertBanner from 'components/for-reference/AlertBanner'

import Header from './Header'

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
    <div className="site-layout">
      <AlertBanner preview={preview} loading={loading} />
      <Header titleTag={logoTag} />
      <div className="main">
        <div className="gradient"></div>
      </div>
      <main>{children}</main>
    </div>
  )
}
