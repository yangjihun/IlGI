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

const diaries = [...prototypeData.diaries]

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

  http.get('*/api/places', () => {
    return HttpResponse.json({ places: prototypeData.places })
  }),

  http.get('*/api/rooms/:id', ({ params }) => {
    const room = prototypeData.rooms.find((item) => item.id === params.id)

    if (!room) {
      return HttpResponse.json({ message: '공유 방을 찾을 수 없습니다.' }, { status: 404 })
    }

    return HttpResponse.json({ room })
  }),

  http.post('*/api/invitations/preview', async ({ request }) => {
    const body = (await request.json()) as { inviteCode?: string }
    const inviteCode = body.inviteCode?.trim().toLowerCase()
    const room = prototypeData.rooms.find((item) => item.inviteCode.toLowerCase() === inviteCode)

    if (!room) {
      return HttpResponse.json({ message: '초대 코드를 확인할 수 없습니다.' }, { status: 404 })
    }

    return HttpResponse.json({
      preview: {
        roomId: room.id,
        roomName: room.name,
        inviteCode: room.inviteCode,
        participantCount: room.participants.length,
      },
    })
  }),
]
