import { Router } from 'express'
import { Op } from 'sequelize'
import crypto from 'crypto'
import { sendMail } from '../utils/mailer.js'
import { body, validationResult } from 'express-validator'
import { requireAuth, requireAdmin, issueToken, issueRefreshToken, setSecureCookies } from '../auth-service.js'
import User from '../models/User.js'

const router = Router()

// Validation middleware for login
const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6, max: 128 })
    .withMessage('Password must be between 6 and 128 characters')
]

router.post('/login', loginValidation, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Invalid input', 
        errors: errors.array() 
      })
    }

    const { email, password } = req.body

    // Find user in database (no fallback - database must work!)
    const user = await User.findOne({ where: { email } })
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    const userResponse = {
      id: user.id,
      email: user.email,
      role: user.role
    }

    // Issue both access and refresh tokens
    const accessToken = issueToken(userResponse)
    const refreshToken = issueRefreshToken(userResponse)
    
    // Set secure HTTP-only cookies
    setSecureCookies(res, accessToken, refreshToken)

    res.json({ user: userResponse })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/register', async (req, res) => {
  try {
    const { email, password, role = 'user' } = req.body || {}
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      where: { email } 
    })

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' })
    }

    // Create new user
    const user = await User.create({
      email,
      password, // Will be hashed by the model hook
      role
    })

    const userResponse = {
      id: user.id,
      email: user.email,
      role: user.role
    }

    res.status(201).json({ 
      message: 'User created successfully', 
      user: userResponse 
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/logout', (_req, res) => {
  const isProd = process.env.NODE_ENV === 'production'
  res.clearCookie('auth_token', { httpOnly: true, sameSite: isProd ? 'none' : 'lax', secure: isProd })
  res.clearCookie('refresh_token', { httpOnly: true, sameSite: isProd ? 'none' : 'lax', secure: isProd })
  res.clearCookie('user_role', { httpOnly: false, sameSite: isProd ? 'none' : 'lax', secure: isProd })
  res.json({ message: 'Logged out' })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, role: req.user.role })
})

router.get('/admin', requireAuth, requireAdmin, (_req, res) => {
  res.json({ message: 'Welcome, Admin!' })
})

// Request password reset link
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Valid email is required')
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid input', errors: errors.array() })
  }

  const { email } = req.body
  const user = await User.findOne({ where: { email } })

  // Respond with 200 regardless to avoid user enumeration
  if (!user) {
    return res.json({ message: 'If that email exists, a reset link has been sent.' })
  }

  // Create a reset token and expiry (1 hour)
  const rawToken = crypto.randomBytes(32).toString('hex')
  const hashed = crypto.createHash('sha256').update(rawToken).digest('hex')
  const expires = new Date(Date.now() + 60 * 60 * 1000)

  user.passwordResetToken = hashed
  user.passwordResetExpires = expires
  await user.save()

  // Build reset link
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
  const link = `${FRONTEND_URL}/password/reset?token=${rawToken}`

  // Try to send email if SMTP is configured
  const haveSmtp = !!(process.env.SMTP_HOST && (process.env.SMTP_USER || process.env.SMTP_FROM))
  if (haveSmtp) {
    try {
      await sendMail({
        to: email,
        subject: 'Reset your Seatre password',
        text: `Click the link to reset your password: ${link}`,
        html: `<p>We received a request to reset your password.</p>
               <p><a href="${link}">Reset your password</a></p>
               <p>If you didn't request this, you can ignore this email.</p>`
      })
    } catch (e) {
      console.warn('SMTP send failed:', e.message)
      // continue; we still respond success to avoid leaking info
    }
  }

  // Return generic success; include link for local dev convenience
  const includeLink = process.env.NODE_ENV !== 'production'
  res.json({ message: 'If that email exists, a reset link has been sent.', ...(includeLink ? { link } : {}) })
})

// Reset password using token
router.post('/reset-password', [
  body('token').isString().notEmpty(),
  body('password').isLength({ min: 6, max: 128 }).withMessage('Password must be between 6 and 128 characters')
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid input', errors: errors.array() })
  }

  const { token, password } = req.body
  const hashed = crypto.createHash('sha256').update(token).digest('hex')
  const now = new Date()

  const user = await User.findOne({
    where: {
      passwordResetToken: hashed,
      passwordResetExpires: { [Op.gt]: now }
    }
  })

  if (!user) {
    return res.status(400).json({ message: 'Reset token is invalid or has expired.' })
  }

  user.password = password // will be hashed by hook
  user.passwordResetToken = null
  user.passwordResetExpires = null
  await user.save()

  res.json({ message: 'Password has been reset successfully.' })
})

export default router