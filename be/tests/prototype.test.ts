import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'

describe('prototype readonly API', () => {
  const app = createApp()

  it('returns diary list', async () => {
    const response = await request(app).get('/api/diaries')

    expect(response.status).toBe(200)
    expect(response.body.diaries).toEqual([
      expect.objectContaining({
        id: 'diary-mangwon',
        placeName: '망원 한강공원',
        markerType: 'diary',
      }),
    ])
  })

  it('returns diary detail by id', async () => {
    const response = await request(app).get('/api/diaries/diary-mangwon')

    expect(response.status).toBe(200)
    expect(response.body.diary).toEqual(
      expect.objectContaining({
        id: 'diary-mangwon',
        title: '노을 보면서 남긴 산책 기록',
      }),
    )
  })

  it('returns 404 when diary does not exist', async () => {
    const response = await request(app).get('/api/diaries/unknown')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'Diary not found' })
  })

  it('returns wishlist place list', async () => {
    const response = await request(app).get('/api/places')

    expect(response.status).toBe(200)
    expect(response.body.places).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'place-seongsu',
          name: '성수 작은 식당',
          status: '이번 주 후보',
        }),
      ]),
    )
  })

  it('returns shared room by id', async () => {
    const response = await request(app).get('/api/rooms/room-ilgi-204')

    expect(response.status).toBe(200)
    expect(response.body.room).toEqual(
      expect.objectContaining({
        id: 'room-ilgi-204',
        inviteCode: 'IlGI-204',
        participants: ['J', 'H'],
      }),
    )
  })

  it('returns 404 when room does not exist', async () => {
    const response = await request(app).get('/api/rooms/unknown')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'Room not found' })
  })

  it('returns invitation preview by invite code', async () => {
    const response = await request(app)
      .post('/api/invitations/preview')
      .send({ inviteCode: 'IlGI-204' })

    expect(response.status).toBe(200)
    expect(response.body.preview).toEqual({
      roomId: 'room-ilgi-204',
      roomName: '우리의 주말 지도',
      inviteCode: 'IlGI-204',
      participantCount: 2,
    })
  })

  it('returns 400 when invite code is blank', async () => {
    const response = await request(app)
      .post('/api/invitations/preview')
      .send({ inviteCode: '   ' })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'Invite code is required' })
  })
})
