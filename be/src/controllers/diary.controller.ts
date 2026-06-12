import type { Request, Response } from 'express'
import { DiaryValidationError, type DiaryService } from '../services/diary.service.js'

function getStringParam(value: string | string[]) {
  return Array.isArray(value) ? value[0] : value
}

export function createDiaryController(service: DiaryService) {
  return {
    async listDiaries(_request: Request, response: Response) {
      response.status(200).json({ diaries: await service.listDiaries() })
    },

    async getDiary(request: Request, response: Response) {
      const diary = await service.getDiary(getStringParam(request.params.id))

      if (!diary) {
        response.status(404).json({ message: 'Diary not found' })
        return
      }

      response.status(200).json({ diary })
    },

    async createDiary(request: Request, response: Response) {
      try {
        const diary = await service.createDiary(request.body)
        response.status(201).json({ diary })
      } catch (error) {
        if (error instanceof DiaryValidationError) {
          response.status(400).json({ message: error.message, errors: error.errors })
          return
        }

        throw error
      }
    },

    async updateDiary(request: Request, response: Response) {
      const diary = await service.updateDiary(getStringParam(request.params.id), request.body)

      if (!diary) {
        response.status(404).json({ message: 'Diary not found' })
        return
      }

      response.status(200).json({ diary })
    },

    async deleteDiary(request: Request, response: Response) {
      const deleted = await service.deleteDiary(getStringParam(request.params.id))

      if (!deleted) {
        response.status(404).json({ message: 'Diary not found' })
        return
      }

      response.status(204).send()
    },
  }
}
