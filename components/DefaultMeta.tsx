// Nested head.js files do not inherit or merge tags from head.js files higher up in the tree.
// This means, if a tag is not returned in the currently selected head.js file,
// it will not be rendered in the document's <head> element.

export default function DefaultMeta({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <title>{title}</title>
      <meta key="description" name="description" content={description} />

      {/* PWA tags */}
      <meta name="application-name" content="food dude luke." />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="food dude luke." />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#FFFFFF" />
      {/* <meta name="msapplication-config" content="/icons/browserconfig.xml" /> */}

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      {/* <link rel="manifest" href="/manifest.json" /> */}
      <link rel="shortcut icon" href="/favicon/favicon.ico" />

      {/* <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      /> */}
      {/* <meta name="msapplication-config" content="/favicon/browserconfig.xml" /> */}
      {/* <link rel="alternate" type="application/rss+xml" href="/feed.xml" /> */}
      {/* <meta property="og:image" content={HOME_OG_IMAGE_URL} /> */}
    </>
  )
}
