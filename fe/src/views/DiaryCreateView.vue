<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  createDiary,
  fetchDiaryDraft,
  type CreateDiaryInput,
  type DiaryDraft,
} from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'

const router = useRouter()
const isSubmitting = ref(false)
const errorMessage = ref('')

const form = reactive<CreateDiaryInput>({
  title: '',
  author: 'J',
  date: new Date().toISOString().slice(0, 10),
  placeName: '',
  content: '',
  memo: '',
})

const previewTitle = computed(() => form.placeName.trim() || '장소 미리보기')
const previewContent = computed(() => form.content.trim() || '작성한 기억이 이곳에 미리 표시됩니다.')

function fillDraft(draft: DiaryDraft) {
  form.title = draft.title ?? `${draft.placeName} 기록`
  form.author = draft.author ?? form.author
  form.date = draft.date
  form.placeName = draft.placeName
  form.content = draft.content
  form.memo = draft.memo
}

onMounted(async () => {
  try {
    const response = await fetchDiaryDraft()
    fillDraft(response.draft)
  } catch {
    errorMessage.value = '작성 예시 데이터를 불러오지 못했습니다. 직접 입력해 주세요.'
  }
})

async function handleSubmit() {
  errorMessage.value = ''

  if (!form.title.trim() || !form.author.trim() || !form.date.trim() || !form.placeName.trim() || !form.content.trim()) {
    errorMessage.value = '제목, 작성자, 날짜, 장소, 기억 내용은 꼭 입력해야 합니다.'
    return
  }

  isSubmitting.value = true

  try {
    const response = await createDiary(form)
    await router.push({ name: 'diary-detail', params: { id: response.diary.id } })
  } catch {
    errorMessage.value = '기록을 저장하지 못했습니다. 입력값을 확인한 뒤 다시 시도해 주세요.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Diary"
        title="오늘의 장소를 기록해요"
        description="날짜와 장소, 기억에 남는 순간을 저장하면 지도 위의 다이어리 마커로 다시 확인할 수 있습니다."
      />

      <p v-if="errorMessage" class="status-message status-message--error">{{ errorMessage }}</p>

      <section class="panel-grid panel-grid--form">
        <GlassPanel>
          <form class="form-grid" aria-label="다이어리 작성 form" @submit.prevent="handleSubmit">
            <label class="field-group">
              <span>제목</span>
              <input v-model="form.title" class="mock-input" type="text" placeholder="한강 산책 기록" />
            </label>

            <label class="field-group">
              <span>작성자</span>
              <input v-model="form.author" class="mock-input" type="text" placeholder="J" />
            </label>

            <label class="field-group">
              <span>날짜</span>
              <input v-model="form.date" class="mock-input" type="date" />
            </label>

            <label class="field-group">
              <span>장소</span>
              <input v-model="form.placeName" class="mock-input" type="text" placeholder="망원 한강공원" />
            </label>

            <label class="field-group field-group--full">
              <span>기억에 남는 것</span>
              <textarea v-model="form.content" class="mock-textarea" placeholder="그 장소에서 있었던 일을 적어주세요." />
            </label>

            <label class="field-group field-group--full">
              <span>추가 메모</span>
              <textarea v-model="form.memo" class="mock-textarea" placeholder="다음에 챙길 것, 같이 가고 싶은 사람 등" />
            </label>

            <button class="primary-button field-group--full" type="submit" :disabled="isSubmitting">
              {{ isSubmitting ? '저장 중...' : '기록 저장하기' }}
            </button>
          </form>
        </GlassPanel>

        <GlassPanel class="preview-panel">
          <p class="panel-eyebrow">Preview</p>
          <h2>{{ previewTitle }}</h2>
          <p class="muted-text">{{ form.date }} · {{ form.author || '작성자' }}</p>
          <p>{{ previewContent }}</p>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
