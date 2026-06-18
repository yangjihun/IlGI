import { http, HttpResponse } from 'msw'
import prototypeData from './fixtures/prototype.json'

type DiaryPayload = {
  title?: string
  author?: string
  date?: string
  placeName?: string
  content?: string
  memo?: string
}

type RoomPlace = {
  id: string
  name: string
  category: string
  status: string
}

type Room = {
  id: string
  name: string
  inviteCode: string
  participants: string[]
  timeline: string[]
  places: RoomPlace[]
}

type MockUser = {
  id: string
  name: string
  roomId: string | null
}

// ── In-memory stores ──────────────────────────────────────────────────────────

const diaries = [...prototypeData.diaries]

const rooms = new Map<string, Room>([
  [
    'room-ilgi-204',
    {
      id: 'room-ilgi-204',
      name: '우리의 주말 지도',
      inviteCode: 'IlGI-204',
      participants: ['J', 'H'],
      timeline: ['망원 한강공원 기록 추가', '성수 작은 식당 후보 등록', '북촌 골목 산책을 같이 저장'],
      places: [...prototypeData.rooms[0].places],
    },
  ],
])

// 이름을 키로 하는 유저 맵
const usersByName = new Map<string, MockUser>()

function generateInviteCode() {
  return `IlGI-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
}

function findOrCreateUser(name: string): MockUser {
  const existing = usersByName.get(name)
  if (existing) return existing

  const user: MockUser = {
    id: `user-mock-${Date.now()}`,
    name,
    roomId: null,
  }
  usersByName.set(name, user)
  return user
}

// ── Prototype ─────────────────────────────────────────────────────────────────

export const handlers = [
  http.get('*/api/prototype/home', () => {
    return HttpResponse.json({ home: prototypeData.home })
  }),

  http.get('*/api/prototype/diary-draft', () => {
    return HttpResponse.json({ draft: prototypeData.drafts.diary })
  }),

  http.get('*/api/prototype/place-draft', () => {
    return HttpResponse.json({ draft: prototypeData.drafts.place })
  }),

  http.get('*/api/prototype/room-draft', () => {
    return HttpResponse.json({ draft: prototypeData.drafts.room })
  }),

  // ── Auth ───────────────────────────────────────────────────────────────────

  http.post('*/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { name?: string }
    const name = body.name?.trim() ?? ''

    if (!name) {
      return HttpResponse.json({ message: '이름이 필요합니다.' }, { status: 400 })
    }

    const user = findOrCreateUser(name)

    if (user.roomId) {
      const room = rooms.get(user.roomId)
      return HttpResponse.json({ user, room })
    }

    return HttpResponse.json({ user })
  }),

  // ── Diaries ────────────────────────────────────────────────────────────────

  http.get('*/api/diaries', () => {
    return HttpResponse.json({ diaries })
  }),

  http.get('*/api/diaries/:id', ({ params }) => {
    const diary = diaries.find((item) => item.id === params.id)
    if (!diary) {
      return HttpResponse.json({ message: '다이어리를 찾을 수 없습니다.' }, { status: 404 })
    }
    return HttpResponse.json({ diary })
  }),

  http.post('*/api/diaries', async ({ request }) => {
    const body = (await request.json()) as DiaryPayload
    const requiredFields: Array<keyof DiaryPayload> = ['title', 'author', 'date', 'placeName', 'content']
    const errors = requiredFields
      .filter((field) => !String(body[field] ?? '').trim())
      .map((field) => `${field} is required`)

    if (errors.length > 0) {
      return HttpResponse.json({ message: 'Diary validation failed', errors }, { status: 400 })
    }

    const diary = {
      id: `diary-${Date.now()}`,
      title: String(body.title).trim(),
      author: String(body.author).trim(),
      date: String(body.date).trim(),
      placeName: String(body.placeName).trim(),
      content: String(body.content).trim(),
      memo: String(body.memo ?? '').trim(),
    }

    diaries.unshift(diary)
    return HttpResponse.json({ diary }, { status: 201 })
  }),

  http.patch('*/api/diaries/:id', async ({ params, request }) => {
    const index = diaries.findIndex((item) => item.id === params.id)
    if (index < 0) {
      return HttpResponse.json({ message: '다이어리를 찾을 수 없습니다.' }, { status: 404 })
    }

    const body = (await request.json()) as DiaryPayload
    const diary = {
      ...diaries[index],
      ...Object.fromEntries(
        Object.entries(body).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]),
      ),
    }

    diaries[index] = diary
    return HttpResponse.json({ diary })
  }),

  http.delete('*/api/diaries/:id', ({ params }) => {
    const index = diaries.findIndex((item) => item.id === params.id)
    if (index < 0) {
      return HttpResponse.json({ message: '다이어리를 찾을 수 없습니다.' }, { status: 404 })
    }
    diaries.splice(index, 1)
    return HttpResponse.json({ deleted: true })
  }),

  // ── Rooms ──────────────────────────────────────────────────────────────────

  http.post('*/api/rooms', async ({ request }) => {
    const body = (await request.json()) as { name?: string; userId?: string; userName?: string }
    const name = body.name?.trim() ?? ''
    const userId = body.userId?.trim() ?? ''
    const userName = body.userName?.trim() ?? ''

    if (!name || !userId || !userName) {
      return HttpResponse.json({ message: '방 이름, 사용자 ID, 사용자 이름이 필요합니다.' }, { status: 400 })
    }

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

    // 유저의 roomId 업데이트
    const user = [...usersByName.values()].find((u) => u.id === userId)
    if (user) user.roomId = id

    return HttpResponse.json({ room }, { status: 201 })
  }),

  http.post('*/api/rooms/join', async ({ request }) => {
    const body = (await request.json()) as { inviteCode?: string; userId?: string; userName?: string }
    const inviteCode = body.inviteCode?.trim() ?? ''
    const userId = body.userId?.trim() ?? ''
    const userName = body.userName?.trim() ?? ''

    if (!inviteCode || !userId || !userName) {
      return HttpResponse.json({ message: '초대 코드, 사용자 ID, 사용자 이름이 필요합니다.' }, { status: 400 })
    }

    let found: Room | undefined
    for (const room of rooms.values()) {
      if (room.inviteCode.toLowerCase() === inviteCode.toLowerCase()) {
        found = room
        break
      }
    }

    if (!found) {
      return HttpResponse.json({ message: '초대 코드를 찾을 수 없습니다.' }, { status: 404 })
    }

    if (!found.participants.includes(userName)) {
      found.participants.push(userName)
      found.timeline.unshift(`${userName}이 방에 참여했습니다.`)
    }

    // 유저의 roomId 업데이트
    const user = [...usersByName.values()].find((u) => u.id === userId)
    if (user) user.roomId = found.id

    return HttpResponse.json({ room: found })
  }),

  http.get('*/api/rooms/:id', ({ params }) => {
    const room = rooms.get(String(params.id))
    if (!room) {
      return HttpResponse.json({ message: '방을 찾을 수 없습니다.' }, { status: 404 })
    }
    return HttpResponse.json({ room })
  }),

  http.post('*/api/rooms/:id/places', async ({ params, request }) => {
    const room = rooms.get(String(params.id))
    if (!room) {
      return HttpResponse.json({ message: '방을 찾을 수 없습니다.' }, { status: 404 })
    }

    const body = (await request.json()) as { name?: string; category?: string }
    const name = body.name?.trim() ?? ''
    const category = body.category?.trim() ?? ''

    if (!name || !category) {
      return HttpResponse.json({ message: '장소명과 카테고리가 필요합니다.' }, { status: 400 })
    }

    const place: RoomPlace = {
      id: `place-${Date.now()}`,
      name,
      category,
      status: '저장됨',
    }
    room.places.push(place)
    return HttpResponse.json({ place }, { status: 201 })
  }),

  http.delete('*/api/rooms/:id/places/:placeId', ({ params }) => {
    const room = rooms.get(String(params.id))
    if (!room) {
      return HttpResponse.json({ message: '방을 찾을 수 없습니다.' }, { status: 404 })
    }

    const index = room.places.findIndex((p) => p.id === params.placeId)
    if (index < 0) {
      return HttpResponse.json({ message: '장소를 찾을 수 없습니다.' }, { status: 404 })
    }

    room.places.splice(index, 1)
    return HttpResponse.json({ deleted: true })
  }),

  // ── Legacy places (used by DiaryDetailView related places) ────────────────

  http.get('*/api/places', () => {
    return HttpResponse.json({ places: prototypeData.places })
  }),
]
