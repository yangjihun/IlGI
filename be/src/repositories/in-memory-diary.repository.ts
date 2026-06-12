import type { CreateDiaryInput, Diary, DiaryRepository, UpdateDiaryInput } from '../domains/diary.js'

export function createInMemoryDiaryRepository(initialDiaries: Diary[] = []): DiaryRepository {
  const diaries = new Map(initialDiaries.map((diary) => [diary.id, diary]))

  return {
    async list() {
      return [...diaries.values()]
    },

    async findById(id: string) {
      return diaries.get(id)
    },

    async create(input: CreateDiaryInput) {
      const diary = {
        id: `diary-${crypto.randomUUID()}`,
        ...input,
      }

      diaries.set(diary.id, diary)
      return diary
    },

    async update(id: string, input: UpdateDiaryInput) {
      const current = diaries.get(id)

      if (!current) {
        return undefined
      }

      const diary = { ...current, ...input }
      diaries.set(id, diary)
      return diary
    },

    async delete(id: string) {
      return diaries.delete(id)
    },
  }
}
