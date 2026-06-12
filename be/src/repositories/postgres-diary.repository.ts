import { randomUUID } from 'node:crypto'
import type { CreateDiaryInput, Diary, DiaryRepository, UpdateDiaryInput } from '../domains/diary.js'

export type DiaryQueryable = {
  query(text: string, values: unknown[]): Promise<{ rows: Record<string, unknown>[] }>
}

type DiaryRow = {
  id: string
  title: string
  author: string
  date: string
  place_name: string
  content: string
  memo: string | null
}

const diarySelect = `
  SELECT
    id,
    title,
    author,
    to_char(visited_date, 'YYYY-MM-DD') AS date,
    place_name,
    content,
    memo
  FROM diaries
`

function mapDiary(row: Record<string, unknown>): Diary {
  const diaryRow = row as DiaryRow

  return {
    id: diaryRow.id,
    title: diaryRow.title,
    author: diaryRow.author,
    date: diaryRow.date,
    placeName: diaryRow.place_name,
    content: diaryRow.content,
    memo: diaryRow.memo ?? '',
  }
}

export function createPostgresDiaryRepository(database: DiaryQueryable): DiaryRepository {
  return {
    async list() {
      const result = await database.query(`${diarySelect} ORDER BY created_at DESC`, [])
      return result.rows.map(mapDiary)
    },

    async findById(id: string) {
      const result = await database.query(`${diarySelect} WHERE id = $1`, [id])
      return result.rows[0] ? mapDiary(result.rows[0]) : undefined
    },

    async create(input: CreateDiaryInput) {
      const result = await database.query(
        `
          INSERT INTO diaries (id, title, author, visited_date, place_name, content, memo)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING
            id,
            title,
            author,
            to_char(visited_date, 'YYYY-MM-DD') AS date,
            place_name,
            content,
            memo
        `,
        [
          `diary-${randomUUID()}`,
          input.title,
          input.author,
          input.date,
          input.placeName,
          input.content,
          input.memo,
        ],
      )

      return mapDiary(result.rows[0])
    },

    async update(id: string, input: UpdateDiaryInput) {
      const updates = [
        ['title', input.title],
        ['author', input.author],
        ['visited_date', input.date],
        ['place_name', input.placeName],
        ['content', input.content],
        ['memo', input.memo],
      ].filter((entry): entry is [string, string] => typeof entry[1] === 'string')

      if (updates.length === 0) {
        return this.findById(id)
      }

      const setSql = updates.map(([field], index) => `${field} = $${index + 2}`).join(', ')
      const values = [id, ...updates.map(([, value]) => value)]
      const result = await database.query(
        `
          UPDATE diaries
          SET ${setSql}, updated_at = now()
          WHERE id = $1
          RETURNING
            id,
            title,
            author,
            to_char(visited_date, 'YYYY-MM-DD') AS date,
            place_name,
            content,
            memo
        `,
        values,
      )

      return result.rows[0] ? mapDiary(result.rows[0]) : undefined
    },

    async delete(id: string) {
      const result = await database.query('DELETE FROM diaries WHERE id = $1 RETURNING id', [id])
      return result.rows.length > 0
    },
  }
}
