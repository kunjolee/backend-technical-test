import { Sequelize } from 'sequelize'
import { env } from '../config/env'

const { DB_NAME, USER_NAME, PORT, PASSWORD, HOST } = env.db

const USER = encodeURIComponent(USER_NAME)
const DB_PASSWORD = encodeURIComponent(PASSWORD)

/**
 * Creates a PostgreSQL database URI.
 *
 * @param {string} user - The database user.
 * @param {string} password - The database password.
 * @param {string} host - The database host.
 * @param {string | number} port - The database port.
 * @param {string} dbName - The database name.
 * @returns {string} The database URI.
 */
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

/**
 * Class representing the database connection.
 */
class Database {
  public sequelize: Sequelize

  constructor() {
    this.sequelize = new Sequelize(URI, {
      dialect: 'postgres',
      logging: false
    })
  }

  /**
   * Connects to the database.
   *
   * @returns {Promise<void>}
   */
  async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate()
      console.log('Database connection has been established successfully.')
    } catch (error) {
      console.log('Unable to connect to the database:', error)
      throw new Error('Unable to connect to the database')
    }
  }

  /**
   * Synchronizes the database.
   *
   * @returns {Promise<void>}
   */
  async sync(): Promise<void> {
    try {
      await this.sequelize.sync()
      console.log('Database synchronized successfully.')
    } catch (error) {
      console.log('Unable to synchronize the database:', error)
      throw new Error('Unable to synchronize the database')
    }
  }
}

export const database = new Database()
export default database.sequelize
