import { randomBytes, randomUUID } from 'crypto'
import type { DiaryQueryable } from '../repositories/postgres-diary.repository.js'
import { setUserRoom } from './user.service.js'

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

type RoomRow = { id: string; name: string; invite_code: string; timeline: string[] }
type PlaceRow = { id: string; name: string; category: string; status: string }

function generateInviteCode(): string {
  return `IlGI-${randomBytes(2).toString('hex').toUpperCase()}`
}

async function loadRoom(db: DiaryQueryable, roomId: string): Promise<Room | undefined> {
  const roomResult = await db.query(
    'SELECT id, name, invite_code, timeline FROM rooms WHERE id = $1',
    [roomId],
  )
  if (!roomResult.rows[0]) return undefined

  const r = roomResult.rows[0] as RoomRow

  const [participantsResult, placesResult] = await Promise.all([
    db.query('SELECT name FROM users WHERE room_id = $1 ORDER BY created_at', [roomId]),
    db.query(
      'SELECT id, name, category, status FROM places WHERE room_id = $1 ORDER BY created_at',
      [roomId],
    ),
  ])

  return {
    id: r.id,
    name: r.name,
    inviteCode: r.invite_code,
    timeline: r.timeline,
    participants: participantsResult.rows.map((row) => (row as { name: string }).name),
    places: placesResult.rows.map((row) => {
      const p = row as PlaceRow
      return { id: p.id, name: p.name, category: p.category, status: p.status }
    }),
  }
}

export async function createRoom(
  db: DiaryQueryable,
  name: string,
  userId: string,
  userName: string,
): Promise<Room> {
  const id = `room-${randomUUID()}`
  const inviteCode = generateInviteCode()
  const timeline = [`${userName}이 방을 만들었습니다.`]

  await db.query(
    'INSERT INTO rooms (id, name, invite_code, timeline) VALUES ($1, $2, $3, $4)',
    [id, name, inviteCode, timeline],
  )
  await setUserRoom(db, userId, id)

  return (await loadRoom(db, id))!
}

export async function joinRoom(
  db: DiaryQueryable,
  inviteCode: string,
  userId: string,
  userName: string,
): Promise<Room | undefined> {
  const result = await db.query(
    'SELECT id FROM rooms WHERE LOWER(invite_code) = LOWER($1)',
    [inviteCode],
  )
  if (!result.rows[0]) return undefined

  const roomId = (result.rows[0] as { id: string }).id

  await db.query(
    'UPDATE rooms SET timeline = array_prepend($1::text, timeline) WHERE id = $2',
    [`${userName}이 방에 참여했습니다.`, roomId],
  )
  await setUserRoom(db, userId, roomId)

  return loadRoom(db, roomId)
}

export async function findRoomById(
  db: DiaryQueryable,
  id: string,
): Promise<Room | undefined> {
  return loadRoom(db, id)
}

export async function addPlace(
  db: DiaryQueryable,
  roomId: string,
  data: { name: string; category: string },
): Promise<Place | undefined> {
  const roomCheck = await db.query('SELECT id FROM rooms WHERE id = $1', [roomId])
  if (!roomCheck.rows[0]) return undefined

  const placeId = `place-${randomUUID()}`
  const result = await db.query(
    'INSERT INTO places (id, room_id, name, category) VALUES ($1, $2, $3, $4) RETURNING id, name, category, status',
    [placeId, roomId, data.name, data.category],
  )

  const p = result.rows[0] as PlaceRow
  return { id: p.id, name: p.name, category: p.category, status: p.status }
}

export async function removePlace(
  db: DiaryQueryable,
  roomId: string,
  placeId: string,
): Promise<boolean> {
  const result = await db.query(
    'DELETE FROM places WHERE id = $1 AND room_id = $2 RETURNING id',
    [placeId, roomId],
  )
  return result.rows.length > 0
}
