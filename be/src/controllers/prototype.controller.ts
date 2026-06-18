import type { Request, Response } from 'express'
import {
  getDiaryDraft,
  getHomeSummary,
  getPlaceDraft,
  getRoomDraft,
  listPlaces,
} from '../services/prototype.service.js'

export function getHome(_request: Request, response: Response) {
  response.status(200).json({ home: getHomeSummary() })
}

export function getDiaryDraftHandler(_request: Request, response: Response) {
  response.status(200).json({ draft: getDiaryDraft() })
}

export function getPlaceDraftHandler(_request: Request, response: Response) {
  response.status(200).json({ draft: getPlaceDraft() })
}

export function getRoomDraftHandler(_request: Request, response: Response) {
  response.status(200).json({ draft: getRoomDraft() })
}

export function getPlaces(_request: Request, response: Response) {
  response.status(200).json({ places: listPlaces() })
}
