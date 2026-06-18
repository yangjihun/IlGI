import { Router } from 'express'
import type { DiaryQueryable } from '../repositories/postgres-diary.repository.js'
import { createRoomHandlers } from '../controllers/room.controller.js'

export function createRoomRouter(db: DiaryQueryable) {
  const router = Router()
  const {
    handleCreateRoom,
    handleJoinRoom,
    handleGetRoom,
    handleAddPlace,
    handleRemovePlace,
  } = createRoomHandlers(db)

  router.post('/rooms', handleCreateRoom)
  router.post('/rooms/join', handleJoinRoom)
  router.get('/rooms/:id', handleGetRoom)
  router.post('/rooms/:id/places', handleAddPlace)
  router.delete('/rooms/:id/places/:placeId', handleRemovePlace)

  return router
}
