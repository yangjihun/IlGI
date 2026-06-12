<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchDiary, type Diary } from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'

const fallbackDiary: Diary = {
  id: 'diary-mangwon',
  date: '2026-06-11',
  placeName: '망원 한강공원',
  title: '노을 보면서 남긴 산책 기록',
  memory: '강가를 따라 걷다가 하늘이 분홍색으로 바뀌는 걸 같이 봤다.',
  memo: '다음에는 야경 시간에 맞춰 다시 오기.',
  author: 'J',
  markerType: 'diary',
}

const diary = ref(fallbackDiary)
const apiStatus = ref('기본 mock data')

onMounted(async () => {
  try {
    const response = await fetchDiary('diary-mangwon')
    diary.value = response.diary
    apiStatus.value = 'backend mock API'
  } catch {
    apiStatus.value = 'backend API 연결 실패'
  }
})
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Diary Detail"
        :title="`${diary.placeName}에서 남긴 기록`"
        description="장소와 날짜, 함께 기억하고 싶은 순간을 한 번에 확인하는 상세 화면이에요."
      />

      <section class="panel-grid">
        <GlassPanel class="diary-detail-panel">
          <p class="panel-eyebrow">{{ diary.date }} · {{ diary.author }} · {{ apiStatus }}</p>
          <h2>{{ diary.title }}</h2>
          <p>{{ diary.memory }}</p>
          <p class="muted-text">메모: {{ diary.memo }}</p>
          <div class="button-row">
            <button class="secondary-button" type="button">수정</button>
            <button class="danger-button" type="button">삭제</button>
          </div>
        </GlassPanel>

        <GlassPanel>
          <p class="panel-eyebrow">Location</p>
          <h2>{{ diary.placeName }}</h2>
          <div class="mini-map" aria-hidden="true">
            <span />
          </div>
          <ul class="stack-list">
            <li>연남동 카페 · 같은 날 저장</li>
            <li>성수 작은 식당 · 이번 주 후보</li>
          </ul>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
