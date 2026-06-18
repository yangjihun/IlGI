<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import {
  addPlaceToRoom,
  fetchRoom,
  removePlaceFromRoom,
  type Place,
} from '../api/prototypeApi'
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'
import { getCurrentUser } from '../composables/useCurrentUser'

const places = ref<Place[]>([])
const activeCategory = ref('전체')
const errorMessage = ref('')
const isAdding = ref(false)

const form = reactive({ name: '', category: '' })
const user = getCurrentUser()

const categories = computed(() => ['전체', ...new Set(places.value.map((p) => p.category))])
const filteredPlaces = computed(() =>
  activeCategory.value === '전체'
    ? places.value
    : places.value.filter((p) => p.category === activeCategory.value),
)

onMounted(async () => {
  if (!user) return
  try {
    const response = await fetchRoom(user.roomId)
    places.value = response.room.places
  } catch {
    errorMessage.value = '장소 데이터를 불러오지 못했습니다.'
  }
})

async function addPlace() {
  errorMessage.value = ''
  if (!form.name.trim() || !form.category.trim()) {
    errorMessage.value = '장소명과 카테고리를 입력해 주세요.'
    return
  }
  if (!user) return

  isAdding.value = true
  try {
    const response = await addPlaceToRoom(user.roomId, form.name.trim(), form.category.trim())
    places.value = [response.place, ...places.value]
    activeCategory.value = '전체'
    form.name = ''
    form.category = ''
  } catch {
    errorMessage.value = '장소를 추가하지 못했습니다.'
  } finally {
    isAdding.value = false
  }
}

async function removePlace(placeId: string) {
  if (!user) return
  try {
    await removePlaceFromRoom(user.roomId, placeId)
    places.value = places.value.filter((p) => p.id !== placeId)
  } catch {
    errorMessage.value = '장소를 삭제하지 못했습니다.'
  }
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
              <div class="place-list__actions">
                <em class="status-badge">{{ place.status }}</em>
                <button
                  class="place-delete-btn"
                  type="button"
                  aria-label="삭제"
                  @click="removePlace(place.id)"
                >
                  ×
                </button>
              </div>
            </li>
          </ul>

          <p v-if="filteredPlaces.length === 0" class="muted-text">아직 저장된 장소가 없습니다.</p>
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
            <button class="primary-button" type="submit" :disabled="isAdding">
              {{ isAdding ? '추가 중...' : '장소 추가하기' }}
            </button>
          </form>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
