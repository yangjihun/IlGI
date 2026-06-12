export type MarkerType = 'diary' | 'wishlist' | 'shared'

export type Diary = {
  id: string
  date: string
  placeName: string
  title: string
  memory: string
  memo: string
  author: string
  markerType: MarkerType
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

export type InvitationPreview = {
  roomId: string
  roomName: string
  inviteCode: string
  participantCount: number
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export function fetchDiaries() {
  return getJson<{ diaries: Diary[] }>('/api/diaries')
}

export function fetchDiary(id: string) {
  return getJson<{ diary: Diary }>(`/api/diaries/${id}`)
}

export function fetchPlaces() {
  return getJson<{ places: Place[] }>('/api/places')
}

export function fetchRoom(id: string) {
  return getJson<{ room: Room }>(`/api/rooms/${id}`)
}

export function previewInvitation(inviteCode: string) {
  return postJson<{ preview: InvitationPreview }>('/api/invitations/preview', { inviteCode })
}
