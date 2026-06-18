import type { Request, Response } from 'express'
import type { DiaryQueryable } from '../repositories/postgres-diary.repository.js'
import { findRoomById } from '../services/room.service.js'
import { findOrCreateUser } from '../services/user.service.js'

export function createAuthHandlers(db: DiaryQueryable) {
  return {
    async login(request: Request, response: Response) {
      const name = String(request.body.name ?? '').trim()
      if (!name) {
        response.status(400).json({ message: '이름이 필요합니다.' })
        return
      }

      try {
        const { user } = await findOrCreateUser(db, name)

        if (user.roomId) {
          const room = await findRoomById(db, user.roomId)
          response.status(200).json({ user, room })
        } else {
          response.status(200).json({ user })
        }
      } catch (error) {
        console.error('login error:', error)
        response.status(500).json({ message: '로그인에 실패했습니다.' })
      }
    },
  }
}
