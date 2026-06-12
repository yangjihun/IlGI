<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchRoom, type Room } from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'

const room = ref<Room | null>(null)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const response = await fetchRoom('room-ilgi-204')
    room.value = response.room
  } catch {
    errorMessage.value = '공유 방 데이터를 불러오지 못했습니다.'
  }
})
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Shared Room"
        :title="room?.name ?? '우리의 장소 방'"
        description="초대 코드로 함께 들어온 공간에서 기록과 가보고 싶은 곳을 같이 관리해요."
      />

      <p v-if="errorMessage" class="muted-text">{{ errorMessage }}</p>

      <section v-if="room" class="panel-grid">
        <GlassPanel>
          <p class="panel-eyebrow">Invite Code</p>
          <h2>{{ room.inviteCode }}</h2>
          <p class="muted-text">참여자 {{ room.participants.length }}명 · 공동 편집 가능</p>
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
