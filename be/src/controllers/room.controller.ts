import type { Request, Response } from 'express'
import type { DiaryQueryable } from '../repositories/postgres-diary.repository.js'
import {
  addPlace,
  createRoom,
  findRoomById,
  joinRoom,
  removePlace,
} from '../services/room.service.js'

function getStringParam(value: string | string[]) {
  return Array.isArray(value) ? value[0] : value
}

export function createRoomHandlers(db: DiaryQueryable) {
  return {
    async handleCreateRoom(request: Request, response: Response) {
      const name = String(request.body.name ?? '').trim()
      const userId = String(request.body.userId ?? '').trim()
      const userName = String(request.body.userName ?? '').trim()

      if (!name || !userId || !userName) {
        response.status(400).json({ message: '방 이름, 사용자 ID, 사용자 이름이 필요합니다.' })
        return
      }

      try {
        const room = await createRoom(db, name, userId, userName)
        response.status(201).json({ room })
      } catch (error) {
        console.error('createRoom error:', error)
        response.status(500).json({ message: '방 만들기에 실패했습니다.' })
      }
    },

    async handleJoinRoom(request: Request, response: Response) {
      const inviteCode = String(request.body.inviteCode ?? '').trim()
      const userId = String(request.body.userId ?? '').trim()
      const userName = String(request.body.userName ?? '').trim()

      if (!inviteCode || !userId || !userName) {
        response.status(400).json({ message: '초대 코드, 사용자 ID, 사용자 이름이 필요합니다.' })
        return
      }

      try {
        const room = await joinRoom(db, inviteCode, userId, userName)
        if (!room) {
          response.status(404).json({ message: '초대 코드를 찾을 수 없습니다.' })
          return
        }
        response.status(200).json({ room })
      } catch (error) {
        console.error('joinRoom error:', error)
        response.status(500).json({ message: '방 입장에 실패했습니다.' })
      }
    },

    async handleGetRoom(request: Request, response: Response) {
      const id = getStringParam(request.params.id)

      try {
        const room = await findRoomById(db, id)
        if (!room) {
          response.status(404).json({ message: '방을 찾을 수 없습니다.' })
          return
        }
        response.status(200).json({ room })
      } catch (error) {
        console.error('getRoom error:', error)
        response.status(500).json({ message: '방 정보를 불러오지 못했습니다.' })
      }
    },

    async handleAddPlace(request: Request, response: Response) {
      const roomId = getStringParam(request.params.id)
      const name = String(request.body.name ?? '').trim()
      const category = String(request.body.category ?? '').trim()

      if (!name || !category) {
        response.status(400).json({ message: '장소명과 카테고리가 필요합니다.' })
        return
      }

      try {
        const place = await addPlace(db, roomId, { name, category })
        if (!place) {
          response.status(404).json({ message: '방을 찾을 수 없습니다.' })
          return
        }
        response.status(201).json({ place })
      } catch (error) {
        console.error('addPlace error:', error)
        response.status(500).json({ message: '장소 추가에 실패했습니다.' })
      }
    },

    async handleRemovePlace(request: Request, response: Response) {
      const roomId = getStringParam(request.params.id)
      const placeId = getStringParam(request.params.placeId)

      try {
        const deleted = await removePlace(db, roomId, placeId)
        if (!deleted) {
          response.status(404).json({ message: '장소를 찾을 수 없습니다.' })
          return
        }
        response.status(200).json({ deleted: true })
      } catch (error) {
        console.error('removePlace error:', error)
        response.status(500).json({ message: '장소 삭제에 실패했습니다.' })
      }
    },
  }
}
