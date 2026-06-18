<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createRoom, joinRoom } from '../api/prototypeApi'
import { setCurrentUser } from '../composables/useCurrentUser'

type Step = 'name' | 'mode' | 'create' | 'created' | 'join'

const router = useRouter()
const step = ref<Step>('name')
const userName = ref('')
const roomName = ref('')
const inviteCodeInput = ref('')
const createdRoom = ref<{ id: string; name: string; inviteCode: string } | null>(null)
const copyMessage = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

function proceedToMode() {
  if (!userName.value.trim()) {
    errorMessage.value = '닉네임을 입력해 주세요.'
    return
  }
  errorMessage.value = ''
  step.value = 'mode'
}

async function handleCreateRoom() {
  if (!roomName.value.trim()) {
    errorMessage.value = '방 이름을 입력해 주세요.'
    return
  }
  errorMessage.value = ''
  isLoading.value = true
  try {
    const response = await createRoom(roomName.value.trim(), userName.value.trim())
    createdRoom.value = response.room
    step.value = 'created'
  } catch {
    errorMessage.value = '방 만들기에 실패했습니다.'
  } finally {
    isLoading.value = false
  }
}

async function copyInviteCode() {
  if (!createdRoom.value) return
  try {
    await navigator.clipboard.writeText(createdRoom.value.inviteCode)
    copyMessage.value = '복사됐습니다!'
  } catch {
    copyMessage.value = '직접 복사해 주세요.'
  }
}

function finishCreate() {
  if (!createdRoom.value) return
  setCurrentUser({ name: userName.value.trim(), roomId: createdRoom.value.id })
  router.push({ name: 'home' })
}

async function handleJoinRoom() {
  if (!inviteCodeInput.value.trim()) {
    errorMessage.value = '초대 코드를 입력해 주세요.'
    return
  }
  errorMessage.value = ''
  isLoading.value = true
  try {
    const response = await joinRoom(inviteCodeInput.value.trim(), userName.value.trim())
    setCurrentUser({ name: userName.value.trim(), roomId: response.room.id })
    router.push({ name: 'home' })
  } catch {
    errorMessage.value = '초대 코드를 찾을 수 없습니다. 다시 확인해 주세요.'
  } finally {
    isLoading.value = false
  }
}

function goBack() {
  errorMessage.value = ''
  step.value = 'mode'
}
</script>

<template>
  <div class="welcome-shell">
    <div class="welcome-card">
      <header class="welcome-header">
        <p class="welcome-label">Place Diary</p>
        <h1>IlGI</h1>
        <p class="welcome-desc">우리의 장소를 함께 기록하고 공유하는 커플 다이어리</p>
      </header>

      <!-- Step 1: 닉네임 입력 -->
      <form v-if="step === 'name'" class="welcome-form" @submit.prevent="proceedToMode">
        <label class="field-group">
          <span>닉네임</span>
          <input
            v-model="userName"
            class="mock-input"
            placeholder="나만의 이름을 입력하세요"
            autofocus
          />
        </label>
        <p v-if="errorMessage" class="status-message status-message--error">{{ errorMessage }}</p>
        <button class="primary-button" type="submit">다음</button>
      </form>

      <!-- Step 2: 방 만들기 / 초대 코드 입장 선택 -->
      <div v-else-if="step === 'mode'" class="welcome-mode">
        <p class="mode-greeting">안녕하세요, <strong>{{ userName }}</strong> 님!</p>
        <p class="mode-desc">새 방을 만들거나 파트너의 초대 코드로 입장하세요.</p>
        <div class="mode-buttons">
          <button class="primary-button" type="button" @click="step = 'create'; errorMessage = ''">
            새 방 만들기
          </button>
          <button class="secondary-button" type="button" @click="step = 'join'; errorMessage = ''">
            초대 코드로 입장
          </button>
        </div>
      </div>

      <!-- Step 3a: 방 만들기 -->
      <form v-else-if="step === 'create'" class="welcome-form" @submit.prevent="handleCreateRoom">
        <label class="field-group">
          <span>방 이름</span>
          <input
            v-model="roomName"
            class="mock-input"
            placeholder="우리의 주말 지도"
            autofocus
          />
        </label>
        <p v-if="errorMessage" class="status-message status-message--error">{{ errorMessage }}</p>
        <div class="button-row">
          <button class="primary-button" type="submit" :disabled="isLoading">
            {{ isLoading ? '만드는 중...' : '방 만들기' }}
          </button>
          <button class="secondary-button" type="button" @click="goBack">뒤로</button>
        </div>
      </form>

      <!-- Step 3a 완료: 초대 코드 공유 -->
      <div v-else-if="step === 'created' && createdRoom" class="welcome-done">
        <p class="done-label">방이 만들어졌습니다!</p>
        <h2>{{ createdRoom.name }}</h2>
        <p class="done-desc">파트너에게 아래 초대 코드를 공유하면 함께 기록을 시작할 수 있어요.</p>
        <div class="invite-code-box">
          <span class="invite-code">{{ createdRoom.inviteCode }}</span>
          <button class="secondary-button invite-copy-btn" type="button" @click="copyInviteCode">
            복사
          </button>
        </div>
        <p v-if="copyMessage" class="muted-text">{{ copyMessage }}</p>
        <button class="primary-button" type="button" @click="finishCreate">시작하기</button>
      </div>

      <!-- Step 3b: 초대 코드로 입장 -->
      <form v-else-if="step === 'join'" class="welcome-form" @submit.prevent="handleJoinRoom">
        <label class="field-group">
          <span>초대 코드</span>
          <input
            v-model="inviteCodeInput"
            class="mock-input"
            placeholder="IlGI-XXXX"
            autofocus
          />
        </label>
        <p v-if="errorMessage" class="status-message status-message--error">{{ errorMessage }}</p>
        <div class="button-row">
          <button class="primary-button" type="submit" :disabled="isLoading">
            {{ isLoading ? '확인 중...' : '입장하기' }}
          </button>
          <button class="secondary-button" type="button" @click="goBack">뒤로</button>
        </div>
      </form>
    </div>
  </div>
</template>
