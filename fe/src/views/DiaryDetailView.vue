<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  deleteDiary,
  fetchDiary,
  fetchPlaces,
  updateDiary,
  type Diary,
  type Place,
  type UpdateDiaryInput,
} from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'

const route = useRoute()
const router = useRouter()
const diary = ref<Diary | null>(null)
const relatedPlaces = ref<Place[]>([])
const isEditing = ref(false)
const isSaving = ref(false)
const errorMessage = ref('')

const form = reactive<UpdateDiaryInput>({
  title: '',
  author: '',
  date: '',
  placeName: '',
  content: '',
  memo: '',
})

const heroTitle = computed(() => {
  if (!diary.value) {
    return '다이어리 상세'
  }

  return `${diary.value.placeName || diary.value.title}에서 남긴 기록`
})

function syncForm(nextDiary: Diary) {
  form.title = nextDiary.title
  form.author = nextDiary.author
  form.date = nextDiary.date
  form.placeName = nextDiary.placeName
  form.content = nextDiary.content
  form.memo = nextDiary.memo
}

async function loadDiary() {
  errorMessage.value = ''

  try {
    const [diaryResponse, placesResponse] = await Promise.all([
      fetchDiary(String(route.params.id)),
      fetchPlaces(),
    ])

    diary.value = diaryResponse.diary
    relatedPlaces.value = placesResponse.places.slice(0, 2)
    syncForm(diaryResponse.diary)
  } catch {
    errorMessage.value = '다이어리 데이터를 불러오지 못했습니다.'
  }
}

function startEditing() {
  if (diary.value) {
    syncForm(diary.value)
  }
  isEditing.value = true
}

async function handleUpdate() {
  if (!form.title?.trim() || !form.placeName?.trim() || !form.content?.trim()) {
    errorMessage.value = '제목, 장소, 기억 내용은 꼭 입력해야 합니다.'
    return
  }

  isSaving.value = true
  errorMessage.value = ''

  try {
    const response = await updateDiary(String(route.params.id), form)
    diary.value = response.diary
    syncForm(response.diary)
    isEditing.value = false
  } catch {
    errorMessage.value = '다이어리를 수정하지 못했습니다.'
  } finally {
    isSaving.value = false
  }
}

async function handleDelete() {
  isSaving.value = true
  errorMessage.value = ''

  try {
    await deleteDiary(String(route.params.id))
    await router.push({ name: 'home' })
  } catch {
    errorMessage.value = '다이어리를 삭제하지 못했습니다.'
  } finally {
    isSaving.value = false
  }
}

onMounted(loadDiary)
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Diary Detail"
        :title="heroTitle"
        description="장소와 날짜, 함께 기억하고 싶은 순간을 한 번에 확인하는 상세 화면입니다."
      />

      <p v-if="errorMessage" class="status-message status-message--error">{{ errorMessage }}</p>

      <section v-if="diary" class="panel-grid">
        <GlassPanel class="diary-detail-panel">
          <template v-if="!isEditing">
            <p class="panel-eyebrow">{{ diary.date }} · {{ diary.author }}</p>
            <h2>{{ diary.title }}</h2>
            <p>{{ diary.content }}</p>
            <p v-if="diary.memo" class="muted-text">메모: {{ diary.memo }}</p>
            <div class="button-row">
              <button class="secondary-button" type="button" :disabled="isSaving" @click="startEditing">
                수정
              </button>
              <button class="danger-button" type="button" :disabled="isSaving" @click="handleDelete">
                삭제
              </button>
            </div>
          </template>

          <form v-else class="form-grid form-grid--single" @submit.prevent="handleUpdate">
            <label class="field-group">
              <span>제목</span>
              <input v-model="form.title" class="mock-input" type="text" />
            </label>
            <label class="field-group">
              <span>날짜</span>
              <input v-model="form.date" class="mock-input" type="date" />
            </label>
            <label class="field-group">
              <span>장소</span>
              <input v-model="form.placeName" class="mock-input" type="text" />
            </label>
            <label class="field-group">
              <span>기억 내용</span>
              <textarea v-model="form.content" class="mock-textarea" />
            </label>
            <label class="field-group">
              <span>추가 메모</span>
              <textarea v-model="form.memo" class="mock-textarea" />
            </label>
            <div class="button-row">
              <button class="primary-button" type="submit" :disabled="isSaving">
                {{ isSaving ? '저장 중...' : '수정 저장' }}
              </button>
              <button class="secondary-button" type="button" :disabled="isSaving" @click="isEditing = false">
                취소
              </button>
            </div>
          </form>
        </GlassPanel>

        <GlassPanel>
          <p class="panel-eyebrow">Location</p>
          <h2>{{ diary.placeName }}</h2>
          <div class="mini-map" aria-hidden="true">
            <span />
          </div>
          <ul class="stack-list">
            <li v-for="place in relatedPlaces" :key="place.id">{{ place.name }} · {{ place.status }}</li>
          </ul>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
