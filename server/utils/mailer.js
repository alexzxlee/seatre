import nodemailer from 'nodemailer'

let transporter

export function getTransporter() {
  if (transporter) return transporter
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env

  const secure = String(SMTP_SECURE || 'true') === 'true' // 465 = SSL (secure: true), 587 = STARTTLS (secure: false)
  const allowInsecure = String(process.env.SMTP_ALLOW_INSECURE || 'false') === 'true'

  // Log transporter config summary (do not log credentials)
  console.info('Creating mail transporter', { host: SMTP_HOST, port: Number(SMTP_PORT || 465), secure, allowInsecure })

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 465),
    secure,
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    tls: allowInsecure ? { rejectUnauthorized: false } : undefined
  })

  return transporter
}

export async function sendMail({ to, subject, html, text, from }) {
  const t = getTransporter()
  const sender = from || process.env.SMTP_FROM || process.env.SMTP_USER
  if (!sender) throw new Error('SMTP_FROM or SMTP_USER must be set')
  return t.sendMail({ from: sender, to, subject, html, text })
}
