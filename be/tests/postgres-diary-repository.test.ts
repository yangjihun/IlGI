import { describe, expect, it } from 'vitest'
import { createPostgresDiaryRepository } from '../src/repositories/postgres-diary.repository.js'

describe('postgres diary repository', () => {
  it('creates a diary and maps database fields to API fields', async () => {
    const queries: Array<{ text: string; values: unknown[] }> = []
    const database = {
      async query(text: string, values: unknown[]) {
        queries.push({ text, values })

        return {
          rows: [
            {
              id: 'diary-1',
              title: '망원 산책 기록',
              author: 'J',
              date: '2026-06-11',
              place_name: '망원 한강공원',
              content: '강가를 따라 걸으면서 남긴 기록',
              memo: '',
            },
          ],
        }
      },
    }

    const repository = createPostgresDiaryRepository(database)
    const diary = await repository.create({
      title: '망원 산책 기록',
      author: 'J',
      date: '2026-06-11',
      placeName: '망원 한강공원',
      content: '강가를 따라 걸으면서 남긴 기록',
      memo: '',
    })

    expect(diary).toEqual({
      id: 'diary-1',
      title: '망원 산책 기록',
      author: 'J',
      date: '2026-06-11',
      placeName: '망원 한강공원',
      content: '강가를 따라 걸으면서 남긴 기록',
      memo: '',
    })
    expect(queries[0].text).toContain('INSERT INTO diaries')
    expect(queries[0].values).toEqual([
      expect.any(String),
      '망원 산책 기록',
      'J',
      '2026-06-11',
      '망원 한강공원',
      '강가를 따라 걸으면서 남긴 기록',
      '',
    ])
  })
})
