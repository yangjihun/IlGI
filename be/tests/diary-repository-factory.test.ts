import { describe, expect, it } from 'vitest'
import { createDiaryRepository } from '../src/repositories/diary-repository.factory.js'

describe('diary repository factory', () => {
  it('uses in-memory repository by default', async () => {
    const repository = createDiaryRepository({})
    const diaries = await repository.list()

    expect(diaries).toEqual([])
  })

  it('requires DATABASE_URL when postgres repository is selected', () => {
    expect(() => createDiaryRepository({ DIARY_REPOSITORY: 'postgres' })).toThrow(
      'DATABASE_URL is required when DIARY_REPOSITORY=postgres',
    )
  })
})
