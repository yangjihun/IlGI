import { randomUUID } from 'crypto'
import type { DiaryQueryable } from '../repositories/postgres-diary.repository.js'

export type User = {
  id: string
  name: string
  roomId: string | null
}

type UserRow = { id: string; name: string; room_id: string | null }

function mapUser(row: Record<string, unknown>): User {
  const r = row as UserRow
  return { id: r.id, name: r.name, roomId: r.room_id }
}

export async function findOrCreateUser(
  db: DiaryQueryable,
  name: string,
): Promise<{ user: User; isNew: boolean }> {
  const existing = await db.query(
    'SELECT id, name, room_id FROM users WHERE name = $1',
    [name],
  )

  if (existing.rows[0]) {
    return { user: mapUser(existing.rows[0]), isNew: false }
  }

  const result = await db.query(
    'INSERT INTO users (id, name) VALUES ($1, $2) RETURNING id, name, room_id',
    [`user-${randomUUID()}`, name],
  )
  return { user: mapUser(result.rows[0]), isNew: true }
}

export async function setUserRoom(
  db: DiaryQueryable,
  userId: string,
  roomId: string,
): Promise<void> {
  await db.query('UPDATE users SET room_id = $1 WHERE id = $2', [roomId, userId])
}
