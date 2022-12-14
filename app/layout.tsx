// import 'tailwindcss/tailwind.css'
import './index.css'

// this layout applies to the Studio as well...
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="text-black bg-white">{children}</body>
    </html>
  )
}
