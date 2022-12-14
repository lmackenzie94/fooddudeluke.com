'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header({ titleTag = 'h2' }) {
  const Tag: any = titleTag // TODO: how to type this?

  const navItems = [
    {
      title: 'posts.',
      href: '/posts',
    },
    {
      title: 'questions.',
      href: '/questions',
    },
    {
      title: 'my food.',
      href: '/my-food',
    },
  ]

  const currentPath = usePathname()

  return (
    <header className="fixed top-0 left-0 z-10 w-full bg-white shadow-md shadow-neutral-100">
      <div className="container flex flex-col items-center pt-6 pb-8 bg-none sm:flex-row sm:justify-between">
        <Link
          href="/"
          className="mb-4 transition-transform duration-200 origin-bottom-left hover:-rotate-2 sm:mb-0"
        >
          <Tag className="cursor-pointer text-[2.6rem] font-bold leading-tight tracking-tighter sm:pr-8 sm:text-3xl">
            <Logo />
          </Tag>
        </Link>
        {/* <nav>
          <ul className="flex gap-x-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${
                    currentPath === `${item.href}`
                      ? `text-shadow text-orange`
                      : `text-gray-500 hover:text-orange`
                  } text-md `}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav> */}
      </div>
    </header>
  )
}

const Logo = () => (
  <>
    <span className="text-green">food </span>
    <span className="text-orange">dude </span>
    <span className="text-yellow">luke</span>
    <span className="text-blue">.</span>
  </>
)
