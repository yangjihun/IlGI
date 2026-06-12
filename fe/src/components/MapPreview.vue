<script setup lang="ts">
import type { MapMarker } from '../api/prototypeApi'

defineProps<{
  markers: MapMarker[]
  activeMarker: MapMarker
}>()

defineEmits<{
  select: [marker: MapMarker]
}>()
</script>

<template>
  <section class="map-preview" aria-label="장소 기반 지도 미리보기">
    <div class="map-preview__canvas" aria-hidden="true">
      <span class="map-shape map-shape--river" />
      <span class="map-shape map-shape--park" />
      <span class="map-road map-road--one" />
      <span class="map-road map-road--two" />
      <span class="map-road map-road--three" />
    </div>

    <button
      v-for="marker in markers"
      :key="marker.id"
      class="map-marker"
      :class="`map-marker--${marker.type}`"
      :style="{ top: marker.position.top, left: marker.position.left }"
      type="button"
      :aria-label="`${marker.title}: ${marker.description}`"
      @click="$emit('select', marker)"
    >
      <span class="map-marker__dot" />
    </button>

    <article class="marker-preview">
      <p>{{ activeMarker.type === 'diary' ? '오늘의 기록' : '함께 볼 장소' }}</p>
      <h2>{{ activeMarker.title }}</h2>
      <span>{{ activeMarker.description }}</span>
      <RouterLink
        v-if="activeMarker.type === 'diary'"
        class="secondary-button marker-preview__action"
        :to="{ name: 'diary-detail', params: { id: activeMarker.id } }"
      >
        상세 보기
      </RouterLink>
    </article>
  </section>
</template>
