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

async function start() {
  try {
    await sequelize.authenticate()
    consola.ready('DB connected')
  } catch (e) {
    consola.error(`DB connection failed: ${e.message}`)
  }
  app.listen(PORT, () => consola.ready(`Backend running on http://localhost:${PORT}`))
}
start()