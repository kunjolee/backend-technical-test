import express, { Application } from 'express'
import eventsRoutes from '../routes/eventRoutes'

import type { ServerRoutes, PORT } from './types/serverTypes'

class Server {
  private app: Application
  private port: PORT
  private path: ServerRoutes

  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.path = {
      events: '/api/events'
    }

    this.routes()
  }

  routes() {
    this.app.use(this.path.events, eventsRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`)
    })
  }
}

export default Server
