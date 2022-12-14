// import 'tailwindcss/tailwind.css'
import './index.scss'

// this layout (and hence the styles ^) applies to the Studio as well...
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-white text-black">{children}</body>
    </html>
  )
}
