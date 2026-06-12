<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  fetchRoomDraft,
  previewInvitation,
  type InvitationPreview,
  type RoomDraft,
} from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'

const router = useRouter()
const draft = ref<RoomDraft | null>(null)
const roomName = ref('')
const inviteCode = ref('')
const preview = ref<InvitationPreview | null>(null)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const response = await fetchRoomDraft()
    draft.value = response.draft
    roomName.value = response.draft.name
  } catch {
    errorMessage.value = '공유 방 예시 데이터를 불러오지 못했습니다.'
  }
})

async function createRoom() {
  await router.push('/rooms/sample')
}

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

async function joinPreviewRoom() {
  if (!preview.value) {
    return
  }

  await router.push('/rooms/sample')
}
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Invite"
        title="나만의 장소 방을 시작해요"
        description="공유 방을 만들거나 받은 초대 코드로 들어가서 장소 목록과 다이어리를 함께 볼 수 있습니다."
      />

      <section class="panel-grid panel-grid--form">
        <GlassPanel>
          <p class="panel-eyebrow">Create Room</p>
          <form class="form-grid form-grid--single" @submit.prevent="createRoom">
            <label class="field-group">
              <span>방 이름</span>
              <input v-model="roomName" class="mock-input" placeholder="우리의 주말 지도" />
            </label>
            <button class="primary-button" type="submit">공유 방 만들기</button>
          </form>
        </GlassPanel>

        <GlassPanel>
          <p class="panel-eyebrow">Join Room</p>
          <form class="form-grid form-grid--single" @submit.prevent="handlePreviewInvite">
            <label class="field-group">
              <span>초대 코드</span>
              <input v-model="inviteCode" class="mock-input" placeholder="IlGI-204" />
            </label>
            <button class="secondary-button" type="submit">코드 확인하기</button>
          </form>
          <p v-if="errorMessage" class="status-message status-message--error">{{ errorMessage }}</p>
        </GlassPanel>

        <GlassPanel class="preview-panel">
          <p class="panel-eyebrow">Room Preview</p>
          <template v-if="preview">
            <h2>{{ preview.roomName }}</h2>
            <p>{{ preview.inviteCode }} 방에 현재 {{ preview.participantCount }}명이 함께하고 있습니다.</p>
            <button class="primary-button" type="button" @click="joinPreviewRoom">방 입장하기</button>
          </template>
          <template v-else>
            <h2>같이 가고 같이 기록하는 공간</h2>
            <p>초대 코드를 확인하면 입장할 공유 방 정보가 이곳에 표시됩니다.</p>
          </template>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
