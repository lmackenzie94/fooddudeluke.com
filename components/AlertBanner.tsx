/* eslint-disable @next/next/no-html-link-for-pages */
export default function Alert({
  preview,
  loading,
}: {
  preview?: boolean
  loading?: boolean
}) {
  if (!preview) return

  return (
    <div className="fixed bottom-0 z-10 w-full rounded-sm bg-orange text-white">
      <div className="p-2 text-center text-sm">
        {loading ? 'Loading... ' : 'This page is a preview. '}
        <a
          href="/api/exit-preview"
          className="hover:text-cyan underline transition-colors duration-200"
        >
          Click here
        </a>{' '}
        to exit preview mode.
      </div>
    </div>
  )
}
