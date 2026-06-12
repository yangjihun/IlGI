import cors from 'cors'
import express from 'express'
import type { DiaryRepository } from './domains/diary.js'
import { createInMemoryDiaryRepository } from './repositories/in-memory-diary.repository.js'
import { createDiaryRouter } from './routes/diary.route.js'
import { healthRouter } from './routes/health.route.js'
import { prototypeRouter } from './routes/prototype.route.js'

export type AppOptions = {
  diaryRepository?: DiaryRepository
}

export function createApp(options: AppOptions = {}) {
  const app = express()
  const diaryRepository = options.diaryRepository ?? createInMemoryDiaryRepository()

  app.use(cors())
  app.use(express.json())

  app.use('/health', healthRouter)
  app.use('/api', createDiaryRouter(diaryRepository))
  app.use('/api', prototypeRouter)

  return app
}
