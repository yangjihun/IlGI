import { Router } from 'express'
import type { DiaryQueryable } from '../repositories/postgres-diary.repository.js'
import { createAuthHandlers } from '../controllers/auth.controller.js'

export function createAuthRouter(db: DiaryQueryable) {
  const router = Router()
  const { login } = createAuthHandlers(db)
  router.post('/auth/login', login)
  return router
}
