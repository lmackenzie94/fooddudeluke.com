import Container from 'components/Container'
import Layout from 'components/Layout'
import jwt from 'jsonwebtoken'
import { useState } from 'react'

export default function LoginPage() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const data = await (
        await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        })
      ).json()

      const { token } = data

      if (token) {
        const json = jwt.decode(token) as { isAdmin: boolean }
        const { isAdmin } = json

        // if isAdmin, set local storage and redirect to home page
        if (isAdmin) {
          localStorage.setItem('fdl-admin-token', token)
          window.location.href = '/'
        }
      }
    } catch (e) {
      setError('Something went wrong.')
    }
  }

  return (
    <Layout preview={false}>
      <Container>
        <div className="mx-auto max-w-sm rounded-md bg-[#fff] px-4 py-6 shadow-md">
          <h1 className="h1 with-mb">Login.</h1>

          {error && <p className="text-orange">{error}</p>}

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="username">
              Username:
            </label>

            <input
              className="mb-4 rounded-md border border-yellow p-2 focus:border-green focus:outline-none"
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="sr-only" htmlFor="password">
              Password:
            </label>

            <input
              className="mb-4 rounded-md border border-yellow p-2 focus:border-green focus:outline-none"
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="button bg-orange text-xs text-white"
            >
              Login
            </button>
          </form>
        </div>
      </Container>
    </Layout>
  )
}
