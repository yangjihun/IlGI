import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { handlers } from './handlers'
import prototypeData from './fixtures/prototype.json'

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

describe('prototype mock API', () => {
  it('serves diaries from the JSON fixture', async () => {
    const response = await fetch('http://localhost/api/diaries')
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.diaries).toEqual(prototypeData.diaries)
  })

  it('serves an invitation preview from the JSON fixture', async () => {
    const response = await fetch('http://localhost/api/invitations/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inviteCode: prototypeData.rooms[0].inviteCode }),
    })
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.preview).toEqual({
      roomId: prototypeData.rooms[0].id,
      roomName: prototypeData.rooms[0].name,
      inviteCode: prototypeData.rooms[0].inviteCode,
      participantCount: prototypeData.rooms[0].participants.length,
    })
  })

  it('creates a diary from form input', async () => {
    const payload = {
      title: '한강 산책 기록',
      author: 'J',
      date: '2026-06-12',
      placeName: '망원 한강공원',
      content: '해질녘 산책이 좋았다.',
      memo: '다음에는 돗자리 챙기기',
    }

    const response = await fetch('http://localhost/api/diaries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const body = await response.json()

    expect(response.status).toBe(201)
    expect(body.diary).toEqual({
      id: expect.stringMatching(/^diary-/),
      ...payload,
    })
  })
})
