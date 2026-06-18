import { randomBytes } from 'crypto'

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

const rooms = new Map<string, Room>([
  [
    'room-ilgi-204',
    {
      id: 'room-ilgi-204',
      name: '우리의 주말 지도',
      inviteCode: 'IlGI-204',
      participants: ['J', 'H'],
      timeline: ['망원 한강공원 기록 추가', '성수 작은 식당 후보 등록', '북촌 골목 산책을 같이 저장'],
      places: [
        { id: 'place-seongsu', name: '성수 작은 식당', category: '맛집', status: '이번 주 후보' },
        { id: 'place-jamsil', name: '잠실 야경길', category: '산책', status: '저장됨' },
        { id: 'place-bukchon', name: '북촌 골목 산책', category: '여행지', status: '같이 저장' },
      ],
    },
  ],
])

function generateInviteCode(): string {
  return `IlGI-${randomBytes(2).toString('hex').toUpperCase()}`
}

export function createRoom(name: string, userName: string): Room {
  const id = `room-${Date.now()}`
  const room: Room = {
    id,
    name,
    inviteCode: generateInviteCode(),
    participants: [userName],
    timeline: [`${userName}이 방을 만들었습니다.`],
    places: [],
  }
  rooms.set(id, room)
  return room
}

export function findRoomById(id: string): Room | undefined {
  return rooms.get(id)
}

export function findRoomByInviteCode(inviteCode: string): Room | undefined {
  for (const room of rooms.values()) {
    if (room.inviteCode.toLowerCase() === inviteCode.toLowerCase()) {
      return room
    }
  }
  return undefined
}

export function joinRoom(inviteCode: string, userName: string): Room | undefined {
  const room = findRoomByInviteCode(inviteCode)
  if (!room) return undefined
  if (!room.participants.includes(userName)) {
    room.participants.push(userName)
    room.timeline.unshift(`${userName}이 방에 참여했습니다.`)
  }
  return room
}

export function addPlace(roomId: string, data: { name: string; category: string }): Place | undefined {
  const room = rooms.get(roomId)
  if (!room) return undefined
  const place: Place = {
    id: `place-${Date.now()}`,
    name: data.name,
    category: data.category,
    status: '저장됨',
  }
  room.places.push(place)
  return place
}

export function removePlace(roomId: string, placeId: string): boolean {
  const room = rooms.get(roomId)
  if (!room) return false
  const index = room.places.findIndex((p) => p.id === placeId)
  if (index < 0) return false
  room.places.splice(index, 1)
  return true
}
