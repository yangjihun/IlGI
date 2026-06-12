import { http, HttpResponse } from 'msw'
import prototypeData from './fixtures/prototype.json'

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
    return HttpResponse.json({ diaries: prototypeData.diaries })
  }),

  http.get('*/api/diaries/:id', ({ params }) => {
    const diary = prototypeData.diaries.find((item) => item.id === params.id)

    if (!diary) {
      return HttpResponse.json({ message: '다이어리를 찾을 수 없습니다.' }, { status: 404 })
    }

    return HttpResponse.json({ diary })
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
