import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'
const COOKIE_NAME = 'auth_token'
const REFRESH_COOKIE_NAME = 'refresh_token'

export function issueToken(user) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '15m' })
}

export function issueRefreshToken(user) {
  return jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '7d' })
}

export function setSecureCookies(res, accessToken, refreshToken) {
  const isProduction = process.env.NODE_ENV === 'production'
  
  // HTTP-only access token cookie (short-lived)
  res.cookie(COOKIE_NAME, accessToken, {
    httpOnly: true, // Prevent XSS attacks
    secure: isProduction, // HTTPS only in production
    sameSite: isProduction ? 'strict' : 'lax', // CSRF protection
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: '/'
  })
  
  // HTTP-only refresh token cookie (long-lived)
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/auth/refresh'
  })
}

export function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = { id: payload.sub, email: payload.email, role: payload.role }
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
  next()
}