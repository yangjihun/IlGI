<script setup lang="ts">
import { getCurrentUser } from '../composables/useCurrentUser'

const user = getCurrentUser()
const avatarLetter = user?.name?.[0]?.toUpperCase() ?? '?'
</script>

<template>
  <main class="app-shell">
    <header class="app-header">
      <RouterLink class="app-brand" to="/" aria-label="IlGI 홈으로 이동">
        <span>우리의 장소 일기</span>
        <strong>IlGI</strong>
      </RouterLink>

      <nav class="app-nav" aria-label="주요 화면">
        <RouterLink to="/">홈</RouterLink>
        <RouterLink to="/diaries/new">기록</RouterLink>
        <RouterLink to="/places">장소</RouterLink>
        <RouterLink to="/rooms/sample">우리 방</RouterLink>
        <RouterLink to="/invite">초대</RouterLink>
      </nav>

      <div class="app-header__actions" aria-label="공유 방 상태">
        <span class="room-pill">함께 기록 중</span>
        <button class="icon-button" type="button" aria-label="가고 싶은 곳 보기" @click="$router.push({ name: 'places' })">♡</button>
        <span class="profile-avatar" :aria-label="`${user?.name ?? ''} 프로필`">{{ avatarLetter }}</span>
      </div>
    </header>

    <slot />
  </main>
</template>
