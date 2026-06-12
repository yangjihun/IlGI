<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchPlaceDraft, fetchPlaces, type Place, type PlaceDraft } from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'

const places = ref<Place[]>([])
const draft = ref<PlaceDraft | null>(null)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const [placeResponse, draftResponse] = await Promise.all([fetchPlaces(), fetchPlaceDraft()])

    places.value = placeResponse.places
    draft.value = draftResponse.draft
  } catch {
    errorMessage.value = '장소 데이터를 불러오지 못했습니다.'
  }
})
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Wishlist"
        title="같이 가고 싶은 곳"
        description="카테고리별로 장소를 모아두고, 이번 주에 어디 갈지 함께 골라볼 수 있어요."
      />

      <p v-if="errorMessage" class="muted-text">{{ errorMessage }}</p>

      <section class="panel-grid panel-grid--wide">
        <GlassPanel>
          <div class="segmented-control" aria-label="카테고리">
            <button type="button" class="is-active">전체</button>
            <button type="button">맛집</button>
            <button type="button">카페</button>
            <button type="button">산책</button>
          </div>

          <ul class="place-list">
            <li v-for="place in places" :key="place.id">
              <div>
                <strong>{{ place.name }}</strong>
                <span>{{ place.category }}</span>
              </div>
              <em class="status-badge">{{ place.status }}</em>
            </li>
          </ul>
        </GlassPanel>

        <GlassPanel>
          <p class="panel-eyebrow">Add Place</p>
          <div class="form-grid form-grid--single">
            <label class="field-group">
              <span>장소명</span>
              <input class="mock-input" :value="draft?.name ?? ''" />
            </label>
            <label class="field-group">
              <span>카테고리</span>
              <input class="mock-input" :value="draft?.category ?? ''" />
            </label>
            <button class="primary-button" type="button">장소 추가하기</button>
          </div>
          <p class="muted-text">J와 H가 함께 편집할 수 있는 공유 장소 목록이에요.</p>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
