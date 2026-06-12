<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  fetchRoomDraft,
  previewInvitation,
  type InvitationPreview,
  type RoomDraft,
} from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'

const draft = ref<RoomDraft | null>(null)
const inviteCode = ref('')
const preview = ref<InvitationPreview | null>(null)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const response = await fetchRoomDraft()
    draft.value = response.draft
  } catch {
    errorMessage.value = '공유 방 예시 데이터를 불러오지 못했습니다.'
  }
})

async function handlePreviewInvite() {
  errorMessage.value = ''

  try {
    const response = await previewInvitation(inviteCode.value)
    preview.value = response.preview
  } catch {
    preview.value = null
    errorMessage.value = '초대 코드를 확인할 수 없습니다.'
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
              <input class="mock-input" :value="draft?.name ?? ''" />
            </label>
            <button class="primary-button" type="button">공유 방 만들기</button>
          </div>
        </GlassPanel>

        <GlassPanel>
          <p class="panel-eyebrow">Join Room</p>
          <div class="form-grid form-grid--single">
            <label class="field-group">
              <span>초대 코드</span>
              <input v-model="inviteCode" class="mock-input" placeholder="초대 코드를 입력하세요" />
            </label>
            <button class="secondary-button" type="button" @click="handlePreviewInvite">코드 확인하기</button>
          </div>
          <p class="muted-text">초대 코드는 MSW mock API로 검증합니다.</p>
          <p v-if="errorMessage" class="muted-text">{{ errorMessage }}</p>
        </GlassPanel>

        <GlassPanel class="preview-panel">
          <p class="panel-eyebrow">Room Preview</p>
          <template v-if="preview">
            <h2>{{ preview.roomName }}</h2>
            <p>
              {{ preview.inviteCode }} 방에는 현재 {{ preview.participantCount }}명이 함께하고 있어요.
            </p>
          </template>
          <template v-else>
            <h2>같이 가고, 같이 남기는 공간</h2>
            <p>
              장소 후보를 함께 정하고, 실제로 다녀온 뒤에는 같은 방에서 서로의 기록을
              확인할 수 있어요.
            </p>
          </template>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
