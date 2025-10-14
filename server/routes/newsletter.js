import { Router } from 'express'
import crypto from 'crypto'
import { body, validationResult } from 'express-validator'
import { Op } from 'sequelize'
import { sendMail } from '../utils/mailer.js'
import NewsletterSubscription, { newToken } from '../models/NewsletterSubscription.js'

const router = Router()

// Subscribe endpoint
router.post('/subscribe', [body('email').isEmail().withMessage('Valid email is required')], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid input', errors: errors.array() })

  const { email } = req.body
  const { raw, hash } = newToken()
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  const existing = await NewsletterSubscription.findOne({ where: { email } })
  if (existing) {
    await existing.update({ status: 'subscribed', tokenHash: hash, tokenExpiresAt: expires })
  } else {
    await NewsletterSubscription.create({ email, status: 'subscribed', tokenHash: hash, tokenExpiresAt: expires })
  }

  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
  const unsubscribeLink = `${FRONTEND_URL}/newsletter/unsubscribe?token=${raw}`

  // Send welcome/confirmation with unsubscribe link from info@
  await sendMail({
    to: email,
    from: process.env.SUBS_FROM || 'Seatre <info@everyonecancode.net>',
    subject: 'Welcome to Seatre Newsletter',
    text: `Thanks for subscribing! You can unsubscribe anytime: ${unsubscribeLink}`,
    html: `<p>Thanks for subscribing to Seatre updates!</p>
           <p>You can unsubscribe anytime by clicking this link:</p>
           <p><a href="${unsubscribeLink}">Unsubscribe</a></p>`
  })

  res.json({ message: 'Subscription confirmed. Please check your email.' })
})

// Unsubscribe endpoint (from link)
router.post('/unsubscribe', [body('token').isString().notEmpty()], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid input', errors: errors.array() })

  const { token } = req.body
  const hash = crypto.createHash('sha256').update(token).digest('hex')
  const sub = await NewsletterSubscription.findOne({ where: { tokenHash: hash, tokenExpiresAt: { [Op.gt]: new Date() } } })
  if (!sub) return res.status(400).json({ message: 'Invalid or expired link.' })
  await sub.update({ status: 'unsubscribed' })
  res.json({ message: 'You have been unsubscribed.' })
})

export default router
