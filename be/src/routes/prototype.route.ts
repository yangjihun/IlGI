import { Router } from 'express'
import {
  getDiaries,
  getDiary,
  getPlaces,
  getRoom,
  previewInvitation,
} from '../controllers/prototype.controller.js'

export const prototypeRouter = Router()

prototypeRouter.get('/diaries', getDiaries)
prototypeRouter.get('/diaries/:id', getDiary)
prototypeRouter.get('/places', getPlaces)
prototypeRouter.get('/rooms/:id', getRoom)
prototypeRouter.post('/invitations/preview', previewInvitation)
