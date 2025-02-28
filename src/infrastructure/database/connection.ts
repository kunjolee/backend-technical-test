import { Sequelize } from 'sequelize'
import { env } from '../config/env'

const { DB_NAME, USER_NAME, PORT, PASSWORD, HOST } = env.db

const USER = encodeURIComponent(USER_NAME)
const DB_PASSWORD = encodeURIComponent(PASSWORD)

const createDatabaseURI = (
  user: string,
  password: string,
  host: string,
  port: string | number,
  dbName: string
): string => {
  return `postgres://${user}:${password}@${host}:${port}/${dbName}`
}

const URI = createDatabaseURI(USER, DB_PASSWORD, HOST, PORT, DB_NAME)

const sequelize = new Sequelize(URI, {
  dialect: 'postgres'
})

export default sequelize
