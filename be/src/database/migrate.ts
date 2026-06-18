import type { DiaryQueryable } from '../repositories/postgres-diary.repository.js'

export async function runMigrations(db: DiaryQueryable): Promise<void> {
  await db.query(
    `CREATE TABLE IF NOT EXISTS rooms (
      id          TEXT        PRIMARY KEY,
      name        TEXT        NOT NULL,
      invite_code TEXT        NOT NULL UNIQUE,
      timeline    TEXT[]      NOT NULL DEFAULT '{}',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )`,
    [],
  )

  await db.query(
    `CREATE TABLE IF NOT EXISTS users (
      id         TEXT        PRIMARY KEY,
      name       TEXT        NOT NULL UNIQUE,
      room_id    TEXT        REFERENCES rooms(id),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`,
    [],
  )

  await db.query(
    `CREATE TABLE IF NOT EXISTS places (
      id         TEXT        PRIMARY KEY,
      room_id    TEXT        NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
      name       TEXT        NOT NULL,
      category   TEXT        NOT NULL DEFAULT '기타',
      status     TEXT        NOT NULL DEFAULT '저장됨',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`,
    [],
  )
}
