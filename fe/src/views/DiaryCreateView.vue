<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchDiaryDraft, type DiaryDraft } from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'

const draft = ref<DiaryDraft | null>(null)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const response = await fetchDiaryDraft()
    draft.value = response.draft
  } catch {
    errorMessage.value = '작성 예시 데이터를 불러오지 못했습니다.'
  }
})
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Diary"
        title="오늘의 장소를 기록해요"
        description="날짜와 장소, 기억에 남은 순간을 남겨두면 나중에 지도 위에서 다시 꺼내볼 수 있어요."
      />

      <p v-if="errorMessage" class="muted-text">{{ errorMessage }}</p>

      <section class="panel-grid panel-grid--form">
        <GlassPanel>
          <form class="form-grid" aria-label="다이어리 작성 form">
            <label class="field-group">
              <span>날짜</span>
              <input class="mock-input" type="date" :value="draft?.date ?? ''" />
            </label>

            <label class="field-group">
              <span>장소</span>
              <input class="mock-input" type="text" :value="draft?.placeName ?? ''" />
            </label>

            <label class="field-group field-group--full">
              <span>기억에 남는 것</span>
              <textarea class="mock-textarea" :value="draft?.content ?? ''"></textarea>
            </label>

            <label class="field-group field-group--full">
              <span>추가 메모</span>
              <textarea class="mock-textarea" :value="draft?.memo ?? ''"></textarea>
            </label>

            <button class="primary-button field-group--full" type="button">기록 저장하기</button>
          </form>
        </GlassPanel>

        <GlassPanel class="preview-panel">
          <p class="panel-eyebrow">Preview</p>
          <h2>{{ draft?.placeName ?? '장소 미리보기' }}</h2>
          <p class="muted-text">{{ draft?.date ?? '-' }} · J가 남긴 기록</p>
          <p>
            {{ draft?.content ?? '작성 예시를 불러오는 중입니다.' }} 이 장소는 오늘의 지도에 diary marker로 표시돼요.
          </p>
          <RouterLink class="secondary-button" to="/diaries/sample">상세 화면 보기</RouterLink>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
