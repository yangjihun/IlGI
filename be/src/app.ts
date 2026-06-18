import cors from 'cors'
import express from 'express'
import type { DiaryRepository } from './domains/diary.js'
import { createDatabasePool } from './database/pool.js'
import { runMigrations } from './database/migrate.js'
import { createDiaryRepository } from './repositories/diary-repository.factory.js'
import { createDiaryRouter } from './routes/diary.route.js'
import { healthRouter } from './routes/health.route.js'
import { prototypeRouter } from './routes/prototype.route.js'
import { createAuthRouter } from './routes/auth.route.js'
import { createRoomRouter } from './routes/room.route.js'

export type AppOptions = {
  diaryRepository?: DiaryRepository
  databaseUrl?: string
}

export async function createApp(options: AppOptions = {}) {
  const app = express()
  const diaryRepository = options.diaryRepository ?? createDiaryRepository(process.env)

  app.use(cors())
  app.use(express.json())

  app.use('/health', healthRouter)
  app.use('/api', createDiaryRouter(diaryRepository))

  const databaseUrl = options.databaseUrl ?? process.env.DATABASE_URL
  if (databaseUrl) {
    const pool = createDatabasePool(databaseUrl)
    await runMigrations(pool)
    app.use('/api', createAuthRouter(pool))
    app.use('/api', createRoomRouter(pool))
  }

  app.use('/api', prototypeRouter)

  return app
}
