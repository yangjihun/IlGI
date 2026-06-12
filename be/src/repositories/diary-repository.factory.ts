import { createDatabasePool } from '../database/pool.js'
import type { DiaryRepository } from '../domains/diary.js'
import { createInMemoryDiaryRepository } from './in-memory-diary.repository.js'
import { createPostgresDiaryRepository } from './postgres-diary.repository.js'

export type DiaryRepositoryEnv = {
  DIARY_REPOSITORY?: string
  DATABASE_URL?: string
}

export function createDiaryRepository(env: DiaryRepositoryEnv): DiaryRepository {
  if (env.DIARY_REPOSITORY === 'postgres') {
    if (!env.DATABASE_URL) {
      throw new Error('DATABASE_URL is required when DIARY_REPOSITORY=postgres')
    }

    return createPostgresDiaryRepository(createDatabasePool(env.DATABASE_URL))
  }

  return createInMemoryDiaryRepository()
}
