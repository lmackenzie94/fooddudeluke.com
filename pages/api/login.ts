import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function login(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    res.statusCode = 404
    res.end('Error')
    return
  }

  const { username, password } = req.body

  const ADMIN_USERNAME = process.env.MY_ADMIN_USERNAME
  const ADMIN_PASSWORD = process.env.MY_SECRET

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    res.statusCode = 401
    res.end('Error: Invalid username or password')
    return
  }

  res.json({
    token: jwt.sign(
      {
        isAdmin: true,
      },
      process.env.MY_SECRET
    ),
  })
}
