import { Router } from 'express'
import { requireAuth, requireAdmin, issueToken } from '../auth-service.js'

const router = Router()

router.post('/login', (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' })

  const isDemo =
    (email === 'admin@local' && password === 'secret') ||
    (email === 'user@local' && password === 'secret')

  if (!isDemo) return res.status(401).json({ message: 'Invalid credentials.' })

  const user = {
    id: email === 'admin@local' ? 1 : 2,
    email,
    role: email === 'admin@local' ? 'admin' : 'user',
    username: email.split('@')[0]
  }

  const token = issueToken(user)
  const isProd = process.env.NODE_ENV === 'production'

  res.cookie('auth_token', token, {
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd,
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
  res.cookie('user_role', user.role, {
    httpOnly: false,
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd,
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  res.json({ user })
})

router.post('/logout', (_req, res) => {
  const isProd = process.env.NODE_ENV === 'production'
  res.clearCookie('auth_token', { httpOnly: true, sameSite: isProd ? 'none' : 'lax', secure: isProd })
  res.clearCookie('user_role', { httpOnly: false, sameSite: isProd ? 'none' : 'lax', secure: isProd })
  res.json({ message: 'Logged out' })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, role: req.user.role, username: req.user.email.split('@')[0] })
})

router.get('/admin', requireAuth, requireAdmin, (_req, res) => {
  res.json({ message: 'Welcome, Admin!' })
})

export default router