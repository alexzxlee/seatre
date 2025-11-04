import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { body, validationResult } from 'express-validator'
import { consola } from 'consola'
import sequelize, { testConnection } from './sequelize.js'
import authRouter from './routes/auth.js'
import newsletterRouter from './routes/newsletter.js'
import User from './models/User.js'
import './models/NewsletterSubscription.js'
import { logToFile } from './utils/logToFile.js'

// Temporary DB connectivity check (remove after verifying in cPanel logs)
testConnection()

const app = express()

// When running behind a reverse proxy (LiteSpeed, nginx, etc.) the
// X-Forwarded-* headers are set by the proxy. Express needs to know
// to trust those headers so middleware like express-rate-limit can
// correctly use the originating IP. This defaults to false which
// caused a ValidationError in production logs. Enable it by default
// when deployed behind a well-configured proxy.
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', true)
}

const PORT = process.env.PORT || 3001
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

// --- Logging for CORS debugging ---
logToFile(`FRONTEND_URL: ${FRONTEND_URL}`)
console.log('FRONTEND_URL:', FRONTEND_URL)

// CORS with proper security (must be first)
const allowedOrigins = [
  'https://everyonecancode.net',           // production frontend
  'https://www.everyonecancode.net',       // production frontend with www
  'https://api.everyonecancode.net',       // production backend (API direct, e.g. for testing or server-to-server)
  'https://test.everyonecancode.net',      // test domain (subdomain)
  'http://localhost:3000',                 // local dev (Nuxt frontend)
  'http://localhost:3001',                 // local dev (API direct)
  'http://127.0.0.1:3000'                  // local dev (alternative)
  // Add more as needed
];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like curl, Postman, or mobile apps)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
    //   origin: (origin, callback) => {
    //   if (!origin) {
    //     callback(null, origin);
    //     return;
    //   }
      
    //   // Check if origin matches allowed patterns (with or without www)
    //   const normalizedOrigin = origin.replace(/^https?:\/\/(www\.)?/, '');
    //   const isAllowed = allowedOrigins.some(allowed => {
    //     const normalizedAllowed = allowed.replace(/^https?:\/\/(www\.)?/, '');
    //     return normalizedAllowed === normalizedOrigin;
    //   });
      
    //   if (isAllowed) {
    //     callback(null, origin);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // }
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'x-csrf-token'],
}))

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false // Allow embedding for development
}))

// Rate limiting - commercial grade
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  skipSuccessfulRequests: true
})

app.use(limiter)

// Register CSRF route before authLimiter
import crypto from 'crypto'
app.get('/api/auth/csrf', (req, res) => {
  const token = crypto.randomBytes(32).toString('hex')
  res.json({ csrfToken: token })
})

app.use('/api/auth', authLimiter)

app.use(express.json({ limit: '10mb' })) // Prevent large payload attacks
app.use(cookieParser())

// Health check (uses Sequelize/MySQL)
// It’s a standard endpoint for health checks in production and development.
// Open your browser or use a tool like curl or Postman to visit: http://localhost:3001/healthz
// If the DB is up, it returns { ok: true }. If not, it returns a 500 error.
app.get('/healthz', async (_req, res) => {
  try {
    await sequelize.authenticate()
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
})

// API routes
app.use('/api/auth', authRouter)
app.use('/api/newsletter', newsletterRouter)

// Retry DB connection before starting server for backend DB connection failed: ECONNREFUSED.
// Connect to MySQL before it was ready. This is common in Docker setups.
async function waitForDb(retries = 10, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate()
      consola.ready('DB connected')
      return true
    } catch (e) {
      consola.warn(`DB connection failed (attempt ${i + 1}/${retries}): ${e.message}`)
      await new Promise(res => setTimeout(res, delay))
    }
  }
  consola.error('Could not connect to DB after multiple attempts.')
  process.exit(1)
}

async function start() {
  await waitForDb() // Only start server after DB is reachable
  
  // Sync database models
  try {
    await sequelize.sync() // Use sync without force in production. Set to force: true to reset tables during development.
    consola.success('Database synced successfully')
    
    // Create demo admin user if it doesn't exist
    const adminExists = await User.findOne({ where: { email: 'alexzxlee@outlook.com' } })
    if (!adminExists) {
      await User.create({
        email: 'alexzxlee@outlook.com',
        password: 'Alex2025',
        role: 'admin'
      })
      consola.info('Demo admin user created (alexzxlee@outlook.com / Alex2025)')
    }

    // Create demo regular user if it doesn't exist
    const userExists = await User.findOne({ where: { email: 'ben@localhost.com' } })
    if (!userExists) {
      await User.create({
        email: 'ben@localhost.com',
        password: 'Ben2025',
        role: 'user'
      })
      consola.info('Demo user created (ben@localhost.com / Ben2025)')
    }
  } catch (error) {
    consola.error('Database sync failed:', error)
  }
  
  app.listen(PORT, () => consola.ready(`Backend running on http://localhost:${PORT}`))
}
start()