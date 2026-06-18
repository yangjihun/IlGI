import { Router } from 'express'
import {
  handleAddPlace,
  handleCreateRoom,
  handleGetRoom,
  handleJoinRoom,
  handleRemovePlace,
} from '../controllers/room.controller.js'

export const roomRouter = Router()

roomRouter.post('/rooms', handleCreateRoom)
roomRouter.post('/rooms/join', handleJoinRoom)
roomRouter.get('/rooms/:id', handleGetRoom)
roomRouter.post('/rooms/:id/places', handleAddPlace)
roomRouter.delete('/rooms/:id/places/:placeId', handleRemovePlace)
