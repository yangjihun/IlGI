<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchRoom, type Room } from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'

const fallbackRoom: Room = {
  id: 'room-ilgi-204',
  name: '우리의 주말 지도',
  inviteCode: 'IlGI-204',
  participants: ['J', 'H'],
  timeline: ['망원 한강공원 기록 추가', '성수 작은 식당 후보 등록', '북촌 골목 산책을 같이 저장'],
  places: [
    { id: 'place-seongsu', name: '성수 작은 식당', category: '맛집', status: '이번 주 후보' },
    { id: 'place-jamsil', name: '잠실 야경길', category: '산책', status: '저장됨' },
    { id: 'place-bukchon', name: '북촌 골목 산책', category: '여행지', status: '같이 저장' },
  ],
}

const room = ref(fallbackRoom)
const apiStatus = ref('기본 mock data 사용 중')

onMounted(async () => {
  try {
    const response = await fetchRoom('room-ilgi-204')
    room.value = response.room
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
        eyebrow="Shared Room"
        :title="room.name"
        description="초대 코드로 함께 들어온 공간에서 기록과 가보고 싶은 곳을 같이 관리해요."
      />

      <section class="panel-grid">
        <GlassPanel>
          <p class="panel-eyebrow">Invite Code</p>
          <h2>{{ room.inviteCode }}</h2>
          <p class="muted-text">참여자 {{ room.participants.length }}명 · 공동 편집 가능 · {{ apiStatus }}</p>
          <div class="participant-row" aria-label="참여자">
            <span v-for="participant in room.participants" :key="participant">{{ participant }}</span>
          </div>
          <button class="primary-button" type="button">초대 코드 복사</button>
        </GlassPanel>

        <GlassPanel>
          <p class="panel-eyebrow">Timeline</p>
          <ul class="timeline">
            <li v-for="item in room.timeline" :key="item">{{ item }}</li>
          </ul>
        </GlassPanel>

        <GlassPanel>
          <p class="panel-eyebrow">Shared Places</p>
          <ul class="stack-list">
            <li v-for="place in room.places" :key="place.id">{{ place.name }} · {{ place.status }}</li>
          </ul>
          <RouterLink class="secondary-button" to="/places">장소 목록 보기</RouterLink>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
