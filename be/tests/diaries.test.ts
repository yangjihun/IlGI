import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'

describe('diary CRUD API', () => {
  it('creates, reads, updates, and deletes a diary', async () => {
    const app = createApp()

    const createResponse = await request(app)
      .post('/api/diaries')
      .send({
        title: '망원 산책 기록',
        author: 'J',
        date: '2026-06-11',
        placeName: '망원 한강공원',
        content: '강가를 따라 걸으면서 남긴 기록',
        memo: '다음에는 해질녘에 다시 가기',
      })

    expect(createResponse.status).toBe(201)
    expect(createResponse.body.diary).toEqual({
      id: expect.any(String),
      title: '망원 산책 기록',
      author: 'J',
      date: '2026-06-11',
      placeName: '망원 한강공원',
      content: '강가를 따라 걸으면서 남긴 기록',
      memo: '다음에는 해질녘에 다시 가기',
    })

    const diaryId = createResponse.body.diary.id

    const listResponse = await request(app).get('/api/diaries')
    expect(listResponse.status).toBe(200)
    expect(listResponse.body.diaries).toEqual([
      expect.objectContaining({
        id: diaryId,
        placeName: '망원 한강공원',
      }),
    ])

    const detailResponse = await request(app).get(`/api/diaries/${diaryId}`)
    expect(detailResponse.status).toBe(200)
    expect(detailResponse.body.diary).toEqual(createResponse.body.diary)

    const updateResponse = await request(app)
      .patch(`/api/diaries/${diaryId}`)
      .send({
        title: '망원 노을 산책',
        memo: '',
      })

    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body.diary).toEqual({
      ...createResponse.body.diary,
      title: '망원 노을 산책',
      memo: '',
    })

    const deleteResponse = await request(app).delete(`/api/diaries/${diaryId}`)
    expect(deleteResponse.status).toBe(204)

    const afterDeleteResponse = await request(app).get(`/api/diaries/${diaryId}`)
    expect(afterDeleteResponse.status).toBe(404)
    expect(afterDeleteResponse.body).toEqual({ message: 'Diary not found' })
  })

  it('rejects invalid diary creation input', async () => {
    const response = await request(createApp())
      .post('/api/diaries')
      .send({
        title: '장소 없는 기록',
        author: 'J',
        date: '2026-06-11',
        placeName: '',
        content: '장소명은 필수다.',
      })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: 'Diary validation failed',
      errors: ['placeName is required'],
    })
  })

  it('returns 404 when updating a missing diary', async () => {
    const response = await request(createApp())
      .patch('/api/diaries/missing-diary')
      .send({ title: '없는 일기' })

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'Diary not found' })
  })
})
