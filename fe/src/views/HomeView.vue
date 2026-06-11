<script setup lang="ts">
import AppShell from '../components/AppShell.vue'
import MapPreview from '../components/MapPreview.vue'
import SummaryCard from '../components/SummaryCard.vue'

type MarkerType = 'diary' | 'wishlist' | 'shared'

type MapMarker = {
  id: string
  type: MarkerType
  title: string
  description: string
  position: {
    top: string
    left: string
  }
}

const markers: MapMarker[] = [
  {
    id: 'mangwon',
    type: 'diary',
    title: '망원 한강공원',
    description: '노을 보면서 남긴 산책 기록',
    position: { top: '38%', left: '26%' },
  },
  {
    id: 'seongsu',
    type: 'wishlist',
    title: '성수 작은 식당',
    description: '이번 주말에 같이 가보기',
    position: { top: '28%', left: '62%' },
  },
  {
    id: 'bukchon',
    type: 'shared',
    title: '북촌 골목',
    description: '둘 다 저장한 다음 데이트 장소',
    position: { top: '58%', left: '48%' },
  },
  {
    id: 'yeonnam',
    type: 'diary',
    title: '연남동 카페',
    description: '처음 같이 쓴 장소 일기',
    position: { top: '68%', left: '21%' },
  },
  {
    id: 'jamsil',
    type: 'wishlist',
    title: '잠실 야경길',
    description: '비 오는 날 말고 맑은 날 가기',
    position: { top: '48%', left: '76%' },
  },
]

const activeMarker = markers[0]

const wishlistItems = ['성수 작은 식당', '잠실 야경길', '북촌 골목 산책']
</script>

<template>
  <AppShell>
    <section class="hero-layout" aria-label="장소 기반 다이어리 홈">
      <div class="hero-copy">
        <p class="hero-copy__label">Today near us</p>
        <h2>둘이 남긴 하루가 지도 위에 천천히 쌓여요.</h2>
        <p>
          다녀온 곳은 다이어리로, 가보고 싶은 곳은 함께 보는 목록으로 모아두세요.
        </p>
        <div class="hero-actions">
          <RouterLink class="primary-button" to="/diaries/new">오늘 기록 남기기</RouterLink>
          <RouterLink class="secondary-button" to="/places">가고 싶은 곳 추가</RouterLink>
        </div>
      </div>

      <MapPreview :markers="markers" :active-marker="activeMarker" />
    </section>

    <section class="summary-grid" aria-label="오늘의 요약">
      <SummaryCard
        eyebrow="Diary"
        title="오늘의 기록"
        value="3"
        description="망원 한강공원 산책 기록이 방금 저장됐어요."
      />
      <SummaryCard
        eyebrow="Wishlist"
        title="같이 가고 싶은 곳"
        value="12"
        description="이번 주말에 고르기 좋은 장소를 모아뒀어요."
        :items="wishlistItems"
      />
      <SummaryCard
        eyebrow="Room"
        title="우리 방"
        value="IlGI-204"
        description="초대 코드로 만든 공유 방에서 장소 목록을 함께 보고 있어요."
      />
    </section>
  </AppShell>
</template>
