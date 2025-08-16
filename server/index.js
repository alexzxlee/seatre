import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { consola } from 'consola'
import sequelize from './sequelize.js'
import authRouter from './routes/auth.js'

const app = express()
const PORT = process.env.PORT || 3001
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

app.use(cors({ origin: FRONTEND_URL, credentials: true }))
app.use(express.json())
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
  app.listen(PORT, () => consola.ready(`Backend running on http://localhost:${PORT}`))
}
start()