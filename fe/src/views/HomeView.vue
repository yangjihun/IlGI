<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchHomeSummary, fetchPlaces, fetchRoom, type HomeSummary, type Place, type Room } from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import MapPreview from '../components/MapPreview.vue'
import SummaryCard from '../components/SummaryCard.vue'

const home = ref<HomeSummary | null>(null)
const places = ref<Place[]>([])
const room = ref<Room | null>(null)
const isLoading = ref(true)
const errorMessage = ref('')

const activeMarker = computed(() => home.value?.markers[0])
const wishlistItems = computed(() => places.value.map((place) => place.name))

onMounted(async () => {
  try {
    const homeResponse = await fetchHomeSummary()
    const placeResponse = await fetchPlaces()
    const roomResponse = await fetchRoom(homeResponse.home.roomId)

    home.value = homeResponse.home
    places.value = placeResponse.places
    room.value = roomResponse.room
  } catch {
    errorMessage.value = 'MSW mock API 응답을 불러오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <AppShell>
    <section class="hero-layout" aria-label="장소 기반 다이어리 홈">
      <div class="hero-copy">
        <p class="hero-copy__label">Today near us</p>
        <h2>둘이 남긴 하루가 지도 위에 천천히 쌓여요</h2>
        <p>
          다녀온 곳은 다이어리로, 가보고 싶은 곳은 함께 보는 목록으로 모아보세요.
        </p>
        <div class="hero-actions">
          <RouterLink class="primary-button" to="/diaries/new">오늘 기록 남기기</RouterLink>
          <RouterLink class="secondary-button" to="/places">가고 싶은 곳 추가</RouterLink>
        </div>
      </div>

      <MapPreview v-if="home && activeMarker" :markers="home.markers" :active-marker="activeMarker" />
      <div v-else class="map-preview map-preview--empty">
        <p>{{ isLoading ? '지도 데이터를 불러오는 중입니다.' : errorMessage }}</p>
      </div>
    </section>

    <section class="summary-grid" aria-label="오늘의 요약">
      <SummaryCard
        eyebrow="Diary"
        title="오늘의 기록"
        :value="String(home?.diaryCount ?? 0)"
        description="최근 남긴 장소 다이어리를 지도와 함께 확인할 수 있어요."
      />
      <SummaryCard
        eyebrow="Wishlist"
        title="같이 가고 싶은 곳"
        :value="String(home?.wishlistCount ?? places.length)"
        description="이번 주말에 고르기 좋은 장소를 함께 모아둘 수 있어요."
        :items="wishlistItems"
      />
      <SummaryCard
        eyebrow="Room"
        title="우리 방"
        :value="room?.inviteCode ?? '-'"
        description="초대 코드로 만든 공유 방에서 장소 목록을 함께 보고 있어요."
      />
    </section>
  </AppShell>
</template>
