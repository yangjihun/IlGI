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
})
