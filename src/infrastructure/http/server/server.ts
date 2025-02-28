import express, { Application } from 'express'
import eventsRoutes from '../routes/eventRoutes'

import { env } from '../../config/env'
import type { ServerRoutes, PORT } from './types/serverTypes'

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

    this.routes()
  }

  routes() {
    this.app.use(this.path.events, eventsRoutes)
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`)
      console.log(`Visit: http://localhost:${this.port}${this.path.events}`)
    })
  }
}

export default Server
