<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { fetchPlaceDraft, fetchPlaces, type Place, type PlaceDraft } from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'

const places = ref<Place[]>([])
const activeCategory = ref('전체')
const errorMessage = ref('')

const form = reactive<PlaceDraft>({
  name: '',
  category: '',
})

const categories = computed(() => ['전체', ...new Set(places.value.map((place) => place.category))])
const filteredPlaces = computed(() => {
  if (activeCategory.value === '전체') {
    return places.value
  }

  return places.value.filter((place) => place.category === activeCategory.value)
})

onMounted(async () => {
  try {
    const [placeResponse, draftResponse] = await Promise.all([fetchPlaces(), fetchPlaceDraft()])

    places.value = placeResponse.places
    form.name = draftResponse.draft.name
    form.category = draftResponse.draft.category
  } catch {
    errorMessage.value = '장소 데이터를 불러오지 못했습니다.'
  }
})

function addPlace() {
  errorMessage.value = ''

  if (!form.name.trim() || !form.category.trim()) {
    errorMessage.value = '장소명과 카테고리를 입력해 주세요.'
    return
  }

  places.value = [
    {
      id: `place-${Date.now()}`,
      name: form.name.trim(),
      category: form.category.trim(),
      status: '새로 추가됨',
    },
    ...places.value,
  ]
  activeCategory.value = '전체'
  form.name = ''
  form.category = ''
}
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Wishlist"
        title="같이 가고 싶은 곳"
        description="카테고리별로 장소를 모아두고, 이번 주에 어디 갈지 함께 고를 수 있습니다."
      />

      <p v-if="errorMessage" class="status-message status-message--error">{{ errorMessage }}</p>

      <section class="panel-grid panel-grid--wide">
        <GlassPanel>
          <div class="segmented-control" aria-label="카테고리">
            <button
              v-for="category in categories"
              :key="category"
              type="button"
              :class="{ 'is-active': activeCategory === category }"
              @click="activeCategory = category"
            >
              {{ category }}
            </button>
          </div>

          <ul class="place-list">
            <li v-for="place in filteredPlaces" :key="place.id">
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
          <form class="form-grid form-grid--single" @submit.prevent="addPlace">
            <label class="field-group">
              <span>장소명</span>
              <input v-model="form.name" class="mock-input" placeholder="서촌 작은 책방" />
            </label>
            <label class="field-group">
              <span>카테고리</span>
              <input v-model="form.category" class="mock-input" placeholder="데이트" />
            </label>
            <button class="primary-button" type="submit">장소 추가하기</button>
          </form>
          <p class="muted-text">공유 장소 목록 API가 생기면 같은 입력 흐름으로 서버 저장을 연결할 수 있습니다.</p>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
