import cors from 'cors'
import express from 'express'
import { healthRouter } from './routes/health.route.js'
import { prototypeRouter } from './routes/prototype.route.js'

export function createApp() {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.use('/health', healthRouter)
  app.use('/api', prototypeRouter)

  return app
}
