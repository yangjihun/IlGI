<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchDiary, fetchPlaces, type Diary, type Place } from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'

const diary = ref<Diary | null>(null)
const relatedPlaces = ref<Place[]>([])
const errorMessage = ref('')

onMounted(async () => {
  try {
    const [diaryResponse, placesResponse] = await Promise.all([
      fetchDiary('diary-mangwon'),
      fetchPlaces(),
    ])

    diary.value = diaryResponse.diary
    relatedPlaces.value = placesResponse.places.slice(0, 2)
  } catch {
    errorMessage.value = '다이어리 데이터를 불러오지 못했습니다.'
  }
})
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Diary Detail"
        :title="diary ? `${diary.placeName}에서 남긴 기록` : '다이어리 상세'"
        description="장소와 날짜, 함께 기억하고 싶은 시간을 한 번에 확인하는 상세 화면이에요."
      />

      <p v-if="errorMessage" class="muted-text">{{ errorMessage }}</p>

      <section v-if="diary" class="panel-grid">
        <GlassPanel class="diary-detail-panel">
          <p class="panel-eyebrow">{{ diary.date }} · {{ diary.author }}</p>
          <h2>{{ diary.title }}</h2>
          <p>{{ diary.content }}</p>
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
            <li v-for="place in relatedPlaces" :key="place.id">{{ place.name }} · {{ place.status }}</li>
          </ul>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
