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
      title: 'food.',
      href: '/food',
    },
  ]

  const currentPath = usePathname()

  return (
    <header className="shadow-neutral-100 fixed top-0 left-0 z-10 w-full bg-white shadow-md">
      <div className="container flex flex-col items-center bg-none pt-6 pb-8 sm:flex-row sm:justify-between">
        <Link
          href="/"
          className="mb-4 origin-bottom-left transition-transform duration-200 hover:-rotate-2 sm:mb-0"
        >
          <Tag className="cursor-pointer text-[2.6rem] font-bold leading-tight tracking-tighter sm:pr-8 sm:text-3xl">
            <Logo />
          </Tag>
        </Link>
        <nav>
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
        </nav>
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
