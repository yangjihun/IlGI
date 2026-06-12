export type Diary = {
  id: string
  title: string
  author: string
  date: string
  placeName: string
  content: string
  memo: string
}

export type CreateDiaryInput = Omit<Diary, 'id'>

export type UpdateDiaryInput = Partial<CreateDiaryInput>

export type DiaryRepository = {
  list(): Promise<Diary[]>
  findById(id: string): Promise<Diary | undefined>
  create(input: CreateDiaryInput): Promise<Diary>
  update(id: string, input: UpdateDiaryInput): Promise<Diary | undefined>
  delete(id: string): Promise<boolean>
}
