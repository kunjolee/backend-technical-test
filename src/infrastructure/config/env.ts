import dotenv from 'dotenv'

dotenv.config()

export const env = {
  PORT: process.env.PORT || 3000,
  db: {
    DB_NAME: process.env.DB_NAME || '',
    USER_NAME: process.env.DB_USER_NAME || '',
    PORT: process.env.DB_PORT || 5432,
    PASSWORD: process.env.DB_PASSWORD || '',
    HOST: process.env.DB_HOST || ''
  }
}
