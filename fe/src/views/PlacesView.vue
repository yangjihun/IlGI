<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchPlaces, type Place } from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'

const fallbackPlaces: Place[] = [
  { id: 'place-seongsu', name: '성수 작은 식당', category: '맛집', status: '이번 주 후보' },
  { id: 'place-jamsil', name: '잠실 야경길', category: '산책', status: '저장됨' },
  { id: 'place-bukchon', name: '북촌 골목 산책', category: '여행지', status: '같이 저장' },
]

const places = ref(fallbackPlaces)
const apiStatus = ref('기본 mock data 사용 중')

onMounted(async () => {
  try {
    const response = await fetchPlaces()
    places.value = response.places
    apiStatus.value = 'backend mock API 연결됨'
  } catch {
    apiStatus.value = 'backend API 연결 실패, 기본 mock data 표시'
  }
})
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Wishlist"
        title="같이 가고 싶은 곳"
        description="카테고리별로 장소를 모아두고, 이번 주에 어디 갈지 함께 고를 수 있어요."
      />

      <section class="panel-grid panel-grid--wide">
        <GlassPanel>
          <div class="segmented-control" aria-label="카테고리">
            <button type="button" class="is-active">전체</button>
            <button type="button">맛집</button>
            <button type="button">카페</button>
            <button type="button">산책</button>
          </div>

          <ul class="place-list">
            <li v-for="place in places" :key="place.id">
              <div>
                <strong>{{ place.name }}</strong>
                <span>{{ place.category }}</span>
              </div>
              <em class="status-badge">{{ place.status }}</em>
            </li>
          </ul>
        </GlassPanel>

        <GlassPanel>
          <p class="panel-eyebrow">Add Place</p>
          <div class="form-grid form-grid--single">
            <label class="field-group">
              <span>장소명</span>
              <input class="mock-input" value="서촌 작은 책방" />
            </label>
            <label class="field-group">
              <span>카테고리</span>
              <input class="mock-input" value="데이트" />
            </label>
            <button class="primary-button" type="button">장소 추가하기</button>
          </div>
          <p class="muted-text">J와 H가 함께 편집할 수 있는 공유 장소 목록이에요. {{ apiStatus }}</p>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
