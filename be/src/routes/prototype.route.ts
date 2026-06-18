import { Router } from 'express'
import {
  getDiaryDraftHandler,
  getHome,
  getPlaceDraftHandler,
  getPlaces,
  getRoomDraftHandler,
} from '../controllers/prototype.controller.js'

export const prototypeRouter = Router()

prototypeRouter.get('/prototype/home', getHome)
prototypeRouter.get('/prototype/diary-draft', getDiaryDraftHandler)
prototypeRouter.get('/prototype/place-draft', getPlaceDraftHandler)
prototypeRouter.get('/prototype/room-draft', getRoomDraftHandler)
prototypeRouter.get('/places', getPlaces)
