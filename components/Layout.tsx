import AlertBanner from 'components/AlertBanner'

import Header from './Header'
import styles from './Layout.module.scss'

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
    // TODO: how to properly use scss modules?
    <div className={styles['site-layout']}>
      <AlertBanner preview={preview} loading={loading} />
      <Header titleTag={logoTag} />
      <div className={styles['gradient-container']}>
        <div className={styles['gradient']}></div>
      </div>
      <main>{children}</main>
    </div>
  )
}
