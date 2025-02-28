import express, { Application } from 'express'
import eventsRoutes from '../routes/eventRoutes'

import { env } from '../../config/env'
import type { ServerRoutes, PORT } from './types/serverTypes'
import sequelize, { database } from '../../database/connection'

/**
 * Class representing the server.
 */
class Server {
  private app: Application
  private port: PORT
  private path: ServerRoutes

  constructor() {
    this.app = express()
    this.port = env.PORT
    this.path = {
      events: '/api/events'
    }

    this.dbConnection()
    this.middleware()
    this.routes()
  }

  /**
   * Establishes the database connection.
   *
   * @returns {Promise<void>}
   */
  async dbConnection(): Promise<void> {
    database.connect()
    database.sync()
  }

  /**
   * Sets up middleware for the server.
   */
  middleware(): void {
    this.app.use(express.json())
  }

  /**
   * Sets up routes for the server.
   */
  routes(): void {
    this.app.use(this.path.events, eventsRoutes)
  }

  /**
   * Starts the server and listens on the specified port.
   */
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`)
      console.log(`Visit: http://localhost:${this.port}${this.path.events}`)
    })
  }
}

export default Server
