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
    // {
    //   title: 'food.',
    //   href: '/food',
    // },
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
            <li key="instagram-logo">
              <a
                href="https://www.instagram.com/fooddudeluke/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-blue transition-colors duration-200 hover:fill-blue/70 focus:fill-blue/70"
                >
                  <title>Instagram</title>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </li>
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
