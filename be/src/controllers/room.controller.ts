import type { Request, Response } from 'express'
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

export function handleCreateRoom(request: Request, response: Response) {
  const name = String(request.body.name ?? '').trim()
  const userName = String(request.body.userName ?? '').trim()

  if (!name || !userName) {
    response.status(400).json({ message: '방 이름과 사용자 이름이 필요합니다.' })
    return
  }

  const room = createRoom(name, userName)
  response.status(201).json({ room })
}

export function handleJoinRoom(request: Request, response: Response) {
  const inviteCode = String(request.body.inviteCode ?? '').trim()
  const userName = String(request.body.userName ?? '').trim()

  if (!inviteCode || !userName) {
    response.status(400).json({ message: '초대 코드와 사용자 이름이 필요합니다.' })
    return
  }

  const room = joinRoom(inviteCode, userName)
  if (!room) {
    response.status(404).json({ message: '초대 코드를 찾을 수 없습니다.' })
    return
  }

  response.status(200).json({ room })
}

export function handleGetRoom(request: Request, response: Response) {
  const id = getStringParam(request.params.id)
  const room = findRoomById(id)

  if (!room) {
    response.status(404).json({ message: '방을 찾을 수 없습니다.' })
    return
  }

  response.status(200).json({ room })
}

export function handleAddPlace(request: Request, response: Response) {
  const roomId = getStringParam(request.params.id)
  const name = String(request.body.name ?? '').trim()
  const category = String(request.body.category ?? '').trim()

  if (!name || !category) {
    response.status(400).json({ message: '장소명과 카테고리가 필요합니다.' })
    return
  }

  const place = addPlace(roomId, { name, category })
  if (!place) {
    response.status(404).json({ message: '방을 찾을 수 없습니다.' })
    return
  }

  response.status(201).json({ place })
}

export function handleRemovePlace(request: Request, response: Response) {
  const roomId = getStringParam(request.params.id)
  const placeId = getStringParam(request.params.placeId)
  const deleted = removePlace(roomId, placeId)

  if (!deleted) {
    response.status(404).json({ message: '장소를 찾을 수 없습니다.' })
    return
  }

  response.status(200).json({ deleted: true })
}
