import { DataTypes } from 'sequelize'
import crypto from 'crypto'
import sequelize from '../sequelize.js'

const NewsletterSubscription = sequelize.define('NewsletterSubscription', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  status: { type: DataTypes.ENUM('subscribed', 'unsubscribed'), defaultValue: 'subscribed' },
  tokenHash: { type: DataTypes.STRING, allowNull: false },
  tokenExpiresAt: { type: DataTypes.DATE, allowNull: false }
})

export function newToken() {
  const raw = crypto.randomBytes(32).toString('hex')
  const hash = crypto.createHash('sha256').update(raw).digest('hex')
  return { raw, hash }
}

export default NewsletterSubscription
