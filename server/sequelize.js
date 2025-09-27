import 'dotenv/config'
import { Sequelize } from 'sequelize'

const DB_NAME = process.env.DB_NAME || 'ecommerce2'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || ''
const DB_HOST = process.env.DB_HOST || 'mysql'
const DB_PORT = Number(process.env.DB_PORT || 3306)

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false
})

// Temporary DB connectivity check (remove after verifying in cPanel logs)
export async function testConnection() {
  try {
    await sequelize.authenticate()
    console.log('Database connection established.')
  } catch (err) {
    console.error('Unable to connect to DB:', err)
  }
}

export default sequelize