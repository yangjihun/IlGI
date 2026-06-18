<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchRoom, type Room } from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'
import { getCurrentUser } from '../composables/useCurrentUser'

const room = ref<Room | null>(null)
const copyMessage = ref('')
const errorMessage = ref('')

const user = getCurrentUser()

onMounted(async () => {
  if (!user) return
  try {
    const response = await fetchRoom(user.roomId)
    room.value = response.room
  } catch {
    errorMessage.value = '방 정보를 불러오지 못했습니다.'
  }
})

async function copyInviteCode() {
  if (!room.value) return
  try {
    await navigator.clipboard.writeText(room.value.inviteCode)
    copyMessage.value = '초대 코드를 복사했습니다.'
  } catch {
    copyMessage.value = `${room.value.inviteCode} 코드를 직접 복사해 주세요.`
  }
}
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Invite"
        title="파트너를 초대하세요"
        description="초대 코드를 공유하면 파트너가 같은 방에 입장해 장소와 다이어리를 함께 볼 수 있습니다."
      />

      <p v-if="errorMessage" class="status-message status-message--error">{{ errorMessage }}</p>

      <section v-if="room" class="panel-grid panel-grid--form">
        <GlassPanel>
          <p class="panel-eyebrow">Current Room</p>
          <h2>{{ room.name }}</h2>
          <p class="muted-text">현재 {{ room.participants.length }}명이 함께하고 있습니다.</p>
          <div class="participant-row" aria-label="참여자">
            <span v-for="participant in room.participants" :key="participant">
              {{ participant[0]?.toUpperCase() }}
            </span>
          </div>
        </GlassPanel>

        <GlassPanel>
          <p class="panel-eyebrow">Share Invite Code</p>
          <p>아래 코드를 파트너에게 공유하세요.</p>
          <div class="invite-code-box">
            <span class="invite-code">{{ room.inviteCode }}</span>
          </div>
          <button class="primary-button" type="button" @click="copyInviteCode">초대 코드 복사</button>
          <p v-if="copyMessage" class="muted-text">{{ copyMessage }}</p>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
