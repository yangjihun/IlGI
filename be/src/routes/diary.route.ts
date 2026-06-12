import { Router } from 'express'
import { createDiaryController } from '../controllers/diary.controller.js'
import type { DiaryRepository } from '../domains/diary.js'
import { createDiaryService } from '../services/diary.service.js'

export function createDiaryRouter(repository: DiaryRepository) {
  const router = Router()
  const controller = createDiaryController(createDiaryService(repository))

  router.get('/diaries', controller.listDiaries)
  router.post('/diaries', controller.createDiary)
  router.get('/diaries/:id', controller.getDiary)
  router.patch('/diaries/:id', controller.updateDiary)
  router.delete('/diaries/:id', controller.deleteDiary)

  return router
}
