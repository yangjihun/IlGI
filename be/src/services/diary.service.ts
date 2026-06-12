import type { CreateDiaryInput, DiaryRepository, UpdateDiaryInput } from '../domains/diary.js'

export class DiaryValidationError extends Error {
  constructor(public readonly errors: string[]) {
    super('Diary validation failed')
  }
}

const requiredCreateFields: Array<keyof CreateDiaryInput> = [
  'title',
  'author',
  'date',
  'placeName',
  'content',
]

function normalizeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function assertCreateInput(body: unknown): CreateDiaryInput {
  const candidate = body as Record<string, unknown>
  const errors = requiredCreateFields
    .filter((field) => normalizeText(candidate[field]) === '')
    .map((field) => `${field} is required`)

  if (errors.length > 0) {
    throw new DiaryValidationError(errors)
  }

  return {
    title: normalizeText(candidate.title),
    author: normalizeText(candidate.author),
    date: normalizeText(candidate.date),
    placeName: normalizeText(candidate.placeName),
    content: normalizeText(candidate.content),
    memo: normalizeText(candidate.memo),
  }
}

function assertUpdateInput(body: unknown): UpdateDiaryInput {
  const candidate = body as Record<string, unknown>
  const input: UpdateDiaryInput = {}
  const editableFields: Array<keyof CreateDiaryInput> = [
    'title',
    'author',
    'date',
    'placeName',
    'content',
    'memo',
  ]

  for (const field of editableFields) {
    if (field in candidate) {
      input[field] = normalizeText(candidate[field])
    }
  }

  return input
}

export function createDiaryService(repository: DiaryRepository) {
  return {
    listDiaries() {
      return repository.list()
    },

    getDiary(id: string) {
      return repository.findById(id)
    },

    createDiary(body: unknown) {
      return repository.create(assertCreateInput(body))
    },

    updateDiary(id: string, body: unknown) {
      return repository.update(id, assertUpdateInput(body))
    },

    deleteDiary(id: string) {
      return repository.delete(id)
    },
  }
}

export type DiaryService = ReturnType<typeof createDiaryService>
