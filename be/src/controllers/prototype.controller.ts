import type { Request, Response } from 'express'
import {
  findDiaryById,
  findInvitationPreview,
  findRoomById,
  listDiaries,
  listPlaces,
} from '../services/prototype.service.js'

function getStringParam(value: string | string[]) {
  return Array.isArray(value) ? value[0] : value
}

export function getDiaries(_request: Request, response: Response) {
  response.status(200).json({ diaries: listDiaries() })
}

export function getDiary(request: Request, response: Response) {
  const diary = findDiaryById(getStringParam(request.params.id))

  if (!diary) {
    response.status(404).json({ message: 'Diary not found' })
    return
  }

  response.status(200).json({ diary })
}

export function getPlaces(_request: Request, response: Response) {
  response.status(200).json({ places: listPlaces() })
}

export function getRoom(request: Request, response: Response) {
  const room = findRoomById(getStringParam(request.params.id))

  if (!room) {
    response.status(404).json({ message: 'Room not found' })
    return
  }

  response.status(200).json({ room })
}

export function previewInvitation(request: Request, response: Response) {
  const inviteCode = String(request.body.inviteCode ?? '').trim()

  if (!inviteCode) {
    response.status(400).json({ message: 'Invite code is required' })
    return
  }

  response.status(200).json({ preview: findInvitationPreview(inviteCode) })
}
