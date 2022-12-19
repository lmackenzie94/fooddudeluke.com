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
        <h1>Login</h1>

        {error && <p className="text-orange">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="button bg-orange">
            Login
          </button>
        </form>
      </Container>
    </Layout>
  )
}
