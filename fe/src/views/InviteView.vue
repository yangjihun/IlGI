<script setup lang="ts">
import { ref } from 'vue'
import { previewInvitation, type InvitationPreview } from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'

const inviteCode = ref('IlGI-204')
const preview = ref<InvitationPreview>({
  roomId: 'room-ilgi-204',
  roomName: '우리의 주말 지도',
  inviteCode: 'IlGI-204',
  participantCount: 2,
})
const apiStatus = ref('기본 mock data 사용 중')

async function handlePreviewInvite() {
  try {
    const response = await previewInvitation(inviteCode.value)
    preview.value = response.preview
    apiStatus.value = 'backend mock API 연결됨'
  } catch {
    apiStatus.value = 'backend API 연결 실패, 기본 mock data 표시'
  }
}
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Invite"
        title="둘만의 장소 방을 시작해요"
        description="새 공유 방을 만들거나 받은 초대 코드로 들어가서 장소 목록과 다이어리를 함께 볼 수 있어요."
      />

      <section class="panel-grid panel-grid--form">
        <GlassPanel>
          <p class="panel-eyebrow">Create Room</p>
          <div class="form-grid form-grid--single">
            <label class="field-group">
              <span>방 이름</span>
              <input class="mock-input" value="우리의 주말 지도" />
            </label>
            <button class="primary-button" type="button">공유 방 만들기</button>
          </div>
        </GlassPanel>

        <GlassPanel>
          <p class="panel-eyebrow">Join Room</p>
          <div class="form-grid form-grid--single">
            <label class="field-group">
              <span>초대 코드</span>
              <input v-model="inviteCode" class="mock-input" />
            </label>
            <button class="secondary-button" type="button" @click="handlePreviewInvite">
              코드로 입장하기
            </button>
          </div>
          <p class="muted-text">초대 preview는 backend mock API로 확인합니다. {{ apiStatus }}</p>
        </GlassPanel>

        <GlassPanel class="preview-panel">
          <p class="panel-eyebrow">Room Preview</p>
          <h2>{{ preview.roomName }}</h2>
          <p>
            {{ preview.inviteCode }} 방에는 현재 {{ preview.participantCount }}명이 함께하고 있어요.
            장소 후보와 다이어리를 같은 공간에서 확인할 수 있어요.
          </p>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
