export type MarkerType = 'diary' | 'wishlist' | 'shared'

export type MapMarker = {
  id: string
  type: MarkerType
  title: string
  description: string
  position: {
    top: string
    left: string
  }
}

export type Diary = {
  id: string
  title: string
  author: string
  date: string
  placeName: string
  content: string
  memo: string
}

export type Place = {
  id: string
  name: string
  category: string
  status: string
}

export type Room = {
  id: string
  name: string
  inviteCode: string
  participants: string[]
  timeline: string[]
  places: Place[]
}

export type DiaryDraft = {
  title?: string
  author?: string
  date: string
  placeName: string
  content: string
  memo: string
}

export type CreateDiaryInput = {
  title: string
  author: string
  date: string
  placeName: string
  content: string
  memo: string
}

export type UpdateDiaryInput = Partial<CreateDiaryInput>

export type PlaceDraft = {
  name: string
  category: string
}

export type RoomDraft = {
  name: string
}

export type HomeSummary = {
  markers: MapMarker[]
  diaryCount: number
  wishlistCount: number
  roomId: string
}

export type InvitationPreview = {
  roomId: string
  roomName: string
  inviteCode: string
  participantCount: number
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init)

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export function fetchHomeSummary() {
  return requestJson<{ home: HomeSummary }>('/api/prototype/home')
}

export function fetchDiaries() {
  return requestJson<{ diaries: Diary[] }>('/api/diaries')
}

export function fetchDiary(id: string) {
  return requestJson<{ diary: Diary }>('/api/diaries/' + encodeURIComponent(id))
}

export function createDiary(input: CreateDiaryInput) {
  return requestJson<{ diary: Diary }>('/api/diaries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
}

export function updateDiary(id: string, input: UpdateDiaryInput) {
  return requestJson<{ diary: Diary }>('/api/diaries/' + encodeURIComponent(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
}

export function deleteDiary(id: string) {
  return requestJson<{ deleted: boolean }>('/api/diaries/' + encodeURIComponent(id), {
    method: 'DELETE',
  })
}

export function fetchPlaces() {
  return requestJson<{ places: Place[] }>('/api/places')
}

export function fetchRoom(id: string) {
  return requestJson<{ room: Room }>('/api/rooms/' + id)
}

export function fetchDiaryDraft() {
  return requestJson<{ draft: DiaryDraft }>('/api/prototype/diary-draft')
}

export function fetchPlaceDraft() {
  return requestJson<{ draft: PlaceDraft }>('/api/prototype/place-draft')
}

export function fetchRoomDraft() {
  return requestJson<{ draft: RoomDraft }>('/api/prototype/room-draft')
}

export function previewInvitation(inviteCode: string) {
  return requestJson<{ preview: InvitationPreview }>('/api/invitations/preview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inviteCode }),
  })
}
