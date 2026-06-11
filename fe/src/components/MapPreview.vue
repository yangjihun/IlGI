<script setup lang="ts">
type MarkerType = 'diary' | 'wishlist' | 'shared'

type MapMarker = {
  id: string
  type: MarkerType
  title: string
  description: string
  position: {
    top: string
    left: string
  }
}

defineProps<{
  markers: MapMarker[]
  activeMarker: MapMarker
}>()
</script>

<template>
  <section class="map-preview" aria-label="우리의 장소 지도 미리보기">
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
    >
      <span class="map-marker__dot" />
    </button>

    <article class="marker-preview">
      <p>{{ activeMarker.type === 'diary' ? '오늘의 기록' : '함께 볼 장소' }}</p>
      <h2>{{ activeMarker.title }}</h2>
      <span>{{ activeMarker.description }}</span>
    </article>
  </section>
</template>
