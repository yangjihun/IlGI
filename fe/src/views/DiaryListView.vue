<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchDiaries, type Diary } from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import PageHero from '../components/PageHero.vue'

const diaries = ref<Diary[]>([])
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const response = await fetchDiaries()
    diaries.value = response.diaries
  } catch {
    errorMessage.value = '일기를 불러오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Diary"
        title="우리의 기록들"
        description="함께 남긴 장소 기록을 한눈에 볼 수 있습니다."
      />

      <div class="diary-list-actions">
        <RouterLink class="primary-button" to="/diaries/new">새 기록 남기기</RouterLink>
      </div>

      <p v-if="errorMessage" class="status-message status-message--error">{{ errorMessage }}</p>
      <p v-else-if="isLoading" class="status-message">불러오는 중...</p>
      <p v-else-if="diaries.length === 0" class="status-message">아직 남긴 기록이 없습니다.</p>

      <section v-else class="diary-list">
        <RouterLink
          v-for="diary in diaries"
          :key="diary.id"
          class="diary-card"
          :to="`/diaries/${diary.id}`"
        >
          <p class="panel-eyebrow">{{ diary.date }} · {{ diary.author }}</p>
          <h3 class="diary-card__title">{{ diary.title }}</h3>
          <p class="diary-card__place">{{ diary.placeName }}</p>
          <p class="diary-card__preview">{{ diary.content }}</p>
        </RouterLink>
      </section>
    </div>
  </AppShell>
</template>
